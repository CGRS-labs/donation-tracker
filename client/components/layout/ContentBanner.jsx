import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function ContentBanner({ content }) {
  const { title, description, image, imageText, linkText } = content;

  return (
    <Paper
      sx={{
        minHeight: '500px',
        position: 'relative',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={image} alt={imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {description}

            </Typography>
            <Link variant="subtitle1" href="#">
              {linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

ContentBanner.propTypes = {
  content: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    imageText: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    title: PropTypes
  }).isRequired,
};

export default ContentBanner;