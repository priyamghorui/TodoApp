const initialstate = [];
export const userinforeducer = (state = initialstate, action) => {
  switch (action.type) {
    case "user_info":
      return [...state, action.data];
    default:
      return state;
  }
};