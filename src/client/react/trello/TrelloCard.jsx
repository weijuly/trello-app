import {connect} from 'react-redux';
import Actions from '../../redux/actions';
import CardStates from '../../constants/cardstates';
import DateTime from 'react-datetime';
import moment from 'moment';
import React from 'react';
import TrelloCardStateButton from './TrelloCardStateButton';
import Server from '../../utils/server';

class TrelloCard extends React.Component {

    constructor(props) {
        super(props);
        this.CardStates = [
            CardStates.BACKLOG, 
            CardStates.INPROGRESS, 
            CardStates.COMPLETE, 
            CardStates.BLOCKED
        ];
    }

    renderCardStateButton(cardState, i) {
        return (
            <TrelloCardStateButton 
                cardState={cardState}
                handleStateChange={cardState => this.props.dispatch(Actions.updateCardState(this.props.card, cardState))}
                key={i}/>
        );
    }

    cardContext(date) {
        if (moment().diff(date, 'days') > 0) {
            return 'card border-danger';
        }
        return 'card';
    }

    handleCardDueDateChange(date) {
        const card = {
            ...this.props.card,
            due: moment(date).toISOString()
        };
        Server.updateCard(card)
            .then(Server.getCards())
            .then(response => this.props.dispatch(Actions.loadCards(response.cards)))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className={this.cardContext(this.props.card.due)}>
                <div className="card-body">
                    <h5 className="card-title">
                    {this.props.card.header}
                        <div className="float-right">
                            <small>
                                <i>
                                    @{this.props.card.owner}
                                </i>
                            </small>
                        </div>
                    </h5>
                    <p className="card-text">
                        {this.props.card.description}
                    </p>
                    <div className="form-group row">
                        <div className="col-6">
                            <div className="btn-group btn-group-sm" role="group" aria-label="">
                                {this.CardStates.map(this.renderCardStateButton.bind(this))}
                            </div>
                        </div>
                        <div className="col-6">
                            <DateTime 
                                onChange={this.handleCardDueDateChange.bind(this)}
                                value={moment(this.props.card.due)}
                                closeOnSelect={true}
                                dateFormat='DD-MMM-YYYY'
                                timeFormat=''/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        card: ownProps.card
    };
};

export default connect(mapStateToProps)(TrelloCard);