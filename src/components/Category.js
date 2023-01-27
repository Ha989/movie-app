import { Skeleton, Typography, Divider, ListItemButton, Box, ListItemText, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import  KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect } from 'react';
import apiService from '../api/apiService';
import {BASE_API} from '../api/config';
import MCard from './MCard';


const yearList = [
    { id: 2016, label: '2016'},
    { id: 2017, label: '2017'},
    { id: 2018, label: '2018'},
    { id: 2019, label: '2019'},
    { id: 2020, label: '2020'},
    { id: 2021, label: '2021'}
];


export default function Category() {
    const [openYear, setOpenYear] = React.useState(false);
    const [openGenres, setOpenGenres] = React.useState(true);
    const [loading, setLoading] = React.useState();
    const [genresList, setGenresList] = React.useState([]);
    const [movieList, setMovieList] = React.useState([]);
    const [genreId, setGenreId] = React.useState();
    const [yearId, setYearId] = React.useState(2021);
    
    useEffect(() => {
        const fetchData = async () => {
           try {
                setLoading(true);
                const response = await apiService.get(
                    `genre/movie/list?api_key=${BASE_API}&language=en-US`
                );
                setGenresList(response.data.genres);
                setLoading(false);
           } catch (error) {
                console.log(error.message);
           }
        };
        fetchData();    
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            let url=`discover/movie?api_key=${BASE_API}&language=en-US&append_to_response=videos`;
            try {
                setLoading(true);
                if(genreId) {
                    setYearId(null);
                    const res = await apiService.get(`${url}&with_genres=${genreId}`);
                    setMovieList(res.data.results);
                }
                if (yearId) {
                    setGenreId(null);
                    const res = await apiService.get(`${url}&year=${yearId}`);
                    setMovieList(res.data.results);
                }

                setLoading(false);
                
            } catch (error) {
                console.log(error.message)
                
            }
        };
        fetchData();
    }, [genreId, yearId]);

    const placeholder = [0, 1, 2, 3];
    const detailSkeleton = (
        <Stack spacing={1}>
            <Skeleton variant='text'/>
            <Skeleton variant='rectangular' width="100%" height={300}/>
        </Stack>
    );
    
  return (
    <>
        <Typography variant='h5' my={3}>
            CATEGORY
        </Typography>

        <Divider />
        <Stack flexDirection="row" width="100%" justifyContent="space-between">
            <Stack minWidth="150px" width={{ xs: "10%" }}>
               <Box>
                   <ListItemButton
                       alignItems='flex-start'
                       onClick={() => setOpenGenres(!openGenres)}
                       sx={{
                        
                         pr: 2,
                         pt: 2.5,
                         pb: openGenres ? 0 : 2.5,
                         "&:hover, &:focus": {
                            "& svg": { opacity: openGenres ? 1 : 0 },
                         },
                       }}
                   >
                       <ListItemText 
                            primary="Genres"
                            primaryTypographyProps={{
                                fontSize: 18,
                                fontWeight: "500",
                                lineHeight: "20px",
                                mb: "2px"
                            }}
                            secondary="Action, Drama, Thriller, Anime, Romatic, ..."
                            secondaryTypographyProps={{
                                noWrap: true,
                                fontSize: 12,
                                lineHeight: "16px",
                                color: openGenres ? "rgba(0,0,0,1)" : "rgba(90, 117, 255, 1)"
                            }}
                            sx={{ my: 0 }}
                       />
                       <KeyboardArrowDownIcon 
                            sx={{
                                mr: -1,
                                opacity: 0,
                                transform: openGenres ? "rotate(-180deg)" : "rotate(0)",
                                transition: "0.2s"
                            }}
                       />
                   </ListItemButton>
                   {openGenres && 
                        genresList.map((item) => (
                            <ListItemButton
                                onClick={() => setGenreId(item.id)}
                                key={item.id}
                                sx={{
                                    py: 0,
                                    minHeight: 40,
                                    color: "rgba(90, 117, 255, 1)",
                                    "&:focus": {
                                        backgroundColor: "rgba(255,0,0,0.2)",
                                    },
                                }}
                            >
                                <ListItemText 
                                     primary={item.name}
                                     primaryTypographyProps={{
                                        fontSize: 16,
                                        fontWeight: "light",
                                     }}
                                />
                            </ListItemButton>
                        ))
                    }
                    <Divider sx={{ marginTop: 3 }}/>
               </Box>
               <Box>
                    <ListItemButton
                         alignItems='flex-start'
                         onClick={() => setOpenYear(!openYear)}
                         sx={{
                            pt: 2.5,
                            pb: openYear ? 0 : 2.5,
                            "&:hover, &:focus": {
                                "& svg": { opacity: openYear ? 1 : 0},
                            },
                         }}
                    >
                        <ListItemText 
                            primary="Year"
                            primaryTypographyProps={{
                                fontSize: 18,
                                fontWeight: "medium",
                                lineHeight: "20px",
                                mb: "20px",
                            }}
                            secondary="Lastest and oldest edition."
                            secondaryTypographyProps={{
                                noWrap: true,
                                fontSize: 12,
                                lineHeight: "16px",
                                color: openYear ? "rgba(0,0,0,1)" : "rgba(90, 117, 255, 1)",
                            }}
                            sx={{ my: 0 }}
                        />
                        <KeyboardArrowDownIcon 
                            sx={{ 
                                opacity: 0,
                                transform: openYear ? "rotate(-180deg)" : 'rotate(0)',
                                transition: "0.2s",
                            }}
                        />
                    </ListItemButton>
                    {openYear && 
                        yearList.map((item) => (
                            <ListItemButton
                                onClick={() => setYearId(item.id)}
                                key={item.id}
                                sx={{ py: 0, minHeight: 40, color: "rgba(90, 117, 255, 1)"}}
                            >
                                <ListItemText 
                                    primary={item.label}
                                    primaryTypographyProps={{
                                        fontSize: 16,
                                        fontWeight: "light",
                                    }}
                                />
                            </ListItemButton>
                        ))
                    }
                    <Divider sx={{ marginTop: 3 }}/>
                </Box>
            </Stack>

            <Grid container direction="row" spacing={2} mt={2}>
             {loading ? placeholder.map((item, index) => (
                <Grid key={index}item xs={10} sm={6} md={4} lg={3}>
                    {detailSkeleton}
                </Grid>
             )) : movieList.map((item, index) => (
                <Grid key={index} item xs={10} sm={6} md={4} lg={3}>
                    <MCard key={item.id} item={item}/>
                </Grid>
             ))
            }
            </Grid>
        </Stack>
    </>
  );
}
