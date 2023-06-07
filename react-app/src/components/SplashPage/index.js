import './SplashPage.css';
import SplashImage from '../../images/todo-image.png';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
function SplashPage(){

    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
    }

    return (
        <>
        <div className='top-bar-container'>
            <NavLink className='projects-button' to='/home'>
                <div className='my-projects-button'>
                    MY PROJECTS
                </div>
            </NavLink>

            {!user && <NavLink className='signup-button' to='/signup'>
                <div className='signup-text'>
                    SIGN UP
                </div>
            </NavLink>}

            {!user && <NavLink className='login-button' to='/login'>
                <div className='login-text'>
                    LOG IN
                </div>
            </NavLink>}

            {user && <div className='logout-button'>
                <div
                className='logout-text'
                onClick={(e) => handleLogout(e)}>
                    LOG OUT
                </div>
            </div>}
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
