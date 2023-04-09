import { proxy } from "valtio";

const state =proxy({
    backendurl:'http://localhost:4000/'
});

export default state;