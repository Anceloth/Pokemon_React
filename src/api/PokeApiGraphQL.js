import axios from 'axios';

const urlPokeAPi = "http://localhost:3030/graphql";

const headers = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json"
});

const pokemonAPI = {
  users: {

    login: async (userName, password) => {
      const query_graphql = `{
        signin(signIn:{userName:"${userName}", password: "${password}"}){
          token, user{
            id, userName, name,
          }
        }
      }`;

      console.log(" QUERY: ", query_graphql);

      try {
        const response = await axios({
          url: urlPokeAPi,
          method: 'POST',
          data: {
            query: query_graphql,
          },
        })

        console.log("from login api:", response.data.data);
        return await response.data.data;
        
      } catch (error) {
        throw new Error(error);
      }
    },

    getUser: async (payload) => {
        throw new Error("Method not implemented");
    },
    
    getUsersList:  async (status)=>{
      console.log(`${urlPokeAPi}`);

      const query_graphql = `{
        getAllUser{
          id, name, userName,
          pokemons{name,url}
        }
      }`;

      console.log(" QUERY: ", query_graphql);

      try {
        const response = await axios({
          url: urlPokeAPi,
          method: 'POST',
          data: {
            query: query_graphql,
          },
        })

        console.log("from api:", response.data.data);
        return await response.data.data;
        
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  pokemons:{
    getAllPokemons:  async (status)=>{
      console.log(`${urlPokeAPi}`);

      const query_graphql = `{
        getAllPokemon{
          name, url
        }
      }`;

      console.log(" QUERY: ", query_graphql);

      try {
        const response = await axios({
          url: urlPokeAPi,
          method: 'POST',
          data: {
            query: query_graphql,
          },
        })

        console.log("from API:", response.data.data);
        return await response.data.data;
        
      } catch (error) {
        throw new Error(error);
      }
    },
    addPokemonToUser : async (addPokemonDTO) => {

      const query_graphql = ` mutation {
        addPokemonToUser(pokemonDTO: {
          pokemonName: "${addPokemonDTO.pokemonName}", 
          urlPokemon: "${addPokemonDTO.urlPokemon}", 
          userName: "${addPokemonDTO.userName}"})
          {
            id, userName, name, pokemons{
              name, url
            } 
        }
      }`;

      console.log(`Getting Pokemons from user: ${addPokemonDTO?.userName}`)
      console.log(" QUERY: ", query_graphql);

      try {
        const response = await axios({
          url: urlPokeAPi,
          method: 'POST',
          data: {
            query: query_graphql
          },
        })

        console.log("response:", response.data);
        return await response.data;
        
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};

export default pokemonAPI;

