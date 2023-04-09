import { proxy } from "valtio";

const state =proxy({
    backendurl:'https://rentroom-app-backend.onrender.com/'
});

export default state;