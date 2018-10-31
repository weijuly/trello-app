import React from 'react';
import TrelloBoard from './TrelloBoard';



class TrelloPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cards: []
        }
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
                    cards={this.state.cards}/>
            </div>
        );
    }

};

export default TrelloPage;