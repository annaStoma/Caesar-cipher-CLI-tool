const {readAndWriteText} = require('./modules/read_write_text.js');
const {getOutputFileOption, getInputFileOption, checkRequiredArguments} = require('./modules/arguments');

checkRequiredArguments();
readAndWriteText(getInputFileOption(), getOutputFileOption());
