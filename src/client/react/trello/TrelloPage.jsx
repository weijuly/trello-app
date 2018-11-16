import {connect} from 'react-redux';
import Actions from '../../redux/actions';
import React from 'react';
import TrelloBoard from './TrelloBoard';
import TrelloHeader from './TrelloHeader';
import TrelloCreateCardModal from './TrelloCreateCardModal';
import Server from '../../utils/server';

class TrelloPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        Server.getCards()
            .then(response => this.props.dispatch(Actions.loadCards(response.cards)))
            .catch(error => {
                console.log('error :' + error);
            });
    }

    render() {
        return (
            <div className="container-fluid">
                <TrelloHeader/>
                <TrelloCreateCardModal/>
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