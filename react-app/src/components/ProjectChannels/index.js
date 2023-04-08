import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsByProjectId, postChannels } from '../../store/channel';
import { createPortal } from 'react-dom';
import ChannelForm from '../Forms/ChannelForm';
import SingleProjectChannel from './SingleProjectChannel';

function ProjectChannels({ activeProject, handleActiveChannel }){

    const dispatch = useDispatch();
    const joinedProjects = useSelector(state => state?.projects?.joinedProjects);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [activeChannel, setActiveChannel] = useState('');
    const [showChannelForm, setShowChannelForm] = useState(false);
    const [activeChannelSettings, setActiveChannelSettings] = useState('')
    const [channelFormType, setChannelFormType] = useState('')
    const [activeChannelObj, setActiveChannelObj] = useState(null)
    const [showChannelSettings, setShowChannelSettings] = useState(false)

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
        dispatch(getChannelsByProjectId(activeProject))
    },[user])

    useEffect(() => {
        handleActiveChannel(activeChannel);

    },[activeChannel])

    useEffect(() => {
        setActiveChannelObj(channels?.find(channel => channel.id === activeChannelSettings))
    },[activeChannelSettings])

    const postChannel = () => {

    }

    const closeChannelSettingsMenu = (e) => {
        console.log('yo')
        if(e.target.className !== 'channel-settings-options-bubble-text' && !(e.target.matches('.channel-settings-icon, .channel-settings-icon *'))) {
            setShowChannelSettings(false)
            // console.log('inside 1st if statement')
            // console.log(e.target)
        }
        if(e.target.className !== 'channel-settings-options-bubble-text' && !(e.target.matches('.channel-form-wrapper, .channel-form-wrapper *')) && !(e.target.matches('.channel-settings-icon, .channel-settings-icon *')) && !(e.target.matches('.channel-settings-edit-button, .channel-settings-edit-button *'))){
            setActiveChannelSettings('')
            console.log('inside 1st if statement')
            console.log(e.target)
        }
    }

    const closeChannelForm = (e) => {
        // console.log('yo')
        if(!(e.target.matches('.channel-form-wrapper, .channel-form-wrapper *')) && !(e.target.matches('.channel-settings-edit-button'))) {
            // console.log('inside if statement')
            // console.log(e.target)
            setShowChannelForm(false)
            // setActiveChannelSettings('')
        }
        // if(!(e.target.matches('.channel-settings-edit-button'))) {
        //     console.log('inside if statement')
        //     console.log(e.target)
        //     setShowChannelForm(false)
        //     // setActiveChannelSettings('')
        // }
    }



    useEffect(() => {
        window.addEventListener('click', closeChannelSettingsMenu)
        window.addEventListener('click', closeChannelForm)

        return () => {
            window.removeEventListener('click', closeChannelSettingsMenu)
            window.removeEventListener('click', closeChannelForm)
        }
    }, [])

    return (
        <>
            <div className='channels-container'>
                <div className='username-text'>
                    {user && user.username}
                </div>
                <div class="dashboard">
                <div className='progress-bar-wrapper'>
                    <svg className='svg-animation'>
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
                        onClick={(e) => {
                            setShowChannelForm(true)
                            setChannelFormType('post')
                        }
                    }>
                        +
                    </div>

                </div>

                {channels && channels.map(channel => (
                    <SingleProjectChannel setShowChannelSettings={setShowChannelSettings} showChannelSettings={showChannelSettings} channel={channel} setChannelFormType={setChannelFormType} activeChannelSettings={activeChannelSettings} setActiveChannel={setActiveChannel} setActiveChannelSettings={setActiveChannelSettings} setShowChannelForm={setShowChannelForm}/>
                ))}
            </div>
            {showChannelForm && <ChannelForm activeChannelObj={activeChannelObj} channelFormType={channelFormType} activeProject={activeProject} setShowChannelForm={setShowChannelForm} activeChannelSettings={activeChannelSettings}/>}
        </>
    )
}

export default ProjectChannels
