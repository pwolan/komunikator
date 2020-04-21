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
`;

const AvatarContainer = styled.div`
  width: 25px;
  height: 25px;
`;

const Avatar = styled.img`
  width: 25px;
`;
const Content = styled.div``;
const Username = styled.div``;
const Logout = styled.a``;

const UserStats = ({ userContext, number, increment }) => {
  console.log(userContext);
  const { loading, user } = userContext;
  const { username, avatar } = user || {};
  return (
    <Container>
      <AvatarContainer>
        <Avatar src={avatar} />
      </AvatarContainer>
      <Content>
        <Username>{username}</Username>
        <Logout href="http://localhost:3000/logout">logout</Logout>
        <button
          onClick={() => {
            increment();
          }}
        >
          {number}
        </button>
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
  children: "---",
};
// .user-info-container.d-flex.order-md-1.mx-auto.mr-md-0
// .user-info-avatar-container
//     img.user-info-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
// .text-white
//     .user-info-username.px-2=username
//     a.text-white.px-2(href='/logout') logout
// export default UserStats;
const mapStateToProps = (state) => ({ number: state.counter });
const mapDispatchToProps = (dispatch) => ({ increment: (arg) => dispatch(addOne(arg)) });

export default connect(mapStateToProps, mapDispatchToProps)(withContext(UserStats));