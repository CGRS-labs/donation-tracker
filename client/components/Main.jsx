import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';

import avatar from '../assets/images/broken-image.png';

function Main(props) {
  const { users, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        '& .markdown': {
          py: 3,
        },
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid container spacing={4} sx={{
        justifyContent: 'center',
        mt: 0,
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
              // src={avatar}
              src='https://source.unsplash.com/random'
              sx={{ width: 75, height: 75 }}
            />

            {`${user.firstName} ${user.lastName}`}
            <Typography variant="caption">
              <Link href={`mailto:${user.email}`} underline='none'>{user.email}</Link> | {user.phone}
            </Typography>
          </Box>

        ))
        }
      </Grid>
    </Grid>
  );
}

Main.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;