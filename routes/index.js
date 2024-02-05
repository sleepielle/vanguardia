var express = require("express");
const axios = require("axios");
var router = express.Router();
const app = express();

async function fetchWeatherData() {
  try {
    const response = await axios.get("");
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // Re-throw to handle it appropriately in controller logic
  }
}

app.get("/weather", async (req, res) => {
  try {
    const weatherData = await fetchWeatherData();
    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching weather data");
  }
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Nodede" });
});

module.exports = router;
