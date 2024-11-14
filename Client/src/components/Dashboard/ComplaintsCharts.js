import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ComplaintsChart = () => {
  const data = {
    labels: ["Classroom", "College", "Management", "Other", "Teacher"],
    datasets: [
      {
        label: "Total",
        data: [2, 1, 5, 3, 4],
        backgroundColor: "orange",
      },
      {
        label: "Solved",
        data: [1, 1, 2, 2, 3],
        backgroundColor: "green",
      },
      {
        label: "Unsolved",
        data: [1, 0, 3, 1, 1],
        backgroundColor: "red",
      },
      {
        label: "Inprogress",
        data: [0, 0, 2, 0, 1],
        backgroundColor: "yellow",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Complaints Statistics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ComplaintsChart;
