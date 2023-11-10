import { Navigate, redirect } from 'react-router-dom'
import {useState, useEffect} from 'react'
import {InputLabel,MenuItem} from "@mui/material"
import {Select} from "@mui/material"
import * as React from 'react';
import { MaterialReactTable } from 'material-react-table';
import { data } from './makeData.js';
import { useMemo } from 'react';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import adminService from '../services/adminService.js';


import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import useApi from '../hooks/useApi.js';



//===============================================================
//                   A U T O C O M P L E T E 
//===============================================================


function ComboBox() {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={topFilms}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { label: 'The Shawshank Redemption', year: 1994 },

  { label: 'Forrest Gump', year: 1994 },
 
  { label: 'WALL·E', year: 2008 },

  
];




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

  const handleCatalogSelection = () => {
    if (catalog !== -1) {
      history.push(`/admin/catalog/${catalog}`);
    }
  };

  return (
    <div>
      <Box textAlign="center">
        <Typography fontSize={20} sx={{ marginTop: 10 }}>
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
        <div
          style={{
            marginTop: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ color: "#1976D2", marginRight: 2 }}
            onClick={handleCatalogSelection}
          >
            View Catalog
          </Button>
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
      {showComboBox && <ComboBox />}
    </div>
  );
}

export default AdminCatalogList;


/*        */