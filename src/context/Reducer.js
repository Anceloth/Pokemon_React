const Reducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER_LOGGUED':
            return {
                ...state,
                userLogged: action.payload.user,
                token: action.payload.token,
                isLoggedIn: true
            };
        case 'SET_USERS':
            return {
                ...state,
                userList: action.payload,
                filterList: action.payload,
            };
        case 'SET_USER':
            return {
                ...state,
                selectedUser: action.payload.user,
                imgChar: action.payload.img
            };
        case 'SET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload
            };
        case 'SET_POKEMON':
            return {
                ...state,
                selectedpokemon: action.payload.pokemon,
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};

export default Reducer;