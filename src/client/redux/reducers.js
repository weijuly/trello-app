const initialState = {
    cards: [],
    addCard: {
        show: false
    },
    cardEditor: {
        show: false,
        card: {
            id: '',
            header: '',
            description: '',
            state: '',
            created: '',
            due: '',
            owner: ''
        }
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
                addCard: {...state.addCard, show: false}
            };
        case 'SHOW_CARD_EDITOR':
            return {
                ...state,
                cardEditor: {
                    show: true,
                    card: {
                        ...action.card
                    }
                }
            };
        case 'HIDE_CARD_EDITOR':
            return {
                ...state,
                cardEditor: {
                    ...state.cardEditor,
                    show: false
                }
            };
        case 'EDIT_CARD':
            return {
                ...state,
                cards: state.cards.map(x => x.id === action.card.id ? action.card : x),
                cardEditor: {
                    ...state.cardEditor,
                    card: action.card
                }
            }
        default:
            return {...state};
    }
};

export default Reducer;