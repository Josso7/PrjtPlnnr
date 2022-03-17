import './ProjectNavbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProjectsById } from '../../store/project';
function ProjectNavbar(){

    const dispatch = useDispatch();
    const projects = useSelector(state => state?.projects?.entries);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(getProjectsById(user.id))
    },[])

    return (
        <>
            <div className='projects-container'>
                <div className='project-planner-logo'>
                    <span className='prjct-text'>Prjct </span><span className='plnnr-text'>Plnnr</span>
                </div>
                {projects && projects.map(project => (<div className='single-project-container'>
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
