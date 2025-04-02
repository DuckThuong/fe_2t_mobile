import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import "./DashboardCharts.scss";

// Dữ liệu mẫu máy bán ra
const pieData = [
  { name: "iPhone 15", value: 30 },
  { name: "Samsung S23", value: 25 },
  { name: "Oppo Reno 8", value: 20 },
  { name: "Xiaomi 13", value: 15 },
  { name: "Vivo V27", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D7001A"];

// Dữ liệu doanh số bán theo tháng
const lineData = [
  { month: "Jan", sales: 100 },
  { month: "Feb", sales: 120 },
  { month: "Mar", sales: 90 },
  { month: "Apr", sales: 140 },
  { month: "May", sales: 110 },
  { month: "Jun", sales: 160 },
  { month: "Jul", sales: 130 },
  { month: "Aug", sales: 170 },
  { month: "Sep", sales: 150 },
  { month: "Oct", sales: 180 },
  { month: "Nov", sales: 200 },
  { month: "Dec", sales: 220 },
];

interface ChartProps {
  type: "pie" | "line";
}

const DashboardCharts: React.FC<ChartProps> = ({ type }) => {
  return (
    <div className="chart-container">
      {type === "pie" ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sales" stroke="#D7001A" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardCharts;
