import './Messages.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';

function Messages ({ channelId }) {

    const dispatch = useDispatch();
    const messages = useSelector(state => state?.messages?.entries);

    useEffect(() => {
        dispatch(getMessagesById(channelId));
    },[channelId])


    return (
        <>
            <div className='messages-container'>
                {messages && messages.map(message => (
                    <div className='single-message-container'>
                        {message.content}
                    </div>))}
            </div>
        </>
    )
}

export default Messages;
