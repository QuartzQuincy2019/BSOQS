// laf.js - 浏览器端 Latin 解析器（外层 <span>，整体包裹 <p>）
(function(global) {
    'use strict';

    var PUNCTUATION_REGEX = /[.,!?;:]+$/;

    /**
     * 解析一个单元 token（可能包含花括号）
     * 支持 {attr...}word 或 word{attr...}
     */
    function parseUnit(token) {
        var attrMatch = token.match(/\{([^}]*)\}/);
        var attrStr = attrMatch ? attrMatch[1].trim() : '';
        var word = attrMatch ? token.replace(/\{[^}]*\}/, '').trim() : token.trim();

        var punctuation = '';
        var punctMatch = word.match(PUNCTUATION_REGEX);
        if (punctMatch) {
            punctuation = punctMatch[0];
            word = word.slice(0, -punctuation.length);
        }

        var mainClasses = [];
        var extraTags = [];
        if (attrStr) {
            var attrs = attrStr.split(/\s+/);
            for (var i = 0; i < attrs.length; i++) {
                var attr = attrs[i];
                if (attr.startsWith('l-')) {
                    extraTags.push(attr.slice(2));
                } else {
                    mainClasses.push(attr);
                }
            }
        }

        return { word: word, mainClasses: mainClasses, extraTags: extraTags, punctuation: punctuation };
    }

    /**
     * 生成单个外层 <span> 的 HTML（内部含主 <span> 和附加 <span>）
     */
    function generateSpan(data) {
        var classAttr = data.mainClasses.length > 0 ? " class='" + data.mainClasses.join(' ') + "'" : '';
        var html = "<span><span" + classAttr + ">" + data.word + "</span>";
        for (var i = 0; i < data.extraTags.length; i++) {
            html += "<span class='dwarf'>." + data.extraTags[i] + "</span>";
        }
        html += '</span>';
        return html;
    }

    /**
     * 解析整个输入文本，提取所有单元
     */
    function parseInput(text) {
        var tokens = text.match(/(?:[^\s{}]*\{[^}]*\}[^\s]*)|(?:[^\s{}]+)/g) || [];
        var units = [];
        for (var i = 0; i < tokens.length; i++) {
            units.push(parseUnit(tokens[i]));
        }
        return units;
    }

    /**
     * 主函数：将 Latin 文本转换为 HTML 字符串
     * 外层使用 <span>，整体包裹 <p class='j109 TI'>
     * @param {string} text - 输入文本
     * @returns {string} HTML 字符串
     */
    function laf(text) {
        var units = parseInput(text);
        var parts = [];
        for (var i = 0; i < units.length; i++) {
            parts.push(generateSpan(units[i]) + units[i].punctuation);
        }
        return "<p class='latin TI'>" + parts.join(' ') + "</p>";
    }

    // 暴露到全局
    global.laf = laf;

})(window);