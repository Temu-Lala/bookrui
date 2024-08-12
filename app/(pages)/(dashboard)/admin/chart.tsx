"use client";
import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DailyBooksChart() {
  const [data, setData] = useState({ dates: [], counts: [] });

  useEffect(() => {
    // Fetch daily book counts from the backend
    axios.get('http://localhost:3001//books/daily')
      .then(response => {
        const { data } = response;
        // Extract dates and counts from the response data
        const dates = data.map(item => item.date);
        const counts = data.map(item => item.count);

        setData({ dates, counts });
      })
      .catch(error => {
        console.error('Error fetching daily book counts:', error);
      });
  }, []);

  return (
    <LineChart
      xAxis={[{ data: data.dates }]} // Dates for the X-axis
      series={[
        {
          data: data.counts, // Counts for the Y-axis
          area: true,
        },
      ]}
      width={900}
      height={300}
      xAxisLabel="Date"
      yAxisLabel="Book Count"
    />
  );
}
