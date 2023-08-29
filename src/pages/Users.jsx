
import { Box, Grid } from "@material-ui/core";
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Store';
import pokemons from '../api/PokeApiGraphQL';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const useStyles = makeStyles((theme) => ({
    gridContainer:{
        paddingLeft: "2em",
        paddingRight: "2em",
    },
    root: {
        marginBottom: '30px',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        maxWidth: 600,
      },
      input: {
        marginLeft: theme.spacing(1),
        flex: 1,
      },
      iconButton: {
        padding: 8,
      },
      divider: {
        height: 28,
        margin: 4,
      },
}));

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'User',
    width: 150,
    editable: true,
  },
  {
    field: 'userName',
    headerName: 'User Name',
    sortable: false,
    width: 220,
    editable: true,
  }
  
];

const Users = (props) => {
    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    console.log(" Page :",state.page);

    const getDetails = (e) =>{
      console.log("Getting details E: ", e.row);
      dispatch({type:'SET_USER',payload: { user: e.row}});
      history.push({
        pathname: `/detail`,
        state:{user: e.row}
      });
    }

    const classes = useStyles();
    
    useEffect(() => {

      const loadUsers = (status) => {
        pokemons.users.getUsersList(status).then(response => {
          console.log("response: ", response.getAllUser);
          if(response.getAllUser){
              console.log("Inside success ")
              dispatch({type:'SET_USERS',payload: response.getAllUser });
          }else{
            console.log("Inside Error ")
            dispatch({type:'SET_ERROR',payload: "error" });
          }
        });
      };

      loadUsers("");
      
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
    
    const orderList = state.filterList;
    return (
      <div className="App" >
        <Grid container spacing={5} className={classes.gridContainer}
                justify={"center"}>
            <Box paddingTop={'50px'}></Box>
        </Grid>

        <Grid container spacing={5} className={classes.gridContainer}
                justify={"center"}>
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={orderList}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              onRowClick={getDetails}
            />
          </Box>
        </Grid>
      </div> 
    );
}


export default Users;