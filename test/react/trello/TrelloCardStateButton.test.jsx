import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloCardStateButton from '../../../src/react/trello/TrelloCardStateButton';
import Lookup from '../../../src/constants/lookup';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloCardStateButton Unit Tests', () => {
    const loadTrelloCardStateButton = cardState => {
        return enzyme.mount(
            <TrelloCardStateButton cardState={cardState}/>
        );
    };

    describe('TrelloCardStateButton', () => {
        it('should contain icon for all states', () => {
            const cardStates = Object.keys(Lookup.CardStateButtonIconMap);
            cardStates.map(cardState => {
                const trelloCardStateButton = loadTrelloCardStateButton(cardState);
                const cardIconName = Lookup.CardStateButtonIconMap[cardState];
                const cardContextClass = Lookup.CardStateButtonContextMap[cardState];
                expect(trelloCardStateButton.props().cardState).toBe(cardState);
                expect(trelloCardStateButton.find('span').hasClass(cardIconName)).toBe(true);
                expect(trelloCardStateButton.find('button').hasClass(cardContextClass)).toBe(true);
            });
        });

        it('should have default icon for invalid state', () => {
            const trelloCardStateButton = loadTrelloCardStateButton('Z');
            expect(trelloCardStateButton.props().cardState).toBe('Z');
            expect(trelloCardStateButton.find('span').hasClass('oi oi-x')).toBe(true);
            expect(trelloCardStateButton.find('button').hasClass('btn btn-danger')).toBe(true);


        });
    });
});