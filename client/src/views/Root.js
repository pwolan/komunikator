import React from "react";
import RootTemplate from "templates/RootTemplate";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Start from "./Start";
import MainTemplate from "templates/MainTemplate";
import AddUser from "./AddUser";
import MediaQuery from "react-responsive";

const App = () => {
  return (
    <BrowserRouter basename={"/user"}>
      <RootTemplate>
        <MainTemplate>
          <Switch>
            {/* <Route exact path="/test" component={Start} /> */}
            <Route exact path="/" render={() => <Redirect to="/addUser" />} />
            <Route path="/adduser" component={AddUser} />

            {/* <Route path="/chats/:roomId" component={ChatRoom}/> */}
            <MediaQuery maxWidth="600px">
              {/* <Route path="/chats" component={Chats}> */}
            </MediaQuery>
            <MediaQuery minWidth="601px">
              <Route path="/chats" render={() => <Redirect to="/addUser" />} />
            </MediaQuery>
          </Switch>
        </MainTemplate>
      </RootTemplate>
    </BrowserRouter>
  );
};

export default App;
