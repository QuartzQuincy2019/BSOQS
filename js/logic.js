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

// 解析属性字符串，如 "c3r2" 返回 " colspan='3' rowspan='2'"
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
  // 按 c 在前排序（仅为了美观）
  attrs.sort((a, b) => (a.type === 'c' ? -1 : 1));
  let result = '';
  for (const a of attrs) {
    if (a.type === 'c') {
      result += ` colspan='${a.num}'`;
    } else {
      result += ` rowspan='${a.num}'`;
    }
  }
  return result;
}

function parseMixed(input) {
  let html = '';
  let i = 0;
  let inCell = false;      // 当前是否在表格单元格内
  let useTh = false;       // 当前行是否使用 <th>
  let inTable = false;     // 当前是否在表格内（用于自动包裹 <table>）

  // 所有可能的标记模式（按长度降序）
  const patterns = [
    // 表格多字符
    { pattern: '|||', len: 3 },
    { pattern: '||$', len: 3 },
    { pattern: '^#', len: 2 },
    { pattern: '||', len: 2 },
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

  // 按长度降序排序（确保长标记优先匹配）
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
        switch (pat) {
          // ----- 表格多字符 -----
          case '|||':
            // 关闭当前单元格和当前行，开始新行并立即开启新单元格
            if (inCell) {
              html += useTh ? '</th>' : '</td>';
              inCell = false;
            }
            html += '</tr><tr>';
            useTh = false; // 新行默认使用 td
            i += pat.length; // 跳过 '|||'
            // 处理新行的第一个单元格（可能带属性）
            if (i < input.length && input[i] === '{') {
              let closeBrace = findUnescapedChar(input, i + 1, '}');
              if (closeBrace !== -1) {
                let attr = parseAttribute(input.substring(i + 1, closeBrace));
                html += useTh ? `<th${attr}>` : `<td${attr}>`;
                i = closeBrace + 1;
              } else {
                // 没有匹配的 '}'，则开启无属性单元格，并将 '{' 留给后续作为普通字符
                html += useTh ? '<th>' : '<td>';
                // i 保持不变（指向 '{'）
              }
            } else {
              html += useTh ? '<th>' : '<td>';
            }
            inCell = true;
            matched = true;
            break;

          case '||$':
            if (inCell) {
              html += useTh ? '</th>' : '</td>';
              inCell = false;
            }
            html += '</tr>';
            // 检查是否需要关闭表格（下一个字符不是 '^'）
            if (i + pat.length < input.length && input[i + pat.length] !== '^') {
              html += '</table>';
              inTable = false;
            }
            i += pat.length;
            matched = true;
            break;

          case '^#':
            if (!inTable) {
              html += '<table>';
              inTable = true;
            }
            if (inCell) {
              html += useTh ? '</th>' : '</td>';
              inCell = false;
            }
            html += '<tr>';
            useTh = true;
            i += pat.length;
            matched = true;
            break;

          case '||':
            {
              if (!inTable) {
                html += '<table><tr>';
                inTable = true;
                useTh = false;
              }
              if (inCell) {
                html += useTh ? '</th>' : '</td>';
                inCell = false;
              }
              let nextPos = i + pat.length;
              let attr = '';
              if (nextPos < input.length && input[nextPos] === '{') {
                let closeBrace = findUnescapedChar(input, nextPos + 1, '}');
                if (closeBrace !== -1) {
                  attr = parseAttribute(input.substring(nextPos + 1, closeBrace));
                  i = closeBrace + 1;
                } else {
                  attr = '';
                  i = nextPos; // 指向 '{'
                }
              } else {
                i = nextPos;
              }
              html += useTh ? `<th${attr}>` : `<td${attr}>`;
              inCell = true;
              matched = true;
            }
            break;

          // ----- 文本自闭合 -----
          case 'br[]':
            html += '<br />';
            i += pat.length;
            matched = true;
            break;
          case 'hr[]':
            html += '<hr />';
            i += pat.length;
            matched = true;
            break;

          // ----- 文本关闭标记 -----
          case ']bq': html += '</blockquote>'; i += pat.length; matched = true; break;
          case ']s': html += '</strong>'; i += pat.length; matched = true; break;
          case ']i': html += '</i>'; i += pat.length; matched = true; break;
          case ']q': html += '</quote>'; i += pat.length; matched = true; break;
          case ']c': html += '</code>'; i += pat.length; matched = true; break;
          case ']v': html += '</span>'; i += pat.length; matched = true; break;
          case ']h6': html += '</h6>'; i += pat.length; matched = true; break;
          case ']h5': html += '</h5>'; i += pat.length; matched = true; break;
          case ']h4': html += '</h4>'; i += pat.length; matched = true; break;
          case ']h3': html += '</h3>'; i += pat.length; matched = true; break;
          case ']h2': html += '</h2>'; i += pat.length; matched = true; break;
          case ']h1': html += '</h1>'; i += pat.length; matched = true; break;
          case ']': html += '</p>'; i += pat.length; matched = true; break;

          // ----- 文本开启标记 -----
          case 'bq[': case 'q[': case 's[': case 'i[': case 'c[': case 'v[':
          case 'h6[': case 'h5[': case 'h4[': case 'h3[': case 'h2[': case 'h1[':
          case '[':
            {
              let tag;
              switch (pat) {
                case 'bq[': tag = 'blockquote'; break;
                case 'q[': tag = 'quote'; break;
                case 's[': tag = 'strong'; break;
                case 'i[': tag = 'i'; break;
                case 'c[': tag = 'code'; break;
                case 'v[': tag = 'span'; break;
                case 'h6[': tag = 'h6'; break;
                case 'h5[': tag = 'h5'; break;
                case 'h4[': tag = 'h4'; break;
                case 'h3[': tag = 'h3'; break;
                case 'h2[': tag = 'h2'; break;
                case 'h1[': tag = 'h1'; break;
                case '[': tag = 'p'; break;
              }
              let nextPos = i + pat.length;
              let attr = '';
              if (nextPos < input.length && input[nextPos] === '{') {
                let closeBrace = findUnescapedChar(input, nextPos + 1, '}');
                if (closeBrace !== -1) {
                  attr = ` class='${input.substring(nextPos + 1, closeBrace)}'`;
                  i = closeBrace + 1;
                } else {
                  attr = '';
                  i = nextPos; // 指向 '{'
                }
              } else {
                i = nextPos;
              }
              html += `<${tag}${attr}>`;
              matched = true;
            }
            break;

          // ----- 表格单字符 -----
          case '^':
            if (!inTable) {
              html += '<table>';
              inTable = true;
            }
            if (inCell) {
              html += useTh ? '</th>' : '</td>';
              inCell = false;
            }
            html += '<tr>';
            useTh = false;
            i += pat.length;
            matched = true;
            break;
          case '$':
            if (inCell) {
              html += useTh ? '</th>' : '</td>';
              inCell = false;
            }
            html += '</tr>';
            // 检查是否需要关闭表格（下一个字符不是 '^'）
            if (i + pat.length < input.length && input[i + pat.length] !== '^') {
              html += '</table>';
              inTable = false;
            }
            i += pat.length;
            matched = true;
            break;
          case '|':
            {
              if (!inTable) {
                // 自动开始表格和第一行
                html += '<table><tr>';
                inTable = true;
                useTh = false;
              }
              if (inCell) {
                // 单元格内：分隔符，关闭当前并开始下一个
                html += useTh ? '</th>' : '</td>';
                let nextPos = i + pat.length;
                let attr = '';
                if (nextPos < input.length && input[nextPos] === '{') {
                  let closeBrace = findUnescapedChar(input, nextPos + 1, '}');
                  if (closeBrace !== -1) {
                    attr = parseAttribute(input.substring(nextPos + 1, closeBrace));
                    i = closeBrace + 1;
                  } else {
                    attr = '';
                    i = nextPos;
                  }
                } else {
                  i = nextPos;
                }
                html += useTh ? `<th${attr}>` : `<td${attr}>`;
                inCell = true;
              } else {
                // 不在单元格内：开始第一个单元格（行首）
                let nextPos = i + pat.length;
                let attr = '';
                if (nextPos < input.length && input[nextPos] === '{') {
                  let closeBrace = findUnescapedChar(input, nextPos + 1, '}');
                  if (closeBrace !== -1) {
                    attr = parseAttribute(input.substring(nextPos + 1, closeBrace));
                    i = closeBrace + 1;
                  } else {
                    attr = '';
                    i = nextPos;
                  }
                } else {
                  i = nextPos;
                }
                html += useTh ? `<th${attr}>` : `<td${attr}>`;
                inCell = true;
              }
              matched = true;
            }
            break;
        }
        if (matched) break;
      }
    }
    if (matched) continue;

    // 普通字符
    html += input[i];
    i++;
  }

  // 结束处理：关闭未关闭的单元格
  if (inCell) {
    html += useTh ? '</th>' : '</td>';
  }
  // 如果表格还未关闭，关闭它
  if (inTable) {
    html += '</table>';
  }
  // console.log(html)
  return html;
}