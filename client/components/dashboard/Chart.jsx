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
import { ContactSupportOutlined, ControlPointDuplicateRounded } from '@mui/icons-material';

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

  // Sums items by category if needed
  // const [categorizedItems, setCategorizedItems] = useState({});
  // useEffect(async () => {
  //   try {
  //     const response = await fetch('/api/items');
  //     const data = await response.json();
  //     const { items } = data;

  //     if (response.ok) {
  //       // Raw item data [name, total_needed, category, total_received]
  //       // need chapter data on this reposne to categorize by chapter
  //       const catItems = {};

  //       items.forEach(item => {
  //         // if (!catItems[item.category]) catItems[item.category] = 0;
  //         // else catItems[item.category]++;
  //       });
  //       setCategorizedItems(catItems);
  //     } else {
  //       console.error(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }, []);


  useEffect(async () => {
    let mounted = true;
    const headers = {
      'content-type': 'application/json'
    };

    const graphqlQuery = {
      query: `query {
        chapters {
          name
          id
          items {
            name
            category
            total_received
          }
        }
      }`,
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(graphqlQuery),
      // Add Authorization
    };

    fetch('http://localhost:3000/graphql', options)
      .then((res) => res.json())
      .then((data) => {
        const { chapters } = data.data;
        if (!mounted) return;

        // Process the data 
        // Get category counts by chapter
        chapters.forEach((chapter, i) => {
          console.log(chapter);
          const { items } = chapter;
          // reduce items to count by category
          chapters[i].catCount = items.reduce((catCount, item) => {
            catCount[item.category] = (catCount[item.category] || 0) + item.total_received;
            return catCount;
          }, {});
        });
        setChapters(chapters);
      }
      )
      .catch((error) => console.log(error));

    return () => mounted = false;
  }, []);

  const labels = chapters.map(chapter => chapter.name);

  const datasets = categories.map((cat, i) => ({
    label: cat,
    data: chapters.map((chapter) => chapter.catCount[cat]),
    backgroundColor: backgroundColors[i % backgroundColors.length],
  }));

  const data = {
    labels,
    datasets
  };

  return <Bar options={options} data={data} />;
}
