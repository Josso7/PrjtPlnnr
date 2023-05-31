function HoveredProjectText({ hoveredProjectName, hoveredProjectStyles }) {

    return (
        <div className='project-name-full-arrow'
        style={hoveredProjectName.length > 28 ? hoveredProjectStyles[0] : hoveredProjectStyles[1]}
        >
            <div className='project-name-wrapper'>
                {hoveredProjectName}
            </div>
        </div>
        )
}

export default HoveredProjectText
