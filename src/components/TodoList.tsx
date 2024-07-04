import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { Todo } from '../types';

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (index: number) => void;
  editTodo: (index: number, text: string) => void;
  deleteTodo: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  editTodo,
  deleteTodo,
}) => {
  return (
    <List>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          toggleTodo={toggleTodo}
          editTodo={editTodo}
          deleteTodo={deleteTodo}
        />
      ))}
    </List>
  );
};

export default TodoList;
