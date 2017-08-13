import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  const { data:payload } = await axios.get('/api/current-user');
  dispatch({ type: FETCH_USER, payload });
};

export const handleToken = (token) => async (dispatch) => {
  const { data:payload } = await axios.post('/api/token', token);
  dispatch({ type: FETCH_USER, payload });
};
