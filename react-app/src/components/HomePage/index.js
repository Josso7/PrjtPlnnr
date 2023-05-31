import './HomePage.css';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { getProjectsById, getUsersByProject } from '../../store/project'
import { getChannelsByProjectId } from '../../store/channel';
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
    const projects = useSelector(state => Object.values(state?.projects?.joinedProjects), shallowEqual);
    const channels = useSelector(state => Object.values(state?.channels?.entries), shallowEqual);
    const user = useSelector(state => state?.session?.user);
    const users = useSelector(state => Object.values(state.projects.users));
    const [activeProject, setActiveProject] = useState(projects[0]?.id);
    const [activeChannel, setActiveChannel] = useState('');
    const firstRender = useRef(true)
    const initialClick = useRef(null)
    const projectsLength = useRef()

    useEffect(() => {
        if (activeProject) dispatch(getChannelsByProjectId(activeProject))
        if (activeProject) dispatch(getUsersByProject(activeProject))
    },[activeProject])

    useEffect(() => {
        if(channels) setActiveChannel(channels[0]?.id);
    }, [channels])

    useEffect(() => {
        if(firstRender.current === true){
            projectsLength.current = projects.length
            if(projects.length) {
                console.log(projects[0]?.id)
                setActiveProject(projects[0]?.id)
                firstRender.current = false
            }
        } else if(projectsLength.current !== projects.length) {
            setActiveProject(projects[projects.length - 1]?.id)
            projectsLength.current = projects.length
        }
    },[projects])

    const handleActiveProject = (projectId) => {
        setActiveProject(projectId)
    };

    const handleActiveChannel = (channelId) => {
        setActiveChannel(channelId)
    };

    const initialClickSetter = (e) => {
        initialClick.current = e.target
        console.log(initialClick.current)
    }

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

    useEffect(() => {
        window.addEventListener('mousedown', initialClickSetter)

        return () => {
            window.addEventListener('mousedown', initialClickSetter)
        }
    }, [])

    return (
        <div className='main-div'>
            <ProjectNavbar
                handleActiveProject={handleActiveProject}
                activeProject={activeProject}
                initialClick={initialClick}
            />
            <ProjectChannels initialClick={initialClick} activeProject={activeProject} handleActiveChannel={handleActiveChannel}/>
            <div className='middle-div'>
                <ChannelName activeChannel={activeChannel}/>
                <div className='middle-bottom-div'>
                    <Messages initialClick={initialClick} activeProject={activeProject} activeChannel={activeChannel} users={users}/>
                    <OnlineUsers activeProject={activeProject}/>
                </div>
            </div>
        </div>
    )
};

export default HomePage;
