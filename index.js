const weatherTab = document.querySelector(".weather-tab");
const searchTab = document.querySelector(".search-tab");
const weatherContainer = document.querySelector(".weather-container");
const allowLocation = document.querySelector(".allow-location");
const searchWeather = document.querySelector(".search-weather");
const loading = document.querySelector(".loading-containr");
const weatherCard = document.querySelector(".weather-card");
// const description = document.querySelector(".description");

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
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
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
    const cityName = document.querySelector("#city");
    const description = document.querySelector(".description");
    const countryIcon = document.querySelector("#icon");
    const weatherIcon = document.querySelector("#weather-icon");
    const weatherTemp = document.querySelector("#temp");
    const windSpeed = document.querySelector("#windSpeed");
    const humidity = document.querySelector("#humidity");
    const clouds = document.querySelector("#clouds");


    //    fetch data from api 
    cityName.innerText = weatherdata?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherdata?.sys?.country.toLowerCase()}.png`;
    description.innerText = weatherdata?.weather?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherdata?.weather?.[0]?.icon}.png`;
    weatherTemp.innerText = `${weatherdata?.main?.temp} °C`;
    windSpeed.innerText = `${weatherdata?.wind?.speed} m/s`;
    humidity.innerText = `${weatherdata?.main?.humidity}%`;
    clouds.innerText = `${weatherdata?.clouds?.all}%`;
    console.log(windSpeed);
}

function accessLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else {
        alert("------Allow Location------")
    }
}
function showPosition(position) {
    const user = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }
    sessionStorage.setItem("user-coordinates", JSON.stringify(user));
    fetchWeatherInfo(user);
}
const allowBtn = document.querySelector(".allow-btn");
allowBtn.addEventListener('click', accessLocation);


const inputData = document.querySelector("#inputCity");

searchWeather.addEventListener('submit', (e) => {
    e.preventDefault();
    let cityName = inputData.value;

    if (cityName === "")
        return;
    else
        searchWeatherInfo(cityName);
})

async function searchWeatherInfo(city) {
    loading.classList.add("display");
    weatherCard.classList.remove("display");
    allowLocation.classList.remove("display");


    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();
        loading.classList.remove("display");
        weatherCard.classList.add("display");
        renderData(data);
    console.log(data);

    }
    catch (err) {

    }
}

















































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