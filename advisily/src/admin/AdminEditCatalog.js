import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, IconButton, MenuItem, Select, TableCell, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
  } from '@mui/x-data-grid';
  import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
  } from '@mui/x-data-grid-generator';
import { useApi } from '../hooks';
import adminService from '../services/adminService';
import CourseForm from './CourseForm';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

  const roles = ['Market', 'Finance', 'Development'];


//===============================================================
//                     C R U D    T A B L E 
//===============================================================



 
function FullFeaturedCrudGrid({ courseData, onCourseDelete }) {
  const [rows, setRows] = React.useState(courseData.map((course) => ({ ...course, id: course.courseId })));
    const [rowModesModel, setRowModesModel] = React.useState({});
  
    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };
  
    const handleEditClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };
    
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
  
    const handleDeleteClick = (id) => () => {
      const deletedCourse = rows.find((row) => row.id === id);
      setRows(rows.filter((row) => row.id !== id));
  
      // Call the onCourseDelete callback with the courseId of the deleted course
      onCourseDelete(deletedCourse.courseId);
    };
  
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });

      
  
      const editedRow = rows.find((row) => row.id === id);
      if (editedRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
      }
    };
  
    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    };
  
    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };
    const [openDropdownId, setOpenDropdownId] = useState(null);

    const columns = [
      { field: 'courseCode', headerName: 'Course Code', width: 120, editable: true },
      { field: 'courseTitle', headerName: 'Course Title', width: 250, editable: true },
      { field: 'credits', headerName: 'Credits', type: 'number', width: 100, editable: true },
      {
        field: 'courseId',
        headerName: 'Actions',
        width: 120,
        cellClassName: 'actions',
        renderCell: (params) => (
          <IconButton
            onClick={handleDeleteClick(params.row.id)}
            color="inherit"
            aria-label="delete"
          >
            <DeleteIcon style={{ color: 'red' }} />
          </IconButton>
        ),
      },
      //ADD A FIELD FOR REQUISITES
      // Add more columns based on your course data structure
    ];
  
    return (
      <Box
        sx={{
          height: 500,
          width: '100%',
          '& .actions': {
            color: 'text.secondary',
          },
          '& .textPrimary': {
            color: 'text.primary',
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // ... (existing props)
        />
      </Box>
    );
  }
  

  function AdminEditCatalog() {
    const { catalogId } = useParams();
    const { data, request } = useApi(adminService.getCatalogCourses);
    const { request: requestAddPlan } = useApi(adminService.addCoursetoPlan);
    const { request: requestAddCat } = useApi(adminService.addCoursetoCat);
    const [coursesBySemester, setCoursesBySemester] = useState({});
    const [newCoursePlan, setNewCoursePlan] = useState({});
    const [newCourseCat, setNewCourseCat] = useState({});

    const [removedCourse, setRemovedCourse] = useState({});
    const { request: requestRemove } = useApi(adminService.removeCourseFromPlan);



    
    useEffect(() => {
      request(catalogId)
    }, [catalogId]);
  
    // Group courses by semester
    useEffect(() => {
      const coursesBySemester = data.reduce((acc, course) => {
        const semesterNumber = course.semesterNumber;
  
        if (!acc[semesterNumber]) {
          acc[semesterNumber] = [];
        }
  
        acc[semesterNumber].push(course);
  
        return acc;
      }, {});

    
      setCoursesBySemester(coursesBySemester);
    }, [data]);

    useEffect(()=>{
      requestAddPlan(newCoursePlan);
      requestAddCat(newCourseCat);
    }, [newCoursePlan, newCourseCat])

    useEffect(()=>{
      requestRemove(removedCourse);
    }, [removedCourse])
  
    // Function to add a course
    const handleAddCourse = (newCoursePlan, newCourseCat) => {
      setNewCoursePlan({
        courseId: newCoursePlan.courseId,
        catalogId,
        semesterNumber: newCoursePlan.semesterNumber,
      });
      setNewCourseCat({
        courseId: newCourseCat.courseId,
        catalogId,
        courseTypeId: newCourseCat.courseTypeId,
      });
      window.location.reload(false);

    };

    const handleDeleteCourse = (deletedCourseId) => {
      const removeCourse = {courseId: deletedCourseId, catalogId: catalogId};
      setRemovedCourse(removeCourse);
    };
  
    return (
      <div>
        <Grid container spacing={2}>
          {Object.entries(coursesBySemester).map(([semesterNumber, courses]) => (
            <Grid item xs={6} key={semesterNumber}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: 'white',
                  marginTop: 2,
                  marginBottom: 3,
                  fontSize: 25,
                  backgroundColor: '#075b81',
                  textAlign: 'center',
                }}
              >
                Semester {semesterNumber}
              </Typography>
              <FullFeaturedCrudGrid courseData={courses} onCourseDelete={handleDeleteCourse} />
            </Grid>
          ))}
        </Grid>
        <CourseForm onAddCourse={handleAddCourse} />
      </div>
    );
  }
  
  export default AdminEditCatalog;
