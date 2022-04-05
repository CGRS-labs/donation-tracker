import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
function Main(props) {
  const { items, title } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid container
        columnSpacing={4}
        rowSpacing={{ xs: 1, md: 4 }}
        justifyContent='center'
        sx={{
          pt: 2,
        }}>
        {items.map((item, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            key={i}
            textAlign='center'
          >
            {item.name}
          </Grid>
        ))}
      </Grid>
    </Grid >
  );
}

Main.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;