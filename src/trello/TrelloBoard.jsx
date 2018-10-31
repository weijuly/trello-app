import React from 'react';
import TrelloColumn from './TrelloColumn';

class TrelloBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.COLUMNS = [
            {name: 'Backlog', cardStateCode: 'b'},
            {name: 'In Progress', cardStateCode: 'i'},
            {name: 'Completed', cardStateCode: 'c'},
            {name: 'Blocked', cardStateCode: 'x'}
        ];
    }

    renderTrelloColumn(config, i) {
        return (
            <TrelloColumn
                config={config}
                key={i}/>
        );
    }

    render() {
        return (
            <div className="row">
                {this.COLUMNS.map(this.renderTrelloColumn)}
           </div>
        );
    }
}

export default TrelloBoard;