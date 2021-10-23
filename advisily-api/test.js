const { query } = require("./helpers/mysql");

const obj = [2, 4, 6, 1, 3, 5, 2];
const copyObj = [...obj];
const copyObj2 = obj;
function myFunc(obj) {
  obj.forEach((item, indx, arr) => (arr[indx] = null));
}

myFunc(copyObj);
