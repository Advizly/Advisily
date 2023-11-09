import { Navigate, redirect } from 'react-router-dom'
import {useState} from 'react'
import {InputLabel,MenuItem} from "@mui/material"
import {Select} from "@mui/material"
import * as React from 'react';
import { data } from './makeData.js';
import { useMemo } from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Height } from '@mui/icons-material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
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
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
  return randomArrayItem(roles);
};


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
 function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
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

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
    },
    {
      field: 'joinDate',
      headerName: 'Join date',
      type: 'date',
      width: 180,
      editable: true,
    },
    {
      field: 'role',
      headerName: 'Department',
      width: 220,
      editable: true,
      type: 'singleSelect',
      valueOptions: ['Market', 'Finance', 'Development'],
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
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
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}



//===============================================================
//                   A D M I N   C A T A L O G 
//===============================================================



function AdminCatalog() {
  const {majorId} = useParams();
  
    const [catalog,setCatalog] = useState(-1);
      const [showComboBox, setShowComboBox] = useState(false);

    const handleChange = (e)=> {
        setCatalog(e.target.value);

    }
    const crudGrid = catalog !== -1 ? <FullFeaturedCrudGrid /> : null;
    const comboBox = <ComboBox />;
    const handleAddCatalogClick = () => {
      setShowComboBox(true);
    };
  
    if(catalog === -1){
        return (<div> 
          <Box textAlign='center'>
          <Typography fontSize={20} sx = {{marginTop: 10 }} >View Catalogs </Typography>
          <Typography fontSize={20} sx = {{marginTop: 0}} >__________________ </Typography>

          <InputLabel fontSize ={15}  sx = {{marginTop: 4}} id="demo-simple-select-label">Select Catalog</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          size = "small"
          id="demo-simple-select"
          value={catalog}
          label="Select Catalog"
          onChange={handleChange} 
        >
          <MenuItem value={10}>2019-2020</MenuItem>
          <MenuItem value={20}>2020-2021</MenuItem>
          <MenuItem value={30}>2021-2022</MenuItem>
          <MenuItem value={40}>2022-2023</MenuItem>
          <MenuItem value={-1}>Catalog Year</MenuItem>
        </Select> 
        <Typography fontSize={20} sx = {{marginTop: 3}} >__________________ </Typography>

        {/* <Typography fontSize={20} sx = {{marginTop: 4,color: "#424242" }} >- or -</Typography> */}
        <Typography fontSize={18} sx = {{marginTop: 4, color: "#757575" }} >Add a New Catalog </Typography>

        <Button sx= {{color: "#ef6c00" }} startIcon={<AddIcon />} onClick={handleAddCatalogClick} >
        Add record
      </Button>
        </Box> 
        {showComboBox && <ComboBox />}

        </div>
        
        );
    }
    else{
    return (
      <Grid>
      <Grid item sm={6}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"white",marginTop: 2, marginBottom:3, fontSize: 25, backgroundColor : "#00838f", textAlign : "center"}}>
      Semester 2
     </Typography>
      {crudGrid} 
      </Grid>
      <Grid item sm={6}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"white",marginTop: 2, marginBottom:3, fontSize: 25, backgroundColor : "#00838f", textAlign : "center"}}>
      Semester 2
     </Typography>
    {crudGrid} 
    </Grid>
    <Grid item sm={6}>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color:"white",marginTop: 2, marginBottom:3, fontSize: 25, backgroundColor : "#00838f", textAlign : "center"}}>
    Semester 2
   </Typography>
    {crudGrid} 
  </Grid>
  </Grid>
    
      
    )

}
}
export default AdminCatalog

/*        */