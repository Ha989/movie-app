import Category from '../components/Category';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import apiService from '../api/apiService';
import { BASE_API } from '../api/config';
import TrendingCard from '../components/TrendingCard';


function HomePage() {
    const [loadingTrending, setLoadingTrending] = useState();
    const [trendingList, setTrendingList] = useState([]);
    const [cutInitial, setCutInitial] = useState();
    
    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoadingTrending(true);
            const res = await apiService.get(
                `/trending/all/day?api_key=${BASE_API}`
            );
            const result = res.data.results;
            setTrendingList(result);
            setCutInitial([...result].splice(16,4));
            setLoadingTrending(false);
            
        } catch (error) {
            console.log(error.message);
        }
    };
        fetchData();
    }, []);

  return (
    <>
        <Grid
            container
            direction="column"
            justifyContent={{ md: "center", xs: "flex-end" }}
            sx={{ 
                minHeight: "100vh",
            }}
        >
            <Grid item direction="column" container>
                <TrendingCard 
                  trendinglist={trendingList}
                  cutInitial={cutInitial}
                  loadingTrending={loadingTrending}
                />
            </Grid>
            <Grid item direction="column" mt={5} container>
                <Category/>
            </Grid>
        </Grid>
    </>
  );
}

export default HomePage;