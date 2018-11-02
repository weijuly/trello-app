import CardStates from './cardstates';

const CardStateButtonIconMap = {
    'B': 'oi oi-media-record',
    'I': 'oi oi-media-play',
    'C': 'oi oi-check',
    'X': 'oi oi-x'
};

const CardStateButtonContextMap = {
    'B': 'btn btn-secondary',
    'I': 'btn btn-primary',
    'C': 'btn btn-success',
    'X': 'btn btn-danger'
}

export default {
    CardStateButtonIconMap: CardStateButtonIconMap,
    CardStateButtonContextMap: CardStateButtonContextMap
};