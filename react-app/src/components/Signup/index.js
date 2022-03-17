import './Signup.css';
import { signUp } from '../../store/session';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

function Signup(){

    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === repeatPassword) {
          const data = await dispatch(signUp(username, email, password));
          if (data) {
            setErrors(data)
          }
        }
      };

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
                <div className='username-container'>
                    <label for='username' className='username-label'>
                        USERNAME
                    </label>
                    <input
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='username-input'
                    type='text'
                    >
                    </input>
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
                <div className='repeat-password-container'>
                    <label for='repeat-password' className='repeat-password-label'>
                        REPEAT PASSWORD
                    </label>
                    <input
                    id='repeat-password'
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    className='repeat-password-input'
                    type='password'
                    >
                    </input>
                </div>
                <div className='login-submit-button-container'>
                <button
                type='submit'
                className='login-submit-button'>
                    SIGNUP
                </button>
                </div>
            </form>
            </>
        )
    }

    export default Signup;
