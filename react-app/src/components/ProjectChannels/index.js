import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';

function ProjectChannels({ activeProject }){

    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(getProjectsById(user.id))
        dispatch(getChannelsById(activeProject))
    },[])

    return(
        <>
            <div>
                {channels && channels.map(channel => (
                <div
                id={channel.id}
                className='single-channel-container'>

                    <div>
                        {channel.name}
                    </div>

                </div>))}
            </div>
        </>
    )
}

export default ProjectChannels
