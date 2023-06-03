import { createPortal } from 'react-dom'
import { useState } from 'react'
import './InviteForm.css'

function InviteForm() {

    const [name, setName] = useState('')


    const handleSubmit = () => {

    }

    return (
        createPortal(
            <div className='modal-overlay'>
                <div className='invite-form-wrapper'>
                    {displayErrors && errors.map(error => {
                        return (
                            <div className='channel-form-error'>{error}</div>
                        )
                    })}
                    <form className='invite-form' onSubmit={(e) => handleSubmit(e)}>
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
