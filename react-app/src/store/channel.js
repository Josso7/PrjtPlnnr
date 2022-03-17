const GET_CHANNELS_BY_PROJECT = '/project/GET_CHANNELS_BY_PROJECT';

const loadUserChannels = (channels) => ({
    type: GET_CHANNELS_BY_PROJECT,
    channels
});

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
        dispatch(getChannelsById(project_id));
        return 'channel saved to database';
    };
};

export const getChannelsById = (project_id) => async dispatch => {
    const response = await fetch(`/api/channels/${project_id}`);

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
      default: return state;
    };
  };

export default reducer;
