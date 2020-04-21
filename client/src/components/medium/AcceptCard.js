import React from "react";
import PropTypes from "prop-types";

const AcceptCard = ({ username, src, alt }) => {
  return (
    <div>
      <div>
        <img src={src} alt={alt} />
      </div>
      <div>
        <div>{username}</div>
        <button>accept</button>
        <button>decline</button>
      </div>
    </div>
  );
};

AcceptCard.propTypes = {
  username: PropTypes.string.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
};

AcceptCard.defaultProps = {
  src: "/avatars/default.png",
  alt: "avatar",
};

export default AcceptCard;
