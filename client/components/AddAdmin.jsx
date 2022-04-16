import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { InputLabel, Select } from '@mui/material';

import useToken from '../hooks/useToken';

export default function SignUp() {

  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    chapterId: '',
  });
  const [chapters, setChapters] = useState([]);
  const { token } = useToken();

  // Get list of chapter ids
  useEffect(async () => {
    const headers = {
      'content-type': 'application/json',
    };

    const graphqlQuery = {
      'query': `{
        chapters{
          name
          id
        }
      }`,
    };

    const options = {
      'method': 'POST',
      'headers': headers,
      'body': JSON.stringify(graphqlQuery)
    };

    fetch('/graphql', options)
      .then(res => res.json())
      .then(data => setChapters(data.data.chapters))
      .catch(error => console.log(error));
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const headers = {
      "content-type": "application/json",
    };
    const graphqlQuery = {
      query: `mutation addUser ($first_name: String!, $last_name: String!, $email: String!, $password: String!, $chapter_id: Int!) {
  addUser (first_name: $first_name, last_name: $last_name, email: $email, password: $password, chapter_id: $chapter_id) {
    first_name
        }
      }`,
      variables: {
        first_name: inputs.firstName,
        last_name: inputs.lastName,
        email: inputs.email,
        password: inputs.password,
        chapter_id: inputs.chapterId
      },
    };

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(graphqlQuery),
    };

    fetch("/graphql", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // redirect to the dashboard
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container component="div" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'warning.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Administrator
        </Typography>
        <Box id='signup' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value={inputs.firstName || ''}
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                value={inputs.lastName || ''}
                autoComplete="family-name"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={inputs.email || ''}
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={inputs.password || ''}
                autoComplete="new-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id='chapterSelect'>Chapter</InputLabel>
              <Select
                labelId='chapter-select-label'
                id='menu'
                name='chapterId'
                value={inputs.chapterId}
                label='Chapter'
                onChange={handleChange}
                style={{
                  minWidth: '100%',
                }}
              >
                {chapters?.map((chapter, index) => {
                  return <MenuItem key={index} value={chapter.id}>{chapter.name}</MenuItem>;
                })}
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Administrator
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
