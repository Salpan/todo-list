import { FC, useEffect, useState } from 'react';
import { TodoItem } from '_components/todo-item/TodoItem';
import { Filter, Task } from '_types/todoList';
import './styles.css';

export const TodoList: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<Filter>(Filter.All);

    useEffect(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            setTasks(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const toggleTask = (id: number) => {
        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
            ),
        );
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const editTask = (id: number, title: string) => {
        if (title.trim() !== '') {
            setTasks(
                tasks.map((t) =>
                    t.id === id ? { ...t, title: title.trim() } : t,
                ),
            );
        }
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === Filter.Active) return !t.isCompleted;
        if (filter === Filter.Completed) return t.isCompleted;
        return true;
    });

    const activeCount = tasks.filter((t) => !t.isCompleted).length;

    return (
        <div className="todo-list-wrapper">
            <div className="toolbar">
                <div className="filters">
                    <button
                        className={filter === Filter.All ? 'active' : ''}
                        onClick={() => setFilter(Filter.All)}
                    >
                        Все
                    </button>
                    <button
                        className={filter === Filter.Active ? 'active' : ''}
                        onClick={() => setFilter(Filter.Active)}
                    >
                        Активные
                    </button>
                    <button
                        className={filter === Filter.Completed ? 'active' : ''}
                        onClick={() => setFilter(Filter.Completed)}
                    >
                        Выполненные
                    </button>
                </div>
                <div className="counter">Осталось {activeCount} задач</div>
            </div>
            <ul className="todo-list">
                {filteredTasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={editTask}
                    />
                ))}
            </ul>
        </div>
    );
};
