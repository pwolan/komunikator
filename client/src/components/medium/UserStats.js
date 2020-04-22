import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import withContext from "context/withContext";
import { connect } from "react-redux";
import { addOne } from "actions";

const Container = styled.div`
  background-color: ${({ theme }) => theme.color.gray.darker};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;
`;

const AvatarContainer = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;
`;

const Avatar = styled.img`
  width: 100%;
`;
const Content = styled.div``;
const Username = styled.div`
  color: white;
  font-weight: bold;
  font-size: 25px;
`;
const Logout = styled.a`
  color: white;
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary};
  }
`;

const UserStats = ({ userContext, number, increment }) => {
  const { loading, user } = userContext;
  const { username, avatar } = user || {};
  return (
    <Container>
      <AvatarContainer>
        <Avatar src={avatar} />
      </AvatarContainer>
      <Content>
        <Username>{username}</Username>
        <Logout href="//localhost:3000/logout">Logout</Logout>
      </Content>
    </Container>
  );
};
UserStats.propTypes = {
  userContext: PropTypes.object,
};
Avatar.propTypes = {
  src: PropTypes.string,
};
Avatar.defaultProps = {
  src: "/avatars/default.png",
};
Username.propTypes = {
  children: PropTypes.string,
};
Username.defaultProps = {
  children: "loading...",
};

const mapStateToProps = (state) => ({ number: state.counter });
const mapDispatchToProps = (dispatch) => ({ increment: (arg) => dispatch(addOne(arg)) });

export default connect(mapStateToProps, mapDispatchToProps)(withContext(UserStats));
