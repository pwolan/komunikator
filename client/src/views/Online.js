import React, { useEffect, useState } from "react";
import OnlineCard from "components/medium/OnlineCard";
import styled from "styled-components";
// import { connect } from "react-redux";
// import { fetchOnlineUsers } from "actions";
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
      setUsers((users) => [...newUsers, ...users]);
    });

    OnlineApi.subscribe(
      (newUser) => {
        console.log("INVITE", newUser);
        setUsers((users) => [newUser, ...users]);
      },
      (data) => {
        console.log("statuschange");
        console.log(data);
      }
    );
    return OnlineApi.unsubscribe;
  }, []);
  return (
    <Container>
      {users.map(({ idusers, username, avatar, status, roomid }) => {
        const cardProps = { key: idusers, id: idusers, username, avatar, roomid };
        if (status === 1) {
          return <OnlineCard {...cardProps} />;
        } else if (status === 0) {
          return <AcceptCard {...cardProps} />;
        }
      })}
    </Container>
  );
};

export default Online;
