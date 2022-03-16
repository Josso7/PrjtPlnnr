const GET_PROJECTS = '/project/GET_PROJECTS';

const loadUserProjects = (projects) => ({
    type: GET_PROJECTS,
    projects
});

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

const initialState = {
};

const reducer = (state = initialState, action) => {

    switch(action.type){
      case GET_VIDEOS: {
        return {
            ...state,
            entries: [...action.videos.videos]
        };
      };
      default: return state;
    };
  };

export default reducer;
