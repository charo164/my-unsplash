export const reducer = (state, action) => {
  switch (action.type) {
    case "toggleTheme":
      if (state.theme === "dark") {
        return {
          ...state,
          theme: "light",
        };
      } else {
        return {
          ...state,
          theme: "dark",
        };
      }
    case "togglePopup":
      return {
        ...state,
        popup: !state.popup,
      };
    case "setImages":
      return { ...state, images: action.value };
    default:
      return state;
  }
};
