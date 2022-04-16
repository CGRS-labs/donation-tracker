import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import AddNeed from './AddNeed';
import GlobalItemTable from './GlobalItemTable';
import Chart from './Chart';


// How to make dashboard content modular => use render Props
// Pass in Chart, Form, Table as props.
// Parent needs to
// 1. Compute and pre - process chart data
// pass in labels and datasets
// 2. Compute and pre process item tables
// pass in columsn and row Data
// 3. Decide with form to pass in

function DashboardContent({ form, chart, table }) {
  const [tableData, setTableData] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    getTableData();
    return () => mounted.current = false;
  }, []);

  const getTableData = async () => {
    const headers = {
      'content-type': 'application/json'
    };

    const graphqlQuery = {
      query: `query {
        items {
              id,
              name,
              total_needed,
              total_received,
              category
        }
      }`,
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(graphqlQuery),
      // Add Authorization
    };

    try {
      const response = await fetch('/graphql', options);
      const data = await response.json();
      if (response.ok) {
        if (mounted.current) {
          setTableData(data.data.items);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = () => {
    getTableData();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Add Item Form */}
            <Grid item xs={12} md={4} lg={4.5}>
              <Paper
                sx={{
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 390,
                }}
              >
                <AddNeed onSubmit={onSubmit} />
              </Paper>
            </Grid>
            {/* Donation summary stats */}
            <Grid item xs={12} md={8} lg={7.5} display={{ xs: 'none', sm: 'block' }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 390,
                }}
              >
                <Chart />
              </Paper>
            </Grid>
            {/* Items table */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <GlobalItemTable rows={tableData} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );

}

export default function Dashboard() {
  return <DashboardContent />;
}