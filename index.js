const PORT = 8000;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://twitter.com/home";

axios(url)
  .then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const tweets = [];
    $(".css-901oao css-16my406 r-poiln3 r-bcqeeo r-qvutc0", html).each(
      function () {
        const title = $(this).text();
        const text = $(this).find("span").attr("span");
        tweets.push({
          title,
          text,
        });
      }
    );
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
