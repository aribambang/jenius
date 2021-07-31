import server from '../../api/server';

export const getContacts = (payload) => async (dispatch) => {
  try {
    const { data } = await server.get('/contact');
    const sorted = data.data.sort((a, b) =>
      a.firstName > b.firstName ? 1 : b.firstName > a.firstName ? -1 : 0,
    );
    console.log(sorted);
    dispatch({ type: 'GET_CONTACTS', payload: sorted });
  } catch (err) {
    console.log(err);
  }
};

export const addContacts = (payload) => async (dispatch) => {
  try {
    const { data } = await server.post('/contact', payload);
    dispatch({ type: 'ADD_CONTACT', payload });
    return { status: true };
  } catch (err) {
    console.log(err);
    return { status: false, message: err.response.data.message };
  }
};

export const updateContacts = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const { data } = await server.put(`/contact/${payload.id}`, {
      firstName: payload.firstName,
      lastName: payload.lastName,
      age: payload.age,
      photo: payload.photo,
    });
    dispatch({ type: 'UPDATE_CONTACT', payload });
    return { status: true };
  } catch (err) {
    console.log(err);
    return { status: false, message: err.response.data.message };
  }
};

export const getContact = (payload) => async (dispatch) => {
  try {
    const { data } = await server.get(`/contact/${payload}`);
    dispatch({ type: 'GET_CONTACT', payload: data.data });
  } catch (err) {
    console.log(err);
  }
};

export const clearContact = (payload) => async (dispatch) => {
  try {
    dispatch({ type: 'CLEAR_CONTACT', payload: '' });
  } catch (err) {
    console.log(err);
  }
};

export const deleteContact = (payload) => async (dispatch) => {
  try {
    const { data } = await server.delete(`/contact/${payload}`);
    dispatch({ type: 'DELETE_CONTACT', payload: payload });
    return { status: true };
  } catch (err) {
    return { status: false, message: err.response.data.message };
  }
};
