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


    return (
        <>
            <div className='messages-container'>
                {messages && messages.map(message => (
                    <div className='single-message-container'>
                        {message.content}
                    </div>))}

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
