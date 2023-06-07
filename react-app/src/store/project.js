const GET_PROJECTS_BY_USER = '/project/GET_PROJECTS_BY_USER';
const GET_JOINED_PROJECTS = '/project/GET_JOINED_PROJECTS';
const GET_PROJECT_USERS = '/project/GET_PROJECT_USERS';
const ADD_PROJECT = '/project/ADD_PROJECT';
const REMOVE_PROJECT = '/project/REMOVE_PROJECT';
const EDIT_PROJECT = '/project/EDIT_PROJECT';
const ADD_JOINED_PROJECT = '/project/ADD_JOINED_PROJECT'

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

const addProject = (project) => ({
    type: ADD_PROJECT,
    project
})

export const addJoinedProject = (project) => ({
    type: ADD_JOINED_PROJECT,
    project
})

const removeProject = (projectId) => ({
    type: REMOVE_PROJECT,
    projectId
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

export const postProjects = (name, user_id) => async dispatch => {
    const response = await fetch('/api/projects/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    });

    if(response.ok) {
        const data = await response.json()
        dispatch(addProject(data));
        dispatch(getJoinedProjects(user_id))
    };
};

export const inviteToProject = (projectId, inviterId, username) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/invite`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inviterId, username})
    })
    if(response.ok){
        const data = await response.json()
    }
}

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

export const deleteProject = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/delete`, {
        method: 'DELETE'
    })

    if(response.ok){
        dispatch(removeProject(projectId))
    }
}

export const leaveProject = (projectId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/leave`, {
        method: 'DELETE'
    })

    if(response.ok){
        const data = await response.json()
        dispatch(removeProject(data.project_id))
    }
}


export const editProject = (projectId, name, userId) => async dispatch => {
    const response = await fetch(`/api/projects/${projectId}/edit`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name
        })
    })

    if(response.ok){
        const data = await response.json()
        dispatch(addProject(data))
        dispatch(getJoinedProjects(userId))
    }
}

const initialState = {
    users: {},
    joinedProjects: {},
    entries: {}
};

const reducer = (state = initialState, action) => {
    switch(action.type){
      case GET_PROJECTS_BY_USER: {
        const newState = { ...state }
        action.projects.projects.forEach(project => {
            newState.entries[project.id] = project
        })
        return newState;
      };
      case GET_JOINED_PROJECTS: {
        const newState = { ...state }
        action.joinedProjects.project_members.forEach(project_member => {
            newState.joinedProjects[project_member.id] = project_member
        })
        return newState;
        //   return {
        //       ...state,
        //       joinedProjects: [...action.joinedProjects.project_members]
        //   }
      }
      case GET_PROJECT_USERS: {
        // console.log('state <-------', state)
        const newState = {...state};
        newState.users = {};
        action.users.entries.forEach(user => {
            newState.users[user.id] = user;
        })
        return newState;
      }
      case ADD_PROJECT: {
        const newState = { ...state }
        newState.entries[action.project.id] = action.project
        return newState;
      }
      case ADD_JOINED_PROJECT: {
        const newState = {...state}
        newState.joinedProjects[action.project.project_id] = action.project
        return newState
      }
      case REMOVE_PROJECT: {
        const newState = { ...state }
        delete newState.entries[action.projectId]
        delete newState.joinedProjects[action.projectId]
        return newState;
      }
      case EDIT_PROJECT: {
        const newState = { ...state }
        newState.entries[action.project.id] = action.project
        return newState
      }
      default: return state;
    };
  };

export default reducer;
