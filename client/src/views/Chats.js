import React from "react";
import FriendCard from "components/medium/FriendCard";
import styled from "styled-components";
const Wrap = styled.div`
  overflow: auto;
`;
const Container = styled.div`
  overflow: auto;
  flex-grow: 1;
  background-color: rgb(243, 243, 243);
`;

const Chats = () => {
  return (
    <Container>
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
        // avatarSrc="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png"
      />
      <FriendCard
        notify
        username="Fred Flinestone"
        lastMsg="Łabadabaduuuuu!"
        time="13:30"
        avatarSrc="https://img.favpng.com/25/24/15/fred-flintstone-barney-rubble-wilma-flintstone-betty-rubble-pebbles-flinstone-png-favpng-WsAWKTZZivFNny5tkL7vxrkQ6.jpg"
      />
      <FriendCard
        notify={false}
        username="Albert Einstein"
        lastMsg="Suma kwadratu równa się długości obu ramion, E=mc^2!"
        time="10:15"
        avatarSrc="https://s.ciekawostkihistoryczne.pl/uploads/2019/03/Albert_Einstein_Head.jpg"
      />
      <FriendCard
        notify={false}
        username="Andrzej Duda"
        lastMsg="Wszystko podpiszę!"
        time="10:03"
        avatarSrc="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
      />
      <FriendCard
        notify={false}
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
        notify={false}
        username="Olinek Okrąglinek"
        lastMsg="Okrągły świat, okrągłe życie, ale ze mnie marzyciel!"
        time="00:34"
        avatarSrc="https://czasdzieci.pl/pliki/bajki/f_ba_1503_43389.jpg"
      />
    </Container>
  );
};

export default Chats;

// #friends.tab-pane.fade.col-lg-3(role="tabpanel")
//     .friends-title
//         h3 Chats
//     .friends-card.px-4.py-3.message(data-user="Johny Bravo")
//         .friends-card-avatar-container
//             img.friends-card-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
//             .friends-card-dot 1
//         .friends-card-content.p-3
//             .friends-card-username.font-weight-bold Johny Bravo
//             .friends-card-text Hej mała, lubie placki i inne potrawy
//             small.friends-car-time 2 a.m
//     .friends-card.px-4.py-3
//         .friends-card-avatar-container
//             img.friends-card-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
//         .friends-card-content.p-3
//             .friends-card-username.font-weight-bold Johny Bravo
//             .friends-card-text Hej mała, lubie placki...
//             small.friends-car-time 2 a.m

// data: image / png;
// base64, iVBORw0KGgoAAAANSUhEUgAAAO8AAADTCAMAAABeFrRdAAABmFBMVEX; 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"
