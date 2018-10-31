import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TrelloColumn from '../../src/trello/TrelloColumn';

enzyme.configure({
    adapter: new Adapter()
});

describe('TrelloColumn Unit Tests', () => {
    let props;
    let trelloColumn;
    let loadTrelloColumn = (config) => {
        if(!trelloColumn) {
            trelloColumn = enzyme.mount(
                <TrelloColumn 
                    config={config}/>
            )
        }
        return trelloColumn;
    };

    beforeEach(() => {
        props = undefined;
        trelloColumn = undefined;
    });

    describe('TrelloColumn', () => {
        it('should contain a header with specified name', () => {
            let config = {
                name: 'name',
                cardStateCode: 'x'
            };
            trelloColumn = loadTrelloColumn(config);
            expect(trelloColumn.props().config.name).toBe(config.name);
            expect(trelloColumn.props().config.cardStateCode).toBe(config.cardStateCode);
            expect(trelloColumn.find('h2').text()).toEqual(config.name);
        });
    });
})