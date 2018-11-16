
const HEADERS = {
    'Content-type': 'application/json',
    'Accept': 'application/json'  
}

const Server = {
    getCards: async () => {
        const response = await fetch('/_api/cards', {
            method: 'GET',
            headers: HEADERS
        });
        return await response.json();
    },
    updateCard: async (card) => {
        const response = await fetch(`/_api/cards/${card.id}`, {
            method: 'PATCH',
            headers: HEADERS,
            body: JSON.stringify(card)
        });
        return await response.json();
    },
    addCard: async (card) => {
        const response = await fetch('/_api/cards', {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify(card)
        });
        return await response.json();
    }
};

export default Server;