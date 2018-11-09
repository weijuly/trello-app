import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloBoard from '../../../src/react/trello/TrelloBoard';
import TrelloColumn from '../../../src/react/trello/TrelloColumn';
import Mocks from '../../mocks/mocks';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';


enzyme.configure({
    adapter: new Adapter()
});


describe('TrelloBoard Unit Tests', () => {

    const loadTrelloBoard = cards => {
        let store = configureStore()({
            cards: cards
        });
        return enzyme.mount(
            <Provider store={store}>
                <TrelloBoard/>
            </Provider>
        );
    };

    describe('TrelloBoard', () => {

        const indexes = [0, 1, 2, 3];
        const colNames = ['Backlog', 'In Progress', 'Completed', 'Blocked'];
        const colStates = ['B', 'I', 'C', 'X'];

        it('should contain 4 columns', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards);
            expect(trelloBoard.find(TrelloColumn).length).toBe(4);
        });

        it('should contain columns with proper names', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards);
            indexes.map(x => {
                expect(trelloBoard.find(TrelloColumn).at(x).props().config.name).toBe(colNames[x]);
            });
        });

        it('should contain columns with proper state codes', () => {
            let trelloBoard = loadTrelloBoard(Mocks.cards);
            indexes.map(x => {
                expect(trelloBoard.find(TrelloColumn).at(x).props().config.cardStateCode).toBe(colStates[x]);
            });
        });
    });
})