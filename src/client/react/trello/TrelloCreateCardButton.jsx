import React from 'react';
import {connect} from 'react-redux';
import Actions from '../../redux/actions';

class TrelloCreateCardButton extends React.Component {

    constructor(props) {
        super(props);
    }

    showCardEditor() {
        const card = {
            id: '',
            header: '',
            description: '',
            state: '',
            created: '',
            due: '',
            owner: ''
        };
        this.props.dispatch(Actions.showCardEditor(card));
    }

    render() {
        return (
            <button
                className='btn btn-outline-primary'
                onClick={this.showCardEditor.bind(this)}
                type='button'>
                <span className='oi oi-plus'></span>
            </button>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(TrelloCreateCardButton);