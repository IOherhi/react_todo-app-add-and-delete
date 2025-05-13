/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

// #region Components

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { MessageError } from './components/MessageError';

// #endregion

// #region allImport

import { Todo } from './types/Todo';
import { getTodos, postTodos, deleteTodos } from './api/todos';
import React, { useEffect, useRef, useState } from 'react';

// #endregion

export type TypeNewTodo = {
  id: null;
  userId: number;
  title: string;
  completed: boolean;
};

const USER_ID = 2881;

export const App: React.FC = () => {
  // #region State

  const [todos, setTodos] = useState<Todo[]>([]);
  const [hasError, setHasError] = useState(false);
  const [theError, setTheError] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  const [NewTodo, setCreateNewTodo] = useState<TypeNewTodo | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // #endregion

  // #region showErro

  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showError = (message: string) => {
    setHasError(true);
    setTheError(message);

    if (errorTimerRef.current) {
      clearTimeout(errorTimerRef.current);
    }

    errorTimerRef.current = setTimeout(() => {
      setHasError(false);
    }, 3000);
  };

  // #endregion

  // #region DoFetch

  const doPost = (titleValue: string) => {
    if (titleValue.length === 0) {
      showError('Title should not be empty');

      return;
    }

    const createNewTodo: TypeNewTodo = {
      id: null,
      userId: USER_ID,
      title: titleValue,
      completed: false,
    };

    setCreateNewTodo(createNewTodo);

    postTodos(createNewTodo.userId, createNewTodo)
      .then(response => {
        setTodos(prev => [...prev, response]);
        setInputValue('');
        setCreateNewTodo(null);
      })
      .catch(() => {
        showError('Unable to add a todo');
      });
  };

  const deletePost = (id: number) => {
    deleteTodos(id)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
      })
      .catch(() => {
        showError('Unable to delete a todo');
      });
  };

  // #endregion

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  useEffect(() => {
    getTodos(USER_ID)
      .then(response => {
        setTodos(response);
      })
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          doPost={doPost}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />

        <TodoList
          todos={todos}
          NewTodo={NewTodo}
          deletePost={deletePost}
          visibleTodos={visibleTodos}
        />

        <Footer setFilter={setFilter} filter={filter} todos={todos} />
      </div>

      <MessageError
        setHasError={setHasError}
        hasError={hasError}
        theError={theError}
      />
    </div>
  );
};
