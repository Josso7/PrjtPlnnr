import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsByProjectId, postChannels } from '../../store/channel';
import { createPortal } from 'react-dom';
import ChannelForm from '../Forms/ChannelForm';

function ProjectChannels({ activeProject, handleActiveChannel }){

    const dispatch = useDispatch();
    const joinedProjects = useSelector(state => state?.projects?.joinedProjects);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [activeChannel, setActiveChannel] = useState('');
    const [showChannelForm, setShowChannelForm] = useState(false);

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
        dispatch(getChannelsByProjectId(activeProject))
    },[user])

    useEffect(() => {
        handleActiveChannel(activeChannel);
        // dispatch(resetMessages())
    },[activeChannel])

    const handleClick = (e, channelId) => {
        e.preventDefault();
        setActiveChannel(channelId);
    }

    useEffect(() => {
        handleActiveChannel(activeChannel);
    },[activeChannel])

    const postChannel = () => {

    }


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

                    <div className='add-channel-button'
                    onClick={(e) => setShowChannelForm(true)}>
                        +
                    </div>

                </div>

                {channels && channels.map(channel => (
                <div
                key={channel.id}
                className='single-channel-container'
                onClick={(e) => handleClick(e, channel.id)}>

                    <div className='channel-selector'>
                        #{channel.name}
                    </div>

                </div>))}
            </div>
            {showChannelForm && <ChannelForm activeProject={activeProject} setShowChannelForm={setShowChannelForm}/>}
        </>
    )
}

export default ProjectChannels
