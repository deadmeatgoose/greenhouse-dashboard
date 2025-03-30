import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/Card"; // Corrected import for named exports
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./components/ui/Select";

// Planting Evaluation Component
const PlantingEvaluation = ({ onContinueToYieldPrediction }) => {
  const plantingGuidelines = {
    onions: { spacing: 10, depth: 2, fertilizer: 5 },
    carrots: { spacing: 5, depth: 1, fertilizer: 3 },
    tomatoes: { spacing: 45, depth: 5, fertilizer: 10 },
    "green peppers": { spacing: 40, depth: 4, fertilizer: 8 },
    "bell peppers": { spacing: 35, depth: 4, fertilizer: 8 },
    garlic: { spacing: 10, depth: 3, fertilizer: 4 },
  };

  const idealConditions = {
    temperature: [18, 27],
    humidity: [50, 70],
    soilMoisture: [35, 55],
    pHLevel: [6.0, 7.0],
  };

  const [crop, setCrop] = useState("onions");
  const [conditions, setConditions] = useState({
    temperature: 22,
    humidity: 60,
    soilMoisture: 45,
    pHLevel: 6.5,
  });
  const [warnings, setWarnings] = useState([]);
  const [autoAdjusted, setAutoAdjusted] = useState(false);
  const [desiredSize, setDesiredSize] = useState(10); // Default desired size
  const [showYieldPredictionPrompt, setShowYieldPredictionPrompt] = useState(false);

  useEffect(() => {
    if (!autoAdjusted) {
      const intervalId = setInterval(() => {
        simulateSensorReadings();
      }, 3000); // Update every 3 seconds

      // Cleanup the interval when component unmounts or auto-adjusted is true
      return () => clearInterval(intervalId);
    }
  }, [autoAdjusted]);

  const simulateSensorReadings = () => {
    setConditions((prevConditions) => ({
      temperature: Math.floor(Math.random() * (30 - 15 + 1) + 15),
      humidity: Math.floor(Math.random() * (80 - 40 + 1) + 40),
      soilMoisture: Math.floor(Math.random() * (60 - 30 + 1) + 30),
      pHLevel: (Math.random() * (7.5 - 5.5) + 5.5).toFixed(1),
    }));
  };

  const evaluateConditions = () => {
    let newWarnings = [];
    Object.keys(idealConditions).forEach((key) => {
      if (conditions[key] < idealConditions[key][0] || conditions[key] > idealConditions[key][1]) {
        newWarnings.push(`${key} is out of range: ${conditions[key]}`);
      }
    });
    setWarnings(newWarnings);
  };

  const adjustConditions = () => {
    setConditions({
      temperature: 22,
      humidity: 60,
      soilMoisture: 45,
      pHLevel: 6.5,
    });
    setWarnings([]);
    setAutoAdjusted(true);
  };

  // Continue to Yield Prediction
  const handleContinueToYieldPrediction = () => {
    // Proceed to yield prediction after conditions are evaluated
    onContinueToYieldPrediction();
  };

  return (
    <Card className="p-6 bg-white shadow-md rounded-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">🌱 Planting Evaluation</h2>
        <div className="mb-4">
          <label className="font-semibold">Select Crop:</label>
          <Select value={crop} onValueChange={(value) => setCrop(value)}>
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Choose a crop" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(plantingGuidelines).map((crop) => (
                <SelectItem key={crop} value={crop}>
                  {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Enter Desired Size (in cm):</label>
          <Input
            type="number"
            value={desiredSize}
            onChange={(e) => setDesiredSize(parseFloat(e.target.value))}
            placeholder="Enter desired crop size"
          />
        </div>
        <Button onClick={evaluateConditions} className="w-full bg-blue-500 text-white">
          Evaluate Conditions
        </Button>
        {warnings.length > 0 && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
            <h3 className="font-bold">⚠️ Warnings:</h3>
            <ul>
              {warnings.map((warn, index) => (
                <li key={index}>- {warn}</li>
              ))}
            </ul>
            <Button onClick={adjustConditions} className="mt-2 bg-green-500 text-white w-full">
              Auto-Adjust Conditions
            </Button>
          </div>
        )}
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-bold">📌 Planting Guidelines</h3>
          <p>📏 Seed Spacing: {plantingGuidelines[crop].spacing} cm apart</p>
          <p>⛏️ Planting Depth: {plantingGuidelines[crop].depth} cm deep</p>
          <p>💧 Fertilizer: {plantingGuidelines[crop].fertilizer}g per plant</p>
        </div>
        <div className="mt-6 p-4 bg-gray-50 rounded">
          <h3 className="font-bold">📊 Sensor Readings</h3>
          <p>🌡️ Temperature: {conditions.temperature}°C</p>
          <p>💧 Humidity: {conditions.humidity}%</p>
          <p>🌱 Soil Moisture: {conditions.soilMoisture}%</p>
          <p>🧪 pH Level: {conditions.pHLevel}</p>
        </div>
        <Button
          onClick={handleContinueToYieldPrediction}
          className="mt-4 bg-purple-500 text-white w-full"
        >
          Continue to Yield Prediction
        </Button>
      </CardContent>
    </Card>
  );
};

// Yield Prediction Code (Python-like Backend Simulation for Yield Prediction)
const yieldPrediction = async (crop, conditions, desiredSize, callback) => {
  const data = {
    Crop_Type: crop,
    "Temperature_C": conditions.temperature,
    "Humidity_%": conditions.humidity,
    "Soil_Moisture_%": conditions.soilMoisture,
    "pH_Level": conditions.pHLevel,
    "Light_Intensity_lux": 12000, // Assume a fixed light intensity for now
  };

  // Simulating model prediction call
  const predictedYield = Math.random() * 10; // Random yield value for now
  const predictedDays = Math.floor(Math.random() * 100) + 50; // Random days to harvest

  callback(predictedYield, predictedDays);
};

// Yield Prediction Component (After Planting Evaluation)
const YieldPrediction = ({ predictedYield, predictedDays }) => {
  return (
    <Card className="p-6 bg-white shadow-md rounded-lg">
      <CardContent>
        <h2 className="text-xl font-bold mb-4">📊 Yield Prediction</h2>
        <p>Predicted Yield: {predictedYield.toFixed(2)} kg</p>
        <p>Estimated Days Before Harvest: {predictedDays} days</p>
      </CardContent>
    </Card>
  );
};

// Main App Component (Default Export)
const App = () => {
  const [predictedYield, setPredictedYield] = useState(0);
  const [predictedDays, setPredictedDays] = useState(0);
  const [showYieldPrediction, setShowYieldPrediction] = useState(false);

  const handleYieldPrediction = (yieldValue, days) => {
    setPredictedYield(yieldValue);
    setPredictedDays(days);
  };

  const handleContinueToYieldPrediction = () => {
    // Proceed to yield prediction after conditions are evaluated
    setShowYieldPrediction(true);
    yieldPrediction("onions", { temperature: 22, humidity: 60, soilMoisture: 45, pHLevel: 6.5 }, 10, handleYieldPrediction);
  };

  return (
    <div>
      <PlantingEvaluation onContinueToYieldPrediction={handleContinueToYieldPrediction} />
      {showYieldPrediction && (
        <YieldPrediction predictedYield={predictedYield} predictedDays={predictedDays} />
      )}
    </div>
  );
};

export default App;
