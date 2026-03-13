'use strict';

/**
 * Minimal terminal helper that writes a line to stdout.
 * A trailing newline is always appended so each call starts on a fresh line.
 *
 * @param {string} text - The text to write (may contain \r\n escape sequences).
 */
function writeln(text) {
  process.stdout.write(text + '\n');
}

const term = { writeln };

module.exports = term;
