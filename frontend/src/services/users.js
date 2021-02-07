import api from './api';

export const getUsers = () => {
  const url = '/sessions';

  return api.get(url).then(res => res.data);
};
