import moment from 'moment';

const Actions = {
    loadCards: cards => {
        return {
            type: 'LOAD_CARDS',
            cards: cards
        };
    },
    updateCardDueDate: (card, date) => {
        return {
            type: 'UPDATE_CARD_DUE_DATE',
            cardId: card.id,
            date: moment(date).toISOString()
        };
    },
    updateCardState: (card, cardState) => {
        return {
            type: 'UPDATE_CARD_STATE',
            cardId: card.id,
            cardState: cardState
        };
    },
    showAddCard: () => {
        return {
            type: 'SHOW_ADD_CARD'
        };
    },
    hideAddCard: () => {
        return {
            type: 'HIDE_ADD_CARD'
        };
    },
    addCard: card => {
        return {
            type: 'ADD_CARD',
            card: card
        };
    },
    showCardEditor: card => {
        return {
            type: 'SHOW_CARD_EDITOR',
            card: card
        };
    },
    hideCardEditor: () => {
        return {
            type: 'HIDE_CARD_EDITOR'
        };
    },
    editCard: card => {
        return {
            type: 'EDIT_CARD',
            card: card
        }
    }
};

export default Actions;