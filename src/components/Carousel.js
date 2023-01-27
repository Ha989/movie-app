
import { ListItemButton, Skeleton, Paper, Box, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import apiService from "../api/apiService";
import { BASE_API } from "./api/config";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Carousel(props) {
   const [cutInitial, setCutInitial] = useState([]);
   const [loading, setLoading] = useState();

   useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiService.get(
                `/trending/all/day?api_key=${BASE_API}`
            );
            const result = response.data.result;

            setCutInitial([...result].splice(12,6));
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    };
    fetchData();
   },[]);

   const detailSkeleton = (
        <Stack spacing={1}>
            <Skeleton variant='text'/>
            <Skeleton variant='rectangular' width="100%" height={300}/>
        </Stack>
   );

  return (
    <Carousel>
        {loading
          ? cutInitial.map((item, index) => detailSkeleton)
          : cutInitial.map((item, index) => 
            <Item key={index} item={item} />
          )
        }
    </Carousel>
  );
}

function Item(props) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            sx={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${props.item.backdrop_path})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                height: "50vh",
            }}
        >
            <Paper square sx={{ backgroundColor: "rgba(0,0,0,0.5)"}}>
                <ListItemButton>
                     <Stack 
                        display="flex"
                        flexWrap="wrap"
                        sx={{ height: "20%", width: "50%" }} 
                     >
                        <Typography variant='h5' mb={1}>
                            {props.item.original_name}
                        </Typography>
                        <Typography variant='caption'>
                            {props.item.overview}
                        </Typography>
                        <Stack flexDirection="row" justifyContent="flex-start" mt={1}>
                            <Box
                                display="flex"
                                flexDirection="row" 
                                justifyContent="center" 
                                mr={3}
                            >
                                <RecommendIcon />
                                <Typography ml={1}>
                                    {props.item.vote_average}
                                </Typography>
                            </Box>
                            <Box
                                display="flex"
                                flexDirection="row" 
                                justifyContent="center" 
                            >
                                <FavoriteIcon />
                                <Typography ml={1} >
                                     {props.item.vote_count}
                                </Typography>
                            </Box>
                        </Stack>
                     </Stack>
                </ListItemButton>
            </Paper>
        </Box>
    );
}

export default Carousel;