import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import Layout from "../components/Layout";
import NotFound from "../components/NotFound";
import { Context } from "../context/Store";
import Users from "../pages/Users";
import UserDetail from "../pages/UserDetail";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import Login from "../pages/Login";
import { useContext } from "react";


function App() {

  const [state] = useContext(Context);
  return (
    <BrowserRouter>
      <div className="App">
        
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <Layout>
            <Switch>
              {state.isLoggedIn ? 
              <>
                  <Route exact path="/users" component={Users} />
                  <Route exact path="/detail/" component={UserDetail}/>
              </> : 
                  <Route exact path="/" component={Login} />
              };
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </LocalizationProvider>
        
        
      </div>
    </BrowserRouter>
  );
}

export default App;
