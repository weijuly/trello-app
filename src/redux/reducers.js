const initialState = {
    cards: []
};

const Reducer = (state = initialState, action) => {
    console.log('>> dispatcher: action: ' + action.type);
    switch (action.type) {
        case 'LOAD_CARDS':
            return {...state, cards: action.cards};
        case 'UPDATE_CARD_DUE_DATE':
            return {
                ...state,
                cards: state.cards.map(x => x.id === action.cardId ? {...x, due: action.date} : x)
            };
        case 'UPDATE_CARD_STATE':
            return {
                ...state, 
                cards: state.cards.map(x => x.id === action.cardId ? {...x, state: action.cardState} : x)
            };
        default:
            return {...state};
    }
};

export default Reducer;