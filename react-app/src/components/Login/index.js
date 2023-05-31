import './Login.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';
import { Redirect, useHistory } from 'react-router-dom';

function Login(){

    const history = useHistory();
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(state => state.session)

    // if(user){
    //     history.push('/home')
    //     // return <Redirect to={'/home'}/>
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
          setErrors(data);
        }
        if(errors.length === 0) history.push('/home');
    }

    return (
        <>
        <form
        onSubmit={(e) => handleSubmit(e)}
        className='login-form-container'>
            <div>
                {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>
            <div className='email-container'>
                <label for='email' className='email-label'>
                    EMAIL
                </label>
                <input
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='email-input'
                type='text'
                >
                </input>
            </div>
            <div className='password-container'>
                <label for='password' className='password-label'>
                    PASSWORD
                </label>
                <input
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='password-input'
                type='password'
                >
                </input>
            </div>
            <div className='login-submit-button-container'>
            <button
            type='submit'
            className='login-submit-button'>
                LOGIN
            </button>
            </div>
        </form>
        </>
    )
}

export default Login;
