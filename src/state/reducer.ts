export function reducer(state, action) {
  const draft = { ...state };
  switch (action.type) {
    case "CHANGE_ACTIVITY":
      draft.activity = action.payload;
      break;
    case "UPDATE_USERNAME":
      draft.username = action.payload;
      break;
  }
  return draft;
}
