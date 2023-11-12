import React, { useState, useEffect } from 'react';
import { InputLabel, MenuItem, Select, Button, Box, TextField, Grid } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import adminService from '../services/adminService.js';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import useApi from '../hooks/useApi.js';

function AdminCatalogList() {
  const history = useHistory();
  const { majorId } = useParams();
  const { data, request } = useApi(adminService.getYears);

  useEffect(() => {
    request(majorId);
  }, []);

  const [showComboBox, setShowComboBox] = useState(false);
  const [catalog, setCatalog] = useState(-1);
  const handleChange = (e) => {
    setCatalog(e.target.value);
  };
  const [errorMessage, setErrorMessage] = useState(null);

  const [newCatalog, setNewCatalog] = useState({
    majorId: majorId,
    year: '',
    coreCredits: 0,
    concReqCredits: 0,
    concElecCredits: 0,
    collateralCredits: 0,
    generalElecCredits: 0,
    engCoreCredits: 0,
  });

  const handleAddCatalogClick = () => {
    setShowComboBox(true);
  };

  const handleNext = async () => {
    try {
      // Perform validation
      if (!validateYear(newCatalog.year) || !validatePositiveNumbers(newCatalog)) {
        console.error('Invalid input. Please check the values.');
        setErrorMessage(`Failed to create catalog`);

        // Handle the error or show an error message
        return;
      }

      // Call the API to create a new catalog
      const response = await adminService.createCatalog(newCatalog);

      history.push(`/admin/createcatalog/${majorId}/${response.data.catalogId}`);
    } catch (error) {
      setErrorMessage(`Failed to create catalog.`);

      console.error('Error creating catalog:', error.message);
      // Handle the error or show an error message
    }
  };

  const handleCatalogSelection = () => {
    if (catalog !== -1) {
      history.push(`/admin/catalog/${catalog}`);
    }
  };

  const handleEdit = () => {
    // Redirect to the editcatalog page with the selected catalogId
    if (catalog !== -1) {
      history.push(`/admin/editcatalog/${catalog}`);
    }
  };

  const handleTextFieldChange = (e) => {
    setNewCatalog({
      ...newCatalog,
      [e.target.name]: e.target.value,
    });
  };

  const validateYear = (year) => {
    // Validate that the year is in the format "XXXX-XXXX" where X is a digit
    const yearRegex = /^\d{4}-\d{4}$/;
    return yearRegex.test(year);
  };

  const validatePositiveNumbers = (catalog) => {
    // Validate that all numeric fields (except "year") are positive numbers
    const numericFields = Object.keys(catalog).filter(field => field !== 'year');

    return numericFields.every(field => catalog[field] >= 0);
  };

  return (
    <div>
      <Box textAlign="center">
        <Typography fontSize={20} sx={{ marginTop: 7 }}>
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
        <Typography fontSize={20} sx={{ marginTop: 3 }}></Typography>
        <div
          style={{
            marginTop: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <button className="btn btn-lg" onClick={handleCatalogSelection}>
            Go to Plan
          </button>
          {catalog !== -1 && (
            <Button
              sx={{ color: '#ef6c00', marginLeft: 2 }}
              startIcon={<EditIcon />}
              onClick={handleEdit}
            >
              Edit
            </Button>
          )}
        </div>

        <Typography fontSize={20} sx={{ marginTop: 3 }}>
          __________________
        </Typography>
        <Button
          sx={{ color: '#ef6c00', marginTop: 2 }}
          startIcon={<AddIcon />}
          onClick={handleAddCatalogClick}
        >
          Add record
        </Button>
      </Box>
      {showComboBox && (
        <div>
          <Typography fontSize={18} sx={{ marginTop: 4, color: '#757575' }}>
            Add a New Catalog
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Year (e.g., 2023-2024)"
                type="text"
                onChange={handleTextFieldChange}
                name="year"
                value={newCatalog.year}
                error={!validateYear(newCatalog.year)}
                helperText={!validateYear(newCatalog.year) && "Invalid year format"}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Core"
                type="number"
                onChange={handleTextFieldChange}
                name="coreCredits"
                value={newCatalog.coreCredits}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Concentration Requirement"
                type="number"
                onChange={handleTextFieldChange}
                name="concReqCredits"
                value={newCatalog.concReqCredits}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Concentration Elective"
                type="number"
                onChange={handleTextFieldChange}
                name="concElecCredits"
                value={newCatalog.concElecCredits}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Collateral"
                type="number"
                onChange={handleTextFieldChange}
                name="collateralCredits"
                value={newCatalog.collateralCredits}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="General Elective"
                type="number"
                onChange={handleTextFieldChange}
                name="generalElecCredits"
                value={newCatalog.generalElecCredits}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Engineering Core"
                type="number"
                onChange={handleTextFieldChange}
                name="engCoreCredits"
                value={newCatalog.engCoreCredits}
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: 10 }}>
            <button className="btn btn-primary btn-lg" onClick={handleNext}>
              Next →{' '}
            </button>
          </div>

          {errorMessage && (
          <Typography color="error" variant="subtitle1" sx={{ marginTop: 2 }}>
            {errorMessage}
          </Typography>
        )}
        </div>
      )}
    </div>
  );
}

export default AdminCatalogList;
