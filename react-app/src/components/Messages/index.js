import './Messages.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getChannelsByProjectId } from '../../store/channel';
import { getMessagesById } from '../../store/message';
import { postMessages } from '../../store/message';
import { io } from 'socket.io-client';
import EditIcon from '@mui/icons-material/Edit';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

let socket;

function Messages ({ activeProject, activeChannel, users }) {

    const dispatch = useDispatch();
    const messages = useSelector(state => state?.messages?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const currentChannel = channels?.find(channel => channel.id === activeChannel)
    const user = useSelector(state => state?.session?.user);
    const chatBoxEnd = useRef(null)
    const [chatInput, setChatInput] = useState('');
    const [socketMessages, setSocketMessages] = useState([]);
    let channel;

    useEffect(() => {
        socket = io();
        console.log(socket);

        socket.emit('join', { 'username': user.username, 'room': activeChannel });
        socket.emit('join_room', { 'username': user.username, 'room': activeChannel })
        // socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: activeChannel });

        socket.on('chat', (chat) => {
            console.log('chat event emitted')
            console.log(chat);
            dispatch(getMessagesById(activeChannel))
            // setSocketMessages(socketMessages => [...socketMessages, chat]);
            // console.log(socketMessages)
            // scroll();
        });

        // socket.on('join_room', (user) => {
        //     // dispatch(getRooms(groupId));
        // });

        // socket.on('leave_room', (user) => {
        //     // dispatch(getRooms(groupId));
        // });


        return (() => {
            // dispatch(leaveChatRoom(activeChannel));
            socket.emit('leave', { 'username': user.username, 'room': activeChannel });
            socket.emit('leave_room', { 'username': user.username, 'room': activeChannel })
            // socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: activeChannel });

            socket.disconnect();
        })

    },[activeChannel, user, dispatch])

    useEffect(() => {
        dispatch(getChannelsByProjectId(activeProject))
    }, [activeProject])

    useEffect(() => {
        dispatch(getMessagesById(activeChannel));
    },[activeChannel])

    useEffect(() => {
        if(channels && activeChannel) {
            channel = channels?.find(element => element.id == activeChannel);
            console.log('channel', channel);
        }
    },[channels, activeChannel])

    useEffect(() => {
        // console.log(chatBox.current.scrollIntoView(false))
        // chatBox.current.scrollIntoView(true)
        chatBoxEnd.current.scrollIntoView({behavior: 'auto'});
    }, [messages, socketMessages])

    const postMessage = async (e) => {
        e.preventDefault();

        // await new Promise(resolve => socket.emit('chat', { user: user.username, msg: chatInput, room: activeChannel, created_at: (new Date()).toLocaleTimeString() }, resolve()))
        //     .then(() => dispatch(postMessages(activeChannel, user.id, chatInput)));
        if(chatInput){
            dispatch(postMessages(activeChannel, user.id, chatInput))
            socket.emit('chat', { user: user.username, msg: chatInput, room: activeChannel, created_at: (new Date()).toLocaleTimeString() })
            setChatInput('')
        }
    }

    const handleInput = (e) => {
        setChatInput(e.target.value)
        e.target.style.height = '20px';
        e.target.style.height = `${e.target.scrollHeight + 4}px`
        console.log(e.target.scrollHeight);
    }

    const handleEditClick = (e) => {
        e.preventDefault();

    }

    const formatMessages = (messages, users) => {
        const formattedMessages = [];
        let prevUserId = null;
        messages.map(message => {
            if(prevUserId === message.user_id) formattedMessages.push(
            <div className='repeat-single-message-wrapper'>
                <div key={message.id} className='repeat-single-message-container'>{message.content}</div>
                {user.id === message.user_id && <div className='comment-menu-dropdown-content'>
                    <EditIcon sx={{ mt: 0}} style={{ color: "green" }} onClick={(e) => handleEditClick(e, message)} className='comment-menu-button comment-edit-button'>
                    </EditIcon>
                    <DeleteIcon sx={{ mt: 0}} style={{ color: "green" }} className='comment-menu-button comment-delete-button'>Delete</DeleteIcon>
                    <div className='edit-bubble-icon-text-wrapper'>
                        <div className='edit-bubble-icon-text'>Edit</div>
                        <div className='arrow-down-edit'></div>
                    </div>
                    <div className='delete-bubble-icon-text-wrapper'>
                        <div className='delete-bubble-icon-text'>Delete</div>
                        <div className='arrow-down-delete'></div>
                    </div>
                </div>}
            </div>
            )
            else {
                const userInfo = users.find(user => user.id === message.user_id)
                console.log('user-info', user)
                console.log('message-info', message.user_id)
                console.log('users-info', users)
                formattedMessages.push(
                <>
                <div className='message-bottom-margin'></div>
                <div key={message.id} className='single-message-wrapper'>
                    <div className='user-badge-icon'>
                        {userInfo.username.toUpperCase()[0]}
                    </div>
                    <div className='message-text-wrapper'>
                        <div className='user-username-text'> {userInfo.username} </div>
                        <div className='single-message-container'>{message.content}</div>
                    </div>
                    {user.id === message.user_id && <div className='comment-menu-dropdown-content'>
                    <EditIcon sx={{ mt: 0}} style={{ color: "green" }} onClick={(e) => handleEditClick(e, message)} className='comment-menu-button comment-edit-button'>
                    </EditIcon>
                    <DeleteIcon sx={{ mt: 0}} style={{ color: "green" }} className='comment-menu-button comment-delete-button'>Delete</DeleteIcon>
                    <div className='edit-bubble-icon-text-wrapper'>
                        <div className='edit-bubble-icon-text'>Edit</div>
                        <div className='arrow-down-edit'></div>
                    </div>
                    <div className='delete-bubble-icon-text-wrapper'>
                        <div className='delete-bubble-icon-text'>Delete</div>
                        <div className='arrow-down-delete'></div>
                    </div>
                </div>}
                </div>
                </>
                )
            }
            prevUserId = message.user_id
        });
        return formattedMessages;
    }

    return (
        <div className='messages-wrapper'>
            <div className='messages-container'>
                {/* {messages && messages.map(message => (
                    <div key={message.id} className='single-message-container'>
                        {message.content}
                    </div>))} */}
                    {messages && users && formatMessages(messages, users)}
                {/* {activeChannel && socketMessages && socketMessages.map(message => (
                    <div key={message.id} className='single-socket-message'>
                        {message.msg}
                    </div>
                ))} */}
                <div ref={chatBoxEnd}></div>
            </div>
            <div className='chat-container'>
                {activeChannel && messages && channels && <form
                    autoComplete="off"
                    className='chat-form'
                    onSubmit={postMessage}>
                    <textarea className='chat-input'
                        value={chatInput}
                        onChange={(e) => handleInput(e)}
                        placeholder={`Message #${currentChannel && currentChannel.name}`}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && postMessage(e)}
                    >
                    </textarea>
                </form>}
            </div>
        </div>
    )

}
export default Messages;
