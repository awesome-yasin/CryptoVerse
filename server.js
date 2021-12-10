const path = require("path");
var express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css"));
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/images", express.static(__dirname + "/public/images"));

app.set("view engine", "ejs");
app.use("/events", require("./routes/event"));
app.set("views", "./views");

async function getPriceFeed() {
  try {
    const siteUrl = "https://www.coingecko.com/en/coins/trending";

    const coinArr = [];
    const loserArr = [];
    const { data } = await axios({
      method: "GET",
      url: siteUrl,
    });

    const $ = cheerio.load(data);
    const elemSelector = "#gecko-table-all > tbody > tr";
    const losers = "#gecko-table-all > tbody > tr";
    const keys = ["name", "volume", "price", "change"];

    $(elemSelector).each((parentsIdx, parentsElem) => {
      let keyIdx = 0;
      const coinObj = {};

      if (parentsIdx <= 29) {
        $(parentsElem)
          .children()
          .each((childTdx, childElem) => {
            let tdVal = $(childElem).text();

            if (keyIdx === 0 || keyIdx === 1) {
              tdVal = $("span:first-child", $(childElem).html()).text();
            }

            if (keyIdx === 2 || keyIdx === 3) {
              tdVal = $("span:first-child", $(childElem).html()).text();
            }

            if (tdVal) {
              coinObj[keys[keyIdx]] = tdVal;

              keyIdx++;
            }
          });
        coinArr.push(coinObj);
      }
    });

    $(losers).each((parentsIdx, parentsElem) => {
      let keyIdx = 0;
      const coinObj = {};

      if (parentsIdx > 29) {
        $(parentsElem)
          .children()
          .each((childTdx, childElem) => {
            let tdVal = $(childElem).text();

            if (keyIdx === 0 || keyIdx === 1) {
              tdVal = $("span:first-child", $(childElem).html()).text();
            }

            if (keyIdx === 2 || keyIdx === 3) {
              tdVal = $("span:first-child", $(childElem).html()).text();
            }

            if (tdVal) {
              coinObj[keys[keyIdx]] = tdVal;

              keyIdx++;
            }
          });
        loserArr.push(coinObj);
      }
    });

    fs.writeFile(
      "public/js/gainers.json",
      JSON.stringify(coinArr, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file 1");
      }
    );

    fs.writeFile(
      "public/js/losers.json",
      JSON.stringify(loserArr, null, 2),
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log("Successfully written data to file 2");
      }
    );
  } catch (err) {
    console.error(err);
  }
}

getPriceFeed();

app.use(express.static(path.join(__dirname, "/client", "build")));

app.route("/portfolio").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, function() {
  console.log('Our app is running on http://localhost:' + port);
});
