import './ProjectChannels.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProjectsById, leaveProject } from '../../store/project'
import { getChannelsByProjectId, postChannels } from '../../store/channel';
import { deleteProject } from '../../store/project';
import { createPortal } from 'react-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ChannelForm from '../Forms/ChannelForm';
import ProjectEditForm from '../Forms/ProjectForm/ProjectEditForm';
import SingleProjectChannel from './SingleProjectChannel';
import { io } from 'socket.io-client';
import InviteForm from '../Forms/InviteForm/InviteForm';
import WestIcon from '@mui/icons-material/West';

function ProjectChannels({ activeProject, handleActiveChannel,initialClick }){

    const dispatch = useDispatch();
    const projects = useSelector(state => Object.values(state.projects.entries))
    const joinedProjects = useSelector(state => Object.values(state?.projects?.joinedProjects));
    const channels = useSelector(state => Object.values(state?.channels?.entries));
    const user = useSelector(state => state?.session?.user);
    const [activeProjectObj, setActiveProjectObj] = useState('')
    const [showChannelForm, setShowChannelForm] = useState(false);
    const [showProjectEditForm, setShowProjectEditForm] = useState(false);
    const [showInviteForm, setShowInviteForm] = useState(false)
    const [activeChannelSettings, setActiveChannelSettings] = useState('')
    const [channelFormType, setChannelFormType] = useState('')
    const [activeChannelObj, setActiveChannelObj] = useState(null)
    const [showChannelSettings, setShowChannelSettings] = useState(false)

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
        dispatch(getChannelsByProjectId(activeProject))
    },[user])

    useEffect(() => {
        setActiveChannelObj(channels?.find(channel => channel.id === activeChannelSettings))
    },[activeChannelSettings])

    const deleteProjectHandler = () => {
        dispatch(deleteProject(activeProject))
    }

    const closeChannelForm = (e) => {
        if(!(e.target.matches('.channel-form-wrapper, .channel-form-wrapper *')) && !(e.target.matches('.channel-settings-icon, .channel-settings-icon *')) && !(e.target.matches('.add-channel-button, .add-channel-button *'))) {
            // setShowChannelForm(false)
            if(initialClick.current.id !== "channel-form-name-input"){
                setShowChannelForm(false)
            }
        }
    }

    const closeInviteForm = (e) => {
        if(!(e.target.matches('.invite-form-wrapper, .invite-form-wrapper *')) && !(e.target.matches('.invite-project-button, .invite-project-button *'))) {
            if(initialClick.current.id !== "invite-form-input"){
                setShowInviteForm(false)
            }
        }
    }

    const closeEditProjectForm = (e) => {
        if(!(e.target.matches('.project-form-wrapper, .project-form-wrapper *')) && !(e.target.matches('.selected-project-wrapper, .selected-project-wrapper *' ))) {
            console.log(initialClick)
            if(initialClick.current.id !== "project-form-name-input"){
                setShowProjectEditForm(false)
            }
        }
    }

    const initialClickSetter = (e) => {
        console.log(window.getSelection())
        console.log(e)
        initialClick.current = e.target
        console.log(initialClick.current)
    }

    const handleLeaveServer = () => {
        dispatch(leaveProject(activeProject))
    }



    useEffect(() => {
        window.addEventListener('mousedown', initialClickSetter)
        window.addEventListener('mouseup', closeEditProjectForm)
        window.addEventListener('mouseup', closeInviteForm)
        window.addEventListener('click', closeChannelForm)

        return () => {
            window.addEventListener('mousedown', initialClickSetter)
            window.removeEventListener('mouseup', closeEditProjectForm)
            window.removeEventListener('mouseup', closeInviteForm)
            window.removeEventListener('click', closeChannelForm)
        }
    }, [])

    useEffect(() => {
        if(projects.length){
            setActiveProjectObj(projects.find(project => project.id === activeProject))
        }
    }, [projects])

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
                        {joinedProjects && activeProject && joinedProjects?.find(project => project.id == activeProject)?.name || 'Create a Project!'}
                    </div>
                    <span
                    onClick={() => setShowInviteForm(true)}
                    class="material-symbols-outlined invite-project-button" >
                        person_add
                    </span>
                    <EditIcon className='edit-project-button'
                        onClick={(e) => {
                            setShowProjectEditForm(true)
                        }}
                    />
                    {user?.id !== activeProjectObj?.user_id &&
                    <WestIcon className='mui-west-icon'
                    onClick={() => handleLeaveServer()}/>}
                    {user?.id === activeProjectObj?.user_id &&
                    <DeleteIcon className='delete-project-button'
                    onClick={(e) => deleteProjectHandler(e)}
                    />}
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
                    {channels.length && <div className='channels-text'>
                        Channels
                    </div> || <div className='empty-channels-text'> Join a Project to see some channels! </div>}

                    {channels.length && <div className='add-channel-button'
                        onClick={(e) => {
                            console.log('show channel form')
                            setShowChannelForm(true)
                            setChannelFormType('post')
                            setActiveChannelObj(null)
                        }}>
                        <span class="material-symbols-outlined">add</span>
                    </div> || ''}
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
            {showInviteForm && <InviteForm setShowInviteForm={setShowInviteForm} activeProject={activeProject}/>}
            {showChannelForm && <ChannelForm activeChannelObj={activeChannelObj} channelFormType={channelFormType} activeProject={activeProject} setShowChannelForm={setShowChannelForm} activeChannelSettings={activeChannelSettings}/>}
            {showProjectEditForm && <ProjectEditForm activeProject={activeProject} setShowProjectEditForm={setShowProjectEditForm} />}
        </>
    )
}

export default ProjectChannels
