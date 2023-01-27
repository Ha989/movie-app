import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../api/apiService';
import { BASE_API } from '../api/config';
import { Divider, Skeleton, Stack, Typography, Pagination, PaginationItem, Grid } from '@mui/material';
import MCard from '../components/MCard';


function SearchQueryPage() {
   const [loading, setLoading] = useState();
   const [movieList, setMovieList] = useState([]);
   const { query } = useParams();
   const [page] = useState(1);

   useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await apiService.get(
                `search/movie?query=${query}&api_key=${BASE_API}&language=en-US&page=${page}&include_adult=false`
            );
            const dataSearch = await res.json();
            console.log(dataSearch);
            setMovieList(dataSearch);
            setLoading(false);

        } catch (error) {
            console.log(error.message);
        }
    };
    fetchData();
   }, [query, page]);

   const placeholder = [0, 1, 2, 3, 4];
   const detailSkeleton = (
        <Stack spacing={1}>
           <Skeleton variant='text'/>
           <Skeleton variant='rectangular' width="100%" height={300}/>
        </Stack>
   );


  return (
    <>
       <Typography variant='h5' mb={2} mt={2}>
           Search Results
       </Typography>
       <Divider/>
       <Grid container direction="row" spacing={5} mt={2}>
            {loading
              ? placeholder.map((item, index) => (
                <Grid key={index} item xs={6} sm={4} md={3}>
                    {detailSkeleton}
                </Grid>
              ))
              : movieList.map((item, index) => (
                <Grid key={index} item xs={6} sm={4} md={3}>
                    <MCard item={item}/>
                </Grid>
              ))
            }
        </Grid>
        <Pagination 
            size='large'
            count={10}
            sx={{ display: 'flex', justifyContent: "center", margin: "2rem" }}
            renderItem={(item) => (
                <PaginationItem 
                    component={Link}
                    to={`/search/movie/${item.page}`}
                    {...item}
                />
            )}
        />
    </>
  )
}

export default SearchQueryPage;