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
  max-width: 65%;
  width: -webkit-fit-content;
  width: fit-content;
  border-radius: 10px;
  padding: 10px;
  background: rgb(241, 245, 248);
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 18px;
  }
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
  max-width: 65%;
  border-radius: 10px;
  padding: 10px;
  margin-left: 20px;
  background: rgb(255, 165, 0);
  @media (min-width: ${({ theme }) => theme.media.extraLarge}) {
    font-size: 18px;
  }
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
          <ReciverAvatar src="/avatars/default.png" alt="" />
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
