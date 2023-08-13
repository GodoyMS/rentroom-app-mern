import { Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./utils/UserContext";
import axios from "axios";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Account from "./components/Account/Account";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Favorites from "./components/Account/Favorites/Favorites";
import RentPlacesAccount from "./components/Account/RentPlaces/RentPlacesAccount";
import RentPlaceForm from "./components/Account/RentPlaceForm/RentPlaceForm";
import RentPlace from "./components/RentPlace/RentPlace";
import AccountButtons from "./components/Layout/AccountButtons/AccountButtons";
import RentPlaceId from "./components/Account/RentPlaceId.jsx/RentPlaceId";
import PaletteTheme from "./utils/PaletteTheme";

import state from "./store";
import { useSnapshot } from "valtio";
import Footer from "./components/Footer/Footer";
import LeftCornerGitHub from "./components/LeftCornerGithub/LeftCornerGithub";
import { backendURL } from "./config/config";

function App() {
  const snap = useSnapshot(state);
  axios.defaults.baseURL = backendURL;
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <ThemeProvider theme={PaletteTheme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/rentplace/:id" element={<RentPlace />} />

            <Route path="/account/" element={<AccountButtons />}>
              <Route path="/account/profile" element={<Account />} />
              <Route path="/account/favorites" element={<Favorites />} />
              <Route
                path="/account/rentplaces"
                element={<RentPlacesAccount />}
              />
              <Route
                path="/account/rentplace/new"
                element={<RentPlaceForm />}
              />
              <Route path="/account/rentplaces/:id" element={<RentPlaceId />} />
            </Route>
          </Route>
        </Routes>
        <LeftCornerGitHub />
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
