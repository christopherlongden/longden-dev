import GroupActionTypes from './group.types'

const INITIAL_STATE = {
    groups: null
}

const groupReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GroupActionTypes.UPDATE_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        default:
            return state;
    }
};

export default groupReducer;