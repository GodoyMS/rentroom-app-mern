import { proxy } from "valtio";

const state =proxy({
    backendurl:'http://localhost:4000/'
    //https://rentroom-app-backend.onrender.com/
});

export default state;