import React from 'react';
import { Bar } from 'react-chartjs-2'; // Import Bar component
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'; // Import necessary Chart.js components

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ProgressChart = ({ masteredWords, streak }) => {
    const data = {
        labels: ['Words Mastered', 'Current Streak'],
        datasets: [
            {
                label: 'Progress',
                data: [masteredWords, streak],
                backgroundColor: ['#4caf50', '#f44336'],
            },
        ],
    };

    return <Bar data={data} />;
};

export default ProgressChart;
