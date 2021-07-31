const initialState = {
  contacts: [],
  contact: {},
  loading: true,
  error: {
    message: '',
  },
};

const contactReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'GET_CONTACTS':
      return {
        ...state,
        contacts: payload,
        loading: false,
      };
    case 'GET_CONTACT':
      return {
        ...state,
        contact: payload,
      };
    case 'CLEAR_CONTACT':
      return {
        ...state,
        contact: {},
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, payload.contact],
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contact: payload,
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((con) => con.id !== payload),
        contact: {},
        loading: false,
      };
    default:
      return state;
  }
};

export default contactReducer;
