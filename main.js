const cityInput = document.querySelector(".inputText");
const btn = document.querySelector(".btn");

btn.addEventListener("click", () => {
    const  cityName = cityInput.value;
    getData(cityName)
})

function getData (name)  {
    
    const API = "1e24c1fd664a14ac1dca15d3ec0ea124";
    const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}&units=metric&lang=tr` ;

    fetch(baseURL)
    .then(res => res.json())
    .then(data => {
        // hangi verileri alacağımızı belirtiyoruz
        const {name, sys:{country}, main: {temp, feels_like, humidity}, weather: [{description}], wind:{speed}} = data;
        
    // verileri html'den js'e çekme
    const city = document.querySelector('.city');
    const temperature = document.querySelector('.temp');
    const hum = document.querySelector('.humidity');
    const wind = document.querySelector('.wind')
    const weatherDesc = document.querySelector('.weather');
    const feeling  =document.querySelector('.feeling');

        // js'e çekilen elemanları apiden alınan verilerle eşleştirme
        city.textContent = `${name}, ${country}`;
        temperature.innerText = `${temp.toFixed(0)}°`;
        hum.textContent = `Nem: %${humidity}`
        wind.innerHTML = `Rüzgar: ${speed}km/s`;
        weatherDesc.innerHTML = `<i>${description.toUpperCase()}</i>`
        feeling.textContent = `Hissedilen : ${feels_like}`
     
         // Hava durumuna göre arkaplan değiştirme
      if (description.includes("yağmur")) {
        document.body.style.backgroundImage = "url('images/rain.webp')";
      } else if (description.includes("bulutlu")) {
        document.body.style.backgroundImage = "url('images/bulutlu2.jpg')";
      } 
      else if (description.includes("kapalı")) {
        document.body.style.backgroundImage = "url('images/kapalı.jpeg')";
      } 
      else if (description.includes("kar")) {
        document.body.style.backgroundImage = "url('images/snow2.jpg')";
      } 
      else if (description.includes("açık")) {
        document.body.style.backgroundImage = "url('images/sun.jpg')";
      } 
      else if (description.includes("sis")) {
        document.body.style.backgroundImage = "url('images/sisli.jpeg')";
      }
      else {
        document.body.style.backgroundImage = "url('images/sky.jpg')";
      }
})
    .catch((error) => console.log(error));
    
      // inputun için boşaltır
      cityInput.value = "";
      // inputa odaklanır
      cityInput.focus();
}
