import { proxy } from "valtio";

const state =proxy({
    backendurl:process.env.REACT_APP_BACKEND
    //https://rentroom-app-backend.onrender.com/
});

export default state;