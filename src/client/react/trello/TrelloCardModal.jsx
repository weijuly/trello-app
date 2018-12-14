import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Datetime from 'react-datetime';
import Actions from '../../redux/actions';
import moment from 'moment';
import Server from '../../utils/server';


class TrelloCardModal extends React.Component {

    constructor(props) {
        super(props);
        this.cardHeaderInput = React.createRef();
        this.cardDescriptionInput = React.createRef();
        this.cardOwnerInput = React.createRef();
        this.state = {
            disableSubmit: true,
            disableClear: false,
            disableDelete: this.props.card.id ? true : false
        }
        this.date = '';
    }

    componentDidUpdate() {
        this.props.dispatch(Actions.editCard(this.props.card));
    }

    hideCardEditor() {
        this.props.dispatch(Actions.hideCardEditor());
    }

    handleDateChange(date) {
        this.date = moment(date).toISOString();
        this.handleFieldChange();
    }

    handleFieldChange() {
        const header = this.cardHeaderInput.current.value;
        const description = this.cardDescriptionInput.current.value;
        const owner = this.cardOwnerInput.current.value;
        const due = this.date === '' ? this.props.card.due : this.date;
        const card = {
            ...this.props.card,
            header: header,
            description: description,
            owner: owner,
            due: due
        };

        this.props.dispatch(Actions.editCard(card));

        const fields = [header, description, owner, due];
        const disableSubmit = fields.some(x => x === '');
        this.setState({
            ...this.state,
            disableSubmit: disableSubmit
        });
    }

    async handleCardSave() {
        try {
            if (this.props.card.id) {
                await Server.updateCard(this.props.card);
            } else {
                await Server.addCard({
                    ...this.props.card,
                    state: 'B',
                    created: moment().toISOString()
                });
            }
            const response = await Server.getCards();
            this.props.dispatch(Actions.loadCards(response.cards));
            this.props.dispatch(Actions.hideCardEditor());
        } catch (err) {
            console.log(err);
        }
    }

    async handleCardDelete() {
        try {
            await Server.deleteCard(this.props.card.id);
            const response = await Server.getCards();
            this.props.dispatch(Actions.loadCards(response.cards));
            this.props.dispatch(Actions.hideCardEditor());
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        return (
            <Modal visible={this.props.show}>
                <div className='modal-header'>
                    <h5 className='modal-title'>Edit Card</h5>
                </div>
                <div className='modal-body'>
                    <form>
                        <div className='form-group'>
                            <input
                                className='form-control'
                                type='text'
                                onChange={this.handleFieldChange.bind(this)}
                                ref={this.cardHeaderInput}
                                value={this.props.card.header}
                                placeholder='title'/>
                        </div>
                        <div className='form-group'>
                            <div className='row'>
                                <div className='col'>
                                    <Datetime
                                        closeOnSelect={true}
                                        dateFormat='DD-MMM-YYYY'
                                        value={moment(this.props.card.due)}
                                        onChange={this.handleDateChange.bind(this)}
                                        timeFormat=''/>
                                </div>
                                <div className='col'>
                                    <input 
                                        className='form-control'
                                        type='text'
                                        onChange={this.handleFieldChange.bind(this)}
                                        value={this.props.card.owner}
                                        ref={this.cardOwnerInput}
                                        placeholder='assignee'/>
                                </div>
                            </div>
                        </div>
                        <div className='form-group'>
                            <input 
                                className='form-control form-control-sm'
                                type='text'
                                onChange={this.handleFieldChange.bind(this)}
                                ref={this.cardDescriptionInput}
                                value={this.props.card.description}
                                placeholder='a brief description'/>
                            <small 
                                className='form-text text-muted'>
                                New cards will appear in the backlog section.
                            </small>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button
                        type='button'
                        disabled={this.state.disableSubmit}
                        onClick={this.handleCardSave.bind(this)}
                        className='btn btn-success'>
                        <span className='oi oi-check'></span>
                    </button>
                    <button
                        type='button'
                        disabled={this.state.disableClear}
                        onClick={this.hideCardEditor.bind(this)}
                        className='btn btn-warning'>
                        <span className='oi oi-x'></span>
                    </button>
                    <button
                        type='button'
                        disabled={this.props.disableDelete}
                        onClick={this.handleCardDelete.bind(this)}
                        className='btn btn-danger'>
                        <span className='oi oi-trash'></span>
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.editor;
}

export default connect(mapStateToProps)(TrelloCardModal);