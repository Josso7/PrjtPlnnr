import './Messages.css';
import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';

function Messages () {

    useEffect(() => {
        
    },[])


    return (
        <>
            <div className='messages-container'>
                <div>

                </div>
            </div>
        </>
    )
}

export default Messages;
