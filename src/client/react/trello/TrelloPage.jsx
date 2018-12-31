import {connect} from 'react-redux';
import Actions from '../../redux/actions';
import React from 'react';
import TrelloBoard from './TrelloBoard';
import TrelloHeader from './TrelloHeader';
import TrelloLoginModal from './TrelloLoginModal';
import TrelloCardModal from './TrelloCardModal';
import Server from '../../utils/server';
import Cookies from 'universal-cookie';

class TrelloPage extends React.Component {

    constructor(props) {
        super(props);
        this.cookie = new Cookies();
    }

    componentDidMount() {
        const cookie = this.cookie.get('trello');
        if (!cookie || cookie !== 'auth') {
            this.props.dispatch(Actions.showLogin());
        } else {
            this.loadCards();
        }
    }

    async loadCards() {
        try {
            const response = await Server.getCards();
            this.props.dispatch(Actions.loadCards(response.cards));
        } catch (err) {
            console.log('error' + err);
        }
    }

    render() {
        return (
            <div className='container-fluid'>
                <TrelloHeader/>
                <TrelloBoard/>
                <TrelloCardModal/>
                <TrelloLoginModal/>
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