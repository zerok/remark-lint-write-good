const remark = require('remark');
const wgLinter = require('../');

describe('verbatim handling', () => {
  it('should ignore blockquotes', () => {
    const sampleText = `
# Blockquote

> And therefore must his choice be circumscribed

`;
    const data = remark().use(wgLinter).processSync(sampleText);
    expect(data.messages.length).toBe(0);
  });

  it('should ignore fencedCode', () => {
    const sampleText = `
# Blockquote

\`\`\`
And therefore must his choice be circumscribed
\`\`\`
    
`;
    const data = remark().use(wgLinter).processSync(sampleText);
    expect(data.messages.length).toBe(0);
  });
});
