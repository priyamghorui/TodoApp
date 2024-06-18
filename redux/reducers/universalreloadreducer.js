const initialstate = [];
export const universalreloadreducer = (state = initialstate, action) => {
  switch (action.type) {
    case "universal_reload":
      return [...state, action.data];
    default:
      return state;
  }
};
