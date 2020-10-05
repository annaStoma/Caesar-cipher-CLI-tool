// process.argv - массив передаваемых через консоль параметров
const consoleArgs = require('minimist')(process.argv.slice(2));
// модуль для работы с файлами
const fs = require('fs');

// options (short alias and full name)
const options = Object.freeze({
  action: {
    short: 'a',
    full: 'action'
  },
  shift: {
    short: 's',
    full: 'shift'
  },
  input: {
    short: 'i',
    full: 'input'
  },
  output: {
    short: 'o',
    full: 'output'
  }
});

// error handler
const error = error => {
  if (error) {
    // '\n' - new line
    process.stderr.write(error.message + '\n');
    // прекратить процесс с заданным кодом выхода
    process.exit(1);
  }
}

const getInputFileOption = () => consoleArgs[options.input.short] || consoleArgs[options.input.full];
const getOutputFileOption = () => consoleArgs[options.output.short] || consoleArgs[options.output.full];
const getActionOption = () => consoleArgs[options.action.short] || consoleArgs[options.action.full];
const getShiftOption = () => consoleArgs[options.shift.short] || consoleArgs[options.shift.full];

const checkRequiredArguments = () => {
  if (!getActionOption()) throw new Error('you missed --action option');
  if (!getShiftOption()) throw new Error( 'you missed --shift option');

  // R_OK - Флаг, указывающий, что файл может быть прочитан и вызывающим процессом.
  if (getInputFileOption()) fs.access(getInputFileOption(), fs.constants.R_OK, err => error(err));
  // W_OK - Флаг, указывающий, что файл может быть записан вызывающим процессом.
  if (getOutputFileOption()) fs.access(getOutputFileOption(), fs.constants.W_OK, err => error(err));
}

module.exports = {
  checkRequiredArguments,
  getInputFileOption,
  getOutputFileOption,
  getActionOption,
  getShiftOption
};
