import React from "react";
import RootTemplate from "templates/RootTemplate";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MainTemplate from "templates/MainTemplate";
import AddUser from "./AddFriend";
import Random from "./Random";
import Groups from "./Groups";
import Settings from "./Settings";
import Chats from "./Chats";
import Online from "./Online";
import ChatRoom from "./ChatRoom";
import { theme } from "theme/theme";

const App = () => {
  const isDesktop = useMediaQuery({ minWidth: parseInt(theme.media.large) });
  return (
    <BrowserRouter basename={"/user"}>
      <RootTemplate>
        <MainTemplate>
          <Switch>
            <Route path="/addfriend" component={AddUser} />
            <Route path="/groups" component={Groups} />
            <Route path="/random" component={Random} />
            <Route path="/settings" component={Settings} />
            <Route path="/chats/:roomId" component={ChatRoom} />
            {isDesktop ? (
              <>
                <Route exact path="/" render={() => <Redirect to="/random" />} />
                <Route path="/chats" render={() => <Redirect to="/random" />} />
                <Route path="/online" render={() => <Redirect to="/random" />} />
              </>
            ) : (
              <>
                <Route exact path="/" render={() => <Redirect to="/chats" />} />
                <Route path="/chats" component={Chats} />
                <Route path="/online" component={Online} />
              </>
            )}
          </Switch>
        </MainTemplate>
      </RootTemplate>
    </BrowserRouter>
  );
};

export default App;
