import React, { useContext, useState } from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import pokemons from '../api/PokeApiGraphQL';
import { Context } from '../context/Store';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login=()=>{
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [state, dispatch] = useContext(Context);
    const history = useHistory();

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    const submit=()=>{
      pokemons.users.login(userName, password).then(response => {
        console.log("response: ", response.signin);
        if(response.signin){
            console.log("LoggedIn ")
            dispatch({type:'SET_USER_LOGGUED',payload: {user: response.signin.user, token:response.token } });
            history.push({
              pathname: `/users`
            });
        }else{
          console.log("Inside Error ")
          dispatch({type:'SET_ERROR',payload: "Is not possible Loggin" });
        }
      });
    }
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField value={userName} onChange={(e) => setUserName(e.target.value)} label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField value={password} onChange={(e) => setPassword(e.target.value)} label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                  />
                <Button onClick={submit} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                    <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                    <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login