const remark = require('remark');
const wgLinter = require('../');

describe("error position", () => {
    it("should point to the exact position not just the whole paragraph", () => {
        const sampleText = `The first line is correct.
        
Hello world!
Sometimes it might a good idea
to only have something fancy.`;
        const data = remark().use(wgLinter).processSync(sampleText);
        expect(data.messages.length).toBe(1);
        const pos = data.messages[0].location;
        expect(pos.start.line).toBe(5);
        expect(pos.start.column).toBe(4);
        expect(pos.end.line).toBe(5);
        expect(pos.end.column).toBe(8);
    });
});
