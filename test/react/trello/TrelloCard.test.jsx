import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Mocks from '../../mocks/mocks';
import TrelloCard from '../../../src/react/trello/TrelloCard';
import TrelloCardStateButton from '../../../src/react/trello/TrelloCardStateButton';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import DateTime from 'react-datetime';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloCard Unit Tests', () => {
    let trelloCard;
    const loadTrelloCard = card => {
        let store = configureStore()({});
        return enzyme.mount(
            <Provider store={store}>
                <TrelloCard card={card}/>
            </Provider>
        );
    };

    describe('TrelloCard', () => {
        it('should have 4 state change buttons', () => {
            trelloCard = loadTrelloCard(Mocks.cards[0]);
            expect(trelloCard.find(TrelloCardStateButton).length).toBe(4);
            expect(trelloCard.find(TrelloCardStateButton).at(0).props().cardState).toBe('B');
            expect(trelloCard.find(TrelloCardStateButton).at(1).props().cardState).toBe('I');
            expect(trelloCard.find(TrelloCardStateButton).at(2).props().cardState).toBe('C');
            expect(trelloCard.find(TrelloCardStateButton).at(3).props().cardState).toBe('X');
        });

        it('should highlight overdue card', () => {
            let card = {...Mocks.cards[0]};
            card.due = '2010-03-30T17:57:07+00:00'
            trelloCard = loadTrelloCard(card);
            expect(trelloCard.find('div').first().hasClass('card border-danger')).toBe(true);
        });
        
        it('should not highlight non-overdue card', () => {
            let card = {...Mocks.cards[0]};
            card.due = '2020-03-30T17:57:07+00:00'
            trelloCard = loadTrelloCard(card);
            expect(trelloCard.find('div').first().hasClass('card')).toBe(true);
        });

        it('should not highlight non-overdue card', () => {
            trelloCard = loadTrelloCard(Mocks.cards[0]);
            trelloCard.find(DateTime).first().simulate('change');
        });
    });
});