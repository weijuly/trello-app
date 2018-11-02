import React from 'react';
import TrelloColumn from './TrelloColumn';

class TrelloBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.COLUMNS = [
            {name: 'Backlog', cardStateCode: 'B'},
            {name: 'In Progress', cardStateCode: 'I'},
            {name: 'Completed', cardStateCode: 'C'},
            {name: 'Blocked', cardStateCode: 'X'}
        ];
    }

    renderTrelloColumn(config, i) {
        return (
            <TrelloColumn
                config={config}
                cards={this.props.cards.filter(x => x.state === config.cardStateCode)}
                setCardState={this.props.setCardState}
                setCardDueDate={this.props.setCardDueDate}
                key={i}/>
        );
    }

    render() {
        return (
            <div className="row">
                {this.COLUMNS.map(this.renderTrelloColumn.bind(this))}
           </div>
        );
    }
}

export default TrelloBoard;