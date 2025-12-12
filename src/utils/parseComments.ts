// Parse comments utility function
function parseComments(code: string) {
  // Define states
  const terminator = null; // to hold the string terminator
  let escape = false; // last char was an escape
  let isInRegExp = false;
  let isInString = false;
  let isInComment = false;

  // Define containers
  const input = code.split(''); // code input
  const output: string[] = []; // code output
  let separator = ''; // separator

  // Check for literals and comments
  for (let i = 0; i < input.length; i++) {
    if (isInString) {
      // handle string literal case
      if (input[i] === terminator && escape === false) {
        isInString = false;
        output.push(input[i]);
      } else if (input[i] === '\\') {
        // escape
        escape = true;
      } else {
        escape = false;
        output.push(input[i]);
      }
    } else if (isInRegExp) {
      // regular expression case
      if (input[i] === '/' && escape === false) {
        isInRegExp = false;
        output.push(input[i]);
      } else if (input[i] === '\\') {
        escape = true;
      } else {
        escape = false;
        output.push(input[i]);
      }
    } else if (isInComment) {
      // comment case
      if (input[i] === '*' && input[i + 1] === '/') {
        isInComment = false;
        i++;
        // Note - not pushing comments to output
      }
    } else {
      // not in a literal
      if (input[i] === '/' && input[i + 1] === '/') {
        // single line comment
        while (input[i] !== '\n' && input[i] !== undefined) {
          //end or new line
          i++;
        }
      } else if (input[i] === '/' && input[i + 1] === '*') {
        // start comment
        isInComment = true;
        output.push(' '); // add a space per spec
        i++; // don't catch /*/

        /*
         * This part caused an issue with parsing out comments
         * in the script, so it was disabled.
         */
        //} else if(input[i] === "/") { // start regexp literal
        //      isInRegExp = true;
        //      output.push(input[i]);
      } else if (input[i] === "'" || input[i] === '"') {
        // string literal
        isInString = true;
        output.push(input[i]);
        separator = input[i];

        console.log(separator);
      } else {
        // plain code
        output.push(input[i]);
      }
    }
  }

  // Return the code output
  return output.join('');
}

// Export
export default parseComments;
