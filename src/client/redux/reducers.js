const initialState = {
    cards: [],
    editor: {
        show: false,
        card: {
            id: '',
            header: '',
            description: '',
            state: '',
            created: '',
            due: '',
            owner: ''
        },
        disableDelete: true
    },
    login: {
        success: true,
        user: undefined,
        disableSubmit: true
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
        case 'SHOW_CARD_EDITOR':
            return {
                ...state,
                editor: {
                    show: true,
                    card: {
                        ...action.card
                    },
                    disableDelete: action.card.id ? false: true
                }
            };
        case 'HIDE_CARD_EDITOR':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    show: false
                }
            };
        case 'EDIT_CARD':
            return {
                ...state,
                editor: {
                    ...state.editor,
                    card: action.card
                }
            }
        case 'ENABLE_LOGIN_SUBMIT':
            return {
                ...state,
                login: {
                    ...state.login,
                    disableSubmit: false
                }
            }
        case 'DISABLE_LOGIN_SUBMIT':
            return {
                ...state,
                login: {
                    ...state.login,
                    disableSubmit: true
                }
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                login: {
                    ...state.login,
                    success: true,
                    user: action.user.user
                }
            }
        case 'SHOW_LOGIN':
            return {
                ...state,
                login: {
                    ...state.login,
                    success: false
                }
            }
        default:
            return {...state};
    }
};

export default Reducer;