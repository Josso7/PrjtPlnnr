import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { editProject } from '../../../store/project'
// import './ProjectCreateForm.css'

function ProjectEditForm ({ setShowProjectEditForm, activeProject }) {

    const user = useSelector(state => state?.session?.user);
    const currentProject = useSelector(state => state.projects.joinedProjects[activeProject])
    const [name, setName] = useState(currentProject?.name);
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(editProject(activeProject, name, user.id))
        setShowProjectEditForm(false)
    }

    return (
        <div className='modal-overlay'>
            <div className='project-form-wrapper'>
                {/* {displayErrors && errors.map(error => {
                    return (
                        <div className='project-form-error'>{error}</div>
                    )
                })} */}
                <form className='project-form' onSubmit={(e) => handleSubmit(e)}>
                    <label className='project-form-name-label' for='project-form-name'> Edit Project Name: </label>
                    <input id='project-form-name-input' type='text'onChange={(e) => setName(e.target.value)} value={name}/>
                    <button className='project-form-submit' type='submit'> Save Project </button>
                </form>
            </div>
        </div>
    )
}

export default ProjectEditForm
