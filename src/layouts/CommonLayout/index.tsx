import { Outlet } from "react-router-dom";
import { Grid } from "@mui/material";
import Sidebar from "./component/Sidebar";
import NavbarCustom from "./component/Navbar";

function Layout() {
  return (
    <div className="home">
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={10}>
          <div className="homeContainer">
            <NavbarCustom />
            <Outlet />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Layout;
