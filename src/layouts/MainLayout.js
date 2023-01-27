import { Outlet } from "react-router-dom";
import Grid  from "@mui/material/Grid";
import MainFooter from "./MainFooter";
import Header from "./Header";


function MainLayout () {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12}>
            <Header />
        </Grid>
        <Grid item xs={10}>
            <Outlet />
        </Grid>
        <Grid item xs={12}>
            <MainFooter />
        </Grid>
      </Grid>
    )
}

export default MainLayout;