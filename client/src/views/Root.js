import React from "react";
import RootTemplate from "templates/RootTemplate";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
// import Start from "./Start";
import MainTemplate from "templates/MainTemplate";
import AddUser from "./AddFriend";
import MediaQuery from "react-responsive";
import Random from "./Random";
import Groups from "./Groups";
import Settings from "./Settings";
import Chats from "./Chats";
import Online from "./Online";
import ChatRoom from "./ChatRoom";

const App = () => {
  return (
    <BrowserRouter basename={"/user"}>
      <RootTemplate>
        <MainTemplate>
          <Switch>
            {/* <Route exact path="/test" component={Start} /> */}
            <Route exact path="/" render={() => <Redirect to="/addUser" />} />

            <Route path="/addfriend" component={AddUser} />
            <Route path="/groups" component={Groups} />
            <Route path="/random" component={Random} />
            <Route path="/settings" component={Settings} />
            <Route path="/chats" component={Chats} />
            <Route path="/online" component={Online} />

            <Route path="/chats/:roomId" component={ChatRoom}/>
           {/* <MediaQuery maxWidth="600px">
              <Route path="/chats" component={Chats}>
            </MediaQuery>
            <MediaQuery minWidth="601px">
              <Route path="/chats" render={() => <Redirect to="/addUser" />} />
            </MediaQuery> */}
          </Switch>
        </MainTemplate>
      </RootTemplate>
    </BrowserRouter>
  );
};

export default App;
