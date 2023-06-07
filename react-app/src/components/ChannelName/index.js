import './ChannelName.css';
import { useSelector } from 'react-redux';

function ChannelName({ activeChannel }) {

    const channels = useSelector(state => Object.values(state.channels.entries));
    const currentChannel = channels?.find(channel => channel.id === activeChannel)

    return(
        <div className='channel-name-container'>
            {channels.length && <div className='channel-name-text'><span id='channel-name-hashtag'>#</span>{currentChannel && currentChannel.name}</div> || ''}
        </div>
    )
}

export default ChannelName;
