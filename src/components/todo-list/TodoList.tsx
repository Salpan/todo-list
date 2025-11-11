import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Task } from '_types/types';
import { TodoForm } from '_components/todo-form/TodoForm';
import { TodoItem } from '_components/todo-item/TodoItem';
import { Filter } from '../../common/enums/filter';
import './styles.css';

export const TodoList: FC = () => {
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = useState<Filter>(Filter.All);

    const addTask = useCallback((title: string) => {
        if (title.trim()) {
            setTasks((prevTasks) => [
                ...prevTasks,
                { id: Date.now(), title: title.trim(), isCompleted: false },
            ]);
        }
    }, []);

    const toggleTask = useCallback((id: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, isCompleted: !task.isCompleted }
                    : task,
            ),
        );
    }, []);

    const deleteTask = useCallback((id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }, []);

    const editTask = useCallback((id: number, title: string) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, title: title.trim() } : task,
            ),
        );
    }, []);

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) =>
            filter === Filter.Active
                ? !task.isCompleted
                : filter === Filter.Completed
                  ? task.isCompleted
                  : true,
        );
    }, [tasks, filter]);

    const activeCount = useMemo(
        () => tasks.filter((task) => !task.isCompleted).length,
        [tasks],
    );

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

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
