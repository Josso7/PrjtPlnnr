import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';
import { getMessagesById } from '../../store/message';
import ProjectNavbar from '../ProjectNavbar';
import ProjectChannels from '../ProjectChannels';
import Messages from '../Messages';

function HomePage() {
    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [activeProject, setActiveProject] = useState('');
    const [activeChannel, setActiveChannel] = useState('');

    useEffect(() => {
        if(user)dispatch(getProjectsById(user.id))
    },[user])

    useEffect(() => {
        // console.log(activeProject)
        if (activeProject) dispatch(getChannelsById(activeProject))
    },[activeProject])

    useEffect(() => {
        // console.log(activeChannel)
        if (activeChannel) dispatch(getMessagesById(activeChannel))
    },[activeChannel])

    useEffect(() => {
        // console.log(activeProject)
        if(projects) setActiveProject(projects[0].id)
        // console.log(activeProject)
    },[projects])

    const handleActiveProject = (projectId) => {
        setActiveProject(projectId)
        // console.log(activeProject);
    };

    const handleActiveChannel = (channelId) => {
        setActiveChannel(channelId)
        // console.log(activeChannel);
    };

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
