import React from 'react';
import TrelloColumn from './TrelloColumn';
import {connect} from 'react-redux';

class TrelloBoard extends React.Component {

    constructor(props) {
        super(props);
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
                setCardState={this.props.setCardState}
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

const mapStateToProps = state => {
    return {
        cards: state.cards
    };
};

export default connect(mapStateToProps)(TrelloBoard);