const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const inputField = document.querySelector("input");
const inputTxt = document.querySelector(".input-txt");

let api;

inputField.addEventListener("keyup", (e) => {
   // if user presser Enter btn and input value is not empty
   if (e.key == "Enter" && inputField.value != "") {
      requestApi(inputField.value);
   }
});

function requestApi(city) {
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f53b0896eeb65abea39156ed39677942`;
   fetch(api)
      .then((response) => response.json())
      .then((result) => weatherDetails(result));
}

function fetchData() {
   fetch(api)
      .then((response) => response.json())
      .then((result) => weatherDetails(result));
}

function weatherDetails(info) {
   if (info.cod == "404") {
      inputTxt.classList.add("error");
      inputTxt.innerText = `${inputField.value} isn't a valid city name`;
   }
   console.log(info);
}
