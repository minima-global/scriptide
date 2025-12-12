const GLOBAL_VARIABLE_DETAILS = {
  '@ADDRESS': 'View the script address (read only).', // This is read only field
  '@BLOCK': 'Set the current block number.',
  '@BLOCKMILLI': 'Set the current block time in milliseconds.',
  '@CREATED': 'Set the block this coin was created in.',
  '@COINAGE': 'Set the difference in @BLOCK and @CREATED.',
  '@COINID': 'Set the coin ID.',
  '@TOKENID': 'Set the token ID.',
  '@AMOUNT': 'Set the amount.',
  '@INPUT':
    'Set the input index of a coin used in the transaction, first input coin has an index of 0.',
  '@TOTIN': 'Set the total number of input coins.',
  '@TOTOUT': 'Set the total number of output coins.',
};

const GLOBAL_VARIABLES_OBJECT = {
  '@ADDRESS': null, // This is read only field
  '@BLOCK': '',
  '@BLOCKMILLI': '',
  '@CREATED': '',
  '@COINAGE': '',
  '@COINID': '',
  '@TOKENID': '',
  '@AMOUNT': '',
  '@INPUT': '',
  '@TOTIN': '',
  '@TOTOUT': '',
};

export { GLOBAL_VARIABLE_DETAILS, GLOBAL_VARIABLES_OBJECT };
