import './HomePage.css';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProjectsById } from '../../store/project'

function HomePage() {

    const channels = useSelector(state => state?.channels?.entries)
 
    return (
        <>
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
