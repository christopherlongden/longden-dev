import { createSelector } from 'reselect';

const selectGroups = state => state.group;

export const selectAllGroups = createSelector(
    [selectGroups],
    group => group.groups
)