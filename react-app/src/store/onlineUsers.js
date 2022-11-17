const LOADUSERS = 'online/LOADUSERS';

const loadOnlineUsers = (onlineUsers) => ({
    type: LOADUSERS,
    onlineUsers
})

// export const getUsers = (project_id) => async dispatch => {
//     const response = await fetch(`api/projects/${project_id}/online`);
//     if(response.ok){
//         const onlineUsers = await response.json();
//         dispatch(loadOnlineUsers(onlineUsers))
//     }
// }


const initialState = {}

const reducer = (state = initialState, action) => {

    switch(action.type){
      case LOADUSERS: {
        return {
            ...state,
            entries: [...action.onlineUsers.online_users]
        };
      };
      default: return state;
    };
  };

export default reducer;
