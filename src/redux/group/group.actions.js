import GroupActionTypes from "./group.types";

export const updateGroups = groupsMap => ({
    type: GroupActionTypes.UPDATE_GROUPS,
    payload: groupsMap
})