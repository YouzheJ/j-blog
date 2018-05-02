// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_PAGE = 'UPDATE_PAGE'

// ------------------------------------
// Actions
// ------------------------------------
export function updatePage (value) {
  return {
    type: UPDATE_PAGE,
    payload: value
  }
}

export const actions = {
  updatePage,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_PAGE]: (state, action) => ({...state, ...action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
