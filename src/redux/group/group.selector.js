import { createSelector } from 'reselect';

const selectGroups = state => state.group;

export const selectAllGroupsList = createSelector(
    [selectGroups],
    group => group.groups
)