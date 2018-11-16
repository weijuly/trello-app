const initialState = {
    cards: [],
    addCard: {
        show: false
    }
};

const Reducer = (state = initialState, action) => {
    console.log('>> dispatcher: recieved action: ' + action.type);
    switch (action.type) {
        case 'LOAD_CARDS':
            return {
                ...state, 
                cards: action.cards
            };
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
        case 'SHOW_ADD_CARD':
            return {
                ...state,
                addCard: {...state.addCard, show: true}
            };
        case 'HIDE_ADD_CARD':
            return {
                ...state,
                addCard: {...state, show: false}
            }
        case 'ADD_CARD':
            // do async call and return state
            // will that async call work?
            return {
                ...state,
                cards: [...state.cards, action.card],
                addCard: {show: false}
            }
        default:
            return {...state};
    }
};

export default Reducer;