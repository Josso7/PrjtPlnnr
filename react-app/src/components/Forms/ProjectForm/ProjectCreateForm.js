import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postProjects } from '../../../store/project'
import './ProjectCreateForm.css'

function ProjectCreateForm ({ setShowProjectForm }) {

    const user = useSelector(state => state?.session?.user);
    const [name, setName] = useState('')
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(postProjects(name, user.id))
        setShowProjectForm(false)
    }

    return (
        createPortal(
            <div className='modal-overlay'>
                <div className='project-form-wrapper'>
                    {/* {displayErrors && errors.map(error => {
                        return (
                            <div className='project-form-error'>{error}</div>
                            )
                        })} */}
                    <form className='project-form' onSubmit={(e) => handleSubmit(e)}>
                        <label className='project-form-name-label' for='project-form-name'> New Project Name: </label>
                        <input id='project-form-name-input' type='text'onChange={(e) => setName(e.target.value)} value={name}/>
                        <button className='project-form-submit' type='submit'> Save Project </button>
                    </form>
                </div>
            </div>, document.querySelector('.main-div')
        )
    )
}

export default ProjectCreateForm
