import React, { useState } from 'react';
import Grid  from '@mui/material/Grid';
import Stack from '@mui/system/Stack';
import Devider from "@mui/material/Divider";
import Typography from '@mui/material/Typography';
import PaginationItem from "@mui/material/PaginationItem";
import Skeleton from "@mui/material/Skeleton";
import MCard from "./MCard";


function TrendingCard({ trendinglist, cutInitial, loadingTrending }) {

     const [cutList, setCutList] = useState();
     const [copyList, setCopyList] = useState([]);

     function handleList() {
        let y;
        if( copyList.length === 0) {
            setCopyList ([...trendinglist]);
            y = [...trendinglist].splice(0,4);
            copyList.splice(0,4);
        } else if ( copyList.length === 4 ) {
            setCopyList ([ ...trendinglist]);
            y = copyList.splice(0,4);
        } else {
            y = copyList.splice(4,4)
        }
         return y;
     }
     const placeholder = [ 0,1,2,3 ];
     const detailSkeleton = (
        <Stack spacing={1}>
           <Skeleton variant='text'/>
           <Skeleton variant='rectangular' width="100%" height={300}/>
        </Stack>
     );



  return (
    <>
       <Stack
         flexDirection="row"
         justifyContent="space-between"
         alignItems="center"
        >
           <Typography variant='h5' mt={3}>
             Trending 
           </Typography>
           <PaginationItem onClick={() => setCutList(handleList())} type="previous"/>
           <PaginationItem onClick={() => setCutList(handleList())} type="next"/>
       </Stack>
       <Devider />
       <Grid container direction="row" spacing={3} mt={2}>
        {loadingTrending?placeholder.map((item, index) => (
            <Grid key={index} item xs={10} sm={4} md={3}>
               {detailSkeleton}
            </Grid>
        )) : cutList?cutList.map((item,index) => (
          <Grid key={index} item xs={10} sm={4} md={3}>
              <MCard item={item}/>
            </Grid>
        )) : cutInitial?.map((item, index) => (
          <Grid key={index} item xs={10} sm={4} md={3}>
              <MCard item={item}/>
            </Grid>
        ))
      }
       </Grid>
    </>
  )
}

export default TrendingCard;