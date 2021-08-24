const axios = require("axios");
const cheerio = require("cheerio");

axios
  .get("https://catalog.aucegypt.edu/preview_program.php?catoid=36&poid=6107")
  .then((res) => {
    const $ = cheerio.load(res.data);
    $(".acalog-course span").each((index, element) =>
      console.log($(element).find("a").text().trim())
    );
  })
  .catch((err) => console.log(err));
