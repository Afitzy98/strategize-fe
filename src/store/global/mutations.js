export const updatePinnedCoinIds = (state, newPinnedCoinIds) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('pinnedCoinIds', JSON.stringify(newPinnedCoinIds))
  state.pinnedCoinIds = newPinnedCoinIds
}
