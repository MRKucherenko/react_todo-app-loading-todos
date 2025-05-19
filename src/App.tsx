import React from 'react';
import { Header } from './components/Header/Header';
import { useTodosActions } from './hooks/hooks';
import { ErrorMsg } from './components/Errors/Errors';
import { TodoItem } from './components/TodoItem/TodoItem';
import { Footer } from './components/Footer/Footer';
import { TempTodo } from './components/TodoItem/TempoTodo';

export const App: React.FC = () => {
  const {
    visibleTodos,
    tempTodo,
    error,
    setError,
    todosFromServer,
    loading,
    deleteTodo,
    patchTodo,
  } = useTodosActions();

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <TodoItem
              todo={todo}
              loading={loading.includes(todo.id)}
              key={todo.id}
              deleteTodo={deleteTodo}
              updateTodo={patchTodo}
            />
          ))}

          {tempTodo && <TempTodo todo={tempTodo} />}
        </section>

        {todosFromServer.length > 0 && <Footer />}

        <ErrorMsg error={error} setError={setError} />
      </div>
    </div>
  );
};
