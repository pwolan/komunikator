import React, { useState } from "react";
import styled from "styled-components";
import * as ChatApi from "network/chatroom";

const Container = styled.div`
  width: 100%;
  height: 58px;
  background: white;
  padding-top: 7px;
  position: relative;
`;

const SendBox = styled.textarea`
  width: 70%;
  margin-left: 5%;
  resize: none;
  padding: 10px 20px;
  font-size: 17px;
  border: 0px;
  border-radius: 10px;
  background-color: rgb(213, 223, 230);
  &:focus {
    outline: none;
  }
`;
const SendButton = styled.button`
  width: 15%;
  height: 47px;
  right: 5%;
  position: absolute;
  border: 0px;
  border-radius: 10px;
  color: white;
  background: rgb(255, 165, 0);
`;

const MessageSendForm = () => {
  const [messageText, setMessageText] = useState("");
  function handleTextArea(e) {
    setMessageText(e.target.value);
  }
  function handleEnterPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }
  function handleSend() {
    if (messageText !== "") {
      setMessageText("");
      ChatApi.sendMessage(messageText);
    }
  }
  return (
    <Container>
      <SendBox
        value={messageText}
        onChange={handleTextArea}
        placeholder="Write here..."
        rows="1"
        onKeyDown={handleEnterPress}
      ></SendBox>
      <SendButton onClick={handleSend}>Send</SendButton>
    </Container>
  );
};

export default MessageSendForm;
