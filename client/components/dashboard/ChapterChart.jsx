import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

export default function Chart() {
  const [categorizedItems, setCategorizedItems] = useState([]);
  const { id: chapterId } = useParams();

  useEffect(async () => {
    try {
      const response = await fetch(`/api/chapters/${chapterId}/items`);
      const data = await response.json();
      if (response.ok) {
        // Process the data get category counts by chapter
        const { chapterItems } = data;

        // reduce items to count by category
        const catCount = chapterItems.reduce((catCount, item) => {
          catCount[item.category] = (catCount[item.category] || 0) + item.total_received;
          return catCount;
        }, {});

        setCategorizedItems(catCount);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  // const datasets = categories.map((cat, i) => ({
  //   label: cat,
  //   data: chapters.map((chapter) => chapter.catCount[cat]),
  //   backgroundColor: backgroundColors[i % backgroundColors.length],
  // }));

  const datasets = [{
    label: 'All Categories',
    data: categories.map((cat, i) => categorizedItems[cat]),
    backgroundColor: backgroundColors[0],
  }];

  const data = {
    datasets,
    labels: categories,
  };

  return <Bar options={options} data={data} />;
}
