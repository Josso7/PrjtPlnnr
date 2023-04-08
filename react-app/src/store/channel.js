const GET_CHANNELS_BY_PROJECT = '/channels/GET_CHANNELS_BY_PROJECT';
const LOAD_CHANNEL = '/channels/LOAD_CHANNEL'

const loadUserChannels = (channels) => ({
    type: GET_CHANNELS_BY_PROJECT,
    channels
});

const loadChannel = (channel) => ({
    type: LOAD_CHANNEL,
    channel
})

export const editChannel = (channelId, name) => async dispatch => {
    const response = await fetch('/api/channels/edit', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channelId,
            name,
        })
    })
    if(response.ok) {
        dispatch(loadChannel)
    }
}

export const postChannels = (project_id, name, channel_type) => async dispatch => {
    const response = await fetch('/api/channels/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            project_id,
            name,
            channel_type
        })
    });

    if(response.ok) {
        dispatch(getChannelsByProjectId(project_id));
        return 'channel saved to database';
    };
};

export const getChannelsByProjectId = (project_id) => async dispatch => {
    const response = await fetch(`/api/projects/${project_id}/channels`);

    if(response.ok){
        const channels = await response.json();
        dispatch(loadUserChannels(channels))
    };
};

const initialState = {
};

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_CHANNELS_BY_PROJECT: {
        return {
            ...state,
            entries: [...action.channels.channels]
        };
      };
      case LOAD_CHANNEL: {
        const newState = {...state}
        newState.entries[action.channel.id] = action.channel
        return newState
      }
      default: return state;
    };
  };

export default reducer;
