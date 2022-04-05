import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import ContentBanner from './ContentBanner';
import InfoCard from './InfoCard';
import Main from './Main';
import Sidebar from './Sidebar';

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
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  listTitle: 'Meet Our Team'
};


export default function ChapterPage(props) {
  const { id } = useParams();

  const [chapter, setChapter] = useState({});
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(async () => {
    // TODO: Cancel this request if compoent unmounts
    const response = await fetch(`/api/chapters/${id}`);

    if (response.ok) {
      setChapter(await response.json());
    }
  }, []);

  useEffect(async () => {
    // TODO: Cancel this request if compoent unmounts
    // FIXME: Can probably have this sent on the get to chapters to get admins
    const response = await fetch('/api/users/');

    if (response.ok) {
      setUsers(await response.json());
    }
  }, [chapter]);

  useEffect(async () => {
    // TODO: Cancel this request if compoent unmounts
    // FIXME: Can probably have this sent on the get to chapters to get admins
    if (chapter) {
      const response = await fetch(`/api/chapter/${chapter.id}/items`);

      if (response.ok) {
        setItems(await response.json());
      }
    }
  }, [chapter]);

  const infoCards = [
    {
      title: 'Donation Center',
      subtitle: 'hours',
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
          description: 'Multiple lines of text that form the lede, informing new readers quickly and efficiently about what\'s most interesting in this post\'s contents.',
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
