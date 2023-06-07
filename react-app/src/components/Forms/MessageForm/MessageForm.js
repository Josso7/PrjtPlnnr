import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { editMessage } from '../../../store/message';
import './MessageForm.css'

function MessageForm({ setShowEditMessageForm, message }) {

    const dispatch = useDispatch();
    const [messageContent, setMessageContent] = useState(message.content)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editMessage(message.id, messageContent))
        setShowEditMessageForm(false)
    }

    return (
        <div className='modal-overlay'>
            <div className='message-form-wrapper'>
                <form autocomplete="off" className="edit-message-form" onSubmit={(e) => handleSubmit(e)}>
                    <div className='edit-message-input-wrapper'>
                        <label className='message-form-label'> Edit Message: </label>
                        <textarea id='message-form-input' className='edit-message-input' type='text' value={messageContent} onChange={(e) => setMessageContent(e.target.value)}></textarea>
                    </div>
                    <button className='edit-message-submit-button' type='submit'> Save Message </button>
                </form>
            </div>
        </div>
    )
}

export default MessageForm
