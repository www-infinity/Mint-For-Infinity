'use strict';

const crypto = require('crypto');

/**
 * Generates a 4-hash token from a given seed string.
 * Each of the four hash values is derived from the seed combined with
 * a positional salt, producing a distinct SHA-256 digest per slot.
 *
 * @param {string} seed - The seed identifier (e.g. 'Iowa_Silver_Recovery').
 * @returns {Promise<{hash1: string, hash2: string, hash3: string, hash4: string}>}
 */
async function generate4HashToken(seed) {
  const make = (slot) =>
    crypto
      .createHash('sha256')
      .update(`${seed}-${slot}`)
      .digest('hex');

  return {
    hash1: make(1),
    hash2: make(2),
    hash3: make(3),
    hash4: make(4),
  };
}

const soban = { generate4HashToken };

module.exports = soban;
