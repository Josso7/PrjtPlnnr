import './OnlineUsers.css';
import { getUsers } from '../../store/onlineUsers';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';


function OnlineUsers({ activeProject }) {
    const [onlineUsers, setOnlineUsers] = useState('');
    // console.log('online users from onlineUsers component', onlineUsers)
    // const dispatch = useDispatch();
    // const onlineUsers = useSelector(state => state?.onlineUsers?.entries)

    useEffect(() => {
        const socket = io();

             socket.on('online_users', (users) => {
            setOnlineUsers(Object.values(users))
            // console.log('ONLINE USERS!!!!!!!!!!!!!!!!!', onlineUsers)
        });
    }, [])

    return (
        <div className='online-users-container'>
            <div className='online-text'> Online - {onlineUsers.length}</div>
                {onlineUsers?.length > 0 && onlineUsers.map(onlineUser => {
                    return (
                        <div className='online-user-container' key={onlineUser.id}>
                            <div className='user-image'>
                                <div> {onlineUser.username[0].toUpperCase()} </div>
                                <div className='status-indicator-image'>

                                </div>
                            </div>
                            <div className='user-username'>{onlineUser.username}</div>
                        </div>
                    )
                })}
        </div>
    )
}

export default OnlineUsers;
