import { useTodosActions } from '../../hooks/hooks';
import classNames from 'classnames';

export const Footer: React.FC = () => {
  const { filter, setFilter, todosFromServer, clear } = useTodosActions();

  const completed = todosFromServer.filter(todo => todo.completed);
  const count = todosFromServer.length - completed.length;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {`${count} items left`}
      </span>

      <nav className="filter" data-cy="Filter">
        <a
          href="#/"
          onClick={() => setFilter('all')}
          className={classNames('filter__link', {
            selected: filter === 'all',
          })}
          data-cy="FilterLinkAll"
        >
          All
        </a>

        <a
          href="#/active"
          onClick={() => setFilter('active')}
          className={classNames('filter__link', {
            selected: filter === 'active',
          })}
          data-cy="FilterLinkActive"
        >
          Active
        </a>

        <a
          href="#/completed"
          onClick={() => setFilter('completed')}
          className={classNames('filter__link', {
            selected: filter === 'completed',
          })}
          data-cy="FilterLinkCompleted"
        >
          Completed
        </a>
      </nav>

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={completed.length < 1}
        onClick={clear}
      >
        Clear completed
      </button>
    </footer>
  );
};
