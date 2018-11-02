import React from 'react';
import TrelloBoard from './TrelloBoard';

class TrelloPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
    }

    setCardState(cardId, cardState) {
        let copyState = {...this.state};
        for (let card of copyState.cards) {
            if (card.id == cardId) {
                card.state = cardState;
            }
        }
        this.setState(copyState);
    }

    setCardDueDate(cardId, date) {
        console.log('gganesan date' + date);
        let copyState = {...this.state};
        for (let card of copyState.cards) {
            if (card.id == cardId) {
                card.due = date;
            }
        }
        this.setState(copyState);
    }

    componentDidMount() {
        this.fetchCards()
            .then(response => {
                let copyState = {...this.state};
                copyState.cards = response.cards;
                this.setState(copyState);
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
                <TrelloBoard
                    cards={this.state.cards}
                    setCardDueDate={this.setCardDueDate.bind(this)}
                    setCardState={this.setCardState.bind(this)}/>
            </div>
        );
    }

};

export default TrelloPage;