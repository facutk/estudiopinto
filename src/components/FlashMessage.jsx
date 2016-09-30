import React from 'react';

const FlashMessage = ({title, description, severity, onDismiss}) => {
    return (
        <div className="flash-message">
            <div className={"ui compact message " + (severity=='high'?'negative':'warning')}>
                <i className="close icon" onClick={onDismiss}></i>
                <div className="header">
                    {title}
                </div>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default FlashMessage;
