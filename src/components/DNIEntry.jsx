import './DNIEntry.scss';
import { getWorksheet } from 'gsheets';
import React from 'react';
import FlashMessage from './FlashMessage';
import ClientStatus from './ClientStatus';

class DNIEntry extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            client: [],
            dni: '',
            flashMessage: null,
            updated: null
        };
    }

    getStatus = () => {
        if (!this.state.dni) {
            return this.setState({
                flashMessage: {
                    title: 'DNI vacio',
                    description: 'Complete el campo DNI.',
                    severity: 'high'
                }
            })
        } else {
            this.setState({
                flashMessage: null
            })
        }

        this.setState({
            fetching: true
        });
        getWorksheet('17_yo13cY0wQfF-7c6MEdkkkodbECBuln1PYcGvdQ6CM', 'status', (err, res) => {
            let clients = [];
            let updated = null;
            if (res && res.data) {
                clients = res.data;
                updated = res.updated.replace(/T|Z/g,' ');
            }
            let flashMessage = null;
            const client = clients.filter(client => {
                return client.dni == this.state.dni;
            });
            console.log(res);
            if (client.length == 0) {
                flashMessage = {
                    title: 'DNI no encontrado',
                    description: 'No existe aún el DNI en nuestra base de datos.',
                    severity: 'low'
                }
            }
            if (err) {
                flashMessage = {
                    title: 'Error',
                    description: 'No se puede establecer una conexión a la base de datos.',
                    severity: 'high'
                }
            }
            this.setState({
                fetching: false,
                client,
                updated,
                flashMessage
            });
        });
    }

    setDNI = (event) => {
        this.setState({
            dni: event.target.value,
            client: [],
            updated: null
        })
    }

    handleDismiss = () => {
        this.setState({
            flashMessage: null
        })
    }

    render() {
        let flashMessage = null;
        if (this.state.flashMessage) {
            flashMessage = (
                <FlashMessage
                    title={this.state.flashMessage.title}
                    description={this.state.flashMessage.description}
                    severity={this.state.flashMessage.severity}
                    onDismiss={this.handleDismiss}
                />
            )
        }

        return (
            <div>
                <div className='dni-entry'>
                    {flashMessage}
                    <div className="ui big action input">
                        <input
                            type="number"
                            placeholder="Ingrese DNI..."
                            onChange={this.setDNI}
                            value={this.state.dni}
                            disabled={this.state.fetching}
                        />
                        <button
                            className={"ui big teal button " + (this.state.fetching?'loading':'')}
                            onClick={this.getStatus}
                            disabled={this.state.fetching}
                            >Consultar</button>
                    </div>
                </div>
                <ClientStatus
                    status={this.state.client}
                    updated={this.state.updated}
                />
            </div>
        );
    }
}

export default DNIEntry;
