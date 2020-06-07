import React, { useEffect, useState } from "react";
import OnlineCard from "components/medium/OnlineCard";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

let StyledLoad = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: black;
`;

let Empty = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  color: black;
  flex-direction: column;
  @media (min-width: ${({ theme }) => theme.media.large}) {
    color: white;
    font-size: 18px;
  }
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 25px;
    color: white;
  }
`;

let Add = styled.button`
  background: ${({ theme }) => theme.color.primary};
  color: white;
  width: 150px;
  text-align: center;
  display: block;
  border-radius: 10px;
  padding-top: 5px;
  &:hover {
    color: white;
    text-decoration: none;
    background: ${({ theme }) => theme.color.hover};
  }
`;

const Online = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    OnlineApi.fetchOnlineUsers().then((newUsers) => {
      if (newUsers) {
        setUsers((users) => [...newUsers, ...users]);
      }
      setIsLoading(false);
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
    return () => {
      OnlineApi.unsubscribe();
      setIsLoading(true);
    };
  }, []);
  let displayEmpty = !isLoading && users.length === 0;
  return (
    <Container>
      {isLoading && <StyledLoad>Loading...</StyledLoad>}
      {users.map((props) => {
        const cardProps = { key: props.idusers, ...props };
        if (props.status === 1) {
          return <OnlineCard {...cardProps} />;
        } else if (props.status === 0) {
          return <AcceptCard {...cardProps} />;
        }
      })}
      {displayEmpty && (
        <Empty>
          Come on! Let's find some friends!
          <Add as={Link} to={"/addfriend"}>
            Add Friends
          </Add>
        </Empty>
      )}
    </Container>
  );
};

export default Online;
