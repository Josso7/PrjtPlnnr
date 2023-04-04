import { createPortal } from 'react-dom';
import { postChannels } from '../../../store/channel';
import { dispatch, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import './ChannelForm.css';

function ChannelForm({activeProject, setShowChannelForm}){

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false)

    useEffect(() => {
        const errors = []
        if(name.length < 1) errors.push('Channel name cannot be empty')
        setErrors(errors)
    }, [name])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(errors.length > 0) setDisplayErrors(true)
        if(errors.length === 0) dispatch(postChannels(activeProject, name)).then(setShowChannelForm(false))
    }

    return (
        createPortal(
            <div className='channel-form-wrapper'>
                {displayErrors && errors.map(error => {
                    return (
                        <div className='channel-form-error'>{error}</div>
                    )
                })}
                <form onSubmit={(e) => handleSubmit(e)}>
                    <label className='channel-form-name-label' for='channel-form-name'> Create Channel </label>
                    <input id='channel-form-name' placeholder='# New Channel' type='text'onChange={(e) => setName(e.target.value)} value={name}/>
                    <button className='channel-form-submit' type='submit'> Submit </button>
                    <button onClick={() => setShowChannelForm(false)}> Close Form</button>
                </form>
            </div>, document.body
        )
    )
}

export default ChannelForm
