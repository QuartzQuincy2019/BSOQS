// 3 logic.js

/**
 * 监听 sticky 元素的状态变化（进入/离开粘性定位）
 * @param {HTMLElement} element - 需要监听的元素（必须拥有 position: sticky）
 * @param {Function} onSticky - 进入 sticky 状态时的回调函数，接收元素作为参数
 * @param {Function} onUnsticky - 离开 sticky 状态时的回调函数，接收元素作为参数（可选）
 * @returns {Function} 停止监听的函数
 */
function listenSticky(element, onSticky, onUnsticky) {
  // 1. 验证元素是否具有 sticky 定位
  const computedStyle = getComputedStyle(element);
  if (computedStyle.position !== 'sticky') {
    throw new Error('元素必须设置 position: sticky');
  }

  // 2. 解析阈值（以 top 为例，可根据需要扩展）
  let thresholdValue = 0;
  let thresholdUnit = 'px';
  const topValue = computedStyle.top;
  if (topValue && topValue !== 'auto') {
    const match = topValue.match(/^([+-]?\d*\.?\d+)(px|%)?$/);
    if (match) {
      thresholdValue = parseFloat(match[1]);
      thresholdUnit = match[2] || 'px';
    }
  }
  // 简单处理：仅支持 px 单位，百分比阈值按 0 处理（可增强）
  if (thresholdUnit !== 'px') {
    console.warn('仅支持 px 阈值的精确判断，将使用 0 作为阈值');
    thresholdValue = 0;
  }

  // 3. 找到最近的滚动容器（overflow 为 auto/scroll 的祖先或视口）
  let container = element.parentElement;
  while (container) {
    const overflow = getComputedStyle(container).overflowY;
    if (overflow === 'auto' || overflow === 'scroll') break;
    container = container.parentElement;
  }
  const isRoot = !container || container === document.documentElement;
  const scrollTarget = isRoot ? window : container;

  // 4. 状态缓存
  let isSticky = false;

  // 5. 核心判断函数
  function check() {
    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();

    // 根据容器调整坐标参考系
    let currentTop = rect.top;
    let parentBottom = parentRect.bottom;
    let threshold = thresholdValue;

    if (!isRoot) {
      const containerRect = container.getBoundingClientRect();
      currentTop = rect.top - containerRect.top;
      parentBottom = parentRect.bottom - containerRect.top;
    }

    // sticky 激活条件（基于 top 阈值）：
    // a) 元素上边缘 ≤ 阈值（已到达或超过粘性触发点）
    // b) 父元素底部 > 阈值（父元素尚未完全滚出，否则 sticky 失效）
    const active = currentTop <= threshold && parentBottom > threshold;

    if (active !== isSticky) {
      isSticky = active;
      if (active && onSticky) {
        onSticky(element);
      } else if (!active && onUnsticky) {
        onUnsticky(element);
      }
    }
  }

  // 6. 监听滚动和窗口大小变化
  scrollTarget.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  check(); // 立即执行一次初始检查

  // 7. 返回取消监听的方法
  return function stopListening() {
    scrollTarget.removeEventListener('scroll', check);
    window.removeEventListener('resize', check);
  };
}


// 辅助函数：查找下一个未被转义的指定字符
function findUnescapedChar(str, start, target) {
  let pos = start;
  while (pos < str.length) {
    if (str[pos] === '\\') {
      pos += 2;
    } else if (str[pos] === target) {
      return pos;
    } else {
      pos++;
    }
  }
  return -1;
}

// 解析合并参数，如 "c3r2" 返回 " colspan='3' rowspan='2'"
function parseAttribute(attrStr) {
  const regex = /([cC]|[rR])(\d+)/g;
  let match;
  const attrs = [];
  while ((match = regex.exec(attrStr)) !== null) {
    const type = match[1].toLowerCase();
    const num = parseInt(match[2], 10);
    attrs.push({ type, num });
  }
  if (attrs.length === 0) return '';
  attrs.sort((a, b) => (a.type === 'c' ? -1 : 1));
  let result = '';
  for (const a of attrs) {
    result += a.type === 'c' ? ` colspan='${a.num}'` : ` rowspan='${a.num}'`;
  }
  return result;
}

// 标识符到属性名的映射（可随意扩展）
const flagMap = {
  '%': 'class',
  'ƈ': 'class',
  'ƨ': 'src',
  'ȧ': 'alt',
  'ƹ': 'href',
  'ź': 'value',
  'ƭ': 'title',
  'ŧ': 'type',
  'ƥ': 'placeholder',
  'ẇ': 'width',
  'ḣ': 'height'
};

// 标签固有参数映射（无标识的 {} 对应哪个属性）
// 特殊标签 td/th 的固有参数是合并属性，已在代码中特殊处理
const intrinsicAttrs = {
  'a': 'href',
  'img': 'src',
  'span': 'class',
  'input': 'type',
  // 可继续添加其他标签
  // 注意：td/th 不在此列，它们特殊处理为合并属性
};

// 自闭合标签列表（输出时不会生成闭合标签）
const selfClosingTags = ['img', 'input', 'br', 'hr', 'meta', 'link']; // 可扩展

// 解析连续的大括号组，返回属性和新位置
function parseAttributes(input, pos, tagType) {
  let attrs = {}; // 动态属性对象
  let i = pos;
  while (i < input.length) {
    // 情况1：标识符 + {content}
    if (flagMap.hasOwnProperty(input[i])) {
      const flag = input[i];
      i++; // 跳过标识符
      if (i >= input.length || input[i] !== '{') break; // 格式错误
      i++; // 跳过 '{'
      const start = i;
      const end = findUnescapedChar(input, start, '}');
      if (end === -1) break;
      const content = input.substring(start, end);
      const attrName = flagMap[flag];
      if (attrName && !attrs.hasOwnProperty(attrName)) {
        attrs[attrName] = content;
      }
      i = end + 1;
    }
    // 情况2：单独的 {content}（无标识）
    else if (input[i] === '{') {
      i++; // 跳过 '{'
      const start = i;
      const end = findUnescapedChar(input, start, '}');
      if (end === -1) break;
      const content = input.substring(start, end);
      // 根据标签类型处理固有参数
      if (tagType === 'td' || tagType === 'th') {
        // 单元格的固有参数是合并属性
        if (!attrs.hasOwnProperty('span')) {
          attrs.span = parseAttribute(content);
        }
      } else {
        const intrinsicProp = intrinsicAttrs[tagType];
        if (intrinsicProp && !attrs.hasOwnProperty(intrinsicProp)) {
          attrs[intrinsicProp] = content;
        }
      }
      i = end + 1;
    } else {
      break; // 既不是标识符也不是 {，结束
    }
  }
  return { attrs, newPos: i };
}

function parseMixed(input) {
  let html = '';
  let i = 0;
  // 表格状态
  let inTable = false;
  let inCell = false;
  let useTh = false; // 当前行是否使用 <th>
  // 列表栈（支持嵌套）
  const listStack = []; // 每个元素 { type: 'ul'|'ol', inItem: boolean }

  // 所有可能的标记模式（按长度降序）
  const patterns = [
    // 列表多字符
    { pattern: 'ul[', len: 3 },
    { pattern: 'ol[', len: 3 },
    { pattern: ']ul', len: 3 },
    { pattern: ']ol', len: 3 },
    // 表格域
    { pattern: 't[', len: 2 },
    { pattern: ']t', len: 2 },
    // 表格多字符
    { pattern: '^^', len: 2 },   // 表头行
    { pattern: '||', len: 2 },
    // 空单元格标记
    { pattern: '|?', len: 2 },
    // 文本自闭合
    { pattern: 'br[]', len: 4 },
    { pattern: 'hr[]', len: 4 },
    // 文本关闭标记（长到短）
    { pattern: ']bq', len: 3 },
    { pattern: ']s', len: 2 },
    { pattern: ']i', len: 2 },
    { pattern: ']q', len: 2 },
    { pattern: ']c', len: 2 },
    { pattern: ']v', len: 2 },
    { pattern: ']h6', len: 3 },
    { pattern: ']h5', len: 3 },
    { pattern: ']h4', len: 3 },
    { pattern: ']h3', len: 3 },
    { pattern: ']h2', len: 3 },
    { pattern: ']h1', len: 3 },
    { pattern: ']D', len: 2 },
    { pattern: ']A', len: 2 },
    { pattern: ']I', len: 2 },
    { pattern: ']in', len: 3 },
    { pattern: ']', len: 1 },
    // 文本开启标记（长到短）
    { pattern: 'bq[', len: 3 },
    { pattern: 'q[', len: 2 },
    { pattern: 's[', len: 2 },
    { pattern: 'i[', len: 2 },
    { pattern: 'c[', len: 2 },
    { pattern: 'v[', len: 2 },
    { pattern: 'h6[', len: 3 },
    { pattern: 'h5[', len: 3 },
    { pattern: 'h4[', len: 3 },
    { pattern: 'h3[', len: 3 },
    { pattern: 'h2[', len: 3 },
    { pattern: 'h1[', len: 3 },
    { pattern: 'D[', len: 2 },
    { pattern: 'A[', len: 2 },
    { pattern: 'I[', len: 2 },
    { pattern: 'in[', len: 3 },
    { pattern: '[', len: 1 },
    // 表格单字符
    { pattern: '^', len: 1 },
    { pattern: '$', len: 1 },
    { pattern: '|', len: 1 },
  ];

  // 按长度降序排序
  patterns.sort((a, b) => b.len - a.len);

  // 定义开启标记对应的标签名和类型（用于属性解析）
  const openTagType = {
    'bq[': 'blockquote',
    'q[': 'quote',
    's[': 'strong',
    'i[': 'i',
    'c[': 'code',
    'v[': 'span',
    'h6[': 'h6',
    'h5[': 'h5',
    'h4[': 'h4',
    'h3[': 'h3',
    'h2[': 'h2',
    'h1[': 'h1',
    '[': 'p',
    'D[': 'div',
    'A[': 'a',
    'I[': 'img',
    'in[': 'input'
  };

  // 关闭标记对应的标签名
  const closeMap = {
    ']bq': 'blockquote',
    ']s': 'strong',
    ']i': 'i',
    ']q': 'quote',
    ']c': 'code',
    ']v': 'span',
    ']h6': 'h6',
    ']h5': 'h5',
    ']h4': 'h4',
    ']h3': 'h3',
    ']h2': 'h2',
    ']h1': 'h1',
    ']D': 'div',
    ']A': 'a',
    ']I': 'img',
    ']in': 'input',
    ']': 'p'
  };

  while (i < input.length) {
    // 转义处理
    if (input[i] === '\\') {
      if (i + 1 < input.length) html += input[i + 1];
      i += 2;
      continue;
    }

    let matched = false;
    for (let p of patterns) {
      if (input.substr(i, p.len) === p.pattern) {
        const pat = p.pattern;

        // 上下文条件检查
        let allowed = true;
        if (pat === '^' || pat === '$' || pat === '^^' || pat === '||' || pat === '|?') {
          allowed = inTable;
        } else if (pat === '|') {
          allowed = inTable || listStack.length > 0;
        }
        if (!allowed) continue;

        // ----- 列表开启 -----
        if (pat === 'ul[' || pat === 'ol[') {
          let type = pat === 'ul[' ? 'ul' : 'ol';
          let { attrs, newPos } = parseAttributes(input, i + pat.length, 'ul');
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) {
              attrStr += ` ${key}='${attrs[key]}'`;
            }
          }
          html += `<${type}${attrStr}>`;
          listStack.push({ type, inItem: false });
          i = newPos;
          matched = true;
          break;
        }

        // ----- 列表关闭 -----
        if (pat === ']ul' || pat === ']ol') {
          let expectedType = pat === ']ul' ? 'ul' : 'ol';
          if (listStack.length > 0 && listStack[listStack.length - 1].type === expectedType) {
            let list = listStack.pop();
            if (list.inItem) html += '</li>';
            html += `</${expectedType}>`;
          } else {
            html += pat; // 容错
          }
          i += pat.length;
          matched = true;
          break;
        }

        // ----- 表格域开启 -----
        if (pat === 't[') {
          if (inTable) {
            if (inCell) html += useTh ? '</th>' : '</td>';
            html += '</table>';
            inTable = false;
            inCell = false;
          }
          let { attrs, newPos } = parseAttributes(input, i + pat.length, 'table');
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) attrStr += ` ${key}='${attrs[key]}'`;
          }
          html += `<table${attrStr}>`;
          inTable = true;
          inCell = false;
          useTh = false;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 表格域关闭 -----
        if (pat === ']t') {
          if (inTable) {
            if (inCell) html += useTh ? '</th>' : '</td>';
            html += '</table>';
            inTable = false;
            inCell = false;
          } else {
            html += ']t';
          }
          i += pat.length;
          matched = true;
          break;
        }

        // ----- 表格多字符：^^（表头行） -----
        if (pat === '^^') {
          if (!inTable) break;
          if (inCell) html += useTh ? '</th>' : '</td>';
          let { attrs, newPos } = parseAttributes(input, i + pat.length, 'tr');
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) attrStr += ` ${key}='${attrs[key]}'`;
          }
          html += `<tr${attrStr}>`;
          useTh = true;
          inCell = false;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 表格多字符：|| -----
        if (pat === '||') {
          if (!inTable) break;
          if (inCell) html += useTh ? '</th>' : '</td>';
          html += '</tr><tr>';
          useTh = false;
          i += pat.length;
          // 解析新行第一个单元格的属性
          let { attrs, newPos } = parseAttributes(input, i, useTh ? 'th' : 'td');
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) {
              if (key === 'span') {
                attrStr += attrs[key];
              } else {
                attrStr += ` ${key}='${attrs[key]}'`;
              }
            }
          }
          html += useTh ? `<th${attrStr}>` : `<td${attrStr}>`;
          inCell = true;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 空单元格标记：|? -----
        if (pat === '|?') {
          if (!inTable) break;
          let { attrs, newPos } = parseAttributes(input, i + 2, useTh ? 'th' : 'td');
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) {
              if (key === 'span') {
                attrStr += attrs[key];
              } else {
                attrStr += ` ${key}='${attrs[key]}'`;
              }
            }
          }
          html += useTh ? `<th${attrStr}></th>` : `<td${attrStr}></td>`;
          inCell = false;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 文本自闭合 -----
        if (pat === 'br[]') {
          html += '<br />';
          i += pat.length;
          matched = true;
          break;
        }
        if (pat === 'hr[]') {
          html += '<hr />';
          i += pat.length;
          matched = true;
          break;
        }

        // ----- 文本关闭标记 -----
        if (closeMap.hasOwnProperty(pat)) {
          let tag = closeMap[pat];
          if (!selfClosingTags.includes(tag)) {
            // 非自闭合标签才输出闭合标签
            html += `</${tag}>`;
          }
          i += pat.length;
          matched = true;
          break;
        }

        // ----- 文本开启标记 -----
        if (openTagType.hasOwnProperty(pat)) {
          let tag = openTagType[pat];
          let tagType = tag;
          let { attrs, newPos } = parseAttributes(input, i + pat.length, tagType);
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) {
              attrStr += ` ${key}='${attrs[key]}'`;
            }
          }
          if (selfClosingTags.includes(tag)) {
            html += `<${tag}${attrStr} />`;
          } else {
            html += `<${tag}${attrStr}>`;
          }
          i = newPos;
          matched = true;
          break;
        }

        // ----- 表格单字符：^ -----
        if (pat === '^') {
          if (!inTable) break;
          if (inCell) html += useTh ? '</th>' : '</td>';
          let { attrs, newPos } = parseAttributes(input, i + pat.length, 'tr');
          let attrStr = '';
          for (let key in attrs) {
            if (attrs.hasOwnProperty(key)) attrStr += ` ${key}='${attrs[key]}'`;
          }
          html += `<tr${attrStr}>`;
          useTh = false;
          inCell = false;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 表格单字符：$ -----
        if (pat === '$') {
          if (!inTable) break;
          if (inCell) html += useTh ? '</th>' : '</td>';
          html += '</tr>';
          inCell = false;
          i += pat.length;
          matched = true;
          break;
        }

        // ----- 表格/列表单字符：| -----
        if (pat === '|') {
          if (listStack.length > 0) {
            // 列表内的 |
            let currentList = listStack[listStack.length - 1];
            let { attrs, newPos } = parseAttributes(input, i + 1, 'li');
            let attrStr = '';
            for (let key in attrs) {
              if (attrs.hasOwnProperty(key)) attrStr += ` ${key}='${attrs[key]}'`;
            }
            if (!currentList.inItem) {
              html += `<li${attrStr}>`;
              currentList.inItem = true;
            } else {
              html += `</li><li${attrStr}>`;
            }
            i = newPos;
            matched = true;
            break;
          } else if (inTable) {
            // 表格内的 |
            // 检查下一个字符是否是 '$'
            if (i + 1 < input.length && input[i + 1] === '$') {
              // |$ 情况：关闭当前单元格，不开启新单元格
              if (inCell) html += useTh ? '</th>' : '</td>';
              inCell = false;
              i += 1; // 只消耗 '|'，'$' 留给下一轮
              matched = true;
              break;
            } else {
              // 普通 |：分隔符或行首第一个
              if (!inCell) {
                // 行首第一个单元格
                let { attrs, newPos } = parseAttributes(input, i + 1, useTh ? 'th' : 'td');
                let attrStr = '';
                for (let key in attrs) {
                  if (attrs.hasOwnProperty(key)) {
                    if (key === 'span') {
                      attrStr += attrs[key];
                    } else {
                      attrStr += ` ${key}='${attrs[key]}'`;
                    }
                  }
                }
                html += useTh ? `<th${attrStr}>` : `<td${attrStr}>`;
                inCell = true;
                i = newPos;
              } else {
                // 单元格内分隔符
                let { attrs, newPos } = parseAttributes(input, i + 1, useTh ? 'th' : 'td');
                let attrStr = '';
                for (let key in attrs) {
                  if (attrs.hasOwnProperty(key)) {
                    if (key === 'span') {
                      attrStr += attrs[key];
                    } else {
                      attrStr += ` ${key}='${attrs[key]}'`;
                    }
                  }
                }
                html += useTh ? `</th><th${attrStr}>` : `</td><td${attrStr}>`;
                i = newPos;
              }
              matched = true;
              break;
            }
          }
        }

        // 如果执行到这里，说明没有匹配到任何 case，继续循环（理论上不会）
      }
    }

    if (matched) continue;

    // 普通字符
    html += input[i];
    i++;
  }

  // 不自动关闭任何未闭合的标签，保留原样
  return html;
}
