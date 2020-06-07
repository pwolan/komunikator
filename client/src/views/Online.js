import React, { useEffect, useState } from "react";
import OnlineCard from "components/medium/OnlineCard";
import styled from "styled-components";
import AcceptCard from "components/medium/AcceptCard";
import * as OnlineApi from "network/onlineUsers";

const Container = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray.lighter};
  overflow: auto;
  @media (min-width: ${({ theme }) => theme.media.large}) {
    background-color: ${({ theme }) => theme.color.gray.online};
  }
`;

const Online = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    OnlineApi.fetchOnlineUsers().then((newUsers) => {
      if (newUsers) {
        setUsers((users) => [...newUsers, ...users]);
      }
    });

    OnlineApi.subscribe(
      (newUser) => {
        console.log("INVITE", newUser);
        setUsers((users) => [newUser, ...users]);
      },
      (d) => {
        console.log("statuschange");
        console.log(d);
        setUsers((users) => [d, ...users]);
      }
    );
    return OnlineApi.unsubscribe;
  }, []);
  return (
    <Container>
      {users.map((props) => {
        const cardProps = { key: props.idusers, ...props };
        if (props.status === 1) {
          return <OnlineCard {...cardProps} />;
        } else if (props.status === 0) {
          return <AcceptCard {...cardProps} />;
        }
      })}
    </Container>
  );
};

export default Online;
