import React, { useState } from 'react';
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


export default function SignUp() {
  const [inputs, setInputs] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    chapter: '',
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inputs),
    });

    if (response.ok) {
      setInputs({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        chapter: '',
      });
      navigate('/login');
    } else {
      console.error(await response.json());
    }

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
          Sign up
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
                name='chapter'
                value={inputs.chapter || ''}
                label='Chapter'
                onChange={handleChange}
                style={{
                  minWidth: '100%',
                }}
              >
                <MenuItem value={'albany'}>Albany</MenuItem>
                <MenuItem value={'boston'}>Boston</MenuItem>
                <MenuItem value={'buffalo'}>Buffalo</MenuItem>
                <MenuItem value={'cleveland'}>Chicago</MenuItem>
                <MenuItem value={'cleveland'}>Cleveland</MenuItem>
                <MenuItem value={'detriot'}>Detriot</MenuItem>
                <MenuItem value={'hartford'}>Hartford</MenuItem>
                <MenuItem value={'newYork'}>New York</MenuItem>
                <MenuItem value={'newark'}>Newark</MenuItem>
                <MenuItem value={'passaic'}>Passaic</MenuItem>
                <MenuItem value={'philadelphia'}>Philadephia</MenuItem>
                <MenuItem value={'rochester'}>Rochester</MenuItem>
                <MenuItem value={'seattle'}>Seattle</MenuItem>
                <MenuItem value={'washingtonDC'}>Washington D.C.</MenuItem>
                <MenuItem value={'yonkers'}>Yonkers</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
