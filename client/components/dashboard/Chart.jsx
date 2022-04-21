import React, { useState, useEffect } from 'react';
import queries from '../../models/queries';
import { useQuery } from '@apollo/client';
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
  const [chapters, setChapters] = useState([]);
  const { data, loading, error } = useQuery(queries.allChapters);

  useEffect(async () => {
    if (loading) return;
    let mounted = true;
    if (!mounted) return;
    // Process the data
    // Get category counts by chapter
    const { chapters } = data;
    const chaptersCount = [];
    chapters.forEach((chapter, i) => {
      chaptersCount[i] = {};
      chaptersCount[i].name = chapter.name;
      const { items } = chapter;
      // reduce items to count by category
      chaptersCount[i].catCount = items.reduce((catCount, item) => {
        catCount[item.category] = (catCount[item.category] || 0) + item.total_received;
        return catCount;
      }, {});
    });
    setChapters(chaptersCount);
    return () => mounted = false;
  }, [loading]);

  const labels = chapters.map(chapter => chapter.name);

  const datasets = categories.map((cat, i) => ({
    label: cat,
    data: chapters.map((chapter) => chapter.catCount[cat]),
    backgroundColor: backgroundColors[i % backgroundColors.length],
  }));

  const chartData = {
    labels,
    datasets
  };

  return <Bar options={options} data={chartData} />;
}
