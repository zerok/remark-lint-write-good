const rule = require('unified-lint-rule');
const visit = require('unist-util-visit');
const toString = require('nlcst-to-string');
const writeGood = require('write-good');

module.exports = rule('remark-lint:write-good', (ast, file, options) => {
    visit(ast, 'paragraph', (node) => {
        const text = toString(node);
        writeGood(text, options).forEach(suggestion => {
            file.message(suggestion.reason, node);
        });
    });
});