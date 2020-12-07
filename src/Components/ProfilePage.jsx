import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import {auth} from "../firebase";
import Content from './Content';
import Header from './Header';



const ProfilePage = () => {
  const user = useContext(UserContext);
  const {userdata:{photoURL, displayName, email}} = user;
  console.log(user);


  return (
    <div><Header />
      <div className = "mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        <div className="flex border flex-col items-center md:flex-row md:items-start border-red-400 px-3 py-4">
          <div
            style={{
              background: `url(${'https://preview.redd.it/an871k4o1sn51.png?width=440&format=png&auto=webp&s=85dcd6cb73b8760802e254ee14dfa3c7ab444591'})  no-repeat center center`,
              backgroundSize: "cover",
              height: "200px",
              width: "200px"
            }}
            className="border border-red-300"
          ></div>
          <div className = "md:pl-4">
          <h2 className = "text-2xl font-semibold">{displayName}</h2>
          <h3 className = "italic">{email}</h3>
          <button style={{background:"#D02C29"}} className = "w-full py-3 bg-red-600 mt-4 text-white" onClick = {() => {auth.signOut()}}>Sign out</button>
          </div>
        </div>
        <div>
          <Content />
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;
