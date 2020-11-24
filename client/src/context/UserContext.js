// Controller to request and manage list items data/state
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import getUserInfoController from "../controller/user/getInfo";
import { useCookies } from "react-cookie";

const UserContext = createContext();

/**
 * Context Provides the Current Login User Information
 */
function UserProvider(props) {
  const [user, setUser] = useState({});

  const [cookies] = useCookies(["_userId"]);

  useEffect(() => {
    if (cookies._userId) {
      async function getUserInfo() {
        const res = await getUserInfoController(cookies._userId);
        res.success ? setUser(res.data) : console.error(res.message);
      }
      getUserInfo();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
