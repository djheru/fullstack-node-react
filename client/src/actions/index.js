import axios from 'axios';
import { FETCH_SURVEYS, FETCH_USER } from './types';

export const fetchUser = () => async (dispatch) => {
  const { data:payload } = await axios.get('/api/current-user');
  dispatch({ type: FETCH_USER, payload });
};

export const handleToken = (token) => async (dispatch) => {
  const { data:payload } = await axios.post('/api/token', token);
  dispatch({ type: FETCH_USER, payload });
};

export const submitSurvey = (values, history) => async (dispatch) => {
  const {data:payload} = await axios.post('/api/surveys', values);
  history.push('/surveys');
  dispatch({type: FETCH_USER, payload});
};

export const fetchSurveys = () => async (dispatch) => {
  const res = await axios.get('/api/surveys');
  dispatch ({ type: FETCH_SURVEYS, payload: res.data });
};
