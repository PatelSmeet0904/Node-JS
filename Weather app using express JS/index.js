const express = require("express");
const hbs = require("hbs");
const path = require("path");

const port = process.env.PORT || 3000;
const app = express();

const weatherData = require("./weatherData");

const publicStaticDirPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "views");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicStaticDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
  });
});

//localhost:3000/weather?address=Ahmedabad
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must enter address in search text box",
    });
  }

  weatherData(
    address,
    (
      error,
      { temperature, description, cityName, humidity, windSpeed } = {}
    ) => {
      if (error) {
        return res.send({
          error,
        });
      }
      // console.log(temperature, description, cityName);
      res.send({
        temperature,
        description,
        cityName,
        humidity,
        windSpeed
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up and running on port: ", port);
});
