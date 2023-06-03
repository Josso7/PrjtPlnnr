import { createPortal } from 'react-dom'
import { useSelector } from 'react-redux'
import './ProjectInvitations.css'
import SingleProjectInvitation from './SingleProjectInvitation/SingleProjectInvitation'

function ProjectInvitation({ setShowProjectInvitations }) {

    const invitations = useSelector(state => Object.values(state.session.user.invitations))

    return (
        createPortal(
            <div className='project-invitations-modal'>
                <div className='project-invitation-header'>
                    Your invitations
                </div>
                {invitations.length && invitations.map(invitation => {
                    return <SingleProjectInvitation invitation={invitation} setShowProjectInvitations={setShowProjectInvitations}/>
                }) || <span id='no-invitations-text'>You have no invitations!</span>}
            </div>, document.querySelector('.main-div')
        )

    )
}

export default ProjectInvitation
