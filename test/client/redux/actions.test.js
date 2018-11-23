import Actions from '../../../src/client/redux/actions';

describe('Actions Unit Tets', () => {

    const generateCard = () => {
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

    it('loadCards type should be LOAD_CARDS', done => {
        const action = Actions.loadCards([]);
        expect(action.type).toEqual('LOAD_CARDS');
        done();
    });

    it('updateCardDueDate type should be UPDATE_CARD_DUE_DATE', done => {
        const action = Actions.updateCardDueDate(generateCard(), new Date());
        expect(action.type).toEqual('UPDATE_CARD_DUE_DATE');
        expect(action.cardId).toEqual('5bf7a155486005ad2d4ac9f6');
        expect(action.date).toBeDefined();
        done();
    });

    it('updateCardState type should be UPDATE_CARD_STATE', done => {
        const action = Actions.updateCardState(generateCard(), 'X');
        expect(action.type).toEqual('UPDATE_CARD_STATE');
        expect(action.cardId).toEqual('5bf7a155486005ad2d4ac9f6');
        expect(action.cardState).toEqual('X');
        done();
    });

    it('hideAddCard type should be HIDE_ADD_CARD', done => {
        const action = Actions.hideAddCard();
        expect(action.type).toEqual('HIDE_ADD_CARD');
        done();
    });

    it('showAddCard type should be SHOW_ADD_CARD', done => {
        const action = Actions.showAddCard();
        expect(action.type).toEqual('SHOW_ADD_CARD');
        done();
    });

    it('addCard type should be ADD_CARD', done => {
        const action = Actions.addCard(generateCard());
        expect(action.type).toEqual('ADD_CARD');
        expect(action.card).toEqual(generateCard());
        done();
    });

});