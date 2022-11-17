import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';
// import { getUsers } from '../../store/onlineUsers';
import ProjectNavbar from '../ProjectNavbar';
import ProjectChannels from '../ProjectChannels';
import Messages from '../Messages';
import { useHistory } from 'react-router-dom';
import OnlineUsers from '../OnlineUsers';

let socket;

function HomePage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const onlineUsers = useSelector(state => state?.onlineUsers?.entries)
    const [activeProject, setActiveProject] = useState('');
    const [activeChannel, setActiveChannel] = useState('');

    // const disconnectUser = () => {
    //     // e.returnValue = 'Success'
    //     socket.emit('logout', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': false })
    // }

    useEffect(() => {
        // window.addEventListener('beforeunload', (e) => disconnectUser(e))
        // window.onbeforeunload = disconnectUser
        // socket = io();
        // const interval = setInterval(() => {
        //     socket.emit('heartbeat', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': true })
        // }, 1000)

        // return () => {
        //     // window.removeEventListener('beforeunload', (e) => disconnectUser(e));
        //     clearInterval(interval)
        // }

    }, [])

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
            else history.push('/')
    },[user])

    useEffect(() => {
        if (activeChannel) dispatch(getMessagesById(activeChannel))
    },[activeChannel])

    useEffect(() => {
        setActiveChannel('');
        if (activeProject) dispatch(getChannelsById(activeProject))
    },[activeProject])

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

        socket.on('login', (status) => {
            console.log('LOGGED INNNNNNNNNNNNNNNNNNNN')
            // dispatch(getUsers(activeProject))
        });

        socket.on('user_inactive', (user) => {
            console.log('USER_INACTIVE', user)
        })

        socket.on('online_users', (data) => {
            console.log('ONLINE USERS!!!!!!!!!!!!!!!!!', data)
        });

        socket.emit('login', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': true })
        const interval = setInterval(() => {
            socket.emit('heartbeat', { 'id': user.id })
        }, 4500)

        console.log('connecting', user.username)

        return (() => {
            console.log('disconnecting from group', user.username)
            socket.emit('logout', { 'id': user.id, 'username': user.username, 'room': 'project-planner', 'online': false })
            clearInterval(interval)
            socket.disconnect();
        });
    }, [dispatch, user.id, user.username]);

    return (
        <div className='main-div'>
        <ProjectNavbar
        handleActiveProject={handleActiveProject}
        />
        <ProjectChannels activeProject={activeProject} handleActiveChannel={handleActiveChannel}/>
        <Messages key={activeChannel} activeChannel={activeChannel}/>
        <OnlineUsers activeProject={activeProject} onlineUsers={onlineUsers}/>
        </div>
    )
};

export default HomePage;
