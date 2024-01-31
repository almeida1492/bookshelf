export function reducer(state: any, action: { type: any; payload: any; }) {
    const draft = { ...state };
    switch (action.type) {
      case "UPDATE_USERNAME":
        draft.username = action.payload;
        break;
    }
    return draft;
  }
