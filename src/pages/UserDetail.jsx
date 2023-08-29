
import CreativeCard from '../components/CreativeCard';
import { Grid, Switch } from "@material-ui/core";
import { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Store';
import pokemonAPI from '../api/PokeApiGraphQL';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const columns = [
  { field: 'id', headerName: 'id', width: 150,  },
  { field: 'name', headerName: 'name', width: 250 },
  {
    field: 'url',
    headerName: 'Url',
    width: 300,
  },  
];

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

const UserDetail = (props) => {
    const [state, dispatch] = useContext(Context);
    const [wantAllPokemons, setWantAllPokemons ] = useState(false);
    const history = useHistory();
    let user = state.selectedUser || "";
    let pokemonsFav = state.selectedUser.pokemons;
    let allPokemons = state.pokemons;

    console.log("All Pokemons:", allPokemons)

    const classes = useStyles();
    
    useEffect(() => {
      const loadPokemons = async () => {
        const response = await pokemonAPI.pokemons.getAllPokemons();
        console.log("response:", response)
        if(response.getAllPokemon){
            const pokemonsWithId=response.getAllPokemon.map((pokeObject, id) => {return {id: id+1, ...pokeObject}})
            dispatch({type:'SET_POKEMONS',payload: pokemonsWithId });
        }else{
            dispatch({type:'SET_ERROR',payload: "error" });
        }
      };
      loadPokemons();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const addPokemonToUser = async (e) =>{
      console.log("Getting details E: ", e.row);
      let pokemonDTO = {
        pokemonName: e.row.name,
        urlPokemon: e.row.url,
        userName: user.userName
      }
      const response = await pokemonAPI.pokemons.addPokemonToUser(pokemonDTO);
      if(response.data){
        console.log("Updating User:", response.data);
        dispatch({type:'SET_USER',payload: { user: response.data.addPokemonToUser}});
      }else if (response.errors){
        console.log("Error:", response.errors[0].message);
        alert(response.errors[0].message);
      }
      history.push({
        pathname: `/detail`,
        state:{pokemon: e.row}
      });
    }

    const handleChange = (event) => {
      setWantAllPokemons(event.target.checked);
    };
    
    return (
      <>
        <div className="App">

          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '25ch', marginTop: '40px' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-read-only-input"
                label="User Id"
                defaultValue={user.id}
                InputProps={{
                  readOnly: true,
                }} />
              <TextField
                id="outlined-read-only-input"
                label="Name"
                defaultValue={user.name}
                InputProps={{
                  readOnly: true,
                }} />
              <TextField
                id="outlined-read-only-input"
                label="Shipping Promise"
                defaultValue={user.userName}
                InputProps={{
                  readOnly: true,
                }} />
            </div>
          </Box>

          <h2>Pokemons favorites</h2>

          <Grid container spacing={5} marginTop='40px'
            justify={"center"}>

            {pokemonsFav.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CreativeCard item={item}></CreativeCard>
              </Grid>
            ))}
          </Grid>
        </div>
        
        <h2>Add pokemons to favorites</h2>

        <Switch
          checked={wantAllPokemons}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      
        {wantAllPokemons ? (
            <div className="App">
              <Grid container spacing={5} className={classes.gridContainer}
                justify={"center"}>
                  <Box paddingTop={'50px'}></Box>
              </Grid>

              <Grid container spacing={5} className={classes.gridContainer}
                justify={"center"}>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                      rows={allPokemons}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 20,
                          },
                        },
                      }}
                      pageSizeOptions={[20]}
                      onRowClick={addPokemonToUser} />
                </Box>
              </Grid>
        </div>) : null}
      </>
    );
}


export default UserDetail;