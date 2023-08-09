import { createStore } from "redux";

const initialState = {
  refresh: true,
  admin: { login: false },
  student: { login: false, data: {} },
  faculty: { login: false, data: {} },
};

const appReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "refresh":
      return { ...prevState, refresh: !prevState.refresh };
    case "admin":
      return { ...prevState, admin: action.payload };
    case "student":
      return { ...prevState, student: action.payload };
    case "faculty":
      return { ...prevState, faculty: action.payload };

    default:
      return prevState;
  }
};
const Store = createStore(appReducer);
export default Store;
