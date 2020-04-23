import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AvatarContainer = styled.div`
  flex-shrink: 0;
  height: 80px;
  width: 80px;
  position: relative;
`;
const AvatarImg = styled.img`
  height: 80%;
  width: 80%;
  border-radius: 100%;
  background: white;
  object-fit: cover;
  margin: 10% 0;
  display: block;
`;

const Avatar = ({ src, alt }) => {
  return (
    <AvatarContainer>
      <AvatarImg src={src} alt={alt} />
    </AvatarContainer>
  );
};
Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
Avatar.defaultProps = {
  src: "/avatars/default.png",
  alt: "avatar",
};
export default Avatar;
