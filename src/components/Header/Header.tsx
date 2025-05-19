import { useTodosActions } from '../../hooks/hooks';

export const Header: React.FC = () => {
  const {
    todosFromServer,
    query,
    setQuery,
    addTodo,
    disabled,
    inputRef,
    toggleAll,
  } = useTodosActions();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addTodo();
  };

  return (
    <header className="todoapp__header">
      {todosFromServer.length > 0 && (
        <button
          type="button"
          className={`todoapp__toggle-all${todosFromServer.every(todo => todo.completed) ? ' active' : ''}`}
          data-cy="ToggleAllButton"
          onClick={toggleAll}
        />
      )}

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={query}
          onChange={handleChange}
          ref={inputRef}
          disabled={disabled}
          autoFocus
        />
      </form>
    </header>
  );
};
