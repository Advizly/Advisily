import React, {useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes, redirect, Redirect, Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import { Select } from "@mui/material";
import { Margin } from '@mui/icons-material';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone';
import { ADMIN_CATALOG_ROUTE }from "./" 


function AdminView() {
    const[redirect, setRedirect] = useState(0);
    if(redirect ===1){
        return <Redirect to = '/admin/catalog'></Redirect>
    }
    return(
        <div>
            
            <Box textAlign='center'>

            < AdminPanelSettingsTwoToneIcon fontSize="large" height={600} width={600} sx = {{marginTop: 15}}/>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"black",marginTop: 2, marginBottom:3, fontSize: 25}}>
                You are currently in Admin's View
            </Typography>
          
             <Button  component={Link} to="/admin/major" variant="contained" sx = {{backgroundColor:"#f5f5f5", "&:hover": {backgroundColor : "#f5f5f5"}}}   > View and Edit Catalogs </Button>
             {/* <Button variant="contained" sx = {{backgroundColor:"#00bcd4", "&:hover": {backgroundColor : "#00838f"}}}  onClick={() => {setRedirect(1)}}> View Catalogs </Button>
             <Button variant="contained" sx = {{backgroundColor:"#00bcd4", "&:hover": {backgroundColor : "#00838f"}}}  onClick={() => {setRedirect(1)}}> Function Three </Button>
             */}
             </Box>
        </div>

//onClick={() => {setRedirect(1)}}
    )
}
export default AdminView