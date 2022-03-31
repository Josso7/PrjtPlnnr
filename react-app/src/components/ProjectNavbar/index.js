import './ProjectNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById, getProjectMembers } from '../../store/project';

function ProjectNavbar({handleActiveProject}){

    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const user = useSelector(state => state?.session?.user);
    const joinedProjects = useSelector(state => state?.projects.joinedProjects);
    const [activeProject, setActiveProject] = useState('');

    let projectsToDisplay;

    useEffect(() => {
        dispatch(getProjectMembers(user.id));
    }, [])

    useEffect(() => {
        handleActiveProject(activeProject);
    },[activeProject])

    useEffect(() => {
        if(joinedProjects && projects) {
            projectsToDisplay = joinedProjects.filter(joinedProject => {
                let singleJoinedProject = projects.map(project => {
                    if(project.id === joinedProject.project_id) return project.id
                })
                return singleJoinedProject;
            })
            console.log('projects to display ', projectsToDisplay);
        }
    }, [joinedProjects, projects])

    const handleClick = (projectId) => {
        setActiveProject(projectId);
    }

    return (
        <>
            <div className='projects-container'>
                <div className='project-planner-logo'>
                    <span className='prjct-text'>Prjct </span><span className='plnnr-text'>Plnnr</span>
                </div>
                {projects && projects.map(project => (<div
                key={project.id}
                onClick={(e) => handleClick(project.id)}
                className='single-project-container'>
                    <div className='server-icon'>
                        <div className='server-text'>
                            {project.name[0]}
                        </div>
                    </div>
                </div>))}
            </div>
        </>
    )
}

export default ProjectNavbar;
