import React from 'react';
import TrelloCard from './TrelloCard';

class TrelloColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderCard(card, i) {
        return (
            <TrelloCard
                setCardState={this.props.setCardState}
                setCardDueDate={this.props.setCardDueDate}
                card={card}
                key={i}/>
        );
    }

    render() {
        return (
            <div className="col">
                <h2 className="text-center">
                    {this.props.config.name}
                </h2>
                {this.props.cards.map(this.renderCard.bind(this))}
            </div>
        );
    }
}

export default TrelloColumn;