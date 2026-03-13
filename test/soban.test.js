'use strict';

const soban = require('../src/soban');

describe('soban.generate4HashToken', () => {
  test('returns an object with four hex-string hash properties', async () => {
    const token = await soban.generate4HashToken('Iowa_Silver_Recovery');

    expect(token).toHaveProperty('hash1');
    expect(token).toHaveProperty('hash2');
    expect(token).toHaveProperty('hash3');
    expect(token).toHaveProperty('hash4');

    for (const key of ['hash1', 'hash2', 'hash3', 'hash4']) {
      expect(typeof token[key]).toBe('string');
      expect(token[key]).toMatch(/^[0-9a-f]{64}$/);
    }
  });

  test('all four hashes are distinct', async () => {
    const token = await soban.generate4HashToken('Iowa_Silver_Recovery');
    const values = [token.hash1, token.hash2, token.hash3, token.hash4];
    const unique = new Set(values);
    expect(unique.size).toBe(4);
  });

  test('hash4 is deterministic for the same seed', async () => {
    const a = await soban.generate4HashToken('Iowa_Silver_Recovery');
    const b = await soban.generate4HashToken('Iowa_Silver_Recovery');
    expect(a.hash4).toBe(b.hash4);
  });

  test('different seeds produce different hash4 values', async () => {
    const a = await soban.generate4HashToken('Iowa_Silver_Recovery');
    const b = await soban.generate4HashToken('Other_Seed');
    expect(a.hash4).not.toBe(b.hash4);
  });

  test('hash4 for Iowa_Silver_Recovery matches expected SHA-256 digest', async () => {
    const crypto = require('crypto');
    const expected = crypto
      .createHash('sha256')
      .update('Iowa_Silver_Recovery-4')
      .digest('hex');

    const token = await soban.generate4HashToken('Iowa_Silver_Recovery');
    expect(token.hash4).toBe(expected);
  });
});
