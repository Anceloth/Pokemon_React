import React, {createContext, useReducer} from "react";
import Reducer from './Reducer'


const initialState = {
    userLogged: {},
    token: "",
    isLoggedIn: false,
    userList: [],
    filterList:[],
    pokemons:[],
    selectedUser: null,
    selectedPokemon: null,
    page:1,
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;