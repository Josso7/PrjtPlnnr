import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';
import ProjectNavbar from '../ProjectNavbar';
import ProjectChannels from '../ProjectChannels';
import Messages from '../Messages';
import { useHistory } from 'react-router-dom';

let socket;

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [activeProject, setActiveProject] = useState('');
    const [activeChannel, setActiveChannel] = useState('');



    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
            else history.push('/')
    },[user])

    useEffect(() => {

        if (activeProject) dispatch(getChannelsById(activeProject))
    },[activeProject])

    useEffect(() => {
        if (activeChannel) dispatch(getMessagesById(activeChannel))
    },[activeChannel])

    useEffect(() => {

        if(projects) setActiveProject(projects[0].id)

    },[projects])

    useEffect(() => {
        setActiveChannel('');
        if (activeProject) dispatch(getChannelsById(activeProject))
    },[activeProject])

    useEffect(() => {

        if (activeChannel) dispatch(getMessagesById(activeChannel))
    },[activeChannel])

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
        console.log('connecting', user.username)
        socket.on('login', (status) => {
            // dispatch(getGroups());
        });

        socket.on('logout', (status) => {
            // dispatch(getGroups());
        })

        return (() => {
            console.log('disconnecting from group', user.username)
            socket.emit('logout', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': false })
            socket.disconnect();
        });
    }, [dispatch, user.id, user.username]);

    return (
        <>
        <ProjectNavbar
        handleActiveProject={handleActiveProject}
        />
        <ProjectChannels activeProject={activeProject} handleActiveChannel={handleActiveChannel}/>
        <Messages key={activeChannel} activeChannel={activeChannel}/>
        </>
    )
};

export default HomePage;
