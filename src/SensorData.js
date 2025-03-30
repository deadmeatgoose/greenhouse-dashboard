import React, { useState, useEffect } from "react";

const SensorData = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 25,
    humidity: 60,
    soilMoisture: 40,
    lightIntensity: 12000,
    pH: 6.5,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData({
        temperature: (20 + Math.random() * 10).toFixed(2),
        humidity: (50 + Math.random() * 20).toFixed(2),
        soilMoisture: (30 + Math.random() * 15).toFixed(2),
        lightIntensity: (10000 + Math.random() * 5000).toFixed(2),
        pH: (6 + Math.random() * 1.5).toFixed(2),
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sensor-container">
      <div className="sensor-card">
        <h3>Temperature</h3>
        <p>{sensorData.temperature} °C</p>
      </div>
      <div className="sensor-card">
        <h3>Humidity</h3>
        <p>{sensorData.humidity} %</p>
      </div>
      <div className="sensor-card">
        <h3>Soil Moisture</h3>
        <p>{sensorData.soilMoisture} %</p>
      </div>
      <div className="sensor-card">
        <h3>Light Intensity</h3>
        <p>{sensorData.lightIntensity} lux</p>
      </div>
      <div className="sensor-card">
        <h3>pH Level</h3>
        <p>{sensorData.pH}</p>
      </div>
    </div>
  );
};

export default SensorData;
