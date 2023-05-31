const GET_MESSAGES_BY_CHANNEL = '/messages/GET_MESSAGES_BY_CHANNEL';
const ADD_MESSAGE = '/messages/ADD_MESSAGE';
const RESET_MESSAGES = '/messages/RESET'
const EDIT_MESSAGE = '/messages/EDIT_MESSAGE'
const DELETE_MESSAGE = '/messages/DELETE_MESSAGE'

const loadChannelMessages = (messages) => ({
    type: GET_MESSAGES_BY_CHANNEL,
    messages
});

const postMessage = (message) => ({
    type: ADD_MESSAGE,
    message
})

const updateMessage = (message) => ({
    type: EDIT_MESSAGE,
    message
})

export const resetMessages = () => ({
    type: RESET_MESSAGES
})

const removeMessage = (messageId) => ({
    type: DELETE_MESSAGE,
    messageId
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

export const editMessage = (messageId, content) => async dispatch => {
    const response = await fetch(`/api/messages/${messageId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content
        })
    })
    if(response.ok) {
        const data = await response.json();
        dispatch(updateMessage(data))
    }
}

export const deleteMessage = (messageId) => async dispatch => {
    const response = await fetch(`/api/messages/${messageId}/delete`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(removeMessage(messageId))
    }
}

const initialState = { entries: {}};

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_MESSAGES_BY_CHANNEL: {
        const newState = { entries: {}}
        action.messages.messages.forEach(message => {
            newState.entries[message.id] = message
        })
        return newState
      };
      case ADD_MESSAGE: {
        const newState = { ...state, ...state.entries };
        newState.entries[action.message.id] = action.message
        return newState;
      }
      case RESET_MESSAGES: {
        const newState = { ...initialState }

        return newState;
      }
      case EDIT_MESSAGE: {
        const newState = { ...state, ...state.entries };
        newState.entries[action.message.id] = action.message
        return newState;
      }
      case DELETE_MESSAGE: {
        const newState = { ...state, ...state.entries };
        delete newState.entries[action.messageId]
        return newState;
      }
      default: return state;
    };
  };

export default reducer;
