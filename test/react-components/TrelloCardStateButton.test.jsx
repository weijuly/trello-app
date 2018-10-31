import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloCardStateButton from '../../src/trello/TrelloCardStateButton';
import { BACKLOG } from '../../src/constants/cardstates';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloCardStateButton Unit Tests', () => {
    let props;
    let trelloCardStateButton;
    let loadTrelloCardStateButton = (cardState) => {
        if(!trelloCardStateButton) {
            trelloCardStateButton = enzyme.mount(
                <TrelloCardStateButton 
                    cardState={cardState}/>
            )
        }
        return trelloCardStateButton;
    };

    beforeEach(() => {
        props = undefined;
        trelloCardStateButton = undefined;
    });

    describe('TrelloCardStateButton', () => {
        it('should contain icon for backlog state', () => {
            let cardState = BACKLOG;
            trelloCardStateButton = loadTrelloCardStateButton(cardState);
        });
    });
})