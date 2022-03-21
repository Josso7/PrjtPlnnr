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

        if (activeProject) dispatch(getChannelsById(activeProject))
    },[activeProject])

    useEffect(() => {

        if (activeChannel) dispatch(getMessagesById(activeChannel))
    },[activeChannel])

    useEffect(() => {

        if(projects) setActiveProject(projects[0].id)

    },[projects])

    useEffect(() => {

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
