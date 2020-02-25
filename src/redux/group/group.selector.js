import { createSelector } from 'reselect';

const selectGroups = state => state.group;

export const selectAllGroups = createSelector(
    [selectGroups],
    group => group.groups
)

export const selectGroup = collectionUrlParam => {
    return createSelector(
        [selectGroups],
        group => group.groups.find(x => x.id === collectionUrlParam)
      );
}