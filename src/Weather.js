import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './Weather.css';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  let chartInstance = null; // Chart instance reference

  const apiKey = '345da2663b27f108352b11ec1ea21eb4';

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(null);
      setError('Location not found. Please enter another location.');
    }
  };

  // render or update the chart
  const renderChart = () => {
    if (weatherData) {
      const ctx = document.getElementById('weather-chart');
      destroyChart(); 
      chartInstance = new Chart(ctx, {
        type: 'line',
        data: getChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              labels: getChartData().labels,
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
    }
  };

  //  chart data
  const getChartData = () => {
    if (!weatherData) return null;

    const labels = weatherData.list.map((item) => item.dt_txt);
    const temperatureData = weatherData.list.map((item) => item.main.temp);
    const rainfallData = weatherData.list.map((item) => (item.rain ? item.rain['3h'] || 0 : 0)); 

    return {
      labels,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatureData,
          fill: false,
          borderColor: '#DD0808',
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
        {
          label: 'Rainfall (mm)',
          data: rainfallData,
          fill: false,
          borderColor: '#3CB9E7',
          borderWidth: 2,
          pointRadius: 2,
          pointHoverRadius: 4,
        },
      ],
    };
  };

  useEffect(() => {
    renderChart(); 

    return () => {
      destroyChart();
    };
  }, [weatherData]);

  useEffect(() => {
    renderChart(); 

    return () => {
      destroyChart();
    };
  }, []); 

  return (
    <div className="container">
      <h2>Weather App Practical Interview</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <div className="error-modal">{error}</div>}

      {weatherData && (
        <div>
          <div className="weather-info">
            <h3>{weatherData.city.name}, {weatherData.city.country}</h3>
            <p>Current Temperature: {weatherData.list[0].main.temp}°C</p>
            <p>Humidity: {weatherData.list[0].main.humidity}%</p>
            <p>Wind Speed: {weatherData.list[0].wind.speed} m/s</p>
          </div>

          <div className="chart-container">
            <canvas id="weather-chart"></canvas>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
