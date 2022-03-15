let weather = {
    apiKey: "27d3aa8fe6b92a1143c7d4b32e9f061d",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            city +
            "&units=metric&appid=" +
            this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {

        console.log(data)

        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        console.log("description: " + description)

        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')";

        let currentTime = new Date().toLocaleString();
        console.log("vao day: " + currentTime);
        const now     = new Date();
        console.log("hour: " + now.getHours());
        let hour = now.getHours();
        // console.log("day: " + now.getDate());
        // console.log("month: " + (now.getMonth() + 1));
        // console.log("year: " + now.getFullYear());
        // xử lí nếu lấy ra giờ hiện tại để chào buổi cho phù hợp

        console.log(15 < 12);
        console.log(hour > 0 && hour < 12);

        if (hour > 0 && hour < 12) {
            document.getElementById('icon__id').style.display='block';
            let goodMorning = `Chào buổi sáng, hôm nay là ngày ${(now.getDate())} tháng ${(now.getMonth() + 1)} năm ${(now.getFullYear())}`;
            document.querySelector(".time__decs").innerText = goodMorning;
        } else if (hour < 18) {
            document.getElementById('icon__id').style.display='block';
            let goodAfternoon = `Chào buổi chiều, hôm nay là ngày ${(now.getDate())} tháng ${(now.getMonth() + 1)} năm ${(now.getFullYear())}`;
            document.querySelector(".time__decs").innerText = goodAfternoon;
        } else {
            document.getElementById('icon2__id').style.display='block';
            let goodEvening = `Chào buổi tối, hôm nay là ngày ${(now.getDate())} tháng ${(now.getMonth() + 1)} năm ${(now.getFullYear())}`;
            document.querySelector(".time__decs").innerText = goodEvening;
        }

        // xử lí nhiệt độ để có nhận xét phù hợp
        if (temp < 20) {
            let reminder = `Nhiệt độ tại ${name} đang là ${temp} độ C. Thời tiết se se lạnh, bạn nhớ giữ ấm cơ thể nha !`;
            document.querySelector(".temperature__decs").innerText = reminder;
            document.getElementById('img2__id').style.display='block';
            document.getElementById('img3__id').style.display='none';
            document.getElementById('img__id').style.display='none';
        } else if (temp <= 28) {
            let reminder = `Nhiệt độ tại ${name} đang là ${temp} độ C. Thời tiết khá lý tưởng, hãy tận hưởng nó nha !`;
            document.querySelector(".temperature__decs").innerText = reminder;
            document.getElementById('img__id').style.display='block';
            document.getElementById('img2__id').style.display='none';
            document.getElementById('img3__id').style.display='none';
        } else {
            let reminder = `Nhiệt độ tại ${name} đang là ${temp} độ C. Thời tiết khá nóng bức, hãy chuẩn bị cho mình những bộ đồ hè nha !`;
            document.querySelector(".temperature__decs").innerText = reminder;
            document.getElementById('img3__id').style.display='block';
            document.getElementById('img2__id').style.display='none';
            document.getElementById('img__id').style.display='none';
        }

    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search();
        }
    });

weather.fetchWeather("Hanoi");