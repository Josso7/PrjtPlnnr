import './Messages.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project';
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';
import { postMessages } from '../../store/message';

function Messages ({ activeChannel }) {

    const dispatch = useDispatch();
    const messages = useSelector(state => state?.messages?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [chatInput, setChatInput] = useState('');
    const [socketMessages, setSocketMessages] = useState([]);

    let channel;

    if(user) console.log(user);

    useEffect(() => {
        dispatch(getMessagesById(activeChannel));
        // console.log(activeChannel)
    },[activeChannel])

    useEffect(() => {
        if(channels && activeChannel) {
            // console.log(activeChannel)
            channel = channels?.find(element => element.id == activeChannel);
            // console.log(channel.name);
        }
    },[channels])

    const postMessage = async (e) => {
        e.preventDefault();
        await dispatch(postMessages(activeChannel, user.id, chatInput))
        setChatInput('')
    }

    useEffect(() => {
        socket = io();

        dispatch(joinChatRoom(roomId));

        socket.emit('join', { 'username': user.username, 'room': roomId });
        socket.emit('join_room', { 'username': user.username, 'room': roomId })
        socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has joined the room.`, room: roomId });

        socket.on('chat', (chat) => {
            setSocketMessages(messages => [...messages, chat]);
            scroll();
        });

        socket.on('join_room', (user) => {
            dispatch(getRooms(groupId));
        });

        socket.on('leave_room', (user) => {
            dispatch(getRooms(groupId));
        });


        return (() => {
            dispatch(leaveChatRoom(roomId));
            socket.emit('leave', { 'username': user.username, 'room': roomId });
            socket.emit('leave_room', { 'username': user.username, 'room': roomId })
            socket.emit('chat', { user: 'weStudy-Bot', msg: `${user.username} has left the room.`, room: roomId });

            socket.disconnect();
        })
    }, [roomId, user.username, dispatch, groupId]);




    return (
        <>
            <div className='messages-container'>
                {messages && messages.map(message => (
                    <div className='single-message-container'>
                        {message.content}
                    </div>))}
                {}
                <div className='chat-container'>
                    {messages && channels && <form
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
