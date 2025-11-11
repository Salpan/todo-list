import { FC, useState } from 'react';
import { TodoFormProps } from '_types/types';
import './styles.css';

export const TodoForm: FC<TodoFormProps> = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onAdd(value);
            setValue('');
        }
    };

    return (
        <form className="todo-form" onSubmit={submit}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Новая задача..."
            />
            <button type="submit">Добавить</button>
        </form>
    );
};
