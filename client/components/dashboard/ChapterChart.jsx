import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import categories from './categories';

import { UserContext } from '../../hooks/userContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chapter Summary',
    },
  },
};

const backgroundColors = [
  'rgba(54, 162, 235, 0.6)',
  'rgba(255, 206, 86, 0.6)',
  'rgba(75, 192, 192, 0.6)',
  'rgba(153, 102, 255, 0.6)',
  'rgba(255, 159, 64, 0.6)',
  'rgba(255, 99, 132, 0.5)',
];

export default function Chart({ itemData }) {
  const [categorizedItems, setCategorizedItems] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(async () => {
    let mounted = true;
    if (user) {
      try {
        // Process the data get category counts by chapter
        const chapterItems = itemData;
        // reduce items to count by category
        const catCount = chapterItems.reduce((catCount, item) => {
          catCount[item.category] = (catCount[item.category] || 0) + item.total_received;
          return catCount;
        }, {});
        if (mounted) setCategorizedItems(catCount);
      } catch (err) {
        console.error(err);
      }
    }
    return () => mounted = false;
  }, [itemData]);

  const datasets = [{
    label: 'All Categories',
    data: categorizedItems,
    backgroundColor: backgroundColors[0],
  }];

  const data = {
    datasets,
    labels: categories,
  };

  return <Bar options={options} data={data} />;
}
