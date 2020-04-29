import React from "react";
import axios from "axios";
import styled from "styled-components";
import AddFriendCard from "components/medium/AddFriendCard";
import cancelIcon from "icons/cancel.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import SectionTitle from "components/small/SectionTitle";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
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
      this.requestSource = axios.CancelToken.source();
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
      let { data } = await axios.get(`/friends/search/${text}`, {
        cancelToken: this.requestSource.token,
      });
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
        <SectionTitle>
          <h3>Add Friends</h3>
        </SectionTitle>
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
