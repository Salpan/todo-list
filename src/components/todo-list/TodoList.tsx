import { FC, useState, useEffect } from 'react';
import { Task, Filter } from '_types/todoList';
import { TodoForm } from '_components/todo-form/TodoForm';
import { TodoItem } from '_components/todo-item/TodoItem';
import './styles.css';

export const TodoList: FC = () => {
    // ✅ сразу читаем localStorage при инициализации
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                console.log('📥 Загружено при инициализации:', parsed);
                return parsed;
            } catch (err) {
                console.error('❌ Ошибка парсинга:', err);
                return [];
            }
        }
        return [];
    });

    const [filter, setFilter] = useState<Filter>(Filter.All);

    // сохраняем при каждом изменении
    useEffect(() => {
        console.log('💾 Сохраняем задачи:', tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string) => {
        if (title.trim() !== '') {
            const newTask = {
                id: Date.now(),
                title: title.trim(),
                isCompleted: false,
            };
            console.log('➕ Добавляем задачу:', newTask);
            setTasks([...tasks, newTask]);
        }
    };

    const toggleTask = (id: number) => {
        console.log('🔄 Переключаем задачу:', id);
        setTasks(
            tasks.map((t) =>
                t.id === id ? { ...t, isCompleted: !t.isCompleted } : t,
            ),
        );
    };

    const deleteTask = (id: number) => {
        console.log('🗑 Удаляем задачу:', id);
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const editTask = (id: number, title: string) => {
        console.log('✏️ Редактируем задачу:', id, 'новый текст:', title);
        setTasks(
            tasks.map((t) => (t.id === id ? { ...t, title: title.trim() } : t)),
        );
    };

    const filteredTasks = tasks.filter((t) => {
        if (filter === Filter.Active) return !t.isCompleted;
        if (filter === Filter.Completed) return t.isCompleted;
        return true;
    });

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
