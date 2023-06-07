const GET_CHANNELS_BY_PROJECT = '/channels/GET_CHANNELS_BY_PROJECT';
const LOAD_CHANNEL = '/channels/LOAD_CHANNEL'
const DELETE_CHANNEL = '/channels/DELETE_CHANNEL'
const ADD_CHANNEL = '/channels/ADD_CHANNEL'
const RESET_CHANNELS = '/channels/RESET_CHANNELS'

const loadUserChannels = (channels) => ({
    type: GET_CHANNELS_BY_PROJECT,
    channels
});

const loadChannel = (channel) => ({
    type: LOAD_CHANNEL,
    channel
})

const removeChannel = (channelId) => ({
    type: DELETE_CHANNEL,
    channelId
})

const addChannel = (channel) => ({
    type: ADD_CHANNEL,
    channel
})

export const resetChannels = () => ({
    type: RESET_CHANNELS
})

export const deleteChannel = (channelId) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}/delete`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(removeChannel(channelId))
    }
}

export const editChannel = (channelId, name) => async dispatch => {
    const response = await fetch(`/api/channels/${channelId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
        })
    })
    if(response.ok) {
        const data = await response.json()
        dispatch(addChannel(data))
    };
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
        const data = await response.json()
        dispatch(addChannel(data))
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

const initialState = { entries: {}};

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_CHANNELS_BY_PROJECT: {
        const newState = {};
        newState.entries = {};
        action.channels.channels.forEach((channel) => {
            newState.entries[channel.id] = channel
        })
        return newState;
      };
      case LOAD_CHANNEL: {
        const newState = {...state}
        newState.entries[action.channel.id] = action.channel
        return newState
      }
      case DELETE_CHANNEL: {
        const newState = { ...state }
        delete newState.entries[action.channelId]
        return newState;
      }
      case ADD_CHANNEL: {
        const newState = { ...state }
        newState.entries[action.channel.id] = action.channel
        return newState;
      }
      case RESET_CHANNELS: {
        const newState = { entries: {}}
        return newState
      }
      default: return state;
    };
  };

export default reducer;
