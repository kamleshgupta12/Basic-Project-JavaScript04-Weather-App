const weatherTab = document.querySelector(".weather-tab");
const searchTab = document.querySelector(".search-tab");
const weatherContainer = document.querySelector(".weather-container");
const allowLocation = document.querySelector(".allow-location");
const searchWeather = document.querySelector(".search-weather");
const loading = document.querySelector(".loading-containr");
const weatherCard = document.querySelector(".weather-card");

let oldTab = weatherTab;
const apiKey = "c5655a8f766c7441d775e41339626348";
oldTab.classList.add("current-tab");

// search aur weather tab ko switch kar raha 
function switchTab(newTab) {
    if (newTab != oldTab) {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if (!searchWeather.classList.contains("display")) {
            weatherCard.classList.remove("display")
            allowLocation.classList.remove("display")
            searchWeather.classList.add("display")
        }
        else {
            // weather tab ko display karni hai 
            searchTab.classList.remove("display")
            weatherCard.classList.remove("display")
            // weather tab me hu 
            createSessionStorage();
        }
    }
}

weatherTab.addEventListener("click", () => {
    switchTab(weatherTab);
});
searchTab.addEventListener("click", () => {
    switchTab(searchTab);
});

// use for checking coordinates are available or not 
function createSessionStorage() {
    const localCoordinates = essionStorage.getItem("user-coordinates");
    if (!localCoordinates) {
        // agar localCoordinates nhi mile to 
        allowLocation.classList.add("display")
    }
    else {
        const coordinates = JSON.parse(localCoordinates);
        fetchWeatherInfo(coordinates);
    }
}

async function fetchWeatherInfo(coordinates) {
    const { lat, lon } = coordinates;
    // allowLocation ko hide kar denge coordinates milane par 
    allowLocation.classList.remove("display");
    loading.classList.add("display");

    // api call 
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        loading.classList.remove("display");
        weatherCard.classList.add("display");
        renderData(data);
    }
    catch (err) {
        loading.classList.remove("display");

    }
}

function renderData(weatherdata) {
    const cityName = document.getElementById("city");
    const des = document.getElementById("diss");
    const countryIcon = document.getElementById("icon");
    const weather = document.getElementById("weather-icon");
    const weatherTemp = document.getElementById("temp");
    const windSpeed = document.getElementById("windSpeed");
    const humidity = document.getElementById("humidity");
    const clouds = document.getElementById("clouds");


    //    fetch data from api 
    cityName.innerHTML = weatherdata?.name;
    des.innerHTML = weatherdata?.weather?.[0]?.description;
    weatherTemp.innerHTML = weatherdata?.main?.temp;
    windSpeed.innerHTML = weatherdata?.wind?.speed;
    humidity.innerHTML = weatherdata?.main?.humidity;
    clouds.innerHTML = weatherdata?.clouds?.all;
    weather.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;

}

function accessLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        alert("------Allow Location------")
    }
}
function showPosition(){
    const user ={
        lat:position.coords.latitude,
        lon:position.coords.lonitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(user));
    fetchWeatherInfo(user);
}
const allowBtn = document.querySelector(".allow-btn");
allowBtn.addEventListener('click', accessLocation);




















































// const API = "";
// const city = "meerut";

// async function weatherApi() {
//     const fetchApi = await fetch(``);
//     const convertedData = await fetchApi.json();
//     console.log("weathr Is", convertedData);

//     const newPara = document.createElement('p');
//     newPara.innerHTML = convertedData.main.temp;
//     console.log(newPara);

//     document.body.appendChild(newPara);
// }
// // weatherApi();





// // randomApi();
// async function randomApi() {
//     try {
//         let lat = 28.9833;
//         let lon = 77.7;
//         const newApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`);
//         const c = newApi.json();
//         console.log("add", newApi)
//     }
// catch (err) {
//     console.log("Get Err", err)
// }
// }



// async function assi(){
//     const a = await fetch('https://jsonplaceholder.typicode.com/pots');
//     const b = await a.json();
//  console.log("data is", b);


// //  const demo = b.id;

//  let newPara = document.createElement('p');
//  newPara.innerHTML =b.id;
//  document.body.appendChild(newPara);
//  console.log(newPara);
// }
// assi();