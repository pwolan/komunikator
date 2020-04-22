import React from "react";
import axios from "axios";
import styled from "styled-components";
import AddFriendCard from "components/medium/AddFriendCard";
import cancelIcon from "icons/cancel.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  height: 80px;
  background: ${({ theme }) => theme.color.primary};
  color: white;
  flex-shrink: 0;

  display: none;
  align-items: center;
  h3 {
    margin: 0 auto;
  }
  @media (min-width: ${({ theme }) => theme.media.large}) {
    display: flex;
  }
`;
const Search = styled.input`
  width: calc(100% - 40px);
  padding: 0 5px;
  margin: 10px 20px;
  border: 0px;
  font-weight: bold;
  border-bottom: 1px solid ${({ theme }) => theme.color.primary};
  &:focus {
    outline: 0;
  }
  &::-webkit-search-cancel-button {
    background-image: url(${cancelIcon});
    background-size: cover;
    -webkit-appearance: none;
    width: 15px;
    height: 15px;
  }
`;
const StyledUl = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 100%;
  overflow: auto;
`;
const NotFound = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  flex-direction: column;
  height: 100%;
`;
const StyledIcon = styled(FontAwesomeIcon)`
  font-size: 70px;
`;

class AddFriend extends React.Component {
  state = {
    searchValue: "",
    users: [],
    failSearch: false,
  };
  requestSource = axios.CancelToken.source();
  handleInput = (e) => {
    let { value } = e.target;
    if (value === "") {
      this.requestSource.cancel();
    }
    this.fetchSearchUsers(value);
    this.setState({
      searchValue: value,
    });
  };

  async fetchSearchUsers(text) {
    if (!text) {
      this.setState({
        users: [],
        failSearch: false,
      });
      return;
    }
    try {
      let { data } = await axios.post(
        "/friends/searchFriend",
        { text },
        { cancelToken: this.requestSource.token }
      );
      let { users } = data;
      this.setState({ users, failSearch: false });
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.error(err);
        this.setState({
          failSearch: true,
        });
      }
    }
  }
  render() {
    let { handleInput } = this;
    let { searchValue, users } = this.state;
    return (
      <Container>
        <Title>
          <h3>Add Friends</h3>
        </Title>
        <Search
          type="search"
          value={searchValue}
          onChange={handleInput}
          placeholder="Type a username"
        />
        <StyledUl>
          {users &&
            users.map(({ idusers, username, avatar }) => (
              <AddFriendCard key={idusers} avatar={avatar} idusers={idusers} username={username} />
            ))}
        </StyledUl>
        {users.length === 0 && (
          <NotFound>
            <StyledIcon icon={faUserSlash} />
            Users not found
          </NotFound>
        )}
      </Container>
    );
  }
}

export default AddFriend;
/* <StyledLi key={idusers}>
                <Avatar src="/avatars/default.png" />
                <PUser>{username}</PUser>
                <StyledButton
                  disabled={disabledButtons.some((id) => id === idusers)}
                  onClick={handleAddClick.bind(this, idusers)}
                >
                  ADD
                </StyledButton>
            </StyledLi>*/

//             const StyledLi = styled.li`
//   display: flex;
//   align-items: center;
//   height: 50px;
//   padding: 0 10px;
//   &:hover {
//     ${({ theme }) => theme.color.gray.lightmedium}
//   }
// `;
// const Avatar = styled.img`
//   width: 40px;
//   border-radius: 10px;
//   display: block;
//   margin-left: 10px;
// `;
// const PUser = styled.p`
//   display: block;
//   margin: 0;
//   padding-left: 5px;
//   font-size: 23px;
//   font-weight: bold;
// `;
// const StyledButton = styled.button`
//   display: block;
//   margin-left: auto;
//   margin-right: 10px;
//   width: 80px;
//   height: 40px;
//   border-radius: 20px;
//   background: ${({ theme }) => theme.color.primary};
//   color: white;
//   border: 0px;
//   text-align: center;
//   font-size: 20px;
//   padding-top: 4px;
//   &:disabled {
//     background: ${({ theme }) => theme.color.disabled};
//   }
// `;
