import { useContext } from "react";
import { Context } from "../context/Store";

const Header = (props) =>{
  const [state] = useContext(Context);
    return(
      <header className="App-header">
        <h2>Pokemon cards  --<code> {state.userLogged?.userName}</code></h2> 
      </header>
    );
};

export default Header;