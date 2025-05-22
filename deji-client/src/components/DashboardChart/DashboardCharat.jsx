import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', orders: 40, revenue: 2400 },
  { name: 'Feb', orders: 30, revenue: 1398 },
  { name: 'Mar', orders: 20, revenue: 9800 },
  { name: 'Apr', orders: 27, revenue: 3908 },
  { name: 'May', orders: 18, revenue: 4800 },
  { name: 'Jun', orders: 23, revenue: 3800 },
  { name: 'Jul', orders: 34, revenue: 4300 },
];

const DashboardChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="orders" stroke="#1976d2" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="revenue" stroke="#388e3c" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DashboardChart;
