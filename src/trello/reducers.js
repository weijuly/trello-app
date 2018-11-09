const initialState = {
    cards: []
};

const Reducer = (state = initialState, action) => {
    console.log('>> dispatcher: action: ' + action.type);
    let copyState = {...state};
    switch (action.type) {
        case 'LOAD_CARDS':
            copyState.cards = action.cards;
            return copyState;
        case 'UPDATE_CARD_DUE_DATE':
            for (let i = 0; i < copyState.cards.length; i++) {
                if (copyState.cards[i].id !== action.cardId) {
                    continue;
                }
                let copyCard = {...copyState.cards[i]};
                copyCard.due = action.date;
                copyState.cards[i] = copyCard;
                return copyState;
            }
        default:
            return copyState;
    }
};

export default Reducer;