import React, {useState} from 'react';
const api = {
  key: "71dff936a7f12e66ef705fea71d5c05b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('{}');

  const search = evt => {
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metrics&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result);
      
      });
        
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16)? 'app warm' : 'app')
    : 'app'
  
  }>
      <main>
        <center><h3>Get the latest Weather Forecast Details</h3></center>
        <center><div className="search-box">
          <input type="text" className="search-bar" placeholder="Enter your country here..." onChange={e => setQuery(e.target.value)} value={query} onKeyPress={search}/>
        </div> </center>
        {(typeof weather.main != "undefined") ? (
          <div>
                <div className="location-box">
                  <div className="location">{weather.name}, {weather.sys.country}</div>
                      <div className="date">{dateBuilder(new(Date))}</div>
                        <div className="weather-box">
                           <div className="temp">{Math.round(weather.main.temp)/10}°C</div>
                              <div className="weather">{weather.weather[0].main}</div>
                        </div>
              </div>
           </div>
         ):('')}
           <div className="author">Created by Tharindu Thiwanka
           </div>
      </main>
    
    </div>
    
    
  );
}

export default App;
