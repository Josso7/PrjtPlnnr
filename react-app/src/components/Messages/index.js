import "./Messages.css";
import { useSelector, useDispatch } from "react-redux";
import { createPortal } from 'react-dom'
import { useEffect, useState, useRef } from "react";
import { getChannelsByProjectId } from "../../store/channel";
import { postMessages, deleteMessage, getMessagesById } from "../../store/message";
import { io } from "socket.io-client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ChatInput from "./chatInput";
import EditMessageForm from '../Forms/MessageForm'

let socket;

function Messages({ activeProject, activeChannel, users, initialClick }) {
  const dispatch = useDispatch();
  const messages = useSelector((state) => Object.values(state?.messages?.entries));
  const channels = useSelector((state) => Object.values(state?.channels?.entries));
  const user = useSelector((state) => state?.session?.user);
  const chatBoxEnd = useRef(null);
  const [currentChannel, setCurrentChannel] = useState();
  const [chatInput, setChatInput] = useState("");
  const [showEditMessageForm, setShowEditMessageForm] = useState('')
  const [activeEditMessage, setActiveEditMessage] = useState('')
  let channel;

  useEffect(() => {
    socket = io();

    socket.emit("join", { username: user.username, room: activeChannel });
    socket.emit("join_room", { username: user.username, room: activeChannel });

    socket.on("chat", () => {
      dispatch(getMessagesById(activeChannel));
    });

    return () => {
      socket.emit("leave", { username: user.username, room: activeChannel });
      socket.emit("leave_room", {
        username: user.username,
        room: activeChannel,
      });

      socket.disconnect();
    };
  }, [activeChannel, user, dispatch]);

  useEffect(() => {
    if(Object.values(channels).length){
      const currChannel = channels?.find(
        (channel) => channel.id === activeChannel
      );
      setCurrentChannel(currChannel)
    }
  }, [channels])

  useEffect(() => {
    dispatch(getChannelsByProjectId(activeProject));
  }, [activeProject]);

  useEffect(() => {
    dispatch(getMessagesById(activeChannel));
  }, [activeChannel]);

  useEffect(() => {
    if (channels && activeChannel) {
      channel = channels?.find((element) => element.id == activeChannel);
    }
  }, [channels, activeChannel]);

  useEffect(() => {
    chatBoxEnd.current.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  const closeMessageEditForm = (e) => {
    if(!(e.target.matches('.edit-message-form, .edit-message-form *, .comment-menu-dropdown-content, .comment-menu-dropdown-content *'))){
      if(initialClick?.current?.id !== "message-form-input"){
        setShowEditMessageForm(false)
        setActiveEditMessage('')
      }
    }
  }

  useEffect(() => {
    window.addEventListener('click', closeMessageEditForm)
    // window.addEventListener('click', closeChannelForm)

    return () => {
        window.removeEventListener('click', closeMessageEditForm)
        // window.removeEventListener('click', closeChannelForm)
    }
}, [])

  const postMessage = async (e) => {
    e.preventDefault();

    if (chatInput) {
      dispatch(postMessages(activeChannel, user.id, chatInput));
      socket.emit("chat", {
        user: user.username,
        msg: chatInput,
        room: activeChannel,
        created_at: new Date().toLocaleTimeString(),
      });
      setChatInput("");
    }
  };

  const handleEditClick = (e,message) => {
    setShowEditMessageForm(true)
    setActiveEditMessage(message)
  }

  const handleDeleteClick = (e, messageId) => {
    dispatch(deleteMessage(messageId))
  }

  const formatMessages = (messages, users) => {
    const formattedMessages = [];
    formattedMessages.push(currentChannel && <div className="messages-welcome">Welcome to #{currentChannel.name}!</div>)
    formattedMessages.push(currentChannel && <div className="messages-channel-start">This is the start of the #{currentChannel.name} channel.</div>)
    let prevUserId = null;
    messages.map((message) => {
      if (prevUserId === message.user_id)
        formattedMessages.push(
          <div className="repeat-single-message-wrapper">
            <div key={message.id} className="repeat-single-message-container">
              {message.content}
            </div>
            {user.id === message.user_id && (
              <div className="comment-menu-dropdown-content">
                <EditIcon
                  sx={{ mt: 0 }}
                  style={{ color: "green" }}
                  onClick={(e) => handleEditClick(e, message)}
                  className="comment-menu-button comment-edit-button"
                ></EditIcon>
                <DeleteIcon
                  sx={{ mt: 0 }}
                  style={{ color: "green" }}
                  onClick={(e) => handleDeleteClick(e, message.id)}
                  className="comment-menu-button comment-delete-button"
                >
                  Delete
                </DeleteIcon>
                <div className="edit-bubble-icon-text-wrapper">
                  <div className="edit-bubble-icon-text">Edit</div>
                  <div className="arrow-down-edit"></div>
                </div>
                <div className="delete-bubble-icon-text-wrapper">
                  <div className="delete-bubble-icon-text">Delete</div>
                  <div className="arrow-down-delete"></div>
                </div>
              </div>
            )}
          </div>
        );
      else {
        const userInfo = users.find((user) => user.id === message.user_id);
        formattedMessages.push(
          <>
            <div className="message-bottom-margin"></div>
            <div key={message.id} className="single-message-wrapper">
              <div className="user-badge-icon">
                {message.user.username.toUpperCase()[0]}
              </div>
              <div className="message-text-wrapper">
                <div className="user-username-text"> {message.user.username} </div>
                <div className="single-message-container">
                  {message.content}
                </div>
              </div>
              {user.id === message.user_id && (
                <div className="comment-menu-dropdown-content">
                  <EditIcon
                    sx={{ mt: 0 }}
                    style={{ color: "green" }}
                    onClick={(e) => handleEditClick(e, message)}
                    className="comment-menu-button comment-edit-button"
                  ></EditIcon>
                  <DeleteIcon
                    sx={{ mt: 0 }}
                    style={{ color: "green" }}
                    onClick={(e) => handleDeleteClick(e, message.id)}
                    className="comment-menu-button comment-delete-button"
                  >
                    Delete
                  </DeleteIcon>
                  <div className="edit-bubble-icon-text-wrapper">
                    <div className="edit-bubble-icon-text">Edit</div>
                    <div className="arrow-down-edit"></div>
                  </div>
                  <div className="delete-bubble-icon-text-wrapper">
                    <div className="delete-bubble-icon-text">Delete</div>
                    <div className="arrow-down-delete"></div>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }
      prevUserId = message.user_id;
    });
    return formattedMessages;
  };

  return (
    <>
      <div className="messages-wrapper">
        <div className="messages-container">
          {activeProject && messages && users && formatMessages(messages, users)}
          {!activeProject && <div className="empty-project-text"> Join a Project to start chatting!</div>}
          <div ref={chatBoxEnd}></div>
        </div>
        <ChatInput activeChannel={activeChannel} socket={socket}/>
      </div>
      {showEditMessageForm && createPortal(
        <EditMessageForm message={activeEditMessage} setShowEditMessageForm={setShowEditMessageForm}/>, document.querySelector('.main-div')
      )}
    </>
  );
}
export default Messages;
