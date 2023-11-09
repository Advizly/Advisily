import { Navigate, redirect } from 'react-router-dom'
import {useState} from 'react'
import {InputLabel,MenuItem} from "@mui/material"
import {Select} from "@mui/material"
import * as React from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData.js';
import { useMemo } from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Height } from '@mui/icons-material';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function AdminMajors() {
    const [major,setMajor] = useState(-1);
    const handleChange = (e)=> {
        setMajor(e.target.value);}
    
    if(major === -1){
        return (<div> 
          <Box textAlign='center'>
          <Typography fontSize={25} sx = {{marginTop: 15}} >Please select a major</Typography>

          <InputLabel fontSize ={15}  sx = {{marginTop: 5}} id="demo-simple-select-label">Select Major</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size = "small"
          id="demo-simple-select"
          value={major}
          label="Select Major"
          onChange={handleChange} 
        >
          <MenuItem value={10}>Computer Science</MenuItem>
          <MenuItem value={20}>Computer Engineeirng</MenuItem>
          <MenuItem value={-1}>Select Major</MenuItem>
        </Select> 
        </Box> 
        </div>);
    }
    // else if(major === 10) {
      
    //   //navigate('/admin/catalog');

    //    // return <Link to="/admin/catalog">Computer Science</Link>

    // }
}
export default AdminMajors

/*        */