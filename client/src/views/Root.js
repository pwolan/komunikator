import React from "react";
import RootTemplate from "templates/RootTemplate";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "store";
import MainTemplate from "templates/MainTemplate";
import AddUser from "./AddFriend";
import Random from "./Random";
import Groups from "./Groups";
import Settings from "./Settings";
import Chats from "./Chats";
import Online from "./Online";
import ChatRoom from "./ChatRoom";
import MobilePlus from "./MobilePlus";
import ResponsiveRoute from "components/small/ResponsiveRoute";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/user">
        <RootTemplate>
          <MainTemplate>
            <Switch>
              <Route path="/addfriend" component={AddUser} />
              <Route path="/groups" component={Groups} />
              <Route path="/random" component={Random} />
              <Route path="/settings" component={Settings} />
              <Route path="/chats/:roomId" component={ChatRoom} />
              <ResponsiveRoute
                path="/plus"
                mcomponent={MobilePlus}
                drender={() => <Redirect to="/addfriend" />}
              />
              <ResponsiveRoute
                exact
                path="/"
                mrender={() => <Redirect to="/chats" />}
                drender={() => <Redirect to="/random" />}
              />
              <ResponsiveRoute
                path="/chats"
                mcomponent={Chats}
                drender={() => <Redirect to="/random" />}
              />
              <ResponsiveRoute
                path="/online"
                mcomponent={Online}
                drender={() => <Redirect to="/random" />}
              />
              } />
            </Switch>
          </MainTemplate>
        </RootTemplate>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
