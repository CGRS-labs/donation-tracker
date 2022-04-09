import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import AddItem from './AddItem';
import ItemTable from './ItemTable';
import ChapterChart from './ChapterChart';


function DashboardContent() {

  const [tableData, setTableData] = useState([]);

  const updateTable = () => {
    fetch('/api/chapterItems')
      .then((data) => data.json())
      .then(({ chapterItems }) => {
        console.log(chapterItems);
        setTableData(chapterItems);
      });
  };

  useEffect(() => {
    updateTable();
  }, []);

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
                  height: 1,
                }}
              >
                <AddItem setTableData={setTableData} updateTable={updateTable} />
              </Paper>
            </Grid>
            {/* Donation summary stats */}
            <Grid item xs={12} md={8} lg={7.5}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 390,
                }}
              >
                <ChapterChart />
              </Paper>
            </Grid>
            {/* Items table */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <ItemTable tableData={tableData} updateTable={updateTable} />
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