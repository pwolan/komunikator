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
    return (
      <Container>
        {users.map(({ idusers, username, avatar, status }) => {
          const cardProps = { key: idusers, id: idusers, username, avatar };
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

// #online.tab-pane.fade.col-lg-3(role="tabpanel")
//     .friends-title
//         h3 Online Users
//     -for(let friend of friends)
//         .friends-card.px-4.py-3(data-id=friend.idusers)
//             .friends-card-avatar-container
//                 img.friends-card-avatar(src="http://3.bp.blogspot.com/-py-G-pEM0JE/UoQQnFLAi1I/AAAAAAAABOA/5Cxap21-LDA/s1600/johnny_bravo.png")
//             -if(friend.status == 1)
//                 .friends-card-content.p-3
//                     .friends-card-username.font-weight-bold=friend.username
//                     .friends-card-text Offline
//                 .friends-card-statusdot
//                     .friends-card-statusdot-body
//             -else
//                 .friends-card-content.p-3
//                     .friends-card-username.font-weight-bold=friend.username
//                     button.acceptFriend accept
//                     button.declineFriend decline

/* <OnlineCard username="Johny z Oklahomy" />
<OnlineCard username="Łebol" src="/avatars/lebol.png" alt="łeb" />
<OnlineCard
  username="Andrzej Duda"
  src="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
  alt="duda"
/>
<OnlineCard username="Johny z Oklahomy" />
<OnlineCard username="Łebol" src="/avatars/lebol.png" alt="łeb" />
<OnlineCard
  username="Andrzej Duda"
  src="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
  alt="duda"
/>
<OnlineCard username="Johny z Oklahomy" />
<OnlineCard username="Łebol" src="/avatars/lebol.png" alt="łeb" />
<OnlineCard
  username="Andrzej Duda"
  src="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
  alt="duda"
/>
<OnlineCard username="Johny z Oklahomy" />
<OnlineCard username="Łebol" src="/avatars/lebol.png" alt="łeb" />
<OnlineCard
  username="Andrzej Duda"
  src="https://scontent.fktw1-1.fna.fbcdn.net/v/t1.0-9/85115456_3320554797961404_738540031936823296_n.jpg?_nc_cat=1&_nc_sid=09cbfe&_nc_ohc=yTA8yPFVxtgAX_wI-9h&_nc_ht=scontent.fktw1-1.fna&oh=b6ec0380f05c4b04f9cfb5760a51ae00&oe=5EC30CB3"
  alt="duda"
/> */
