import React from "react";
import axios from "axios";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledLi = styled.li`
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 10px;
  &:hover {
    ${({ theme }) => theme.color.gray.lightmedium}
  }
`;
const Avatar = styled.img`
  width: 40px;
  border-radius: 10px;
  display: block;
  margin-left: 10px;
`;
const PUser = styled.p`
  display: block;
  margin: 0;
  padding-left: 5px;
  font-size: 23px;
  font-weight: bold;
`;
const StyledButton = styled.button`
  display: block;
  margin-left: auto;
  margin-right: 10px;
  width: 80px;
  height: 40px;
  border-radius: 20px;
  background: ${({ theme }) => theme.color.primary};
  color: white;
  border: 0px;
  text-align: center;
  font-size: 20px;
  padding-top: 4px;
  &:disabled {
    background: ${({ theme }) => theme.color.disabled};
  }
  &:focus {
    outline: 0;
  }
`;
const Send = styled.div`
  margin-left: auto;
  margin-right: 20px;
  font-size: 20px;
`;
class AddFriendCard extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    idusers: PropTypes.number.isRequired,
  };
  static defaultProps = {
    avatar: "/avatars/default.png",
  };
  state = {
    isDisabled: false,
    failAddFriend: false,
    succesAddFriend: false,
  };
  handleAddClick = (id) => {
    this.setState({
      isDisabled: true,
    });
    this.addUserRequest(id);
  };
  async addUserRequest(id) {
    try {
      let res = await axios.post("/friends/addFriend", { friendId: id });
      let { succes } = res.data;
      if (succes) {
        this.setState({
          failAddSearch: false,
          succesAddFriend: true,
        });
      } else {
        this.setState({ failAddFriend: true });
      }
    } catch (error) {
      console.error(error);
      this.setState({ failAddFriend: true });
    } finally {
      //enable button
      this.setState({
        isDisabled: false,
      });
    }
  }
  render() {
    const { username, idusers, avatar } = this.props;
    const { isDisabled, succesAddFriend } = this.state;
    const { handleAddClick } = this;
    return (
      <StyledLi>
        <Avatar src={avatar} />
        <PUser>{username}</PUser>
        {succesAddFriend ? (
          <Send>Invited</Send>
        ) : (
          <StyledButton disabled={isDisabled} onClick={handleAddClick.bind(this, idusers)}>
            ADD
          </StyledButton>
        )}
      </StyledLi>
    );
  }
}
export default AddFriendCard;
