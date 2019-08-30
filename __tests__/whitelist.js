const remark = require('remark');
const wgLinter = require('../');

const sampleText = `
# Title Goes Here

Never write read-only sentences.
`;
 
describe('whitelist handling', () => {

  it('should warn without whitelist', () => {
    const data = remark()
      .use(wgLinter)
      .processSync(sampleText);
    expect(data.messages[0].message).toBe('"only" can weaken meaning');
    expect(data.messages.length).toBe(1);
  });
    
  it('should ignore messages with whitelist words', () => {
    const data = remark()
      .use(wgLinter, {
        whitelist: [ 'read-only']
      })
      .processSync(sampleText);
    expect(data.messages.length).toBe(0);
  });

});
