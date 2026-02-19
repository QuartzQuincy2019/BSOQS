// 3 logic.js



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

// 从当前位置解析连续的大括号/百分号组合，返回类名和合并参数字符串，以及新的位置
function parseAttrsFromPos(input, pos) {
  let classStr = '';
  let spanStr = '';
  let i = pos;
  while (i < input.length) {
    if (input[i] === '%' && i + 1 < input.length && input[i + 1] === '{') {
      // 类名：%{...}
      let end = findUnescapedChar(input, i + 2, '}');
      if (end === -1) break;
      classStr = input.substring(i + 2, end);
      i = end + 1;
    } else if (input[i] === '{') {
      // 普通参数 {...}
      let end = findUnescapedChar(input, i + 1, '}');
      if (end === -1) break;
      let content = input.substring(i + 1, end);
      spanStr = parseAttribute(content);
      i = end + 1;
    } else {
      break;
    }
  }
  return { classStr, spanStr, newPos: i };
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
    { pattern: '^#', len: 2 },
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
    { pattern: '[', len: 1 },
    // 表格单字符
    { pattern: '^', len: 1 },
    { pattern: '$', len: 1 },
    { pattern: '|', len: 1 },
  ];

  // 按长度降序排序
  patterns.sort((a, b) => b.len - a.len);

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
        if (pat === '^' || pat === '$' || pat === '^#' || pat === '||' || pat === '|?') {
          allowed = inTable;
        } else if (pat === '|') {
          allowed = inTable || listStack.length > 0;
        }
        // 其他标记（列表开启/关闭、文本标记、表格域开启/关闭）总是允许
        if (!allowed) continue;

        // ----- 列表开启 -----
        if (pat === 'ul[' || pat === 'ol[') {
          let type = pat === 'ul[' ? 'ul' : 'ol';
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + pat.length);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          html += `<${type}${classAttr}>`;
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
            // 如果已在表格内，先关闭之前的（简单容错）
            if (inCell) html += useTh ? '</th>' : '</td>';
            html += '</table>';
            inTable = false;
            inCell = false;
          }
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + pat.length);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          html += `<table${classAttr}>`;
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

        // ----- 表格多字符：^# -----
        if (pat === '^#') {
          if (!inTable) break;
          if (inCell) html += useTh ? '</th>' : '</td>';
          // 先解析属性，再输出 <tr>
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + pat.length);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          html += `<tr${classAttr}>`;
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
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          html += useTh ? `<th${classAttr}${spanStr}>` : `<td${classAttr}${spanStr}>`;
          inCell = true;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 空单元格标记：|? -----
        if (pat === '|?') {
          if (!inTable) break;
          // 解析后面的属性（类名和合并属性）
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + 2);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          // 生成空单元格（立即闭合）
          html += useTh ? `<th${classAttr}${spanStr}></th>` : `<td${classAttr}${spanStr}></td>`;
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
          ']': 'p'
        };
        if (closeMap.hasOwnProperty(pat)) {
          html += `</${closeMap[pat]}>`;
          i += pat.length;
          matched = true;
          break;
        }

        // ----- 文本开启标记 -----
        const openMap = {
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
          '[': 'p'
        };
        if (openMap.hasOwnProperty(pat)) {
          let tag = openMap[pat];
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + pat.length);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          html += `<${tag}${classAttr}>`;
          i = newPos;
          matched = true;
          break;
        }

        // ----- 表格单字符：^ -----
        if (pat === '^') {
          if (!inTable) break;
          if (inCell) html += useTh ? '</th>' : '</td>';
          // 解析行属性
          let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + pat.length);
          let classAttr = classStr ? ` class='${classStr}'` : '';
          html += `<tr${classAttr}>`;
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
          // 首先判断是否在列表内
          if (listStack.length > 0) {
            // 列表内的 |
            let currentList = listStack[listStack.length - 1];
            // 解析后面的属性（类名）
            let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + 1);
            let classAttr = classStr ? ` class='${classStr}'` : '';
            if (!currentList.inItem) {
              // 第一个列表项
              html += `<li${classAttr}>`;
              currentList.inItem = true;
            } else {
              // 后续列表项
              html += `</li><li${classAttr}>`;
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
                let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + 1);
                let classAttr = classStr ? ` class='${classStr}'` : '';
                html += useTh ? `<th${classAttr}${spanStr}>` : `<td${classAttr}${spanStr}>`;
                inCell = true;
                i = newPos;
              } else {
                // 单元格内分隔符
                let { classStr, spanStr, newPos } = parseAttrsFromPos(input, i + 1);
                let classAttr = classStr ? ` class='${classStr}'` : '';
                html += useTh ? `</th><th${classAttr}${spanStr}>` : `</td><td${classAttr}${spanStr}>`;
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
