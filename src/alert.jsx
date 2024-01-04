import PropTypes from 'prop-types'

Alert.propTypes = {
    children: PropTypes.string.isRequired
}

function Alert({children}) {
    return (
        <div>{ children }</div>
    )
}

export default Alert