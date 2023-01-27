import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import MCard from '../components/MCard';

function FavoritePage() {
    let list = JSON.parse(localStorage.getItem("fav"));

  return (
    <>
       <Typography variant='h5' mb={2}>
        Your Favorites
       </Typography>
       <Divider />
       <Grid container direction="row" spacing={5} mt={2}>
        {list?.map((item) => (
            <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MCard item={item}/>
            </Grid>
        ))}
       </Grid>
    </>
  )
}

export default FavoritePage;