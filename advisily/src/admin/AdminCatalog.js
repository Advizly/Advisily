import {useState, useEffect} from 'react'
import {InputLabel,MenuItem} from "@mui/material"
import {Select} from "@mui/material"
import * as React from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import {Grid} from '@mui/material'
import adminService from '../services/adminService.js';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import useApi from '../hooks/useApi.js';

//===============================================================
//                   A D M I N   C A T A L O G 
//===============================================================



function AdminCatalogList() {

  
  const history =useHistory();
  const {majorId} = useParams();
  const { data, request } = useApi(adminService.getYears);

  useEffect(() => {
    request(majorId);
  }, []);

  

  const [catalog, setCatalog] = useState(-1);
  const [showComboBox, setShowComboBox] = useState(false);
  const handleChange = (e) => {
    setCatalog(e.target.value);
  };

  const handleAddCatalogClick = () => {
   
    setShowComboBox(true);


  };

  const handleNext = () => {
         
    history.push('/admin/createcatalog');
  
  };

  const handleCatalogSelection = () => {
    if (catalog !== -1) {
      history.push(`/admin/catalog/${catalog}`);
    }
  };

  return (
    <div>
      <Box textAlign="center">
        <Typography fontSize={20} sx={{ marginTop:7 }}>
          View Catalogs
        </Typography>
        <Typography fontSize={20} sx={{ marginTop: 0 }}>
          __________________
        </Typography>

        <InputLabel
          fontSize={15}
          sx={{ marginTop: 4 }}
          id="demo-simple-select-label"
        >
          Select Catalog
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={catalog}
          label="Select Catalog"
          onChange={handleChange}
        >
          {data.map((year) => (
            <MenuItem key={year.catalogId} value={year.catalogId}>
              {year.year}
            </MenuItem>
          ))}

          <MenuItem value={-1}>Catalog Year</MenuItem>
        </Select>
        <Typography fontSize={20} sx={{ marginTop: 3 }}>
  
          </Typography>
        <div
          style={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
           
          <button
       
            className="btn btn-lg"
            onClick={handleCatalogSelection}
          >
            Go to Plan
          </button>
          </div>

          <Typography fontSize={20} sx={{ marginTop: 3 }}>
            __________________
          </Typography>

          <Typography fontSize={18} sx={{ marginTop: 4, color: "#757575" }}>
            Add a New Catalog
          </Typography>

          <Button
            sx={{ color: "#ef6c00" }}
            startIcon={<AddIcon />}
            onClick={handleAddCatalogClick}
          >
            Add record
          </Button>
      </Box>
      {showComboBox && (<div> <DataGrid hideFooter= 'true' editMode="row" 
        
        columns={[{ field:'Catalog Year', width: 130, editable: true, type: 'string', }, {field:'Core Credits', width: 130, editable: true, type: 'number'}, 
        {field:'Concentration Requirements Credits', width: 290, editable: true, type: 'number'}, {field: 'Collateral Requirements Credits', width: 250, editable: true, type: 'number'},
        {field: 'General Electives Credits', width: 200, editable: true, type: 'number'}, {field: 'Engineering Core Credits' , width: 200, editable: true, type: 'number'}]}
        rows={[{ id: 1, values : null },]}/> 

        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '2vh' }}>    
             <button className="btn btn-primary btn-lg" onClick={handleNext} >Next →  </button> 
        </Grid ></div>)
      
      }
    </div>
  );
}

export default AdminCatalogList;


/*        */