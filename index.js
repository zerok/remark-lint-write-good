const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');
const writeGood = require('write-good');

module.exports = rule('remark-lint:write-good', (ast, file, options) => {
    visit(ast, 'paragraph', (node) => {
        const text = toString(node);
        const newLines = findNewlines(text);
        writeGood(text, options).forEach(suggestion => {
            let startLineOffset = 0;
            let endLineOffset = 0;
            let lastLinebreakBeforEnd = 0;
            let lastLineBreakBeforeStart = 0;
            newLines.forEach(idx => {
                if (idx < suggestion.index) {
                    startLineOffset++;
                    lastLineBreakBeforeStart = idx;
                }
                if (idx < suggestion.offset + suggestion.index) {
                    endLineOffset++;
                    lastLinebreakBeforEnd = idx;
                }
            });
            const startLine = node.position.start.line + startLineOffset;
            const endLine = node.position.start.line + endLineOffset;
            const startColumn = suggestion.index - lastLineBreakBeforeStart;
            const endColumn = suggestion.index + suggestion.offset - lastLinebreakBeforEnd;
            const pos = {
                start: {
                    line: startLine,
                    column: startColumn + 1 - startLineOffset
                },
                end: {
                    line: endLine,
                    column: endColumn + 1 - endLineOffset
                }
            };
            file.message(suggestion.reason, pos);
        });
    });
});

function findNewlines(str) {
    const indices = [];
    let prev = 0;
    while(true) {
        const idx = str.indexOf('\n');
        if (idx === -1) {
            break;
        }
        indices.push(prev + idx);
        prev += idx;
        str = str.substring(idx+1);
    }
    return indices;
}
