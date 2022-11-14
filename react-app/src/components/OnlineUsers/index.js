import './OnlineUsers.css';
import { getUsers } from '../../store/onlineUsers';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


function OnlineUsers({ activeProject, onlineUsers }) {

    // const dispatch = useDispatch();
    // const onlineUsers = useSelector(state => state?.onlineUsers?.entries)


    // useEffect(() => {
    //     dispatch(getUsers(activeProject))
    // }, [activeProject])

    return (
        <div className='online-users-container'>
            <h1>Hello from OnlineUsers Component</h1>
                {onlineUsers && onlineUsers.length && onlineUsers.map(onlineUser => {
                    return (
                        <h1>{onlineUser.username}</h1>
                    )
                })}
        </div>
    )
}

export default OnlineUsers;
