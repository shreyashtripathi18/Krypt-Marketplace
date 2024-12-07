import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

const CandelStick = ({ historicalData }) => {
  const [data, setData] = useState([["Time", "Low", "Open", "Close", "High"]]);

  useEffect(() => {
    if (historicalData.prices) {
      const dataCopy = [["Time", "Low", "Open", "Close", "High"]];
      const hourlyData = groupByHour(historicalData.prices);

      // Transform data for CandlestickChart
      for (const [datetime, prices] of Object.entries(hourlyData)) {
        const low = Math.min(...prices);
        const high = Math.max(...prices);
        const open = prices[0];
        const close = prices[prices.length - 1];

        dataCopy.push([datetime, low, open, close, high]);
      }

      setData(dataCopy);
    }
  }, [historicalData]);

  // Helper to group prices by hour
  const groupByHour = (prices) => {
    const grouped = {};
    prices.forEach(([timestamp, price]) => {
      // Convert timestamp to "MM/DD/YYYY HH:mm" format
      const date = new Date(timestamp);
      const datetime = date.toLocaleDateString("en-US") + " " +
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

      if (!grouped[datetime]) grouped[datetime] = [];
      grouped[datetime].push(price);
    });
    return grouped;
  };

  return (
    <Chart
      chartType="CandlestickChart"
      width="100%"
      height="400px"
      data={data}
    />
  );
};

export default CandelStick;
