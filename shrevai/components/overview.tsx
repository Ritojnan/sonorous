'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export function Overview() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const headersList = {
        "Accept": "*/*",
        "Authorization": `Bearer ${Cookies.get("token")}`
      };
      
      const response = await fetch("/api/read/chatbotsessions", {
        method: "POST",
        headers: headersList
      });

      const result = await response.json();
      
      // Process data to get number of sessions per time period
      const sessionsPerTime = result.reduce((acc, session) => {
        const date = new Date(session.createdAt).toISOString().split('T')[0]; // Get date part only
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date]++;
        return acc;
      }, {});

      const chartData = Object.keys(sessionsPerTime).map(date => ({
        name: new Date(date).toLocaleDateString('en-GB'), // Format date as dd:mm:YYYY
        total: sessionsPerTime[date]
      })).reverse();

      setData(chartData);
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          label={{ value: 'Sessions', angle: -90, position: 'insideLeft' }}
        />
        <Bar 
          dataKey="total" 
          fill="#adfa1d" 
          radius={[4, 4, 0, 0]} 
          label={{ position: 'top' }}
          isAnimationActive={false}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
