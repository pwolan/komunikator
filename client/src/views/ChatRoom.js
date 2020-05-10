import React, { useState, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import styled from "styled-components";
import withContext from "context/withContext";
import * as ChatApi from "network/chatroom";
import Message from "components/small/Message";
import ChatRoomNav from "components/large/ChatRoomNav";
import MessageSendForm from "components/medium/MessageSendForm";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const ChatBox = styled.div`
  width: 100%;
  height: calc(100% - 138px);
  overflow-y: scroll;
  padding-top: 10px;
`;

// const ChatRoom = ({ match, userContext }) => {
//   const [roomStateId, setStateRoomId] = useState(null);
//   // const [areMessagesLoading, setAreMessagesLoading] = useState(true);
//   const [roomData, setRoomData] = useState(null);
//   const [messages, setMessages] = useState([]);
//   //# let scrollFetchEnabled = true;

//   let areMessagesLeft = true;
//   const messagesEndRef = useRef();
//   const chatBoxRef = useRef(null);

//   async function fetchMessages(number) {
//     isNotFetching = false;

//     let [newMessages, status] = await ChatApi.fetchMessages(number, userContext.user.idusers);
//     let toPush = newMessages.reverse();
//     console.log("TOPUSH", toPush);
//     if (status === "end") {
//       areMessagesLeft = false;
//     } else if (status === "succes") {
//       areMessagesLeft = true;
//       let toSet = new Set([...toPush, ...messages]);
//       console.log(toSet);
//       setMessages((msgs) => [...toSet]);
//     }

//     // isNotFetching = true;
//   }

//   //getting frined/chatRoom data
//   async function getRoomData() {
//     try {
//       let data = await ChatApi.getRoomData(match.params.roomId);
//       setRoomData(data);
//     } catch (err) {
//       setStateRoomId(null);
//       console.error(err);
//     }
//   }
//   useEffect(() => {
//     const { roomId } = match.params;
//     areMessagesLeft = true;
//     setMessages([]);
//     setStateRoomId(roomId);
//     getRoomData();
//     // isNotFetching = false;
//     //#scrollFetchEnabled = false;
//     fetchMessages(0).then(() => {
//       messagesEndRef.current.scrollIntoView({ behavior: "auto" });
//       ChatApi.cancelFetch();
//       isNotFetching = false;
//     });

//     ChatApi.changeRoom(roomId);
//     ChatApi.subscribeRoom(getMessage);

//     return () => {
//       console.log("UNMOUNT");
//       ChatApi.unSubscribeRoom();
//       //cancel fetch req
//       ChatApi.cancelFetch();
//       // setMessages([]);
//       //# scrollFetchEnabled = false;
//     };
//   }, [match.params.roomId]);

//   function getMessage(message) {
//     setMessages((messages) => [...messages, message]);
//     const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
//     if (scrollHeight - scrollTop - clientHeight < 400) {
//       messagesEndRef.current.scrollIntoView({ behavior: "auto" });
//     }
//   }

//   let isNotFetching = true;
//   function handleScroll() {
//     //#&& scrollFetchEnabled
//     if (chatBoxRef.current.scrollTop <= 10 && isNotFetching && areMessagesLeft) {
//       const { scrollHeight } = chatBoxRef.current;
//       if (scrollHeight > 100) {
//         let [mostTopMsg] = chatBoxRef.current.children;

//         fetchMessages(messages.length).then(() => {
//           isNotFetching = true;
//           mostTopMsg.scrollIntoView({ behavior: "auto", block: "start" });
//           chatBoxRef.current.scrollBy(0, -10);
//         });
//       }
//       // isNotFetching = false;
//     }
//   }
//   //TODloading...
//   console.log(messages);
//   return (
//     <Container>
//       <ChatRoomNav roomData={roomData} />
//       <ChatBox ref={chatBoxRef} onScroll={debounce(handleScroll, 100)}>
//         {messages &&
//           messages.map((msg) => (
//             <Message
//               user={msg.senderid === userContext.user.idusers}
//               key={msg.idmessages}
//               {...msg}
//             />
//           ))}
//         <div ref={messagesEndRef} />
//       </ChatBox>
//       <MessageSendForm />
//     </Container>
//   );
// };

const ChatRoom = ({ userContext, match }) => {
  const { roomId } = match.params;
  //state
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //refs
  const messagesEndRef = React.useRef(null);
  const chatBoxRef = React.useRef(null);

  useEffect(() => {
    //init
    ChatApi.changeRoom(roomId, () => {
      ChatApi.subscribeRoom(getMessage);
      //fetch using get
      ChatApi.fetchMessages(0).then((data) => {
        if (data) {
          let messages = data.reverse();
          setMessages(messages);
          //scroll down
          messagesEndRef.current.scrollIntoView();
        }
        setIsLoading(false);
      });
    });

    return () => {
      //cleanup
      ChatApi.unSubscribeRoom();
      ChatApi.cancelFetch();
      setMessages([]);
      setIsLoading(true);
    };
  }, [roomId]);

  function getMessage(message) {
    setMessages((oldMessages) => [...oldMessages, message]);
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    if (scrollHeight - scrollTop - clientHeight < 400) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  async function fetchMoreMessages() {
    if (!isLoading) {
      setIsLoading(true);
      let number = messages.length;
      let data = await ChatApi.fetchMessages(number);
      if (data) {
        let newMessages = data.reverse();
        setMessages((oldMessages) => [...newMessages, ...oldMessages]);
        setIsLoading(false);
        if (data.length === 0) {
          ChatApi.disableFetchMessages();
        } else {
          return true;
        }
      }
    }
    return false;
  }

  async function handleScroll() {
    if (chatBoxRef.current.scrollTop <= 10) {
      let [mostTopMsg] = chatBoxRef.current.children;
      let isChanged = await fetchMoreMessages(messages.length);
      if (isChanged) {
        mostTopMsg.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <Container>
      <ChatRoomNav />
      <ChatBox ref={chatBoxRef} onScroll={handleScroll}>
        {messages &&
          messages.map((msg) => (
            <Message
              user={msg.senderid === userContext.user.idusers}
              key={msg.idmessages}
              {...msg}
            />
          ))}
        {isLoading && <div>Loading...</div>}
        <div ref={messagesEndRef} />
      </ChatBox>
      <MessageSendForm />
    </Container>
  );
};

export default withContext(ChatRoom);
