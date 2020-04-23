import React, { useState, useEffect } from "react";
import Axios from "axios";

export const UserContext = React.createContext({});

const UserProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    const { data } = await Axios.get("/friends/currentUser");
    setData(data);
    setLoading(false);
  };
  useEffect(() => {
    getUser();
  }, []);
  return <UserContext.Provider value={{ user: data, loading }}>{children}</UserContext.Provider>;
};

export default UserProvider;
