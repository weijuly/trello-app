db = db.getSiblingDB('trello');
db.createUser({
    user: 'trello',
    pwd: 'password',
    roles: [{
        role: 'readWrite',
        db: 'trello'
    }]
});

db.trello.insert({
    id: 1111,
    header: 'backlog work',
    description: 'this work has not started yet',
    state: 'B',
    created: '2019-01-30T17:57:07+00:00',
    due: '2019-01-30T17:57:07+00:00',
    owner: 'gganesan'
});
db.trello.insert({
    id: 2222,
    header: 'in progress work',
    description: 'this work is in progress',
    state: 'I',
    created: '2019-03-30T17:57:07+00:00',
    due: '2019-04-30T17:57:07+00:00',
    owner: 'jdoe'
});
db.trello.insert({
    id: 3333,
    header: 'completed work',
    description: 'this work is completed',
    state: 'C',
    created: '2019-05-30T17:57:07+00:00',
    due: '2019-06-30T17:57:07+00:00',
    owner: 'jsmith'
});
db.trello.insert({
    id: 4444,
    header: 'blocked work',
    description: 'this work is blocked',
    state: 'X',
    created: '2019-07-30T17:57:07+00:00',
    due: '2019-08-30T17:57:07+00:00',
    owner: 'rshelley'
});

db.users.insert({
    user: 'gganesan',
    pass: 'gganesan',
    name: 'GopiKrishnan Ganesan'
});

db.users.insert({
    user: 'jdoe',
    pass: 'jdoe',
    name: 'John Doe'
});
