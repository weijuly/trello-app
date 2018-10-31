import React from 'react';
import TrelloCardStateButton from './TrelloCardStateButton';

class TrelloCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        Card Title
                        <div className="float-right">
                            <small>
                                <i>
                                    gganesan
                                </i>
                            </small>
                        </div>
                    </h5>
                    <p className="card-text">
                        Card Text
                    </p>
                    <div className="form-group row">
                        <div className="col-6">
                            <TrelloCardStateButton/>
                        </div>
                        <div className="col-6">
                            date
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TrelloCard;