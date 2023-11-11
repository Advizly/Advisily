import React, { useEffect, useState } from 'react';
import { InputLabel, MenuItem, Select, Button, Box } from "@mui/material";
import { useParams, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useApi } from '../hooks';
import adminService from '../services/adminService';

function AdminCreateCatalog() {
  const [copyCatalog, setCopyCatalog] = useState();
  const [copyLastYear, setCopyLastYear] = useState(false);
  const history = useHistory(); // Add this line to get the history object

  const handleChange = (e) => {
    setCopyCatalog(e.target.value);
  };
  const { data: courses, request: copyRequest } = useApi(adminService.copyCatalog);

  useEffect(() => {
    const handleCopyAndRedirect = async () => {
      // Check if a catalog is selected before proceeding
      if (copyCatalog) {
        // Trigger the copy request
        const copyResponse = await copyRequest(copyCatalog, catalogId);

        // Check if the copy request was successful
          history.push(`/admin/editcatalog/${catalogId}`);
      } else {
        // Handle the case where no catalog is selected
        console.error('Please select a catalog before copying courses.');
      }
    };

    // Check if the button to trigger the copy has been clicked
    if (copyLastYear) {
      // Reset the flag
      setCopyLastYear(false);

      // Call the function to copy and redirect
      handleCopyAndRedirect();
    }
  }, [ copyLastYear, history, copyRequest]);

  const handleCopyLastYear = () => {
    // Trigger the useEffect logic when the button is clicked
    setCopyLastYear(true);
  };

  const { majorId, catalogId } = useParams();
  const { data, request } = useApi(adminService.getYears);

  useEffect(() => {
    request(majorId);
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh', // This will make sure the content is centered vertically
        padding: '20px', // Add some padding to the box
      }}
    >
      <InputLabel fontSize={15} sx={{ marginTop: 4 }} id="demo-simple-select-label">
        Select Catalog
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        size="small"
        id="demo-simple-select"
        value={copyCatalog}
        label="Select Catalog"
        onChange={handleChange}
      >
        {/* Map over data to create MenuItem options */}
        {data.map((year) => (
          <MenuItem key={year.catalogId} value={year.catalogId}>
            {year.year}
          </MenuItem>
        ))}
      </Select>

      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
          onClick={() => history.push(`/admin/editcatalog/${catalogId}`)}
        >
          Add Courses Directly
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCopyLastYear}
          disabled={!copyCatalog} // Disable the button if no catalog is selected
        >
          Copy Courses
        </Button>
      </Box>
    </Box>
  );
}

export default AdminCreateCatalog;
