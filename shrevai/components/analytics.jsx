"use client";
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const fetchEmployeeInsights = async () => {
  const res = await fetch('/api/analytics/employee-insights');
  return res.json();
};

const fetchChatbotPerformance = async () => {
  const res = await fetch('/api/analytics/chatbot-performance');
  return res.json();
};

const fetchUserEngagement = async () => {
  const res = await fetch('/api/analytics/user-engagement');
  return res.json();
};

const Home = () => {
  const [employeeInsights, setEmployeeInsights] = useState(null);
  const [chatbotPerformance, setChatbotPerformance] = useState(null);
  const [userEngagement, setUserEngagement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [employeeData, chatbotData, userData] = await Promise.all([
        fetchEmployeeInsights(),
        fetchChatbotPerformance(),
        fetchUserEngagement(),
      ]);

      setEmployeeInsights(employeeData);
      setChatbotPerformance(chatbotData);
      setUserEngagement(userData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Employee Insights</h2>
        <BarChart width={600} height={300} data={employeeInsights?.employeeDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="_count.employees" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Chatbot Performance</h2>
        <BarChart width={600} height={300} data={chatbotPerformance?.chatbotSessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="chatbotName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="_count.sessions" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">User Engagement</h2>
        <BarChart width={600} height={300} data={userEngagement?.userSessions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="_count.sessions" fill="#ffc658" />
        </BarChart>
      </div>
    </div>
  );
};

export default Home;
