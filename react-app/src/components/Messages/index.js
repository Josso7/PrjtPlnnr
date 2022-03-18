import './Messages.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';

function Messages ({ activeChannel }) {

    const dispatch = useDispatch();
    const messages = useSelector(state => state?.messages?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    let channel;

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


    return (
        <>
            <div className='messages-container'>
                {messages && messages.map(message => (
                    <div className='single-message-container'>
                        {message.content}
                    </div>))}

                <div className='chat-container'>
                    {messages && channels && <input className='chat-input'
                    type='text'
                    placeholder={channels && activeChannel && `Message #${channels.find(channel => channel.id == activeChannel).name}`}>
                    </input>}
                </div>
            </div>
        </>
    )
}

export default Messages;
