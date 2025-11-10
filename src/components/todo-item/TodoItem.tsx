import { FC, useState } from 'react';
import { Task } from '_types/todoList';
import './styles.css';

type Props = {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, title: string) => void;
};

export const TodoItem: FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState(task.title);

    const save = () => {
        if (draft.trim()) {
            onEdit(task.id, draft);
            setIsEditing(false);
        }
    };

    return (
        <li className={`todo-item ${task.isCompleted ? 'completed' : ''}`}>
            <input
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggle(task.id)}
            />

            {isEditing ? (
                <>
                    <input
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        autoFocus
                    />
                    <button type="button" onClick={save}>
                        Сохранить
                    </button>
                </>
            ) : (
                <>
                    <span>{task.title}</span>
                    <button type="button" onClick={() => setIsEditing(true)}>
                        Редактировать
                    </button>
                </>
            )}

            <button type="button" onClick={() => onDelete(task.id)}>
                Удалить
            </button>
        </li>
    );
};
