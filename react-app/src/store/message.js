const GET_MESSAGES_BY_CHANNEL = '/project/GET_MESSAGES_BY_CHANNEL';
const ADD_MESSAGE = '/project/ADD_MESSAGE';
const RESET_MESSAGES = '/project/RESET'

const loadChannelMessages = (messages) => ({
    type: GET_MESSAGES_BY_CHANNEL,
    messages
});

const postMessage = (message) => ({
    type: ADD_MESSAGE,
    message
})

export const resetMessages = () => ({
    type: RESET_MESSAGES
})

export const postMessages = (channelId, userId, content) => async dispatch => {
    const response = await fetch(`/api/projects/channels/${channelId}/messages`, {
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
        const data = await response.json();
        dispatch(postMessage(data));
        return 'message saved to database';
    };
};

export const getMessagesById = (channelId) => async dispatch => {
    const response = await fetch(`/api/projects/channels/${channelId}/messages`);

    if(response.ok){
        const messages = await response.json();
        // console.log(channelId);
        // console.log(messages);
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
      case ADD_MESSAGE: {
        const newState = { ...state, ...state.entries };
        newState.entries[action.message.id] = action.message
        return newState;
      }
      case RESET_MESSAGES: {
        const newState = {};
        return newState;
      }
      default: return state;
    };
  };

export default reducer;
