import React, { useState, useEffect } from "react";
import styled from "styled-components";
import withContext from "context/withContext";
import { withRouter } from "react-router";
import { setChatroomId } from "actions";
import { connect } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ChatNav = styled.div`
  height: 56px;
  @media (min-width: 992px) {
    height: 80px;
  }
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  color: white;
  padding: 0 5px;
  background: ${({ theme }) => theme.color.primary};
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

const ChatRoom = ({ match, setRoomId }) => {
  const [messageText, setMessageText] = useState("");
  function handleTextArea(e) {
    setMessageText(e.target.value);
  }
  function handleButtonClick() {
    //do some magic
  }
  useEffect(() => {
    const { roomId } = match.params;
    setRoomId(roomId);
    console.log(roomId);
  }, []);
  console.log(match.params);
  return (
    <Container>
      <ChatNav>
        <i></i>
        <div>
          <img src="" alt="" />
        </div>
        <h5></h5>
        <div>
          <i></i>
          <i></i>
        </div>
      </ChatNav>
      <ChatBox>
        <div>text1</div>
        <div>text2</div>
      </ChatBox>
      <MessageSend>
        <SendBox
          value={messageText}
          onChange={handleTextArea}
          placeholder="Write here..."
          rows="1"
        ></SendBox>
        <SendButton>Send</SendButton>
      </MessageSend>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setRoomId: (roomId) => dispatch(setChatroomId(roomId)),
});
export default connect(null, mapDispatchToProps)(withRouter(ChatRoom));

// #chat
//     .chat-nav
//         i#prev.fa.fa-arrow-left.d-lg-none
//         .chat-nav-container
//             img.chat-nav-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
//         h5#friendName
//         .chat-nav-buttons
//             i.fa.fa-phone-alt
//             i.fa.fa-video
//     .chat-box
//     form#messageSender.message-send
//         textarea.message-send-sender(placeholder="Write here..." name="text" rows="1")
//         input.message-send-button(type="button" value="Send")
