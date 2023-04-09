import React from 'react'
import {Outlet,NavLink} from "react-router-dom";
import styles from './styles.module.css';
import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddIcon from '@mui/icons-material/Add';

import { Navigate } from 'react-router-dom'
import { UserContext } from '../../../utils/UserContext';
import { useContext,useState } from 'react';

const AccountButtons = () => {
      // route that it links to is currently selected.

 const {user} = useContext(UserContext);  
  let activeStyle = {
    textDecoration: "underline",
    color:'white'
  };

  let activeClassName = "underline";
  return (
    <>
            {!user && (<Navigate to={'/login'}/>)}

           <nav className={styles.nav}>
            <ul>
                <li  >
                 <NavLink  
                    to="/account/profile" className={({ isActive }) =>
                    isActive ? styles.active : styles.inactive }        >
                    <PersonIcon />
                     Profile
                  </NavLink>

                </li>
                <li>
                <NavLink to="/account/rentplaces" className={({ isActive }) =>
                    isActive ? styles.active : styles.inactive } >
                    <CollectionsIcon/>
                    My rentrooms
                </NavLink>
                </li>
                <li >
                <NavLink to="/account/favorites" className={({ isActive }) =>
                    isActive ? styles.active : styles.inactive } >
                        <FavoriteIcon/>
                    Favorites
                </NavLink>
                </li>
                <li>
                <NavLink to="/account/rentplace/new" className={({ isActive }) =>
                    isActive ? styles.active : styles.inactive } >
                        <AddIcon/>
                    New post
                    <span></span>
                </NavLink>
                </li>
            </ul>
            </nav>
        <Outlet/>
    </>
  )
}

export default AccountButtons