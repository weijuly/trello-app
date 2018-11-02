import React from 'react';
import DateTime from 'react-datetime';
import TrelloCardStateButton from './TrelloCardStateButton';
import CardStates from '../constants/cardstates';
import moment from 'moment';


class TrelloCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.CardStates = [
            CardStates.BACKLOG, 
            CardStates.INPROGRESS, 
            CardStates.COMPLETE, 
            CardStates.BLOCKED
        ];
    }

    handleStateChange(cardState) {
        this.props.setCardState(this.props.card.id, cardState);
    }

    renderCardStateButton(cardState, i) {
        return (
            <TrelloCardStateButton 
                cardState={cardState}
                handleStateChange={this.handleStateChange.bind(this)}
                key={i}/>
        );
    }

    handleDateChange (date) {
        this.props.setCardDueDate(this.props.card.id, date);
    }

    cardContext(date) {
        if (moment().diff(date, 'days') > 0) {
            return 'card border-danger';
        }
        return 'card';
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
                                onChange={this.handleDateChange.bind(this)}
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

export default TrelloCard;