import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import styled from "styled-components";
import withContext from "context/withContext";
import * as ChatApi from "network/chatroom";
import Message from "components/small/Message";
import ChatRoomNav from "components/large/ChatRoomNav";
import MessageSendForm from "components/medium/MessageSendForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ChatBox = styled.div`
  width: 100%;
  height: calc(100% - 138px);
  overflow-y: scroll;
  padding-top: 10px;
`;
const MessageSend = styled.div`
  width: 100%;
  height: 58px;
  background: white;
  padding-top: 7px;
  position: relative;
`;

const ChatRoom = ({ match, userContext }) => {
  const [roomStateId, setStateRoomId] = useState(null);
  // const [areMessagesLoading, setAreMessagesLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  let scrollFetch = true;

  const messagesEndRef = useRef();
  const chatBoxRef = useRef(null);

  async function fetchMessages() {
    try {
      let newMessages = await ChatApi.fetchMessages(messages.length);
      let toPush = newMessages.reverse();
      if (toPush.length === 0) {
        scrollFetch = false;
      } else {
        scrollFetch = true;
        setMessages((msgs) => [...toPush, ...msgs]);
      }
    } catch (err) {
      console.error(err);
    }
  }

  //roomId Changing
  useEffect(() => {
    const { roomId } = match.params;
    setStateRoomId(roomId);

    //getting frined/chatRoom data
    async function getRoomData() {
      try {
        let data = await ChatApi.getRoomData(roomId);
      } catch (err) {
        setStateRoomId(null);
        console.error(err);
      }
    }
    getRoomData();

    //fetching time
    isNotFetching = false;
    fetchMessages().then(() => {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" });
      scrollFetch = true;
      isNotFetching = true;
    });

    ChatApi.changeRoom(roomId);
    ChatApi.subscribeRoom(getMessage);
    return () => {
      ChatApi.unSubscribeRoom();
    };
  }, [match.params.roomId]);

  function getMessage(message) {
    setMessages((messages) => [...messages, message]);
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    if (scrollHeight - scrollTop - clientHeight < 400) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  let isNotFetching = true;
  function handleScroll(e) {
    if (e.target.scrollTop <= 10 && isNotFetching) {
      if (scrollFetch) {
        isNotFetching = false;
        let [mostTopMsg] = chatBoxRef.current.children;
        fetchMessages().then(() => {
          isNotFetching = true;
          mostTopMsg.scrollIntoView({ behavior: "auto", block: "start" });
          chatBoxRef.current.scrollBy(0, -10);
        });
      }
    }
  }

  return (
    <Container>
      <ChatRoomNav />
      <ChatBox ref={chatBoxRef} onScroll={handleScroll}>
        {messages &&
          messages.map((msg) => (
            <Message
              user={msg.senderid === userContext.user.idusers}
              key={msg.idmessages}
              {...msg}
            />
          ))}
        <button
          onClick={() => {
            fetchMessages();
          }}
        >
          fetch
        </button>
        <div ref={messagesEndRef} />
      </ChatBox>
      <MessageSendForm />
    </Container>
  );
};

export default withContext(ChatRoom);
