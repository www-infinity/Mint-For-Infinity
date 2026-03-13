'use strict';

// Cart 07: Mint for Infinity
const soban = require('./soban');
const term = require('./term');

async function run() {
  const token = await soban.generate4HashToken('Iowa_Silver_Recovery');
  term.writeln(`\r\n[GOLD] Product-Plan-Locked: ${token.hash4}`);
}

run();
