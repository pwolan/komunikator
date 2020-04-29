import React from "react";
import OnlineCard from "components/medium/OnlineCard";
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchOnlineUsers } from "actions";
import AcceptCard from "components/medium/AcceptCard";

const Container = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.gray.lighter};
  overflow: auto;
  @media (min-width: ${({ theme }) => theme.media.large}) {
    background-color: ${({ theme }) => theme.color.gray.online};
  }
`;
class Online extends React.Component {
  componentDidMount() {
    this.props.fetchUsers();
  }
  render() {
    const { users } = this.props;
    console.log(users);
    return (
      <Container>
        {users.map(({ idusers, username, avatar, status, roomid }) => {
          const cardProps = { key: idusers, username, avatar, roomid };
          if (status === 1) {
            return <OnlineCard {...cardProps} />;
          } else if (status === 0) {
            return <AcceptCard {...cardProps} />;
          }
        })}
      </Container>
    );
  }
}

const mapStateToProps = ({ onlineUsers }) => ({ users: onlineUsers });
const mapDispatchToProps = (dispatch) => ({ fetchUsers: () => dispatch(fetchOnlineUsers()) });
export default connect(mapStateToProps, mapDispatchToProps)(Online);
