import React, { useState, useEffect } from 'react';
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


export default function Chart() {
  const [chapters, setChapters] = useState([]);
  const [categorizedItems, setCategorizedItems] = useState({});

  useEffect(async () => {
    try {
      const response = await fetch('/api/items'); // FIXME: Change to all for production
      const data = await response.json();
      if (response.ok) {
        // Raw item data [name, total_needed, category, total_received]
        // need chapter data on this reposne to categorize by chapter
        const catItems = {};

        // TODO: This can get expensive useMemo for this
        data.forEach(item => {
          if (!catItems[item.category]) catItems[item.category] = 0;
          else catItems[item.category]++;
        });
        setCategorizedItems(catItems);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);


  useEffect(async () => {
    try {
      const response = await fetch('/api/chapters'); // FIXME: Change to all for production
      const data = await response.json();
      if (response.ok) {
        setChapters(data);
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);


  const labels = chapters.map(chapter => chapter.name);



  // backgroundColor: 'rgba(53, 162, 235, 0.5)', blue
  const backgroundColors = [
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];

  const datasets = categories.map((cat, i) => ({
    label: cat,
    data: labels.map(() => Math.random()), // TODO: Replace with aggregated category count for each chapter
    backgroundColor: backgroundColors[i % backgroundColors.length],
  })
  );

  const data = {
    labels,
    datasets
  };

  return <Bar options={options} data={data} />;
}
