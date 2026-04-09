// 3 logic.js

/**
 * 根据视口顶部位置，为当前可见卡片区域的标题添加激活类（支持动态增删卡片，带迟滞防抖）
 * @param {string} cardSelector - 卡片容器的选择器（例如 '.card'）
 * @param {string} titleSelector - 卡片内标题的选择器（默认为 '.CardHeadTitle'）
 * @param {string} activeClass - 要添加/移除的类名（默认为 'is-sticky'）
 * @param {number} hysteresis - 迟滞量（像素），用于防止边界抖动，默认2px
 * @param {HTMLElement|string} [watchContainer] - 要监听的容器元素或其选择器（默认为 document.body）
 * @returns {Function} 停止监听的函数
 */
function observeCardTitles(cardSelector, titleSelector = '.CardHeadTitle', activeClass = 'is-sticky', hysteresis = 2, watchContainer = document.body) {
  const container = typeof watchContainer === 'string'
    ? document.querySelector(watchContainer)
    : watchContainer;
  if (!container) throw new Error('无效的监听容器');

  // 缓存：按DOM顺序的卡片数组 + 卡片到标题的映射
  let cards = [];
  const cardTitleMap = new Map();
  let activeCard = null; // 当前激活的卡片

  // 刷新卡片缓存（在DOM变化时调用）
  function refreshCards() {
    const currentCards = Array.from(document.querySelectorAll(cardSelector));
    cards = currentCards; // 保持DOM顺序

    cardTitleMap.clear();
    currentCards.forEach(card => {
      const title = card.querySelector(titleSelector);
      if (title) cardTitleMap.set(card, title);
    });

    // 如果之前激活的卡片被移除，清理其类
    if (activeCard && !cardTitleMap.has(activeCard)) {
      activeCard = null; // 无需清理类，因为元素已不在DOM
    }
  }

  refreshCards();

  // 滚动处理（使用 requestAnimationFrame 节流）
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveCard();
        ticking = false;
      });
      ticking = true;
    }
  }

  // 核心更新函数
  function updateActiveCard() {
    const viewportTop = 0; // 视口顶部坐标

    // 1. 如果存在当前激活卡片，先检查它是否仍在“缓冲区域”内
    if (activeCard) {
      const rect = activeCard.getBoundingClientRect();
      // 定义缓冲区域：上下各扩展 hysteresis 像素
      const expandedTop = rect.top - hysteresis;
      const expandedBottom = rect.bottom + hysteresis;
      if (viewportTop >= expandedTop && viewportTop < expandedBottom) {
        // 仍在缓冲区内，保持激活，不进行切换
        return;
      }
    }

    // 2. 否则，需要寻找新的激活卡片（按DOM顺序，取第一个符合条件的）
    let newActive = null;
    for (let card of cards) {
      const rect = card.getBoundingClientRect();
      if (rect.top <= viewportTop && rect.bottom > viewportTop) {
        newActive = card;
        break;
      }
    }

    // 3. 如果激活卡片发生变化，更新类
    if (newActive !== activeCard) {
      if (activeCard) {
        const oldTitle = cardTitleMap.get(activeCard);
        if (oldTitle) oldTitle.classList.remove(activeClass);
      }
      if (newActive) {
        const newTitle = cardTitleMap.get(newActive);
        if (newTitle) newTitle.classList.add(activeClass);
      }
      activeCard = newActive;
    }
  }

  // MutationObserver 监听 DOM 变化（动态添加/删除卡片）
  const observer = new MutationObserver(() => {
    refreshCards();
    updateActiveCard(); // 刷新后立即更新状态
  });
  observer.observe(container, { childList: true, subtree: true });

  // 监听滚动和窗口大小变化
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  // 初始执行
  updateActiveCard();

  // 返回停止监听函数
  return function stop() {
    observer.disconnect();
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onScroll);
    // 清理当前激活的类
    if (activeCard) {
      const title = cardTitleMap.get(activeCard);
      if (title) title.classList.remove(activeClass);
    }
  };
}

// 开始监听，卡片出现后自动生效
const stop = observeCardTitles('.card', '.CardHeadTitle', 'is-sticky', 10, '#BlogSpace');

// 当不再需要时（例如页面卸载），调用 stop()
// stop();

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
  'ḣ': 'height',
  'ḭ': 'id',
  'ḓ': 'min',
  'ṷ': 'max'
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
