const { min } = require("lodash");
const { query, getConnection } = require("./helpers/mysql");

const obj = [2, 4, 6, 1, 3, 5, 2];
const copyObj = [...obj];
const copyObj2 = obj;
function myFunc(obj) {
  obj.forEach((item, indx, arr) => (arr[indx] = null));
}

myFunc(copyObj);
async function func(callback) {}

async function func2() {
  return await func(() => {
    throw "Error";
  });
}

async function main() {
  const [data, err] = await query("SELECT * from majors", [], false);

  console.log(data);
  // const connection = getConnection();
  // connection.beginTransaction(async () => {
  //   [data, err] = await query(
  //     "INSERT INTO majors(majorId,majorTitle,majorPrefix) VALUES(?,?,?) ",
  //     [6, "MyMajor", "MMM"]
  //   );
  //   console.log(data);
  //   if (err)
  //     return connection.rollback(() => {
  //       throw err;
  //     });
  //   connection.commit((error) => {
  //     if (error)
  //       return connection.rollback(() => {
  //         throw error;
  //       });
  //     console.log("Success");
  //     connection.end();
  //   });
  // });
}

const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async 1");
  }, [2000]);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async 2");
  }, [2000]);
});

const p3 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async 3");
  }, [2000]);
});

function promisesAll() {
  const promises = [];

  promises.push(p1);
}


 "hostUrl": "http://10.7.60.113:5000",
  "frontendUrl": "http://10.7.60.113:9000",