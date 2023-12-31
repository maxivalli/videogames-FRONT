import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import style from "./Profile.module.css"

export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className={style.container}>
        <h2>{user.name}</h2>
        <img src={user.picture} alt={user.name} />
      </div>
    )
  );
};

