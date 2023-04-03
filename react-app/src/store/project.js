const GET_PROJECTS_BY_USER = '/project/GET_PROJECTS_BY_USER';
const GET_JOINED_PROJECTS = '/project/GET_JOINED_PROJECTS';
const GET_PROJECT_USERS = '/project/GET_PROJECT_USERS';

const loadUserProjects = (projects) => ({
    type: GET_PROJECTS_BY_USER,
    projects
});

const loadJoinedProjects = (joinedProjects) => ({
    type: GET_JOINED_PROJECTS,
    joinedProjects
})

const loadProjectUsers = (users) => ({
    type: GET_PROJECT_USERS,
    users
})

export const getUsersByProject = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/users`)
    if (response.ok){
        const users = await response.json()
        dispatch(loadProjectUsers(users))
        return users;
    } else {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }
    }
}

export const postProjects = (user_id, name) => async dispatch => {
    const response = await fetch('/api/projects/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user_id,
            name
        })
    });

    if(response.ok) {
        dispatch(getProjectsById(user_id));
        return 'video_url saved to database';
    };
};

export const getProjectsById = (user_id) => async dispatch => {
    const response = await fetch(`/api/projects/${user_id}`);

    if(response.ok){
        const projects = await response.json();
        dispatch(loadUserProjects(projects))
    };
};

export const getJoinedProjects = (user_id) => async dispatch => {
    const response = await fetch(`/api/projects/members/${user_id}`)

    if(response.ok){
        const joined_projects = await response.json();
        dispatch(loadJoinedProjects(joined_projects));
    }
}

const initialState = {
    users: {}
};

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_PROJECTS_BY_USER: {
        return {
            ...state,
            entries: [...action.projects.projects]
        };
      };
      case GET_JOINED_PROJECTS: {
          return {
              ...state,
              joinedProjects: [...action.joinedProjects.project_members]
          }
      }
      case GET_PROJECT_USERS: {
        console.log('state <-------', state)
        const newState = {...state};
        newState.users = {};
        action.users.entries.forEach(user => {
            newState.users[user.id] = user;
        })
        return newState;
      }
      default: return state;
    };
  };

export default reducer;
