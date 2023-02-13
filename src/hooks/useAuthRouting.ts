import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdmissions } from '../store/reducers/actionCreators';
import { useAppDispatch } from './redux';

export const useAuthRouting = (token: string): void => {
  const navigate = useNavigate();
  const param = Object.values(useParams())[0];
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (typeof token !== 'string' || token === '') {
      navigate('/auth');
    } else if (param !== 'auth' && typeof param !== 'undefined') {
      navigate('/');
    };
    dispatch(getAdmissions());
  }, []);
};
