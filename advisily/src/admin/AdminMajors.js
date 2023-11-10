import { useState } from 'react';
import { InputLabel, MenuItem } from '@mui/material';
import { Select } from '@mui/material';
import * as React from 'react';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router-dom'; // Import useHistory
import adminService from '../services/adminService';
import useApi from '../hooks/useApi';
import { Button } from "@mui/material";

function AdminMajors() {
  const { data, request } = useApi(adminService.getAllMajors);
  React.useEffect(() => {
    request();
  }, []);
  const history = useHistory(); // Initialize history from React Router

  const [major, setMajor] = useState(-1);

  const handleChange = (e) => {
    setMajor(e.target.value);
  };

  const handleMajorSelection = () => {
    if (major !== -1) {
      // Navigate to the selected major's catalog
      history.push(`/admin/catalogs/${major}`);
    }
  };

  const menuItems = data.map((item) => (
    <MenuItem key={item.majorId} value={item.majorId}>
      {item.majorTitle}
    </MenuItem>
  ));

  return (
    <div>
      <Box textAlign="center">
        <Typography fontSize={25} sx={{ marginTop: 15 }}>
          Please select a major
        </Typography>

        <InputLabel fontSize={15} sx={{ marginTop: 5 }} id="demo-simple-select-label">
          Select Major
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size="small"
          id="demo-simple-select"
          value={major}
          label="Select Major"
          onChange={handleChange}
        >
          {menuItems}
        </Select>
        <Typography fontSize={25} sx={{ marginTop: 5}}>
          
        </Typography>
        <button className="btn btn-lg" onClick={handleMajorSelection}>Go to Catalog</button>
        {/* <button className="btn btn-lg"> Previous result</button> */}

      </Box>
    </div>
  );
}

export default AdminMajors;
