import React from 'react';
import {connect} from 'react-redux';

class TrelloBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <input type="text" value={this.props.count}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.count
    }
};

export default connect(mapStateToProps)(TrelloBox);

