import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsByProjectId, postChannels } from '../../store/channel';
import { deleteProject } from '../../store/project';
import { createPortal } from 'react-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChannelForm from '../Forms/ChannelForm';
import ProjectEditForm from '../Forms/ProjectForm/ProjectEditForm';
import SingleProjectChannel from './SingleProjectChannel';
import { io } from 'socket.io-client';

function ProjectChannels({ activeProject, handleActiveChannel,initialClick }){

    const dispatch = useDispatch();
    const joinedProjects = useSelector(state => Object.values(state?.projects?.joinedProjects));
    const channels = useSelector(state => Object.values(state?.channels?.entries));
    const user = useSelector(state => state?.session?.user);
    const [showChannelForm, setShowChannelForm] = useState(false);
    const [showProjectEditForm, setShowProjectEditForm] = useState(false);
    const [activeChannelSettings, setActiveChannelSettings] = useState('')
    const [channelFormType, setChannelFormType] = useState('')
    const [activeChannelObj, setActiveChannelObj] = useState(null)
    const [showChannelSettings, setShowChannelSettings] = useState(false)
    // const initialClick = useRef(null)

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
        dispatch(getChannelsByProjectId(activeProject))
    },[user])

    // useEffect(() => {
    //     handleActiveChannel(activeChannel);

    // },[activeChannel])

    useEffect(() => {
        setActiveChannelObj(channels?.find(channel => channel.id === activeChannelSettings))
    },[activeChannelSettings])

    // useEffect(() => {
    //     if(channelsObj){
    //         channels = Object.values(channelsObj)
    //         console.log(channels, 'channels')
    //     }
    // }, [channelsObj])

    const deleteProjectHandler = () => {
        dispatch(deleteProject(activeProject))
    }

    // const closeChannelSettingsMenu = (e) => {
    //     // console.log('yo')
    //     if(e.target.className !== 'channel-settings-options-bubble-text' && !(e.target.matches('.channel-settings-icon, .channel-settings-icon *'))) {
    //         setShowChannelSettings(false)
    //     }
    //     if(e.target.className !== 'channel-settings-options-bubble-text' && !(e.target.matches('.channel-form-wrapper, .channel-form-wrapper *')) && !(e.target.matches('.channel-settings-icon, .channel-settings-icon *')) && !(e.target.matches('.channel-settings-edit-button, .channel-settings-edit-button *'))){
    //         setActiveChannelSettings('')
    //         // console.log('inside 1st if statement')
    //         // console.log(e.target)
    //     }
    // }

    const closeChannelForm = (e) => {
        if(!(e.target.matches('.channel-form-wrapper, .channel-form-wrapper *')) && !(e.target.matches('.channel-settings-icon, .channel-settings-icon *')) && !(e.target.matches('.add-channel-button, .add-channel-button *'))) {
            // setShowChannelForm(false)
            if(initialClick.current.id !== "channel-form-name-input"){
                setShowChannelForm(false)
            }
        }
    }

    const closeEditProjectForm = (e) => {
        // e.preventDefault();
        // e.stopPropagation();
        if(!(e.target.matches('.project-form-wrapper, .project-form-wrapper *')) && !(e.target.matches('.selected-project-wrapper, .selected-project-wrapper *' ))) {
            console.log(initialClick)
            if(initialClick.current.id !== "project-form-name-input"){
                setShowProjectEditForm(false)
            }
        }
        // if(!(initialState.matches(('.project-form-wrapper, .project-form-wrapper *'))) && !(initialState.matches('.selected-project-wrapper, .selected-project-wrapper *' ))){
        //     setShowProjectEditForm(false)
        // }
    }

    const initialClickSetter = (e) => {
        console.log(window.getSelection())
        console.log(e)
        // e.preventDefault();
        // e.stopPropagation();
        initialClick.current = e.target
        console.log(initialClick.current)
    }



    useEffect(() => {
        window.addEventListener('mousedown', initialClickSetter)
        window.addEventListener('mouseup', closeEditProjectForm)
        // window.addEventListener('click', closeChannelSettingsMenu)
        window.addEventListener('click', closeChannelForm)

        return () => {
            window.addEventListener('mousedown', initialClickSetter)
            window.removeEventListener('mouseup', closeEditProjectForm)
            // window.removeEventListener('click', closeChannelSettingsMenu)
            window.removeEventListener('click', closeChannelForm)
        }
    }, [])

    return (
        <>
            <div className='channels-container'>
                {/* <div className='username-text'>
                    {user && user.username}
                </div> */}
                {/* <div class="dashboard">
                <div className='progress-bar-wrapper'>
                    <svg className='svg-animation'>
                        <circle class="bg" cx="57" cy="57" r="52" />
                        <circle class="meter-2" cx="57" cy="57" r="52" />
                    </svg>
                </div> */}
                {/* </div> */}
                <div className='selected-project-wrapper'>
                    <div className='selected-project-text'>
                        {joinedProjects && activeProject && joinedProjects?.find(project => project.id == activeProject)?.name}
                    </div>
                    <EditIcon className='edit-project-button'
                        onClick={(e) => {
                            setShowProjectEditForm(true)
                        }}
                    />
                    <DeleteIcon className='delete-project-button'
                    onClick={(e) => deleteProjectHandler(e)}
                    />
                </div>
                {/* <div className='selected-project-container'> */}

                    {/* <div className='selected-project-text'>
                        {joinedProjects && activeProject && "Project: " + joinedProjects?.find(project => project.id == activeProject).name}
                    </div> */}

                    {/* <div className='add-channel-button'
                        onClick={(e) => {
                            console.log('show channel form')
                            setShowChannelForm(true)
                            setChannelFormType('post')
                        }
                    }>
                        <span class="material-symbols-outlined">add</span>
                    </div> */}

                {/* </div> */}
                <div className='channels-menu-wrapper'>
                    <div className='channels-text'>
                        Channels
                    </div>
                    <div className='add-channel-button'
                        onClick={(e) => {
                            console.log('show channel form')
                            setShowChannelForm(true)
                            setChannelFormType('post')
                            setActiveChannelObj(null)
                        }}>
                        <span class="material-symbols-outlined">add</span>
                    </div>
                </div>
                <div className='channels-wrapper'>
                {channels && channels.map(channel => (
                    <SingleProjectChannel setShowChannelSettings={setShowChannelSettings} showChannelSettings={showChannelSettings} channel={channel} setChannelFormType={setChannelFormType} activeChannelSettings={activeChannelSettings} setActiveChannelSettings={setActiveChannelSettings} setShowChannelForm={setShowChannelForm} handleActiveChannel={handleActiveChannel} />
                ))}
                </div>
                <div className='username-text'>
                    {user && `User: ` + user.username}
                </div>
            </div>
            {showChannelForm && <ChannelForm activeChannelObj={activeChannelObj} channelFormType={channelFormType} activeProject={activeProject} setShowChannelForm={setShowChannelForm} activeChannelSettings={activeChannelSettings}/>}
            {showProjectEditForm && <ProjectEditForm activeProject={activeProject} setShowProjectEditForm={setShowProjectEditForm} />}
        </>
    )
}

export default ProjectChannels
