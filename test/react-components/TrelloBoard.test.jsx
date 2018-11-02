import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloBoard from '../../src/trello/TrelloBoard';
import TrelloColumn from '../../src/trello/TrelloColumn';
import Mocks from './mocks';


enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloBoard Unit Tests', () => {
    let props;
    let trelloBoard;
    let loadTrelloBoard = (cards, setCardState, setCardDueDate) => {
        return enzyme.mount(
            <TrelloBoard
                cards={cards}
                setCardState={setCardState}
                setCardDueDate={setCardDueDate}/>
        );
    };

    beforeEach(() => {
        props = undefined;
        trelloBoard = undefined;
    });

    describe('TrelloBoard', () => {

        const setCardState = (cardId, cardState) => {};
        const setCardDueDate = (cardId, date) => {};
        const indexes = [0, 1, 2, 3];
        const colNames = ['Backlog', 'In Progress', 'Completed', 'Blocked'];
        const colStates = ['B', 'I', 'C', 'X'];

        it('should contain 4 columns', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            expect(trelloBoard.find(TrelloColumn).length).toBe(4);
        });

        it('should contain columns with proper names', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            indexes.map(x => {
                expect(trelloBoard.find(TrelloColumn).at(x).props().config.name).toBe(colNames[x]);
            });
        });

        it('should contain columns with proper state codes', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            indexes.map(x => {
                expect(trelloBoard.find(TrelloColumn).at(x).props().config.cardStateCode).toBe(colStates[x]);
            });
        });

        it('should contain columns with setCardState handler', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            indexes.map(x => {
                expect(trelloBoard.find(TrelloColumn).at(x).props().setCardState).toBe(setCardState);
            });
        });

        it('should contain columns with setCardDueDate handler', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            indexes.map(x => {
                expect(trelloBoard.find(TrelloColumn).at(x).props().setCardDueDate).toBe(setCardDueDate);
            });
        });

        it('should contain one card in Backlog column', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            expect(trelloBoard.find(TrelloColumn).at(0).props().cards.length).toBe(1);
            expect(trelloBoard.find(TrelloColumn).at(0).props().cards[0].state).toBe('B');
        });

        it('should contain one card in In Progress column', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            expect(trelloBoard.find(TrelloColumn).at(1).props().cards.length).toBe(1);
            expect(trelloBoard.find(TrelloColumn).at(1).props().cards[0].state).toBe('I');
        });

        it('should contain one card in Completed column', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            expect(trelloBoard.find(TrelloColumn).at(2).props().cards.length).toBe(1);
            expect(trelloBoard.find(TrelloColumn).at(2).props().cards[0].state).toBe('C');
        });

        it('should contain one card in Backlog column', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards, setCardState, setCardDueDate);
            expect(trelloBoard.find(TrelloColumn).at(3).props().cards.length).toBe(1);
            expect(trelloBoard.find(TrelloColumn).at(3).props().cards[0].state).toBe('X');
        });
    });
})