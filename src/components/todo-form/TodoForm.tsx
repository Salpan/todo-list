import { FC, useState } from 'react';
import './styles.css';

type Props = {
    onAdd: (title: string) => void;
};

export const TodoForm: FC<Props> = ({ onAdd }) => {
    const [value, setValue] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd(value);
        setValue('');
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
