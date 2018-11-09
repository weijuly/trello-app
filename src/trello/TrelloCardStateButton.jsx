import React from 'react';
import Lookup from '../constants/lookup';
import {connect} from 'react-redux';

class TrelloCardStateButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
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

    handleStateChange() {
        this.props.handleStateChange(this.props.cardState);
    }

    render() {
        return (
            <button
                type="button"
                onClick={this.handleStateChange.bind(this)}
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

// const mapStateToProps = (state, ownProps) => {
//     console.log('>> TrelloCard.mapStateToProps >>');
//     return {
//         card: ownProps.card
//     };
// };

// export default connect(mapStateToProps)(TrelloCard);