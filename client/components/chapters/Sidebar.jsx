import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

function Sidebar(props) {
  const { users, description, title, listTitle } = props;

  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {listTitle}
      </Typography>
      <Container display='flex' sx={{
        display: 'flex', // Consider using grid layout here
        flexDirection: 'row',
        flexWrap: 'wrap',
        maxHeight: '500px',
        overflowY: 'scroll'
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
              width: 0.5
            }}
          >
            <Avatar
              alt={`${user.first_name} ${user.last_name}`}
              src='https://source.unsplash.com/random' // get avatar from database?
              sx={{ width: 50, height: 50, mb: 1 }}
            />
            <Typography variant="caption" sx={{ textAlign: 'center' }}>
              {`${user.first_name} ${user.last_name}`}<br />
              <Link href={`mailto:${user.email}`} underline='none'>{user.email}</Link>
            </Typography>
          </Box>

        ))
        }
      </Container>
    </Grid >
  );
}

Sidebar.propTypes = {
  listTitle: PropTypes.string.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Sidebar;
