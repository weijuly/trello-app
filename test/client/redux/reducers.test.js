import Reducer from '../../../src/client/redux/reducers';
import Actions from '../../../src/client/redux/actions';
import moment from 'moment';


describe('Reducer Unit Tests', () => {

    const generateBlockedCard = () => {
        return {
            id: '5bf7a155486005ad2d4ac9f6',
            due: '2019-01-30T17:57:07+00:00',
            created: '2019-01-30T17:57:07+00:00',
            owner: 'gganesan',
            header: 'header',
            description: 'description',
            state: 'B',
        };
    };

    const generateInProgressCard = () => {
        return {
            id: '5bf7a155486005ad2d4ac9f6',
            due: '2019-01-30T17:57:07+00:00',
            created: '2019-01-30T17:57:07+00:00',
            owner: 'gganesan',
            header: 'header',
            description: 'description',
            state: 'I',
        };
    };

    const generateSampleState = () => {
        return {
            cards: [generateBlockedCard(), generateInProgressCard()],
            addCard: {
                show: false
            }
        };
    };

    it('LOAD_CARDS action should populate cards in state', done => {
        const action = Actions.loadCards([generateBlockedCard()]);
        const state = Reducer(generateSampleState(), action);
        expect(state.cards.length).toEqual(1);
        done();
    });

    it('UPDATE_CARD_DUE_DATE action should update card due date', done => {
        const date = new Date();
        const action = Actions.updateCardDueDate(generateBlockedCard(), date);
        const state = Reducer(generateSampleState(), action);
        expect(state.cards[0].due).toEqual(moment(date).toISOString());
        done();
    });

    it('UPDATE_CARD_STATE action should update card state', done => {
        const action = Actions.updateCardState(generateBlockedCard(), 'X');
        const state = Reducer(generateSampleState(), action);
        expect(state.cards[0].state).toEqual('X');
        done();
    });

    it('SHOW_ADD_CARD action should update state', done => {
        const action = Actions.showAddCard();
        const state = Reducer(generateSampleState(), action);
        expect(state.addCard.show).toBeTruthy();
        done();
    });

    it('HIDE_ADD_CARD action should update state', done => {
        const action = Actions.hideAddCard();
        const state = Reducer(generateSampleState(), action);
        expect(state.addCard.show).toBeFalsy();
        done();
    });

    it('UNKNOWN action should not change state', done => {
        const state = Reducer(generateSampleState(), {type: 'UNKNOWN'});
        expect(state).toEqual(generateSampleState());
        done();
    });

    it('UNKNOWN action and EMPTY state should not return initial state', done => {
        const state = Reducer(undefined, {type: 'UNKNOWN'});
        expect(state.cards.length).toEqual(0);
        done();
    });
});