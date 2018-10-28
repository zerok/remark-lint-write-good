const remark = require('remark');
const wgLinter = require('../');

describe("handling frontmatter", () => {
    it("...", () => {
        const sampleText = `
---
path: "/20181019"
date: "2018-10-19"
title: "Friday, October 19, 2018"
tags: []
excerpt: "A preview of 2018-10-19"
---`;
        const data = remark()
            .use(wgLinter, {
                "passive": false,
                "adverb": false,
            })
            .processSync(sampleText);
        expect(data).toBeTruthy();
    });
});

// I'm not sure if this is actually related to dealing with frontmatters but
// there are situations where an empty paragraph doesn't contain any children.
//
// See [#4](https://github.com/zerok/remark-lint-write-good/issues/4) for
// details.
describe("prepare a paragraph without any children", () => {
    it("should not error out but just skip that paragraph", () => {
        const file = {message: () => {}};
        const ast = {
            type: "node",
            children: [{
                type: "paragraph",
                children: [{
                    type: "something"
                }]
            }]
        };
        wgLinter.astProcessor(ast, file, {});
    });
});
