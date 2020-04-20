import React from "react";
import io from "socket.io-client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }
  componentDidMount() {
    this.io = io("http://localhost:3000");
    this.io.emit("sendmessage", "aaa");
    this.io.on("updatechat", () => {
      console.log("update");
    });
    fetch("/api")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.username,
        });
      });
  }
  render() {
    return (
      <div className="App">
        <h1>Hello {this.state.username}!</h1>
        <a href="http://localhost:3000/logout">logout</a>
      </div>
    );
  }
}

export default App;
