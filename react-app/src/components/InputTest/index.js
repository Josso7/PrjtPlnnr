import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom'
import ProjectEditForm from "../Forms/ProjectForm/ProjectEditForm";
import './InputTest.css'





function InputTest() {


    const initialClick = useRef(null)
    const [showInput, setShowInput] = useState(false)


    const initialClickSetter = (e) => {
        // console.log(window.getSelection())
        // e.preventDefault();
        // e.stopPropagation();
        initialClick.current = e.target
    }

    useEffect(() => {
        // window.addEventListener('mousedown', initialClickSetter)
        // window.addEventListener('mouseup', closeEditProjectForm)
        // window.addEventListener('click', closeChannelSettingsMenu)
        // window.addEventListener('click', closeChannelForm)

        return () => {
            // window.addEventListener('mousedown', initialClickSetter)
            // window.removeEventListener('mouseup', closeEditProjectForm)
            // window.removeEventListener('click', closeChannelSettingsMenu)
            // window.removeEventListener('click', closeChannelForm)
        }
    }, [])


     return (
        // <>
        // <div className="outer-test-div">
        // <button onClick={() => setShowInput(!showInput)}>Show input</button>
        // </div>
        // {/* <div className="test-form-wrapper">
        //     <form className="test-form">
        //         <label>Test Message</label>
        //         <input type='text'></input>
        //         <button type='submit'>Save Test Message</button>
        //     </form>
        // </div> */}
        // {showInput && createPortal(
        //     <div className="test-form-wrapper">
        //         <form className="test-form">
        //             <label>Test Message</label>
        //             <input type='text'></input>
        //             <button type='submit'>Save Test Message</button>
        //         </form>
        //     </div>, document.querySelector('.outer-test-div')
        // )}
        // </>
        <ProjectEditForm />
     )
}

export default InputTest
