import React from 'react';
import {connect} from 'react-redux';
import TrelloCreateCardButton from './TrelloCreateCardButton';

class TrelloHeader extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Trello</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <form className="form-inline">
                        <TrelloCreateCardButton/>
                    </form>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(TrelloHeader);