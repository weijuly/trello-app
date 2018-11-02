import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloCardStateButton from '../../src/trello/TrelloCardStateButton';
import Lookup from '../../src/constants/lookup';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloCardStateButton Unit Tests', () => {
    let props;
    let trelloCardStateButton;
    let loadTrelloCardStateButton = (cardState) => {
        // trelloCardStateButton = enzyme.mount(
        //     <TrelloCardStateButton
        //         cardState={cardState}/>
        // );
        // return trelloCardStateButton;
    };

    beforeEach(() => {
        props = undefined;
        trelloCardStateButton = undefined;
    });

    describe('TrelloCardStateButton', () => {
        it('should contain icon for all states', () => {
            // console.log('>>> gganesan CardStateButtonIconMap:' + Lookup.CardStateButtonIconMap);
            // let cardStates = Object.keys(Lookup.CardStateButtonIconMap);
            // cardStates.map(cardState => {
            //     let trelloCardStateButton = loadTrelloCardStateButton(cardState);
            //     let cardIconName = Lookup.CardStateButtonIconMap[cardState];
            //     console.log('>>> gganesan card icon:' + cardIconName);
            //     expect(trelloCardStateButton.props().cardState).toBe(cardState);
            //     //expect(trelloCardStateButton.find('span').hasClass(cardIconName)).toBe(true);
            // });
        });
    });
});