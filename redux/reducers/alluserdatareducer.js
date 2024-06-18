const initialstate = [];
export const alluserdatareducer = (state = initialstate, action) => {
  switch (action.type) {
    case "all_user_data":
      return [...state, action.data];
    default:
      return state;
  }
};
