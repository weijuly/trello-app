import {connect} from 'react-redux';
import React from 'react';
import TrelloCard from './TrelloCard';

export class TrelloColumn extends React.Component {
    
    constructor(props) {
        super(props);
    }

    renderCard(card, i) {
        return (
            <TrelloCard
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
const mapStateToProps = (state, ownProps) => {
    return {
        cards: state.cards.filter(x => x.state == ownProps.config.cardStateCode)
    };
};

export default connect(mapStateToProps)(TrelloColumn);