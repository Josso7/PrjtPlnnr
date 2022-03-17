import './HomePage.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById } from '../../store/project'
import { getChannelsById } from '../../store/channel';
import ProjectNavbar from '../ProjectNavbar';
import ProjectChannels from '../ProjectChannels';

function HomePage() {
    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const channels = useSelector(state => state?.channels?.entries);
    const user = useSelector(state => state?.session?.user);
    const [activeProject, setActiveProject] = useState('');

    useEffect(() => {
        dispatch(getProjectsById(user.id))
    },[])

    useEffect(() => {
        console.log(activeProject)
        if (activeProject) dispatch(getChannelsById(activeProject))
    },[activeProject])

    useEffect(() => {
        console.log(activeProject)
        if(projects) setActiveProject(projects[0].id)
        console.log(activeProject)
    },[projects])

    const handleActiveProject = (projectId) => {
        setActiveProject(projectId)
        console.log(activeProject);
    };

    return (
        <>
        <ProjectNavbar
        handleActiveProject={handleActiveProject}
        />
        <ProjectChannels activeProject={activeProject}/>
        </>
    )
};

export default HomePage;
