import './ProjectNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getProjectsById, getJoinedProjects } from '../../store/project';
import { resetMessages } from '../../store/message';
import ProjectCreateForm from '../Forms/ProjectForm/ProjectCreateForm';
import ProjectEditForm from '../Forms/ProjectForm/ProjectEditForm';
import { border, textAlign } from '@mui/system';
import HoveredProjectText from './HoveredProjectText';

function ProjectNavbar({handleActiveProject, activeProject, initialClick }){

    const dispatch = useDispatch();
    const projects = useSelector(state => Object.values(state?.projects?.entries));
    const user = useSelector(state => state?.session?.user);
    const joinedProjects = useSelector(state => Object.values(state?.projects.joinedProjects));
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [hoveredProjectName, setHoveredProjectName] = useState('')
    const [hoveredProjectStyles, setHoveredProjectStyles] = useState({})
    const hoveredProject = useRef()
    // const [showEditProjectForm, setShowEditProjectForm] = useState(false);
    // const [activeProjectObj, setActiveProjectObj] = useState(null)

    let longTextStyle = null;

    let shortTextStyle = null;

    let projectsToDisplay;

    const testStyle = {
        color: 'black'
    }

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
            // console.log('projects to display ', projectsToDisplay);
        }
    }, [joinedProjects, projects])

    const handleProjectClick = (projectId) => {
        handleActiveProject(projectId);
    }

    const handleCreateProject = () => {
        setShowProjectForm(true)
    }

    const setHoveredProject = (e, projectId) => {
        hoveredProject.current = e.target.getBoundingClientRect()
        setHoveredProjectName(joinedProjects.find(project => project.id === projectId).name)
        // console.log(hoveredProject.current)
    }

    const closeProjectForm = (e) => {
        if(!(e.target.matches('.project-form-wrapper, .project-form-wrapper *')) && !(e.target.matches('.new-project-wrapper, .new-project-wrapper *'))) {
            if(initialClick.current.id !== "project-form-name-input"){
                setShowProjectForm(false)
            }
        }
    }

    useEffect(() => {
        if(hoveredProject.current){

            setHoveredProjectStyles([{
                position: 'absolute',
                top: hoveredProject.current.y - 20,
                left: hoveredProject.current.x + 60,
                zIndex: 999,
                width: '160px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80px',
                backgroundColor: 'darkgreen',
                overflowWrap: 'anywhere',
                overflow: 'hidden',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '20px'
             },
            {
                position: 'absolute',
                top: hoveredProject.current.y + 5,
                left: hoveredProject.current.x + 60,
                zIndex: 999,
                width: '100px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40px',
                backgroundColor: 'darkgreen',
                overflowWrap: 'anywhere',
                overflow: 'hidden',
                paddingLeft: '15px',
                paddingRight: '15px',
                borderRadius: '20px'
            }])
            // console.log(hoveredProjectStyles)
        }
    }, [hoveredProject.current])

    // const displayHoveredProject = () => {
    //     setTimeout(() => {
    //     }, [1000])
    //     return (
    //         <div className='project-name-full-arrow'
    //         style={hoveredProjectName.length > 28 ? hoveredProjectStyles[0] : hoveredProjectStyles[1]}
    //         >
    //             <div className='project-name-wrapper'>
    //                 {hoveredProjectName}
    //             </div>
    //         </div>
    //         )
    // }

    const handleMouseLeave = () => {
        setHoveredProjectStyles([{
            // position: 'absolute',
            // top: hoveredProject.current.y - 20,
            // left: hoveredProject.current.x + 60,
            // zIndex: 999,
            // width: '200px',
            display: 'none',
            // justifyContent: 'center',
            // alignItems: 'center',
            // height: '80px',
            // backgroundColor: 'darkgreen',
            // overflowWrap: 'anywhere',
            // overflow: 'hidden',
            // paddingLeft: '15px',
            // paddingRight: '15px',
            // borderRadius: '20px'
         },
        {
            // position: 'absolute',
            // top: hoveredProject.current.y + 5,
            // left: hoveredProject.current.x + 60,
            // zIndex: 999,
            // width: '100px',
            display: 'none',
            // justifyContent: 'center',
            // alignItems: 'center',
            // height: '40px',
            // backgroundColor: 'darkgreen',
            // overflowWrap: 'anywhere',
            // overflow: 'hidden',
            // paddingLeft: '15px',
            // paddingRight: '15px',
            // borderRadius: '20px'
        }])
        hoveredProject.current = null
        setHoveredProjectName('')
    }

    const handleScroll = () => {
        hoveredProject.current = null
        setHoveredProjectName('')
        console.log('yo')
    }

    useEffect(() => {
        window.addEventListener('click', closeProjectForm);
        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener('click', closeProjectForm);
            window.removeEventListener("wheel", handleScroll);
        }
    }, [])

    return (
        <>
            <div className='projects-container'>
                <div className='project-planner-logo'>
                    <span className='prjct-text'>Prjct </span><span className='plnnr-text'>Plnnr</span>
                </div>
                <div className='projects-wrapper'>
                    {joinedProjects && joinedProjects.map(project => (<div
                    key={project.id}
                    onClick={(e) => handleProjectClick(project.id)}
                    onMouseEnter={(e) => setHoveredProject(e, project.id)}
                    // onMouseLeave={() => {
                    //     hoveredProject.current = null
                    //     setHoveredProjectName('')}
                    // }
                    onMouseLeave={handleMouseLeave}
                    className='single-project-container'
                    >
                        <div className='server-icon'>
                            <div className='server-text'>
                                {project.name[0].toUpperCase()}
                            </div>
                        </div>
                    </div>))}
                    <div className='new-project-wrapper'
                    onClick={() => handleCreateProject()}>
                        <div className='new-project-icon'>
                            <span class="material-symbols-outlined">add</span>
                        </div>
                    </div>
                </div>
            </div>
            {showProjectForm && <ProjectCreateForm setShowProjectForm={setShowProjectForm} handleProjectClick={handleProjectClick}/>}
            {/* {hoveredProject.current && <div className='project-name-full-arrow'
            style={hoveredProjectName.length > 28 ? hoveredProjectStyles[0] : hoveredProjectStyles[1]}
            >
                <div className='project-name-wrapper'>
                    {hoveredProjectName}
                </div>
            </div>
        } */}
        {hoveredProject.current && <HoveredProjectText hoveredProjectName={hoveredProjectName} hoveredProjectStyles={hoveredProjectStyles}/>}
        {/* {hoveredProject.current && displayHoveredProject} */}
        </>
    )
}

export default ProjectNavbar;
