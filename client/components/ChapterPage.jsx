import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import sunflower from '../assets/images/sunflower.jpg';
import avatar from '../assets/images/broken-image.png';

export default function ChapterPage(props) {
  const { id } = useParams();

  const [chapter, setChapter] = useState({});
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    // TODO: Cancel this request if compoent unmounts
    const response = await fetch(`/api/chapters/${id}`);

    if (response.ok) {
      setChapter(await response.json());
    }
  }, []);

  useEffect(async () => {
    // TODO: Cancel this request if compoent unmounts
    // FIXME: Can probably have this sent on the get to chapters to get admins
    const response = await fetch('/api/users/');

    if (response.ok) {
      setUsers(await response.json());
    }
  }, [chapter]);

  useEffect(async () => {
    // TODO: Cancel this request if compoent unmounts
    // FIXME: Can probably have this sent on the get to chapters to get admins
    if (chapter) {
      const response = await fetch(`/api/chapter/${chapter.id}/items`);

      if (response.ok) {
        setItems(await response.json());
      }
    }
  }, [chapter]);


  return (
    <>
      {/* FIXME: Find a banner */}
      <Box style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-around',
      }} >
        <Box>
          <Typography variant='h3'>Welcome to {chapter.name}!</Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Box sx={{
              flexBasis: 100,
              flexGrow: 1,
              mr: 4,
            }}>
              <Typography variant='h5'>How to help</Typography>
              <Typography variant='body2'>
                Donations are currently being received at the following address<br />
                {chapter.street}<br />
                {chapter.city}, {chapter.state} {chapter.zip}
              </Typography>
            </Box>
            <Box sx={{
              flexBasis: 100,
              flexGrow: 1,
            }}>
              <Typography variant='h5'>Donation needs</Typography>
              <Typography variant='body2'>
                We currently have need for the following items:
              </Typography>
              <List sx={{ listStyleType: 'disc', marginLeft: 4 }}>
                {
                  items.map((item, i) => (
                    <ListItem key={i} disablePadding sx={{ display: 'list-item' }}><ListItemText>{item.name}</ListItemText></ListItem>
                  ))
                }
              </List>
            </Box>
          </Box>
        </Box>
        <img style={{ width: '25%' }} src={sunflower} />
      </Box>

      <Container
        sx={{
          py: 8,
          textAlign: 'center',
        }}
        maxWidth="md"
      >
        <Typography variant='h4' sx={{ mb: 8 }}>Our Team</Typography>
        <Box>
          <Grid container spacing={4} sx={{
            justifyContent: 'center',
          }}>
            {users.map((user, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  p: 2,
                }}
              >
                <Avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  // src="../assets/images/broken-image.png"
                  src={avatar}
                  sx={{ width: 75, height: 75 }}
                />

                {`${user.firstName} ${user.lastName}`}
                <Typography variant="caption">
                  <Link href={`mailto:${user.email}`} underline='none'>{user.email}</Link> | {user.phone}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}