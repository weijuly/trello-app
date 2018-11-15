import Lookup from '../../constants/lookup';
import React from 'react';

class TrelloCardStateButton extends React.Component {

    constructor(props) {
        super(props);
    }

    getIconClass(cardState) {
        if (Lookup.CardStateButtonIconMap.hasOwnProperty(cardState)) {
            return Lookup.CardStateButtonIconMap[cardState];
        }
        return 'oi oi-x';
    }

    getButtonClass(cardState) {
        if (Lookup.CardStateButtonContextMap.hasOwnProperty(cardState)) {
            return Lookup.CardStateButtonContextMap[cardState];
        }
        return 'btn btn-danger';
    }

    render() {
        return (
            <button
                type="button"
                onClick={() => this.props.handleStateChange(this.props.cardState)}
                className={this.getButtonClass(this.props.cardState)}>
                <span 
                    className={this.getIconClass(this.props.cardState)}
                    aria-hidden="true">
                </span>
            </button>
        );
    }
}

export default TrelloCardStateButton;
