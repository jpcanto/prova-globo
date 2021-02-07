import api from './api';

export const getUsers = () => {
  const url = '/sessions';

  return api.get(url).then(res => res.data);
};

export const deleteUser = id => {
  const url = `/sessions/${id}`;

  return api.delete(url).then(res => res.data);
};
