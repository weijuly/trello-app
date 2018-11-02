import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloColumn from '../../src/trello/TrelloColumn';
import Mocks from './mocks';
import TrelloCard from '../../src/trello/TrelloCard';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloColumn Unit Tests', () => {
    let props;
    let trelloColumn;
    let loadTrelloColumn = (config, cards, setCardState, setCardDueDate) => {
        return enzyme.mount(
            <TrelloColumn
                config={config}
                cards={cards}
                setCardState={setCardState}
                setCardDueDate={setCardDueDate}/>
        );
    };

    beforeEach(() => {
        props = undefined;
        trelloColumn = undefined;
    });

    describe('TrelloColumn', () => {
        let config = {
            name: 'name',
            cardStateCode: 'x'
        };
        const setCardState = (cardId, cardState) => {};
        const setCardDueDate = (cardId, date) => {};

        it('should contain cards', () => {
            trelloColumn = loadTrelloColumn(config, Mocks.cards, setCardState, setCardDueDate);
            expect(trelloColumn.find(TrelloCard).length).toBe(4);
        });

        it('should contain passed in column name', () => {
            trelloColumn = loadTrelloColumn(config, Mocks.cards, setCardState, setCardDueDate);
            expect(trelloColumn.find('h2').text()).toBe('name');
        });

        it('cards should contain setCardState', () => {
            trelloColumn = loadTrelloColumn(config, Mocks.cards, setCardState, setCardDueDate);
            expect(trelloColumn.find(TrelloCard).first().props().setCardState).toBe(setCardState);
            expect(trelloColumn.find(TrelloCard).last().props().setCardState).toBe(setCardState);
        });
        
        it('cards should contain setCardDueDate', () => {
            trelloColumn = loadTrelloColumn(config, Mocks.cards, setCardState, setCardDueDate);
            expect(trelloColumn.find(TrelloCard).first().props().setCardDueDate).toBe(setCardDueDate);
            expect(trelloColumn.find(TrelloCard).last().props().setCardDueDate).toBe(setCardDueDate);
        });

    });
})