import { createPortal } from 'react-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { inviteToProject } from '../../../store/project'
import './InviteForm.css'

function InviteForm({ setShowInviteForm, activeProject }) {

    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)

    const handleSubmit = () => {
        dispatch(inviteToProject(activeProject, user.id, name))
        setShowInviteForm(false)
    }

    return (
        createPortal(
            <div className='modal-overlay'>
                <div className='invite-form-wrapper'>
                    {/* {displayErrors && errors.map(error => {
                        return (
                            <div className='channel-form-error'>{error}</div>
                        )
                    })} */}
                    <form autocomplete="off" className='invite-form' onSubmit={(e) => handleSubmit(e)}>
                        <label className='invite-label' for='invite-form-input'> Enter a username: </label>
                        <input id='invite-form-input' type='text'onChange={(e) => setName(e.target.value)} value={name}/>
                        <button className='invite-form-submit' type='submit'> Send Invite </button>
                    </form>
                </div>
            </div>, document.querySelector('.main-div')
        )
    )
}

export default InviteForm
