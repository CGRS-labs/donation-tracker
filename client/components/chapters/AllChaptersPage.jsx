import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useQuery } from '@apollo/client';
import queries from '../../models/queries';


export default function Album() {

  const [chapters, setChapters] = React.useState([]);
  const { data, loading, error } = useQuery(queries.chapters);
  const mounted = React.useRef(true);

  React.useEffect(async () => {
    if (loading) return <div>Loading...</div>;
    mounted.current = true;
    if (mounted.current) setChapters(data.chapters);
    return () => mounted.current = false;
  }, [loading]);

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Our Chapters
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Do Right Donations has Chapters all across the United States. Please find the location closest to you for full donation details.
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Link to={'/donate'} underline="none" component={RouterLink}>
              <Button variant="contained">Donate</Button>
            </Link>
            <Link to={'/map'} underline="none" component={RouterLink}>
              <Button variant="outlined">Find a location</Button>
            </Link>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {chapters.map((chapter, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {chapter.name}
                  </Typography>
                  <Typography>
                    Please view our chapter page to find out what is being collected in our area.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link to={`/chapter/${chapter.id}`} underline="none" component={RouterLink}>
                    <Button size="small">View</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container >
    </>
  );
}