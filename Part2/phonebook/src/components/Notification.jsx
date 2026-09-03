import React from 'react'

const Notification = ({ message, css }) => {
    if (message) {
        return (<div className={css}>{message}</div>);;
    }
    return null;
}

export default Notification

