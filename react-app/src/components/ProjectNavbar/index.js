import './ProjectNavbar.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProjectsById } from '../../store/project';
function ProjectNavbar(){

    const projects = useSelector(state => state?.projects?.entries);
    const user = useSelector(state => state?.session?.user);

    useEffect(() => {
        dispatch(getProjectsById(user.id))
    },[])

    return (
        <>
            <div className='projects-container'>
                <div>
                    {projects && projects[0].name}
                </div>
            </div>
        </>
    )
}

export default ProjectNavbar;
