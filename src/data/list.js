export const list = {
    Gliner: [{ i: -1, j: 0 }, { i: 0, j: 1 }, { i: 1, j: -1 }, { i: 1, j: 0 }, { i: 1, j: 1 }],
    'Small Exploder': [{ i: -2, j: 0 }, { i: -1, j: -1 }, { i: -1, j: 0 }, { i: -1, j: 1 }, { i: 0, j: -1 }, { i: 0, j: 1 }, { i: 1, j: 0 }],
    Exploder: [-2, -1, 0, 1, 2].map(a => { return { i: a, j: -2 }; }).concat([{ i: -2, j: 0 }, { i: 2, j: 0 }]).concat([-2, -1, 0, 1, 2].map(a => { return { i: a, j: 2 }; })),
    '10 Cell Row': [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4].map(a => { return { i: 0, j: a }; }),
    'Lightweight spaceship': [{ i: -2, j: -1 }, { i: -2, j: 0 }, { i: -2, j: 1 }, { i: -2, j: 2 }, { i: -1, j: -2 }, { i: -1, j: 2 }, { i: 0, j: 2 }, { i: 1, j: -2 }, { i: 1, j: 1 }]
}