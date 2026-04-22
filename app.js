const locations = [
  { name: "Pontio", temperature: 18, humidity: 70, aqi: 42 },
  { name: "Bangor Library", temperature: 20, humidity: 60, aqi: 35 },
  { name: "Main Arts Building", temperature: 16, humidity: 75, aqi: 50 }
];

let currentIndex = 0;

const maxValues = {
  temperature: 40,
  humidity: 100,
  aqi: 100
};

function updateScene() {
  const data = locations[currentIndex];

  document.getElementById("locationLabel").textContent =
    `Current Location: ${data.name}`;

  document.getElementById("titleText").setAttribute(
    "value",
    `${data.name} Environmental Data`
  );

  const tempHeight = (data.temperature / maxValues.temperature) * 2;
  const humidHeight = (data.humidity / maxValues.humidity) * 2;
  const aqiHeight = (data.aqi / maxValues.aqi) * 2;

  const tempBar = document.getElementById("tempBar");
  const humidBar = document.getElementById("humidBar");
  const aqiBar = document.getElementById("aqiBar");

  tempBar.setAttribute("height", tempHeight);
  tempBar.setAttribute("position", `-0.8 ${tempHeight / 2} 0`);
  tempBar.setAttribute("color", data.temperature > 25 ? "red" : "orange");

  humidBar.setAttribute("height", humidHeight);
  humidBar.setAttribute("position", `0 ${humidHeight / 2} 0`);
  humidBar.setAttribute("color", data.humidity > 65 ? "blue" : "lightblue");

  aqiBar.setAttribute("height", aqiHeight);
  aqiBar.setAttribute("position", `0.8 ${aqiHeight / 2} 0`);
  aqiBar.setAttribute("color", data.aqi > 50 ? "red" : "green");

  document.getElementById("tempLabel").setAttribute(
    "value",
    `Temp\n${data.temperature}°C`
  );
  document.getElementById("humidLabel").setAttribute(
    "value",
    `Humidity\n${data.humidity}%`
  );
  document.getElementById("aqiLabel").setAttribute(
    "value",
    `AQI\n${data.aqi}`
  );

  document.getElementById("infoText").setAttribute(
    "value",
    `Environmental conditions for ${data.name}`
  );
}

function bindBarInteraction(id, message) {
  const el = document.getElementById(id);

  const handler = () => {
    document.getElementById("infoText").setAttribute("value", message);
    console.log(`${id} clicked`);
  };

  el.addEventListener("click", handler);
  el.addEventListener("mousedown", handler);
  el.addEventListener("touchstart", handler);
}

function addInteractions() {
  bindBarInteraction(
    "tempBar",
    "Temperature shows the thermal condition of this location."
  );
  bindBarInteraction(
    "humidBar",
    "Humidity shows the amount of moisture in the air."
  );
  bindBarInteraction(
    "aqiBar",
    "AQI indicates the relative air quality level."
  );
}

document.getElementById("switchLocation").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % locations.length;
  updateScene();
});

updateScene();
addInteractions();
