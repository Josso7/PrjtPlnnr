import './HomePage.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProjectsById } from '../../store/project'
import ProjectNavbar from '../ProjectNavbar';

function HomePage() {


    const channels = useSelector(state => state?.channels?.entries)

    return (
        <>
        <ProjectNavbar/>
        <div className='homepage-wrapper'>
            <div className='channels-container'>
                <div>

                </div>
            </div>
        </div>
        </>
    )
};

export default HomePage;
