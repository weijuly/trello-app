import React from 'react';
import TrelloCard from './TrelloCard';

class TrelloColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="col">
                <h2 className="text-center">
                    {this.props.config.name}
                </h2>
                <TrelloCard/>
            </div>
        );
    }
}

export default TrelloColumn;