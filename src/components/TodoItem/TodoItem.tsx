/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState } from 'react';
import { useTodosActions } from '../../hooks/hooks';
import { EditableField, Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  loading: boolean;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (data: EditableField, id: number) => Promise<void>;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { deleteTodo, patchTodo, loading } = useTodosActions();
  const { id, title, completed } = todo;

  const [editFlag, setEditFlag] = useState(false);
  const [query, setQuery] = useState('');
  const submitting = useRef(false);

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    deleteTodo(id);
  };

  const handleCheckbox = async () => {
    await patchTodo({ completed: !completed }, id);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting.current) {
      return;
    }

    submitting.current = true;
    if (query.trim() === '') {
      await deleteTodo(id);

      return;
    }

    if (title === query) {
      setEditFlag(false);

      return;
    }

    try {
      await patchTodo({ title: query.trim() }, id);
      setEditFlag(false);
      setQuery('');
    } finally {
      submitting.current = false;
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setEditFlag(false);
      setQuery('');
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!submitting.current) {
      handleSubmit(event);
    }
  };

  return (
    <div data-cy="Todo" className={`todo${completed ? ' completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={handleCheckbox}
        />
      </label>

      {!editFlag ? (
        <>
          <span
            data-cy="TodoTitle"
            className="todo__title"
            onDoubleClick={() => {
              setQuery(title);
              setEditFlag(true);
            }}
          >
            {title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={handleDelete}
          >
            ×
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            data-cy="TodoTitleField"
            type="text"
            className="todo__title-field"
            placeholder="Empty todo will be deleted"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyUp={onKeyUp}
            onBlur={handleBlur}
            autoFocus
          />
        </form>
      )}

      <div
        data-cy="TodoLoader"
        className={`modal overlay${loading.includes(todo.id) ? ' is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
