import React, { useState, useEffect, useRef } from 'react';
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
import { useQuery, useMutation } from '@apollo/client';
import queries from '../models/queries';

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
  const { data, loading, error } = useQuery(queries.chapters);
  const [addUser, result] = useMutation(queries.addUser);

  const mounted = useRef(true);

  // Get list of chapter ids
  useEffect(async () => {
    if (loading) return <div>Loading...</div>;
    mounted.current = true;
    if (mounted.current) setChapters(data.chapters);
    return() => mounted.current = false;
  }, [loading]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    return addUser({
      variables: {
        first_name: inputs.firstName,
        last_name: inputs.lastName,
        email: inputs.email,
        password: inputs.password,
        chapter_id: inputs.chapterId
      },
    })
      .then(() => {
        // redirect to the dashboard
        navigate("/dashboard");
      })
      .catch((err) => {
        console.warn(error);
        return <div>There was an error, please refresh and try again</div>;
      });
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
