const fs = require('fs');
const {EncryptOrDecrypt} = require("./encode_decode");
const {pipeline} = require('stream');
const stream = require('stream');
const {getActionOption, getShiftOption} = require('./arguments.js');

const readAndWriteText = (inputFile, outputFile) => {
  // Transform - класс для работы со стримами
  let transform = new stream.Transform({objectMode: true});
  let r;
  let w;
  // _transform - метод, работа с записью, затем чтение результата
  // chunk <Буфер> | <Строка> Порция данных, которая преобразуется. Всегда будет буфером, если только опция decodeStrings не имеет значение false.
  // encoding <Строка> Если порция данных является строкой, то это кодировка. Если порция данных – буфер, то тогда есть специальное значение ‘buffer’, а это значение можно игнорировать.
  // callback <Функция> Функция обратного вызова (опционально с аргументом ошибки и данными), которая вызывается после обработки chunk.
  transform._transform = (chunk, encoding, callback) => {
    // callback выполныется после chunk
    try {
      callback(null, EncryptOrDecrypt(chunk.toString(), getShiftOption(), getActionOption()));
    } catch (e) {
      callback(e);
    }
  }
  inputFile ? r = fs.createReadStream(inputFile) : r = process.stdin;
  outputFile ? w = fs.createWriteStream(outputFile, {flags: 'a'}) : w = process.stdout;
  pipeline(r, transform, w, error => {
    if (error) {
      process.stderr.write('\n' + error.message + '\n');
      // завершаем с кодом 1
      process.exit(1);
    }
  });
}

module.exports = {readAndWriteText};
