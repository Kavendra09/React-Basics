import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState("");

  const API_KEY = "0a59b3188946fdb127e77e6c38f6d0d4";
  const weatherDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setData(response.data.main.temp);
    } catch (error) {
      setData("")
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Weather App</h1>
      </div>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <button onClick={weatherDetails}>submit</button>
      </div>
      <div className="Result">
        Temp is
        {data ? ` ${Math.round(data - 273)} C` : " Enter Correct City"}
      </div>
    </div>
  );
}

export default App;
