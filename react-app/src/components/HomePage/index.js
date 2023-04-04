import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getProjectsById, getUsersByProject } from '../../store/project'
import { getChannelsByProjectId } from '../../store/channel';
import { getMessagesById } from '../../store/message';
import ProjectNavbar from '../ProjectNavbar';
import ProjectChannels from '../ProjectChannels';
import Messages from '../Messages';
import { useHistory } from 'react-router-dom';
import OnlineUsers from '../OnlineUsers';
import ChannelName from '../ChannelName';
import { resetMessages } from '../../store/message'

let socket;

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.joinedProjects);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const users = useSelector(state => Object.values(state.projects.users));
    const [activeProject, setActiveProject] = useState('');
    const [activeChannel, setActiveChannel] = useState('');
    console.log(users);
    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
            else history.push('/')
    },[user])

    useEffect(() => {
        dispatch(resetMessages())
        // if (activeChannel) dispatch(getMessagesById(activeChannel))
    },[activeChannel])

    useEffect(() => {
        if (activeProject) dispatch(getChannelsByProjectId(activeProject))
        if (activeProject) dispatch(getUsersByProject(activeProject))
    },[activeProject])

    useEffect(() => {
        if(channels) setActiveChannel(channels[0].id);
    }, [channels])

    useEffect(() => {
        if(projects) setActiveProject(projects[0].id)
    },[projects])

    const handleActiveProject = (projectId) => {
        setActiveProject(projectId)
    };

    const handleActiveChannel = (channelId) => {
        setActiveChannel(channelId)
    };

    useEffect(() => {
        socket = io();

        socket.emit('login', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': true })
        const interval = setInterval(() => {
            socket.emit('heartbeat', { 'id': user.id })
        }, 4500)

        return (() => {
            socket.off('online_users');
            socket.emit('logout', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': false })
            clearInterval(interval)
            socket.disconnect();
        });
    }, [dispatch, user.id, user.username]);

    return (
        <div className='main-div'>
            <ProjectNavbar
                handleActiveProject={handleActiveProject}
                activeProject={activeProject}
            />
            <ProjectChannels activeProject={activeProject} handleActiveChannel={handleActiveChannel}/>
            <div className='middle-div'>
                <ChannelName activeChannel={activeChannel}/>
                <div className='middle-bottom-div'>
                    <Messages activeProject={activeProject} activeChannel={activeChannel} users={users}/>
                    <OnlineUsers activeProject={activeProject}/>
                </div>
            </div>
        </div>
    )
};

export default HomePage;
