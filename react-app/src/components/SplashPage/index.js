import './SplashPage.css';
import SplashImage from '../../images/todo-image.png';
import { NavLink } from 'react-router-dom';

function SplashPage(){
    return (
        <>
        <div className='top-bar-container'>
            <div className='new-project-button'>
            {
            // this will open a modal
            }
                NEW PROJECT
            </div>

            <NavLink className='projects-button' to='/projects'>
            <div className='my-projects-button'>
                MY PROJECTS
            </div>
            </NavLink>

            <NavLink className='signup-button' to='/signup'>
            <div className='signup-text'>
                SIGN UP
            </div>
            </NavLink>

            <NavLink className='login-button' to='/login'>
            <div className='login-text'>
                LOG IN
            </div>
            </NavLink>
        </div>

        <div className='middle-content-container'>
            <div className='logo-container'>
                <div className='prjct-logo-text'>
                    Prjct
                </div>
                <div className='plnnr-logo-text'>
                    Plnnr
                </div>
                <div className='slogan-text'>
                    for all your planning needs
                </div>
            </div>

            <div className='splash-image-container'>
                <img
                className='splash-image'
                src={SplashImage}>
                </img>
            </div>
        </div>
        </>
    )
}

export default SplashPage;
