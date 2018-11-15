import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Datetime from 'react-datetime';
import Actions from '../../redux/actions';
import moment from 'moment';

class TrelloCreateCardModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            date: null,
            card: null
        };
        this.cardTitleBox = React.createRef();
        this.cardAssnBox = React.createRef();
        this.cardDescBox = React.createRef();
    }

    handleDateChange(date) {
        this.setState({...this.state, date: date});
    }

    validate() {
        const header = this.cardTitleBox.current.value;
        const description = this.cardDescBox.current.value;
        const owner = this.cardAssnBox.current.value;
        const due = this.state.date;
        if (!header || !due || !description || !owner) {
                this.setState({
                    ...this.state, 
                    valid: false
                });
        } else {
            this.setState({
                ...this.state,
                valid: true,
                card: {
                    header: header,
                    description: description,
                    state: 'B',
                    created: moment(),
                    due: moment(due).toISOString(),
                    owner: owner
                }
            });
        }
    }

    handleAddCard = async() => {
        let response = await fetch('/_api/cards', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(this.state.card)
        });
        let body = await response.json();
        if (response.status != 201) {
            console.log('Cannot update cards');
            return;
        }
        response = await fetch('/_api/cards', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            }
        });
        body = await response.json();
        if (response.status != 200) {
            console.log('Cannot get cards');
            return;
        }
        this.props.dispatch(Actions.hideAddCard());
        this.props.dispatch(Actions.loadCards(body.cards));
    }

    render() {
        return (
            <Modal visible={this.props.show}>
                <div className="modal-header">
                    <h5 className="modal-title">Add Card</h5>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                onChange={this.validate.bind(this)}
                                ref={this.cardTitleBox}
                                placeholder="title"/>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <Datetime
                                        closeOnSelect={true}
                                        dateFormat='MM/DD/YYYY'
                                        onChange={this.handleDateChange.bind(this)}
                                        timeFormat=''/>
                                </div>
                                <div className="col">
                                    <input 
                                        className="form-control"
                                        type="text"
                                        onChange={this.validate.bind(this)} 
                                        ref={this.cardAssnBox}
                                        placeholder="assignee"/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <input 
                                className="form-control form-control-sm"
                                type="text"
                                onChange={this.validate.bind(this)}
                                ref={this.cardDescBox}
                                placeholder="a brief description"/>
                            <small 
                                className="form-text text-muted">
                                New cards will appear in the backlog section.
                            </small>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        disabled={!this.state.valid}
                        onClick={this.handleAddCard.bind(this)}
                        className="btn btn-success">
                        <span className="oi oi-check"></span>
                    </button>
                    <button
                        type="button"
                        onClick={() => this.props.dispatch(Actions.hideAddCard())}
                        className="btn btn-danger">
                        <span className="oi oi-x"></span>
                    </button>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.addCard;
};

export default connect(mapStateToProps)(TrelloCreateCardModal);