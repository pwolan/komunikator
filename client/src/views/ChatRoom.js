import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
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

//TODO ismounted when resize

const ChatRoom = ({ userContext, match }) => {
  const { roomId } = match.params;
  //state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //refs
  const messagesEndRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    //init
    ChatApi.changeRoom(roomId, () => {
      ChatApi.subscribeRoom(getMessage);
      //fetch using get
      ChatApi.fetchMessages(0).then((data) => {
        if (data) {
          let messages = data.reverse();
          setMessages(messages);
          //scroll down
          messagesEndRef.current.scrollIntoView();
        }
        setIsLoading(false);
      });
    });

    return () => {
      //cleanup
      ChatApi.unSubscribeRoom();
      ChatApi.cancelFetch();
      setMessages([]);
      setIsLoading(true);
    };
  }, [roomId]);

  function getMessage(message) {
    setMessages((oldMessages) => [...oldMessages, message]);
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    if (scrollHeight - scrollTop - clientHeight < 400) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  async function fetchMoreMessages() {
    if (!isLoading) {
      setIsLoading(true);
      let number = messages.length;
      let data = await ChatApi.fetchMessages(number);
      if (data) {
        let newMessages = data.reverse();
        setMessages((oldMessages) => [...newMessages, ...oldMessages]);
        setIsLoading(false);
        if (data.length === 0) {
          ChatApi.disableFetchMessages();
        } else {
          return true;
        }
      }
      setIsLoading(false);
    }
    return false;
  }

  async function handleScroll() {
    //debounce??
    if (chatBoxRef.current.scrollTop <= 10) {
      let [mostTopMsg] = chatBoxRef.current.children;
      let isChanged = await fetchMoreMessages(messages.length);
      if (isChanged) {
        mostTopMsg.scrollIntoView({ block: "start" });
        chatBoxRef.current.scrollBy(0, -10);
      }
    }
  }
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
        {isLoading && <StyledLoad>Loading...</StyledLoad>}

        <div ref={messagesEndRef} />
      </ChatBox>
      <MessageSendForm />
    </Container>
  );
};

export default withContext(ChatRoom);
