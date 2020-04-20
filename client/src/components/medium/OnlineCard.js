import React from "react";

const OnlineCard = ({ status, username }) => {
  let content;
  if (status === 0) {
    content = (
      <div>
        <div>{username}</div>
        <button>accept</button>
        <button>decline</button>
      </div>
    );
  } else if (status === 1) {
    content = (
      <>
        <div>
          <div>{username}</div>
          <div>Offline</div>
        </div>
        <div>
          <div></div>
        </div>
      </>
    );
  }
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      {content}
    </div>
  );
};

export default OnlineCard;

//.friends-card.px-4.py-3(data-id=friend.idusers)
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
