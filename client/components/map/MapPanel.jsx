import React from 'react';
import { Box } from '@mui/system';
import { Link, List, ListItem, ListItemText, Typography } from '@mui/material';


export default function MapPanel({ chapter, itemList }) {
  const items = itemList.map((item, i) => (
    <ListItem key={i} disablePadding sx={{ display: 'list-item' }}><ListItemText>{item}</ListItemText></ListItem>
  ));

  return (
    <Box id='map-panel'>
      <Typography variant='h3'>
        {chapter?.name || 'Welcome'}
      </Typography>
      <Box sx={{ pt: 2 }}>
        <Typography variant='body1'>
          {chapter
            ? 'Welcome! We are currently collecting the following items at this location:'
            : 'Select a location to learn more.'
          }

        </Typography>
        <List sx={{ listStyleType: 'disc', marginLeft: 4 }}>
          {items}
        </List>
        {chapter && <Link href={`/chapter/${chapter?.id}`}><Typography variant='caption'>Go to chapter page</Typography></Link>}
      </Box>
    </Box>
  );
};