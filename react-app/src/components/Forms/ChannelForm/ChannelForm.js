import { createPortal } from 'react-dom';
import { postChannels } from '../../../store/channel';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { editChannel } from '../../../store/channel'
import './ChannelForm.css';

function ChannelForm({activeChannelSettings, activeChannelObj, activeProject, setShowChannelForm, activeChannel, channelFormType}){

    const dispatch = useDispatch();
    const channel = useSelector(state => {
        return Object.values(state.channels.entries).find(element => element.id === activeChannelSettings)
    })
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])
    const [displayErrors, setDisplayErrors] = useState(false)

    useEffect(() => {
        const errors = []
        if(name?.length < 1) errors.push('Channel name cannot be empty')
        if(name?.length > 100) errors.push('Channel name must be 100 or less characters')
        setErrors(errors)
    }, [name])

    useEffect(() => {
        if(channelFormType === 'edit') setName(channel?.name)
    }, [activeChannelSettings])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(errors.length > 0) setDisplayErrors(true)
        if(errors.length === 0 && activeChannelObj) {
            console.log('if')
            dispatch(editChannel(activeChannelObj.id, name)).then(setShowChannelForm(false))
        } else if(errors.length === 0){
            console.log('else if')
            dispatch(postChannels(activeProject, name)).then(setShowChannelForm(false))
        }
    }

    return (
        createPortal(
            <div className='modal-overlay'>
                <div className='channel-form-wrapper'>
                    {displayErrors && errors.map(error => {
                        return (
                            <div className='channel-form-error'>{error}</div>
                        )
                    })}
                    <form autocomplete="off" className='channel-form' onSubmit={(e) => handleSubmit(e)}>
                        <label className='channel-form-name-label' for='channel-form-name'> {channelFormType === 'post' ? 'Create Channel' : `Edit Channel Name`} </label>
                        <input id='channel-form-name-input' type='text'onChange={(e) => setName(e.target.value)} value={name || ''}/>
                        <button className='channel-form-submit' type='submit'> Save Channel </button>
                        {/* <button onClick={() => setShowChannelForm(false)}> Close Form</button> */}
                    </form>
                </div>
            </div>, document.querySelector('.main-div')
        )
    )
}

export default ChannelForm
