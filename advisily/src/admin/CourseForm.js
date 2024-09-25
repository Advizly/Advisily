import React, { useEffect, useState } from 'react';
import { Autocomplete, Grid, TextField, Typography, Select, MenuItem, InputLabel } from '@mui/material';
import useApi from '../hooks/useApi';
import adminService from '../services/adminService';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const CourseForm = ({ onAddCourse }) => {
  const [courseId, setCourseId] = useState();
  const [semesterNumber, setSemesterNumber] = useState();
  const [courseTypeId, setCourseTypeId] = useState('');
  const [isAddButtonDisabled, setAddButtonDisabled] = useState(true);
  const {data: types, request: requestTypes} = useApi(adminService.getTypes);
  const { data, request } = useApi(adminService.getAllCourseNames);
  useEffect(()=>{
    requestTypes();
  }, [])
  useEffect(() => {
    request();
  }, []);

  
  const handleAddCourse = () => {
    // Perform any additional validation or processing here
    // Call the onAddCourse prop with the course name, semester number, and course type
    onAddCourse({ courseId, semesterNumber }, {courseId, courseTypeId});

    // Reset form after adding the course
    setCourseId('');
    setSemesterNumber('');
    setCourseTypeId('');
    setAddButtonDisabled(true);
  };

  const validateSemesterNumber = (value) => {
    // Validate that the semester number is a positive number
    return /^[1-9]\d*$/.test(value);
  };

  useEffect(() => {
    // Enable/disable the "Add Course" button based on validation
    setAddButtonDisabled(!courseId || !validateSemesterNumber(semesterNumber) || !courseTypeId);
  }, [courseId, semesterNumber, courseTypeId]);



  return (
    <div>
      
      <Modal
        open={true}
        onClose={()=>{}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '2vh' }}>
        <Typography fontSize={20} sx={{ marginTop: 10 }}>
          Add course name, semester number, and type
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={data}
          getOptionLabel={(option) => option.courseTitle} // Specify how to display option labels
          sx={{ width: 300, marginTop: 5 }}
          renderInput={(params) => <TextField {...params} label="Course Name" />}
          isOptionEqualToValue={(option, value) => {
            return option.courseTitle === value.courseTitle;
          }}
          onChange={(event, value) => {
            setCourseId(value?.courseId || ''); // Set courseName to the selected courseTitle
          }}
        />
        <TextField
          sx={{ marginTop: 2 }}
          label="Semester number"
          value={semesterNumber}
          onChange={(e) => setSemesterNumber(e.target.value)}
        />
        <InputLabel sx={{ marginTop: 2 }}>Course Type</InputLabel>
        <Select
          label="Course Type"
          value={courseTypeId}
          onChange={(e) => setCourseTypeId(e.target.value)}
          sx={{ width: 300, marginTop: 2 }}
        >
          {types.data && types.data.map((type) => (
            <MenuItem key={type.courseTypeId} value={type.courseTypeId}>
              {type.courseType}
            </MenuItem>
          ))}
        </Select>
        <Typography fontSize={20} sx={{ marginTop: 2 }}></Typography>
        <button className="btn btn-primary btn-lg" onClick={handleAddCourse} disabled={isAddButtonDisabled}>
          Add Course
        </button>
      </Grid>
    </div>
  );
};

export default CourseForm;
