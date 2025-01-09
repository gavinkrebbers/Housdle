import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph({ times, Ao5s, Ao12s }) {
  const timeLabels = times.map((_, index) => `${index + 1}`);

  const data = {
    labels: timeLabels,
    datasets: [
      {
        label: "Times (s)",
        data: times.map((time) => parseFloat(time.replace(/:/g, ""))).reverse(),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
      {
        label: "Ao5s (s)",
        data: [
          ...Ao5s.map((time) => parseFloat(time.replace(/:/g, ""))),
          ...Array(4).fill(null),
        ].reverse(),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
      },
      {
        label: "Ao12s (s)",
        data: [
          ...Ao12s.map((time) => parseFloat(time.replace(/:/g, ""))),
          ...Array(11).fill(null),
        ].reverse(),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "rgb(156, 163, 175)", // text-gray-400
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const datasetLabel = tooltipItem.dataset.label;
            if (datasetLabel === "Times (s)") {
              return `Time: ${times[times.length - tooltipItem.dataIndex - 1]}`;
            } else if (datasetLabel === "Ao5s (s)") {
              const ao5Index = Ao5s.length - tooltipItem.dataIndex + 4;
              return `Ao5: ${Ao5s[ao5Index] || "--"}`;
            } else if (datasetLabel === "Ao12s (s)") {
              const ao12Index = Ao12s.length - tooltipItem.dataIndex + 11;
              return `Ao12: ${Ao12s[ao12Index] || "--"}`;
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Solve",
          color: "rgb(156, 163, 175)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Time (s)",
          color: "rgb(156, 163, 175)",
        },
        ticks: {
          color: "rgb(156, 163, 175)",
        },
        grid: {
          color: "rgba(107, 114, 128, 0.1)",
        },
      },
    },
  };

  return (
    <div className="w-full h-64 p-4 transition-colors duration-200 bg-white dark:bg-gray-800">
      <Line data={data} options={options} />
    </div>
  );
}

Graph.propTypes = {
  times: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao5s: PropTypes.arrayOf(PropTypes.string).isRequired,
  Ao12s: PropTypes.arrayOf(PropTypes.string).isRequired,
};
