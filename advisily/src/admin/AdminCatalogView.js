// AdminCatalogView.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, MenuItem, Select, TableCell, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
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

  const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};

//===============================================================
//                     C R U D    T A B L E 
//===============================================================


const initialRows = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
  
  ];
  //=======/=======/=======/=======/=======/=======/=======/=======/=======
  
  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = randomId();
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  //=======/=======/=======/=======/=======/=======/=======/=======/=======
  function FullFeaturedCrudGrid({ courseData }) {
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
      setRows(rows.filter((row) => row.id !== id));
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
  

  function AdminCatalogView() {
    const { catalogId } = useParams();
    const { data, request } = useApi(adminService.getCatalogCourses);
  
    React.useEffect(() => {
      request(catalogId);
    }, []);
  
  
    // Group courses by semester
    const coursesBySemester = data.reduce((acc, course) => {
      const semesterNumber = course.semesterNumber;
  
      if (!acc[semesterNumber]) {
        acc[semesterNumber] = [];
      }
  
      acc[semesterNumber].push(course);
  
      return acc;
    }, {});
  
    return (
      <Grid container spacing={2}>
        {/* Map over semesters and display FullFeaturedCrudGrid for each semester */}
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
                backgroundColor: '#00838f',
                textAlign: 'center',
              }}
            >
              Semester {semesterNumber}
            </Typography>
            <FullFeaturedCrudGrid courseData={courses} />
          </Grid>
        ))}
      </Grid>
    );
  }

export default AdminCatalogView;
