const wrapper = document.querySelector(".wrapper");
const inputPart = document.querySelector(".input-part");
const inputField = document.querySelector("input");
const infoTxt = document.querySelector(".info-txt");
const inputBtn = document.querySelector(".input-btn");
const weatherPart = document.querySelector(".weather-part");

let api;

inputField.addEventListener("keyup", (e) => {
   // if user presser Enter btn and input value is not empty
   if (e.key == "Enter" && inputField.value != "") {
      requestApi(inputField.value);
   }
});

inputBtn.addEventListener("click", () => {
   if (inputField.value != "") {
      requestApi(inputField.value);
   }
});

function requestApi(city) {
   api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f53b0896eeb65abea39156ed39677942`;
   //infoTxt.innerText = "Getting weather details..."
   //infoTxt.classList.add("...");
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
      // If City Typed Doesn't Exist
      infoTxt.classList.remove("none");
      infoTxt.classList.add("error");
      infoTxt.innerText = `${inputField.value} isn't a valid city name`;
   } else {
      //Getting Properties Value From Info Object
      const city = info.name;
      const country = info.sys.country;
      const { description, id } = info.weather[0];
      const { feels_like, humidity, temp } = info.main;

      //Passing Values To HTML
      weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
      weatherPart.querySelector(".weather").innerText = description;
      weatherPart.querySelector(
         ".location span"
      ).innerText = `${city}, ${country}`;
      weatherPart.querySelector(".feels .numb-2").innerText =
         Math.floor(feels_like);
      weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;

      // Else Hide Input Part And Activate Weather Part
      inputPart.classList.add("none");
      weatherPart.classList.add("active");
      console.log(info);
   }
}
