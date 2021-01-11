import { COIN_IDS } from '../../constants'

export default function() {
  const pinnedCoinIds =
    // check typeof window in case SSR
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('pinnedCoinIds')) || COIN_IDS
      : COIN_IDS // pinned coin ids if exist else default coin ids

  return {
    pinnedCoinIds
  }
}
