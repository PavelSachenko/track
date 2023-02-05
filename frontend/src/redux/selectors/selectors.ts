import { createSelector } from 'reselect';

import { AppState } from "../store";

export const someSelector = () => {};

export const selectAgents = createSelector(
  (state: AppState) => state.agents.ids,
  (state: AppState) => state.agents.auxiliaryIds,
  (state: AppState) => state.agents.search,
  (state: AppState) => state.agents.filterStatus,

  (ids: number[], auxiliaryIds: number[], search: string, filterStatus: number) => {
    const isAnyFilter = search || filterStatus;

    if (!isAnyFilter) {
      return ids;
    }

    return auxiliaryIds;
  }
);
