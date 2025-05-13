import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const getTodos = (id: number) => {
  return client.get<Todo[]>(`/todos?userId=${id}`);
};

export const postTodos = (id: number, data: any) => {
  return client.post<Todo[]>(`/todos?userId=${id}`, data);
};

export const patchTodos = (id: number, data: any) => {
  return client.patch<Todo[]>(`/todos?userId=${id}`, data);
};

export const deleteTodos = (id: number) => {
  return client.delete(`/todos/${id}`);
};
