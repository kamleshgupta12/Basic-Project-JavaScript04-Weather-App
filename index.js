const API = "c5655a8f766c7441d775e41339626348";
const city = "meerut";

async function weatherApi() {
    const fetchApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`);
    const convertedData = await fetchApi.json();
    console.log("weathr Is", convertedData);

    const newPara = document.createElement('p');
    newPara.innerHTML = convertedData.main.temp;
    console.log(newPara);

    document.body.appendChild(newPara);
}
// weatherApi();





// randomApi();
async function randomApi() {
    try {
        let lat = 28.9833;
        let lon = 77.7;
        const newApi = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`);
        const c = newApi.json();
        console.log("add", newApi)
    }
catch (err) {
    console.log("Get Err", err)
}
}



async function assi(){
    const a = await fetch('https://jsonplaceholder.typicode.com/pots');
    const b = await a.json();
 console.log("data is", b);


//  const demo = b.id;

 let newPara = document.createElement('p');
 newPara.innerHTML =b.id;
 document.body.appendChild(newPara);
 console.log(newPara);
} 
assi();