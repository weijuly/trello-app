import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloColumn from '../../../src/react/trello/TrelloColumn';
import Mocks from '../../mocks/mocks';
import TrelloCard from '../../../src/react/trello/TrelloCard';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloColumn Unit Tests', () => {

    let trelloColumn;
    const loadTrelloColumn = (config, cards) => {
        const store = configureStore()({
            cards: cards
        });
        return enzyme.mount(
            <Provider store={store}>
                <TrelloColumn config={config}/>
            </Provider>
        );
    };

    describe('TrelloColumn', () => {
        const config = {
            name: 'name',
            cardStateCode: 'X'
        };

        it('should contain 1 cards', () => {
            trelloColumn = loadTrelloColumn(config, Mocks.cards);
            expect(trelloColumn.find(TrelloCard).length).toBe(1);
        });

        it('should contain passed in column name', () => {
            trelloColumn = loadTrelloColumn(config, Mocks.cards);
            expect(trelloColumn.find('h2').text()).toBe('name');
        });

    });
})