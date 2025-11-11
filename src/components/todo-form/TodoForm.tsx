import { FC, useState, useCallback } from 'react';
import { TodoFormProps } from '_types/types';
import './styles.css';

export const TodoForm: FC<TodoFormProps> = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const submit = useCallback(
        (e: React.FormEvent) => {
            e.preventDefault();
            if (value.trim()) {
                onAdd(value);
                setValue('');
            }
        },
        [value, onAdd],
    );

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
        },
        [],
    );

    return (
        <form className="todo-form" onSubmit={submit}>
            <input
                value={value}
                onChange={handleChange}
                placeholder="Новая задача..."
            />
            <button type="submit">Добавить</button>
        </form>
    );
};
