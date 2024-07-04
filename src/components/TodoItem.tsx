import React, { useState } from 'react';
import styled from 'styled-components';
import { Todo } from '../types';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete-icon.svg';
import { ReactComponent as EditIcon } from '../assets/icons/edit-icon.svg';

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

const Checkbox = styled.input`
  margin-right: 10px;
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
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(index)}
      />
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
          <Button onClick={handleEdit}>
            <EditIcon />
          </Button>
        )}
        <Button onClick={() => deleteTodo(index)}>
          <DeleteIcon />
        </Button>
      </div>
    </ListItem>
  );
};

export default TodoItem;
