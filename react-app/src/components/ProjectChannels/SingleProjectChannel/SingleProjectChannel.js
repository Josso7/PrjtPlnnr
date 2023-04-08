import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { useEffect } from 'react';
import { createPortal } from 'react-dom'

function SingleProjectChannel({ channel, setShowChannelSettings, showChannelSettings, setActiveChannel, activeChannelSettings, setChannelFormType, setActiveChannelSettings, setShowChannelForm }){

    // const [channelMenuOpen, setChannelMenuOpen] = useState(false);

    const openChannelSettings = (e, channelId) => {
        // e.stopPropagation();
        setActiveChannelSettings(channelId)
        if(!e.target.matches('.channel-settings-edit-button') && !(e.target.matches('.channel-settings-delete-button'))){
            setShowChannelSettings(true)
        }
    }

    const handleClick = (e, channelId) => {
        e.preventDefault();
        setActiveChannel(channelId);
    }

    const editChannel = (e) => {
        // e.stopPropagation();
        setShowChannelForm(true)
        setShowChannelSettings(false)
        setChannelFormType('edit')
    }

    const deleteChannel = () => {
        setShowChannelSettings(false)
    }

    return (
        <>
        <div
        key={channel.id}
        className='single-channel-container'>
            <div className='channel-selector-wrapper'>
                <div className='channel-selector'
                onClick={(e) => handleClick(e, channel.id)}>
                    #{channel.name}
                </div>
                <div onClick={(e) => openChannelSettings(e, channel.id)} className='channel-settings-icon'>
                    <SettingsIcon className='channel-settings-mui-icon'/>
                    {/* <div className='channel-settings-icon-bubble-text'>
                        Settings
                    </div>
                    <div className='channel-settings-icon-arrow'>
                    </div> */}
                    <div className='channel-settings-options-wrapper'>
                        {showChannelSettings && activeChannelSettings === channel.id && <div className='channel-settings-options-arrow'>
                        </div>}
                        {showChannelSettings && activeChannelSettings === channel.id && <div className='channel-settings-options-bubble-text'>
                            <div className='channel-settings-edit-button'
                            onClick={(e) => editChannel(e)}>
                                Edit
                            </div>
                            <div className='channel-settings-delete-button'
                            onClick={(e) => deleteChannel(e)}>
                                Delete
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
        {/* {showChannelForm && <ChannelForm activeChannel={activeChannel} setShowChannelForm={setShowChannelForm}/>} */}
        </>
    )
}

export default SingleProjectChannel
