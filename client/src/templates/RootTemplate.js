import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "theme/theme";
import { withRouter } from "react-router-dom";
//import PageContext from 'context

class RootTemplate extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        {/* <PageContext.Provider value={val}></PageContext.Provider> */}
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </div>
    );
  }
}
export default RootTemplate;
