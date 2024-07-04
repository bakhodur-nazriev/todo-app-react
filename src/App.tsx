import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Todo } from './types';
import { ReactComponent as SearchIcon } from './assets/icons/search-icon.svg';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const FilterContainer = styled.div`
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  font-size: 16px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const FilterButton = styled.button`
  padding: 10px;
  margin: 0 5px;
  font-size: 16px;
  cursor: pointer;
`;

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all',
  );
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo = { text, completed: false };
    setTodos([...todos, newTodo]);
  };

  const editTodo = (index: number, text: string) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, text } : todo,
    );
    setTodos(newTodos);
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number) => {
    const newTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(newTodos);
  };

  const filteredTodos = todos
    .filter(todo => {
      if (filter === 'completed') return todo.completed;
      if (filter === 'incomplete') return !todo.completed;
      return true;
    })
    .filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppContainer>
      <h1>To-Do List</h1>

      <span>
        <SearchIcon />
      </span>
      <SearchInput
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search tasks"
      />

      <TodoForm addTodo={addTodo} />

      <FilterContainer>
        <FilterButton onClick={() => setFilter('all')}>All</FilterButton>
        <FilterButton onClick={() => setFilter('completed')}>
          Completed
        </FilterButton>
        <FilterButton onClick={() => setFilter('incomplete')}>
          Incomplete
        </FilterButton>
      </FilterContainer>
      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        editTodo={editTodo}
        deleteTodo={deleteTodo}
      />
    </AppContainer>
  );
};

export default App;
