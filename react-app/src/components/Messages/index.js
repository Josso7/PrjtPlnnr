import './Messages.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project';
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';
import { postMessages } from '../../store/message';
import { io } from 'socket.io-client';

let socket;

function Messages ({ activeChannel }) {

    const dispatch = useDispatch();
    const messages = useSelector(state => state?.messages?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [chatInput, setChatInput] = useState('');
    const [socketMessages, setSocketMessages] = useState([]);

    let channel;

    useEffect(() => {
        socket = io();
        console.log(socket);

        socket.emit('join', { 'username': user.username, 'room': activeChannel });
        socket.emit('join_room', { 'username': user.username, 'room': activeChannel })
        socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: activeChannel });

        socket.on('chat', (chat) => {
            console.log('chat event emitted')
            console.log(chat);
            setSocketMessages(socketMessages => [...socketMessages, chat]);
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
            socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: activeChannel });

            socket.disconnect();
        })

    },[activeChannel, user, channels, dispatch])

    useEffect(() => {
        dispatch(getMessagesById(activeChannel));

    },[activeChannel])

    useEffect(() => {
        if(channels && activeChannel) {

            channel = channels?.find(element => element.id == activeChannel);

        }
    },[channels])

    const postMessage = (e) => {
        e.preventDefault();
        console.log('hello from postMessage');
        socket.emit('chat', { user: user.username, msg: chatInput, room: activeChannel, created_at: (new Date()).toLocaleTimeString() });
        dispatch(postMessages(activeChannel, user.id, chatInput))
        setChatInput('')
    }

    // useEffect(() => {
    //     // socket = io();
    //     // console.log('hello');
    //     // dispatch(joinChatRoom(activeChannel));

    //     socket.emit('join', { 'username': user.username, 'room': activeChannel });
    //     socket.emit('join_room', { 'username': user.username, 'room': activeChannel })
    //     socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: activeChannel });

    //     socket.on('chat', (chat) => {
    //         setSocketMessages(socketMessages => [...socketMessages, chat]);
    //         console.log(socketMessages)
    //         // scroll();
    //     });

    //     // socket.on('join_room', (user) => {
    //     //     // dispatch(getRooms(groupId));
    //     // });

    //     // socket.on('leave_room', (user) => {
    //     //     // dispatch(getRooms(groupId));
    //     // });


    //     return (() => {
    //         // dispatch(leaveChatRoom(activeChannel));
    //         socket.emit('leave', { 'username': user.username, 'room': activeChannel });
    //         socket.emit('leave_room', { 'username': user.username, 'room': activeChannel })
    //         socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: activeChannel });

    //         // socket.disconnect();
    //     })
    // }, [activeChannel, user, channels, dispatch]);




    return (
        <>
            <div className='messages-container'>
                {messages && messages.map(message => (
                    <div className='single-message-container'>
                        {message.content}
                    </div>))}
                {activeChannel && socketMessages && socketMessages.map(message => (
                    <div className='single-socket-message'>
                        {message.msg}
                    </div>
                ))}
                <div className='chat-container'>
                    {activeChannel && messages && channels && <form
                    autoComplete="off"
                    className='chat-form'
                    onSubmit={postMessage}>
                    <input className='chat-input'
                    type='text'
                    value={chatInput}
                    // onSubmit={(e) => postMessage(e)}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder={channels && activeChannel && `Message #${channels.find(channel => channel.id == activeChannel).name}`}>
                    </input>
                    </form>}
                </div>
            </div>
        </>
    )
}

export default Messages;
