import { IconButton, InputBase, makeStyles, Paper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { useContext } from 'react';
import { Context } from '../context/Store';

const useStyles = makeStyles((theme) => ({
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

const SearchBar = () =>{
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  const searchUsers=(event)=>{
    console.log("char to search: "+event.target.value.length)
    if(event.target.value.length>0){
        dispatch({type:'FILTER_USERS', payload: event.target.value})
    }else{
        dispatch({type:'SET_USERS', payload: state.userList})
    }
  };

  return(
    <>
      <Paper component="form" className={classes.root}>
        <IconButton className={classes.iconButton} aria-label="menu">
            <MenuIcon />
        </IconButton>
        <InputBase
            className={classes.input}
            placeholder="Search by Status"
            inputProps={{ 'aria-label': 'search google maps' }}
            onChange={searchUsers}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
        </IconButton>
      </Paper>
    </>
    )
}

export default SearchBar;