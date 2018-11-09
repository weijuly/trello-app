import {connect} from 'react-redux';
import Actions from '../../redux/actions';
import React from 'react';
import TrelloBoard from './TrelloBoard';

class TrelloPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.fetchCards()
            .then(response => {
                this.props.dispatch(Actions.loadCards(response.cards));
            })
            .catch(e => console.log(e));
    }

    fetchCards = async() => {
        const response = await fetch('/_api/cards');
        const body = await response.json();
        if(response.status !== 200) {
            console.log('error occured');
        }
        return body;
    }

    render() {
        return (
            <div className="container-fluid">
                <TrelloBoard/>
            </div>
        );
    }

};

const mapStateToProps = state => {
    return {
        cards: state.cards
    };
};

export default connect(mapStateToProps)(TrelloPage);