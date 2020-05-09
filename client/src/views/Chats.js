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
  async function fetchNewChats() {
    ChatsApi.fetchChats(0).then((data) => {
      if (data) {
        setChats((chats) => [...chats, ...data]);
      }
    });
    //TODO fetchNEwChats
  }
  useEffect(() => {
    fetchNewChats();
  });
  return (
    <Container>
      {chats.map((props) => (
        <FriendCard key={props.idusers} {...props} />
      ))}
      <FriendCard
        notify
        username="Łebol"
        lastMsg="Chłopcy jest już środa."
        time="00:10"
        avatarSrc="/avatars/lebol.png"
      />
      <FriendCard
        notify
        username="Johny Bravo"
        lastMsg="Lubie placki i inne takie wszelakie"
        time="16:23"
        avatarSrc="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
      />
      <FriendCard
        notify
        username="Fred Flinestone"
        lastMsg="Łabadabaduuuuu!"
        time="13:30"
        avatarSrc="https://img.favpng.com/25/24/15/fred-flintstone-barney-rubble-wilma-flintstone-betty-rubble-pebbles-flinstone-png-favpng-WsAWKTZZivFNny5tkL7vxrkQ6.jpg"
      />
      <FriendCard
        username="Albert Einstein"
        lastMsg="Suma kwadratu równa się długości obu ramion, E=mc^2!"
        time="10:15"
        avatarSrc="https://s.ciekawostkihistoryczne.pl/uploads/2019/03/Albert_Einstein_Head.jpg"
      />
      <FriendCard
        username="Andrzej Duda"
        lastMsg="Wszystko podpiszę!"
        time="10:03"
        avatarSrc="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
      />
      <FriendCard
        username="Krecik"
        lastMsg="Pukam w taborecik"
        time="09:56"
        avatarSrc="https://static.puzzlefactory.pl/puzzle/169/875/original.jpg"
      />
      <FriendCard
        notify
        username="Bolek"
        lastMsg="Widzieliście gdzieś Lolka i Tolę?"
        time="08:40"
        avatarSrc=""
      />
      <FriendCard
        username="Olinek Okrąglinek"
        lastMsg="Okrągły świat, okrągłe życie, ale ze mnie marzyciel!"
        time="00:34"
        avatarSrc="https://czasdzieci.pl/pliki/bajki/f_ba_1503_43389.jpg"
      />
    </Container>
  );
};

export default Chats;
