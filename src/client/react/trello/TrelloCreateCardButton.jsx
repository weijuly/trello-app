import React from 'react';
import {connect} from 'react-redux';
import Actions from '../../redux/actions';

class TrelloCreateCardButton extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className='btn btn-outline-primary'
                onClick={() => this.props.dispatch(Actions.showAddCard())}
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