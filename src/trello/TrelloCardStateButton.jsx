import React from 'react';
import { BACKLOG, INPROGRESS, COMPLETE, BLOCKED } from '../constants/cardstates';

class TrelloCardStateButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.CARD_STATE_ICON_MAP = {
            BACKLOG: 'media-record',
            INPROGRESS: 'media-play',
            COMPLETE: 'x',
            BLOCKED: 'check'
        };
    }

    getIconClass(cardState) {
        if (this.CARD_STATE_ICON_MAP.hasOwnProperty(cardState)) {
            return this.CARD_STATE_ICON_MAP[cardState];
        }
        return 'x';
    }

    render() {
        return (
            <button
                type="button"
                className="btn btn-secondary">
                <span 
                    className="oi `{getIconClass(this.props.cardState)}`"
                    title="icon-name"
                    aria-hidden="true">
                </span>
            </button>
        );
    }
}

export default TrelloCardStateButton;