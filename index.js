const cors = require("cors");
const express = require("express");


const app = express();


app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static("public"));

app.get(
  "/",
  (request, response) => {
    response.sendFile(__dirname + "/views/index.html");
  }
);

function isPositiveIntegerOrZero(string) {
  return /^\d+$/.test(string);
}

app.get(
  "/api/:date?",
  (request, response) => {
    if (request.params.date) {
      const date = new Date(request.params.date);
      if (isNaN(date.getTime())) {
        const unixTime = Number(request.params.date)
        if (isPositiveIntegerOrZero(unixTime)) {
          response.json({
            unix: unixTime,
            utc: new Date(unixTime).toUTCString()
          });
        } else {
          response.json({
            error: "Invalid Date"
          });
        }
      } else {
        response.json({
          unix: Math.floor(date.getTime()),
          utc: date.toUTCString()
        });
      }
    } else {
      response.json({
        unix: Math.floor(Date.now()),
        utc: new Date().toUTCString()
      });
    }
  }
);

var listener = app.listen(
  process.env.PORT || 3000,
  () => {
    console.log("Your app is listening on port " + listener.address().port);
  }
);