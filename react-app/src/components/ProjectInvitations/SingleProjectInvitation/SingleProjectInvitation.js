import { acceptInvitation, declineInvitation } from '../../../store/session'
import { useDispatch } from 'react-redux'

function SingleProjectInvitation({ invitation, setShowProjectInvitations }) {

    const dispatch = useDispatch();

    const handleAccept = (invitationId) => {
        dispatch(acceptInvitation(invitationId))
        setShowProjectInvitations(false)
    }

    const handleDecline = (invitationId) => {
        dispatch(declineInvitation(invitationId))
    }

    return (
        <div className='single-invitation-wrapper'>
            <div className="inviting-text">
                <span id='invitation-username'>{invitation.user_inviting.username}</span> is inviting you to join Project: <span id='invitation-project-name'> {invitation.project.name} </span>
            </div>
            <div className="accept-invitation-button">
                <div onClick={() => handleAccept(invitation.id)}> Accept </div>
            </div>
            <div className="decline-invitation-button">
                <div onClick={() => handleDecline(invitation.id)}> Decline </div>
            </div>
        </div>
    )
}

export default SingleProjectInvitation
