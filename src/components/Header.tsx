import React from 'react';

type Props = {
  doPost: () => void;
  inputValue: string;
  setInputValue: (p: string) => void;
};

export const Header: React.FC<Props> = ({
  doPost,
  inputValue,
  setInputValue,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      <form
        onSubmit={e => {
          e.preventDefault();
          const value: string = (e.target as HTMLFormElement).elements[0].value;

          doPost(value);
        }}
      >
        <input
          autoFocus
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          data-cy="NewTodoField"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
