import { FC, useState, useCallback } from 'react';
import { TodoItemProps } from '_types/types';
import './styles.css';

export const TodoItem: FC<TodoItemProps> = ({
    task,
    onToggle,
    onDelete,
    onEdit,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(task.title);

    const handleToggle = useCallback(
        () => onToggle(task.id),
        [onToggle, task.id],
    );
    const handleDelete = useCallback(
        () => onDelete(task.id),
        [onDelete, task.id],
    );
    const handleEdit = useCallback(() => setIsEditing(true), []);
    const handleSave = useCallback(() => {
        if (draft.trim()) {
            onEdit(task.id, draft);
            setIsEditing(false);
        }
    }, [onEdit, task.id, draft]);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setDraft(e.target.value);
        },
        [],
    );

    return (
        <li className={`todo-item ${task.isCompleted ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={handleToggle}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={draft}
                    onChange={handleChange}
                    autoFocus
                />
            ) : (
                <span>{task.title}</span>
            )}
            <div className="actions">
                {isEditing ? (
                    <button type="button" onClick={handleSave}>
                        Сохранить
                    </button>
                ) : (
                    <button type="button" onClick={handleEdit}>
                        Редактировать
                    </button>
                )}
                <button type="button" onClick={handleDelete}>
                    Удалить
                </button>
            </div>
        </li>
    );
};
