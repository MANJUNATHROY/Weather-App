let weather = {
	"apiKey": "e06c8dfeef23f2e4168f246b837fe404",
	fetchWeather: function (city) {
		fetch("https://api.openweathermap.org/data/2.5/weather?q=" +
			city +
			"&units=metric&appid=" + this.apiKey)
			.then((response) => response.json())
			.then((data) => this.displayWeather(data));
	},
	displayWeather: function (data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, humidity } = data.main;
		const { speed } = data.wind;
		console.log(name, icon, description, temp, humidity);
		document.querySelector(".city").innerHTML = "Weather in " + name;
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + "01n@2x.png"
		document.querySelector(".desc").innerHTML = description;
		document.querySelector(".temp").innerHTML = temp + "°C";
		document.querySelector(".humidity").innerHTML = "Humidity : " + humidity + "%";
		document.querySelector(".wind").innerHTML = "Wind speed : " + speed + "km/hr";
		document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')"
		document.querySelector(".weather").classList.remove("loading")

	},
	search: function () {
		this.fetchWeather(document.querySelector(".searchbar").value);
	}
};

document.querySelector(".search button").addEventListener("click", function () {
	weather.search();
})

document.querySelector(".searchbar").addEventListener("keyup", function (event) {
	if (event.key == "Enter") {
		weather.search();
	}
})

weather.fetchWeather("Denver")
