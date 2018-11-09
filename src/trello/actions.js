const Actions = {
    loadCards: cards => {
        return {
            type: 'LOAD_CARDS',
            cards: cards
        }
    },
    updateCardDueDate: (cardId, date) => {
        return {
            type: 'UPDATE_CARD_DUE_DATE',
            cardId: cardId,
            date: date.toISOString()
        }
    }
};

export default Actions;