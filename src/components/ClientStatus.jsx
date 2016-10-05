import React from 'react';

const ClientStatus = ({ name = '', status = [], updated = null }) => {
    const statusList = status
    .map( (stat, index) => {
        return (
            <li key={index} className="item">
                <p><i>{stat.autos}</i></p>
                <p><b>{stat.estado}</b></p>
            </li>
        )
    })
    const lastUpdate = updated ? (
        <small className="last-update"><i className="checked calendar icon"></i>Última actualización {updated}</small>
    ):('');
    return (
        <div className="client-status">
            <h1>{name}</h1>
            <ul>
                {statusList}
            </ul>
            {lastUpdate}
        </div>
    )
}

export default ClientStatus;
