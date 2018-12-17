import React from 'react';
import {connect} from 'react-redux';
import Modal from 'react-bootstrap4-modal';
import Actions from '../../redux/actions';
import Server from '../../utils/server';

class TrelloLoginModal extends React.Component {

    constructor(props) {
        super(props);
        this.usernameInput = React.createRef();
        this.passwordInput = React.createRef();
    }

    handleFieldChange() {
        const username = this.usernameInput.current.value;
        const password = this.passwordInput.current.value;
        if (username === '' || password == '') {
            this.props.dispatch(Actions.disableLoginSubmit())
        } else {
            this.props.dispatch(Actions.enableLoginSubmit())
        }
    }

    async handleLogin() {
        const request = {
            username: this.usernameInput.current.value,
            password: this.passwordInput.current.value
        };

        try {
            const response = await Server.login(request);
            this.props.dispatch(Actions.loginSuccess(response));
        } catch (err) {
            console.log(`Login failed: ${err}`);
        }
    }

    render() {
        return (
            <Modal visible={!this.props.success}>
                <div className='modal-header'>
                    <h5 className='modal-title'>Login</h5>
                </div>
                <div className='modal-body'>
                    <form>
                        <div className='form-group'>
                            <input
                                className='form-control'
                                type='text'
                                ref={this.usernameInput}
                                onChange={this.handleFieldChange.bind(this)}
                                placeholder='Username'/>
                        </div>
                        <div className='form-group'>
                            <input
                                className='form-control'
                                type='password'
                                ref={this.passwordInput}
                                onChange={this.handleFieldChange.bind(this)}
                                placeholder='Password'/>
                        </div>
                    </form>
                </div>
                <div className='modal-footer'>
                    <button 
                        type='button'
                        disabled={this.props.disableSubmit}
                        onClick={this.handleLogin.bind(this)}
                        className='btn btn-success'>
                        <span className='oi oi-check'></span>
                    </button>    
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return state.login;
};

export default connect(mapStateToProps)(TrelloLoginModal);