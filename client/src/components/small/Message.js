import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Sender = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 10px;
`;
const SenderMessage = styled.div`
  margin-left: auto;
  margin-right: 10px;
  width: 65%;
  border-radius: 10px;
  padding: 10px;
  background: rgb(241, 245, 248);
`;

const Reciver = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
`;
const ReciverContainer = styled.div`
  width: 30px;
`;
const ReciverAvatar = styled.img`
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
  margin-left: 10px;
`;
const ReciverMessage = styled.div`
  width: 65%;
  border-radius: 10px;
  padding: 10px;
  margin-left: 20px;
  background: rgb(255, 165, 0);
`;
const Message = ({ message, username, avatar, user }) => {
  if (user) {
    return (
      <Sender>
        <SenderMessage>{message}</SenderMessage>
      </Sender>
    );
  } else {
    return (
      <Reciver>
        <ReciverContainer>
          <ReciverAvatar />
        </ReciverContainer>
        <ReciverMessage>{message}</ReciverMessage>
      </Reciver>
    );
  }
};
Message.propTypes = {
  message: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string,
  user: PropTypes.bool,
};
Message.defaultProps = {
  avatar: "/avatars/default.png",
};
export default Message;