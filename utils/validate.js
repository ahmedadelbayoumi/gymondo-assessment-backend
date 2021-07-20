/**
 * Validaion Function.
 * 
 * @param {boolean} condition 
 * @param {string} errMsg 
 * @param {number} statusCode 
 * @throws An error indicating a validation error.
 * 
 * This function thows an error when the passed condition is not True,
 * The error is catched in the main routes file, and sends an appropriate
 * response.
 */

const validate = (condition, errMsg, statusCode = 400) => {
  if (!condition) {
    const err = new Error(errMsg);
    err.statusCode = statusCode;
    throw err;
  }
}

export default validate;