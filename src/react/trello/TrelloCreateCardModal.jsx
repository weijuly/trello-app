import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Datetime from 'react-datetime';
import Actions from '../../redux/actions';

class TrelloCreateCardModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: false,
            date: null
        };
        this.cardTitleBox = React.createRef();
        this.cardDateBox = React.createRef();
        this.cardAssnBox = React.createRef();
        this.cardDescBox = React.createRef();
    }

    handleDateChange(date) {
        this.setState({...this.state, date: date});
    }

    validate() {
        if (!this.cardAssnBox.current.value 
            || !this.state.date
            || !this.cardDescBox.current.value
            || !this.cardTitleBox.current.value) {
                this.setState({...this.state, valid: false});
                return;
        }
        this.setState({...this.state, valid: true});
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
                                        ref={this.cardDateBox}
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