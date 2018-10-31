import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloBoard from '../../src/trello/TrelloBoard';
import TrelloColumn from '../../src/trello/TrelloColumn';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloBoard Unit Tests', () => {
    let props;
    let trelloBoard;
    let loadTrelloBoard = () => {
        if(!trelloBoard) {
            trelloBoard = enzyme.mount(
                <TrelloBoard/>
            )
        }
        return trelloBoard;
    };

    beforeEach(() => {
        props = undefined;
        trelloBoard = undefined;
    });

    describe('TrelloBoard', () => {
        it('should contains 4 columns', () => {
            trelloBoard = loadTrelloBoard();
            expect(trelloBoard.find(TrelloColumn).length).toBe(4);
        });
    });
})