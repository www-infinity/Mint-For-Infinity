'use strict';

const term = require('../src/term');

describe('term.writeln', () => {
  let spy;

  beforeEach(() => {
    spy = jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  test('writes the text followed by a newline', () => {
    term.writeln('hello');
    expect(spy).toHaveBeenCalledWith('hello\n');
  });

  test('writes the [GOLD] Product-Plan-Locked message correctly', () => {
    const hash4 = 'abc123';
    term.writeln(`\r\n[GOLD] Product-Plan-Locked: ${hash4}`);
    expect(spy).toHaveBeenCalledWith('\r\n[GOLD] Product-Plan-Locked: abc123\n');
  });
});
