import axios from "axios";

const fun = () => {
  axios
    .get("https://www.google.com")
    .then((r) => console.log(r))
    .catch((err) => console.log(err));
};

fun();
