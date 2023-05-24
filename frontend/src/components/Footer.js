import React from "react";
import { BottomNavigation, BottomNavigationAction, Typography, Paper} from "@mui/material";

export const Footer = () => {
    return (
    //   <BottomNavigation
    //   showLabels>
    //     
    
    //     <Link color="inherit" href="https://joannaphilips.se/">
    //         Joanna Philips
    //     </Link><span style={{ margin: '1px 5px 0px 5px' }}>&</span>
    //     <Link color="inherit" href="https://leothunellportfoliowebdev.netlify.app/">
    //         Leo Thunell
    //     </Link>
    // </Typography>
    //     {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />} href="https://joannaphilips.se/"/>
    //     <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    //     <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
    //   </BottomNavigation>
<Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, color: 'black', height: 0.06 }} elevation={3}>
<BottomNavigation
showLabels
>
<Typography variant="body2" color="text.secondary" justifyContent="center" display="flex" alignItems="center" >Made by</Typography>

<BottomNavigationAction
    label="Joanna Philips" 
    href="https://joannaphilips.se/"
    target="_blank"
    rel="noreferrer"
    alt="Joannas portfolio" />
<BottomNavigationAction
    label="Leo Thunell"
    href="https://leothunellportfoliowebdev.netlify.app/"
    target="_blank"
    rel="noreferrer"
    alt="Leos portfolio" />

</BottomNavigation>
</Paper>
    );
}

{/* <Typography variant="body2" color="text.secondary" justifyContent="center" display="flex" marginTop="10px">
        {'Made by '}
        <Link color="inherit" href="https://joannaphilips.se/">
            Joanna Philips
        </Link><span style={{ margin: '1px 5px 0px 5px' }}>&</span>
        <Link color="inherit" href="https://leothunellportfoliowebdev.netlify.app/">
            Leo Thunell
        </Link>
    </Typography> */}