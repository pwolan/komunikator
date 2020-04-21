import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/theme";
import UserProvider from "context/user";

class RootTemplate extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {/* <PageContext.Provider value={val}></PageContext.Provider> */}
        <UserProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </UserProvider>
      </div>
    );
  }
}
export default RootTemplate;
