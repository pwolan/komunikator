import React, { useState, useEffect } from "react";
import FriendCard from "components/medium/FriendCard";
import styled from "styled-components";
import * as ChatsApi from "network/chats";

const Container = styled.div`
  overflow: auto;
  flex-grow: 1;
  background-color: ${({ theme }) => theme.color.gray.lighter};
`;

const Chats = () => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    ChatsApi.enableFetchChats();
    ChatsApi.fetchChats(0).then((data) => {
      if (data && typeof data == "object") {
        setChats(data);
      }
      setIsLoading(false);
    });
    ChatsApi.subscribeLast(changeLastMessages);
    return () => {
      setIsLoading(true);
    };
  }, []);
  function changeLastMessages([message]) {
    setChats((prevChats) => {
      let newChats = prevChats.filter(({ idrooms }) => idrooms !== message.idrooms);
      newChats = [message, ...newChats];
      return newChats;
    });
  }
  //TODO
  let StyledLoad = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: black;
  `;
  return (
    <Container>
      {isLoading && <StyledLoad>Loading...</StyledLoad>}
      {chats.map((props) => (
        <FriendCard key={props.idrooms} {...props} />
      ))}
    </Container>
  );
};

export default Chats;
{
  /* <FriendCard
        notify
        roomname="Łebol"
        message="Chłopcy jest już środa."
        time="00:10"
        avatar="/avatars/lebol.png"
      />
      <FriendCard
        notify
        roomname="Johny Bravo"
        message="Lubie placki i inne takie wszelakie"
        time="16:23"
        avatar="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
      />
      <FriendCard
        notify
        roomname="Fred Flinestone"
        message="Łabadabaduuuuu!"
        time="13:30"
        avatar="https://img.favpng.com/25/24/15/fred-flintstone-barney-rubble-wilma-flintstone-betty-rubble-pebbles-flinstone-png-favpng-WsAWKTZZivFNny5tkL7vxrkQ6.jpg"
      />
      <FriendCard
        roomname="Albert Einstein"
        message="Suma kwadratu równa się długości obu ramion, E=mc^2!"
        time="10:15"
        avatar="https://s.ciekawostkihistoryczne.pl/uploads/2019/03/Albert_Einstein_Head.jpg"
      />
      <FriendCard
        roomname="Długopis"
        message="Nie pytają Cię o imię"
        time="10:03"
        avatar="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
      />
      <FriendCard
        roomname="Krecik"
        message="Pukam w taborecik"
        time="09:56"
        avatar="https://static.puzzlefactory.pl/puzzle/169/875/original.jpg"
      />
      <FriendCard
        notify
        roomname="Bolek"
        message="Widzieliście gdzieś Lolka i Tolę?"
        time="08:40"
        avatar=""
      />
      <FriendCard
        roomname="Olinek Okrąglinek"
        message="Okrągły świat, okrągłe życie, ale ze mnie marzyciel!"
        time="00:34"
        avatar="https://czasdzieci.pl/pliki/bajki/f_ba_1503_43389.jpg"
      /> */
}
