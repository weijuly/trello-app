import TrelloError from '../common/error';

const HEADERS = {
    'Content-type': 'application/json',
    'Accept': 'application/json'  
};

const callServer = async (url, method, data, status=200) => {
    let request = {
        method: method,
        headers: HEADERS
    };
    if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
        request.body = JSON.stringify(data)
    }
    const response = await fetch(url, request);
    const content = await response.json();
    if (response.status != status) {
        throw new TrelloError(content.error);
    }
    return content;
}

const Server = {
    getCards: async () => await callServer(`/_api/cards`, 'GET', undefined, 200),
    updateCard: async (card) => await callServer(`/_api/cards/${card.id}`, 'PATCH', card, 200),
    addCard: async (card) => await callServer(`/_api/cards`, 'POST', card, 201),
    deleteCard: async (cardId) => await callServer(`/_api/cards/${cardId}`, 'DELETE', undefined, 200),
    login: async (request) => await callServer(`/_api/auth/login`, 'POST', request, 200)
};

export default Server;