import { proxy } from "valtio";

const state =proxy({
    backendurl:'https://blooming-tundra-37888.herokuapp.com/'
    //https://rentroom-app-backend.onrender.com/
});

export default state;