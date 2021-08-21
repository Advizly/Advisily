/*
Wrapper for promises to avoid try catch blocks.

input: Promise object
output: return array [data,err]. data is null on reject, while err is null on resolve.
*/

module.exports = function promiseHandler(promise) {
  return promise.then((data) => [data, null]).catch((err) => [null, err]);
};
