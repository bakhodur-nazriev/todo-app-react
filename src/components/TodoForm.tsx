import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
  border-radius: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  background-color: #6e7bf2;
  border-radius: 8px;
  padding: 10px 20px;
  border: none;
  background-color: #6e7bf2;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  height: 40px;
  transition: 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;

interface TodoFormProps {
  addTodo: (text: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a new task"
      />
      <Button type="submit">Add Item</Button>
    </Form>
  );
};

export default TodoForm;
