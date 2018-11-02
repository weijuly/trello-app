import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Mocks from './mocks';
import TrelloCard from '../../src/trello/TrelloCard';
import TrelloCardStateButton from '../../src/trello/TrelloCardStateButton';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloCard Unit Tests', () => {
    let trelloCard;
    const loadTrelloCard = (setCardState, setCardDueDate, card) => {
        return enzyme.mount(
            <TrelloCard
                setCardState={setCardState}
                setCardDueDate={setCardDueDate}
                card={card}/>
        );
    };

    beforeEach(() => {
        trelloCard = undefined;
    });

    const setCardState = (cardId, cardState) => {};
    const setCardDueDate = (cardId, date) => {};

    describe('TrelloCard', () => {
        it('should have 4 state change buttons', () => {
            trelloCard = loadTrelloCard(setCardState, setCardDueDate, Mocks.cards[0]);
            expect(trelloCard.find(TrelloCardStateButton).length).toBe(4);
            expect(trelloCard.find(TrelloCardStateButton).at(0).props().cardState).toBe('B');
            expect(trelloCard.find(TrelloCardStateButton).at(1).props().cardState).toBe('I');
            expect(trelloCard.find(TrelloCardStateButton).at(2).props().cardState).toBe('C');
            expect(trelloCard.find(TrelloCardStateButton).at(3).props().cardState).toBe('X');
        });
    });
});