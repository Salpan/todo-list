import { FC, useState, useEffect } from 'react';
import { Task, Filter } from '_types/todoList';
import { TodoForm } from '_components/todo-form/TodoForm';
import { TodoItem } from '_components/todo-item/TodoItem';
import './styles.css';

export const TodoList: FC = () => {
    // сразу читаем localStorage при инициализации
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState<Filter>(Filter.All);

    // сохраняем при изменении
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string) => {
        if (title.trim()) {
            setTasks([
                ...tasks,
                { id: Date.now(), title: title.trim(), isCompleted: false },
            ]);
        }
    };

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
        setTasks(
            tasks.map((t) => (t.id === id ? { ...t, title: title.trim() } : t)),
        );
    };

    const filteredTasks = tasks.filter((t) =>
        filter === Filter.Active
            ? !t.isCompleted
            : filter === Filter.Completed
              ? t.isCompleted
              : true,
    );

    const activeCount = tasks.filter((t) => !t.isCompleted).length;

    return (
        <div className="todo-list-wrapper">
            <TodoForm onAdd={addTask} />

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
