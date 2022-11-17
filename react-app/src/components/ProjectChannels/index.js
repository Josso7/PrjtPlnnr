import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';

function ProjectChannels({ activeProject, handleActiveChannel }){

    const dispatch = useDispatch();
    const joinedProjects = useSelector(state => state?.projects?.joinedProjects);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [activeChannel, setActiveChannel] = useState('');

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
        dispatch(getChannelsById(activeProject))
    },[user])

    useEffect(() => {
        handleActiveChannel(activeChannel);
    },[activeChannel])

    const handleClick = (e, channelId) => {
        e.preventDefault();
        setActiveChannel(channelId);

    }

    useEffect(() => {
        handleActiveChannel(activeChannel);
    },[activeChannel])

    return(
        <>
            <div className='channels-container'>
                <div className='username-text'>
                    {user && user.username}
                </div>
                <div class="dashboard">
                <div className='progress-bar-wrapper'>
                    <svg>
                        <circle class="bg" cx="57" cy="57" r="52" />
                        <circle class="meter-2" cx="57" cy="57" r="52" />
                    </svg>
                </div>
                </div>
                <div className='selected-project-container'>

                    <div className='selected-project-text'>
                        {joinedProjects && activeProject && joinedProjects?.find(project => project.id == activeProject).name}
                    </div>

                    <div className='add-channel-button'>
                        +
                    </div>

                </div>

                {channels && channels.map(channel => (
                <div
                key={channel.id}
                className='single-channel-container'
                onClick={(e) => handleClick(e, channel.id)}>

                    <div>
                        #{channel.name}
                    </div>

                </div>))}
            </div>
        </>
    )
}

export default ProjectChannels
