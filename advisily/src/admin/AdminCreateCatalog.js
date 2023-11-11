import React, {useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes, redirect, Redirect, Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import { Autocomplete, Button } from "@mui/material";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
//import Autocomplete from '@mui/material/Autocomplete';
import adminService from '../services/adminService.js';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import useApi from '../hooks/useApi.js';
import { useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';


//====================================


//====================================

function AdminCreateCatalog() {
  const history =useHistory();
  const [catalog,setCatalog] = useState(-1);
  const [addCourseClicked, setAddCourseClicked] = useState(false);
  const [courseName, setCourseName] = useState(null);
  const [courseId, setCourseId] = useState(null);

    

  const {courseTitle} = useParams();
  const { data, request } = useApi(adminService.getAllCourseNames);
  useEffect(() => {
    request(courseTitle);
  }, []);

  console.log(data)
  console.log(courseName)
  useEffect(() => {
    const getCourseId = async () => {
      if (courseName != null) {
        const courseId = await adminService.getCourseIdByCourseName(courseName);
        setCourseId(courseId);
      }
    };

    getCourseId();
  }, [courseName]);
  // const getCourseIdByCourseName = (courseName) => {
  //  adminService.getCourseIdByCourseName(courseName).then((response) => {
  //     setCourseId(response.data);
  //   });
  // };

  // if (courseName != null )
  // {getCourseIdByCourseName(courseName)}
  console.log(courseId)
  if(!addCourseClicked){
  return (<div>       
     <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '2vh' }}>    

    <Typography fontSize={20} sx={{ marginTop: 10 }}>
      Add course name and semester number
    </Typography>
    <Autocomplete 
      disablePortal
      id="combo-box-demo"
      options={data}
      sx={{ width: 300, marginTop: 5 }}
      renderInput={(params) => <TextField {...params} label="Course Name" />}
      onChange={(event, value) => {
        setCourseName(value)}}
    />
    
    <TextField sx = {{marginTop: 2}}  label="Semester number" />
    <Typography fontSize={20} sx={{ marginTop: 2 }}>
     
    </Typography>
    <button  className="btn btn-primary btn-lg" onClick={() => {
      setAddCourseClicked(true);
    }} >Add Course</button>

    </Grid>
    </div>
    
  );}
else if (addCourseClicked){

return (<div>       
  
 </div>
 
);
}
}
export default AdminCreateCatalog;