import React from 'react';
import TrelloBoard from './TrelloBoard';



class TrelloPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            state: 'state'
        }
    }

    componentDidMount() {
        this.fetchCards()
            .then(response => {
                let copyState = {...this.state};
                copyState.data = response.message;
                this.setState(copyState);
            })
            .catch(e => console.log(e));
    }

    fetchCards = async() => {
        const response = await fetch('/_api/cards');
        const body = await response.json();
        if(response.status !== 200) {
            console.log('error occured');
        }
        return body;
    }

    render() {
        return (
            <div className="container-fluid">
                <h1>This is React JS !</h1>
                <h2>data from server: {this.state.data}</h2>
                <TrelloBoard/>
            </div>
        );
    }

};

export default TrelloPage;