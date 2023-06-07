import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel } from '../../../store/channel'

function SingleProjectChannel({ handleActiveChannel, channel, setShowChannelSettings, showChannelSettings, setActiveChannel, activeChannelSettings, setChannelFormType, setActiveChannelSettings, setShowChannelForm }){

    // const [channelMenuOpen, setChannelMenuOpen] = useState(false);

    const dispatch = useDispatch();

    // const openChannelSettings = (e, channelId) => {
    //     // e.stopPropagation();
    //     setActiveChannelSettings(channelId)
    //     if(!e.target.matches('.channel-settings-edit-button') && !(e.target.matches('.channel-settings-delete-button'))){
    //         setShowChannelSettings(true)
    //     }
    // }

    const handleClick = (e, channelId) => {
        e.preventDefault();
        console.log(e.target)
        if(!(e.target.matches('.channel-settings-icon *'))) {
            console.log('in if statement')
            handleActiveChannel(channelId);
        }
    }

    const editChannel = (e, channelId) => {
        // e.stopPropagation();
        setShowChannelForm(true)
        setActiveChannelSettings(channelId)
        // setShowChannelSettings(false)
        setChannelFormType('edit')
    }

    const deleteChannelHandler = (e) => {
        // setShowChannelSettings(false)
        setShowChannelForm(false)
        dispatch(deleteChannel(channel.id))
    }

    return (
        <>
        <div
        onClick={(e) => handleClick(e, channel.id)}
        key={channel.id}
        className='single-channel-container'>
            <div className='channel-selector-wrapper'>
                <div className='channel-selector' tooltip={channel.name}>
                    #{channel.name}
                </div>
                <div className='channel-settings-icon'>
                    {/* <SettingsIcon className='channel-settings-mui-icon'/> */}
                    <EditIcon className='channel-settings-mui-icon-edit'
                    onClick={(e) => editChannel(e, channel.id)}/>
                    <DeleteIcon className='channel-settings-mui-icon-delete'
                    onClick={(e) => deleteChannelHandler(e)} />
                    {/* <div className='channel-settings-icon-bubble-text'>
                        Settings
                    </div>
                    <div className='channel-settings-icon-arrow'>
                    </div> */}
                    {/* <div className='channel-settings-options-wrapper'>
                        {showChannelSettings && activeChannelSettings === channel.id && <div className='channel-settings-options-arrow'>
                        </div>}
                        {showChannelSettings && activeChannelSettings === channel.id && <div className='channel-settings-options-bubble-text'>
                            <div className='channel-settings-edit-button'
                            onClick={(e) => editChannel(e)}>
                                Edit
                            </div>
                            <div className='channel-settings-delete-button'
                            onClick={(e) => deleteChannelHandler(e)}>
                                Delete
                            </div>
                        </div>}
                    </div> */}
                </div>
            </div>
        </div>
        {/* {showChannelForm && <ChannelForm activeChannel={activeChannel} setShowChannelForm={setShowChannelForm}/>} */}
        </>
    )
}

export default SingleProjectChannel
