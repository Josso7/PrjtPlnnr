const GET_MESSAGES_BY_CHANNEL = '/project/GET_MESSAGES_BY_CHANNEL';

const loadChannelMessages = (messages) => ({
    type: GET_MESSAGES_BY_CHANNEL,
    messages
});

export const postMessages = (projectId, channelId, userId, content) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/channels/${channelId}/messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            channelId,
            userId,
            content
        })
    });

    if(response.ok) {
        dispatch(getMessagesById(channelId));
        return 'message saved to database';
    };
};

export const getMessagesById = (channelId) => async dispatch => {
    const response = await fetch(`/api/projects/channels/${channelId}/messages`);

    if(response.ok){
        const messages = await response.json();
        console.log(channelId);
        console.log(messages);
        dispatch(loadChannelMessages(messages))
    };
};

const initialState = {
};

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_MESSAGES_BY_CHANNEL: {
        return {
            ...state,
            entries: [...action.messages.messages]
        };
      };
      default: return state;
    };
  };

export default reducer;
