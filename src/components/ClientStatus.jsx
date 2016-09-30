import React from 'react';

const ClientStatus = ({ status = [], updated = null }) => {
    const statusList = status
    .map( (client, index) => {
        return (
            <div key={index} className="item">
                <h2>{client.nombre}</h2>
                <p>{client.status}</p>
            </div>
        )
    })
    const lastUpdate = updated ? (
        <small className="last-update"><i className="checked calendar icon"></i>Última actualización {updated}</small>
    ):('');
    return (
        <div className="client-status">
            {statusList}
            {lastUpdate}
        </div>
    )
}

export default ClientStatus;
