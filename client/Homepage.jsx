import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ContentBanner from '../client/components/layout/ContentBanner';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const bannerImage = 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80';
const sunflowerField = 'https://images.unsplash.com/photo-1535222830855-fd60aca7e065?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80';




function Description() {
  return (
    <div>
      <Typography variant="h5" align="left" color="#fff" component="p">
        Over 4.5 million Ukrainian refugees (and counting) have fled their homes with few belongings. They are in need of clothing, medical supplies, food, personal hygiene items, home goods and financial assistance. 
      </Typography>
      <br></br>
      <Typography variant="h5" align="left" color="#fff" component="p">
          Do Right Donations is working to support our fellow Ukrainians during this humanitarian crisis. Our partners in the Ukraine and neighboring countries have set up distribution sites to meet the refugees immediate needs. If you are able to donate unused or items in good condition, please go to our Chapters page to locate your nearest Do Right Donations chapter.
      </Typography>
      <br></br>
      <Typography variant="h5" align="left" color="#fff" component="p">
        Thank you for your support. <strong>Д&apos;якуєм вам за вашу підтримку.</strong>
      </Typography>
    </div>
    
  );
};

function Title() {
  return (
    <Typography
      component="h1"
      variant="h2"
      align="center"
      color="fff"
      gutterBottom
    >
      Do Right Donations
    </Typography>
  );
}

export default function Homepage() {
  return (
    <Container disableGutters maxWidth="lg" component="div" sx={{ pt: 8, pb: 6 }}>
      <ContentBanner
        content={{
          image: sunflowerField,
          imageText: 'main image description',
          linkText: '',
          title: <Title />,
          description: <Description />
        }}
      />
    </Container>
  );
};

// export default function Homepage({ content }) {
//   const { sunflowerField, imageText } = content;

//   return (
//     <Paper
//       sx={{
//         position: 'relative',
//         color: '#fff',
//         mb: 4,
//         backgroundSize: 'cover',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'center',
//         backgroundImage: `url(${image})`,
//       }}
//     >
//       {/* Increase the priority of the hero background image */}
//       {<img style={{ display: 'none' }} src={image} alt={imageText} />}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           right: 0,
//           left: 0,
//           backgroundColor: 'rgba(0,0,0,.3)',
//         }}
//       />
//       <Grid container>
//         <Grid item md={6}>
//           <Box
//             sx={{
//               position: 'relative',
//               p: { xs: 3, md: 6 },
//               pr: { md: 0 },
//             }}
//           >
//             <div>
//               <Title/>
//             </div>
//             <div>
//               <Description />
//             </div>
//           </Box>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }