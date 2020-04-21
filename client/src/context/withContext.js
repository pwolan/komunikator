import React from "react";
import { UserContext } from "./user";
// import { UserContext } from "./user";

const withContext = (Component) => {
  return function contextComponent(props) {
    return (
      <>
        <UserContext.Consumer>
          {(context) => <Component {...props} userContext={context} />}
        </UserContext.Consumer>
      </>
    );
  };
};

export default withContext;
