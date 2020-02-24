const INITIAL_STATE = {
    groups: [
        {
            id: 1,
            name: 'Group One'
        },
        {
            id: 2,
            name: 'Group Two'
        },
        {
            id: 3,
            name: 'Group Three'
        },
        {
            id: 4,
            name: 'Group Four'
        },
    ]
}

const directoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

export default directoryReducer;