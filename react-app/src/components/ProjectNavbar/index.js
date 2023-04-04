import './ProjectNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getProjectsById, getJoinedProjects } from '../../store/project';
import { resetMessages } from '../../store/message';

function ProjectNavbar({handleActiveProject, activeProject}){

    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const user = useSelector(state => state?.session?.user);
    const joinedProjects = useSelector(state => state?.projects.joinedProjects);

    let projectsToDisplay;

    useEffect(() => {
        dispatch(getJoinedProjects(user.id));
    }, [])

    useEffect(() => {
        dispatch(resetMessages())
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
        handleActiveProject(projectId);
    }

    return (
        <>
            <div className='projects-container'>
                <div className='project-planner-logo'>
                    <span className='prjct-text'>Prjct </span><span className='plnnr-text'>Plnnr</span>
                </div>
                {joinedProjects && joinedProjects.map(project => (<div
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
