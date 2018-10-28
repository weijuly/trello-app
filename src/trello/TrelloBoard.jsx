import React from 'react';
import TrelloColumn from './TrelloColumn';

class TrelloBoard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="row">
                <TrelloColumn/>
                <TrelloColumn/>
                <TrelloColumn/>
                <TrelloColumn/>
           </div>
        );
    }
}

export default TrelloBoard;