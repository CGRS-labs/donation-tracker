import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

function InfoCard({ cardInfo }) {
  return (
    <Grid item xs={12} md={6}>
      {/* <CardActionArea component="div"> */}
      <Card sx={{ display: 'flex', height: 1 }}>
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">
            {cardInfo.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {cardInfo.subtitle}
          </Typography>
          <Typography variant="subtitle1" paragraph>
            {cardInfo.content}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            {
              cardInfo.social?.map((network) => (
                <Link
                  display="block"
                  variant="body1"
                  href="#"
                  key={network.name}
                  sx={{ mb: 0.5 }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <network.icon />
                    <Typography variant="caption" color="primary">
                      <span>{network.name}</span>
                    </Typography>
                  </Stack>
                </Link>
              ))
            }
          </Stack>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={cardInfo.image}
          alt={cardInfo.imageLabel}
        />
      </Card>
      {/* </CardActionArea> */}
    </Grid>
  );
}

InfoCard.propTypes = {
  cardInfo: PropTypes.shape({
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default InfoCard;