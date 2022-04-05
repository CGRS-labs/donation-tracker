import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

function ItemGroup({ category, items }) {

  const sortedItems = items.sort((a, b) => b.need - a.need);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant='h6' component='span'>
          {category}
        </Typography>
      </Grid>
      {
        sortedItems.map((item, i) => (
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            xl={3}
            key={i}
          // textAlign='center'
          >
            {item}
          </Grid>
        ))
      }
    </>
  );
};

function Main(props) {
  const { items, title } = props;

  const categorizedItems = {};

  items.forEach(item => {
    if (!categorizedItems[item.category]) categorizedItems[item.category] = [];
    categorizedItems[item.category].push(item.name);
  });

  const itemGroups = Object.keys(categorizedItems).sort((a, b) => categorizedItems[b].length - categorizedItems[a].length)
    .map(category => (
      <ItemGroup key={category} category={category} items={categorizedItems[category]} />
    ));

  return (
    <Grid
      item
      xs={12}
      md={8}
    >
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Grid container
        columnSpacing={4}
        rowSpacing={{ xs: 1, md: 2 }}
        // justifyContent='center'
        sx={{
          pt: 2,
        }}>
        {itemGroups}
      </Grid>
    </Grid >
  );
}

Main.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  title: PropTypes.string.isRequired,
};

export default Main;