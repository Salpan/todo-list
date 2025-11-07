import { FC, useState } from 'react';
import { Task } from '_types/todoList';
import './styles.css';

export const TodoForm: FC = () => {
    const [value, setValue] = useState('');

    const addTask = () => {
        if (value.trim() !== '') {
            const tasks = JSON.parse(
                localStorage.getItem('tasks') || '[]',
            ) as Task[];
            const newTasks = [
                ...tasks,
                { id: Date.now(), title: value.trim(), isCompleted: false },
            ];
            localStorage.setItem('tasks', JSON.stringify(newTasks));
            setValue('');
            window.location.reload();
        }
    };

    return (
        <div className="todo-form">
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Новая задача..."
            />
            <button type="button" onClick={addTask}>
                Добавить
            </button>
        </div>
    );
};
