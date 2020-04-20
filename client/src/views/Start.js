import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Start = () => (
  <div>
    <h1>Hello user</h1>
    <h2>Welcome on our app</h2>
    <FontAwesomeIcon icon={faCoffee} />
    <Button variant="primary">XDDD</Button>
  </div>
);
export default Start;
