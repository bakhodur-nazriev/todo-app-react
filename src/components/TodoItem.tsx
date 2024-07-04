import React, { useState } from 'react';
import styled from 'styled-components';
import { Todo } from '../types';

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Text = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? 'line-through' : 'none')};
`;

const Button = styled.button`
  margin-left: 10px;
`;

interface TodoItemProps {
  todo: Todo;
  index: number;
  toggleTodo: (index: number) => void;
  editTodo: (index: number, text: string) => void;
  deleteTodo: (index: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  toggleTodo,
  editTodo,
  deleteTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(index, newText);
    setIsEditing(false);
  };

  return (
    <ListItem>
      {isEditing ? (
        <input
          type="text"
          value={newText}
          onChange={e => setNewText(e.target.value)}
        />
      ) : (
        <Text completed={todo.completed}>{todo.text}</Text>
      )}
      <div>
        {isEditing ? (
          <Button onClick={handleSave}>Save</Button>
        ) : (
          <Button onClick={handleEdit}>Edit</Button>
        )}
        <Button onClick={() => toggleTodo(index)}>
          {todo.completed ? 'Undo' : 'Complete'}
        </Button>
        <Button onClick={() => deleteTodo(index)}>Delete</Button>
      </div>
    </ListItem>
  );
};

export default TodoItem;
