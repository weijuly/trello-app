import moment from 'moment';

const Actions = {
    loadCards: cards => {
        return {
            type: 'LOAD_CARDS',
            cards: cards
        }
    },
    updateCardDueDate: (card, date) => {
        return {
            type: 'UPDATE_CARD_DUE_DATE',
            cardId: card.id,
            date: moment(date).toISOString()
        }
    },
    updateCardState: (card, cardState) => {
        return {
            type: 'UPDATE_CARD_STATE',
            cardId: card.id,
            cardState: cardState
        }
    }
};

export default Actions;