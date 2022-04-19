import React, { useState, useEffect, useContext, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import AddItem from './AddItem';
import ItemTable from './ItemTable';
import ChapterChart from './ChapterChart';
import { UserContext } from '../../hooks/userContext';


function DashboardContent() {

  const [tableData, setTableData] = useState([]);
  const { user } = useContext(UserContext);
  const mounted = useRef(true);

  useEffect(() => {
    updateTable();
    return () => () => mounted.current = false;
  }, []);

  const updateTable = async () => {
    if (!user) return;

    const headers = {
      'content-type': 'application/json'
    };

    const graphqlQuery = {
      query: `query chapter ($id: Int!) {
          chapter (id: $id) {
            items {
              id,
              name,
              total_needed,
              total_received,
              category
            }
          }
        }`,
      variables: {
        id: user.chapter_id || user.chapterId
      },
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
          const sortedData = data.data.chapter.items.sort((a,b) => a.id - b.id);
          setTableData(sortedData);
        }
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err);
    }
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
                <ChapterChart itemData={tableData}/>
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