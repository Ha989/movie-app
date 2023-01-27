import { Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../api/apiService';
import { BASE_API } from '../api/config';
import MDetailCard from '../components/MDetailCard';
import { useAuth } from '../contexts/AuthContext';




function MovieDetailPage() {
   let auth = useAuth();
   console.log(auth.user);
   let { movieId } = useParams();
   const [loading, setLoading] = useState();
   const [movieDetail, setMovieDetail] = useState(null);
   
   useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await apiService.get(
            `movie/${movieId}?api_key=${BASE_API}&language=en-US`
          );
          console.log(res.data);
          setMovieDetail(res.data);
          setLoading(false);
        } catch (error) {
          console.log(error.message);         
        }
      };
      fetchData();
   }, [movieId]);

  return (
    <>
      <Typography variant='h5' mb={2} mt={2}>
        Movie Information
      </Typography>
      <Divider />
      <MDetailCard movieDetail={movieDetail} loading={loading}/>
    </>
  );
}

export default MovieDetailPage;