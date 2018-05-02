// ------------------------------------
// Constants
// ------------------------------------
export const UPDATE_LIST = 'UPDATE_LIST'

// ------------------------------------
// Actions
// ------------------------------------
export function updateList (value) {
  return {
    type: UPDATE_LIST,
    payload: value
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_LIST]: (state, action) => ({...state, ...action.payload}),
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {}
export default function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
