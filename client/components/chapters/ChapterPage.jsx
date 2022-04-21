import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ContentBanner from '../layout/ContentBanner';
import InfoCard from '../layout/InfoCard';
import Main from './Main';
import Sidebar from './Sidebar';
import { useQuery } from '@apollo/client';
import queries from '../../models/queries';

// import sunflower from '../assets/images/sunflower.jpg';
// import hands from '../assets/images/hands.jpg';
// import avatar from '../assets/images/broken-image.png';

const helpingHand = 'https://images.unsplash.com/photo-1587027066597-e9b5dea8cbf2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80';
const ukrainianFlag = 'https://images.unsplash.com/photo-1565711561500-49678a10a63f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';
const bannerImage = 'https://images.unsplash.com/photo-1529511582893-2d7e684dd128?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1633&q=80';
// https://images.unsplash.com/photo-1485286162995-aa63d31c06cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'

const sidebar = {
  title: 'About',
  description:
    'Our Chapter has donated over 1500 items since we began our collection a month ago. Please help us continue to meet the needs of Ukrainian refugees!',
  listTitle: 'Meet Our Team'
};


export default function ChapterPage(props) {
  const { id } = useParams();

  const [chapter, setChapter] = useState({});
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const { data, loading, error } = useQuery(queries.getOneChapter, {
    variables: {
      id: parseInt(id),
    }
  });

  const mounted = useRef(true);

  useEffect(async () => {
    if (loading) return <div>Loading...</div>;
    mounted.current = true;
    if (mounted.current) {
      setChapter(data.chapter);
      setUsers(data.chapter.users);
      const filteredItems = data.chapter.items.filter(item => (item.total_needed - item.total_received) > 0);
      setItems(filteredItems);
    }
    return () => () => mounted.current = false;
  }, [loading]);

  const infoCards = [
    {
      title: 'Donation Center',
      subtitle: 'Hours: Monday-Friday, 6pm-9pm',
      content:
        `${chapter.street}, ${chapter.city} ${chapter.state}, ${chapter.zip}`,
      image: helpingHand,
      imageLabel: 'Helping Hands',
    },
    {
      title: 'Contact Us',
      subtitle: `${chapter.email}`,
      content:
        `${chapter.phone}`,
      image: ukrainianFlag,
      imageLabel: 'Ukraine',
      social: [
        { name: 'Twitter', icon: TwitterIcon },
        { name: 'Facebook', icon: FacebookIcon },
      ],
    },
  ];

  return (

    <Container maxWidth="lg">
      <ContentBanner
        content={{
          title: `${chapter.name}`,
          description: 'Welcome to our chapter! Please don\'t hesitate to reach out to us if you have any questions.',
          image: bannerImage,
          imageText: 'main image description',
          linkText: '',
        }}
      />
      <Grid container spacing={4}>
        {infoCards.map((card) => (
          <InfoCard key={card.title} cardInfo={card} />
        ))}
      </Grid>
      <Grid container spacing={5} sx={{ mt: 3 }}>
        <Main title="Current Needs" items={items} />
        <Sidebar
          title={sidebar.title}
          description={sidebar.description}
          users={users}
          social={sidebar.social}
          listTitle={sidebar.listTitle}
        />
      </Grid>
    </Container>
  );
}
