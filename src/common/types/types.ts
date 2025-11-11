export type Task = {
    id: number;
    title: string;
    isCompleted: boolean;
};

export type TodoFormProps = {
    onAdd: (title: string) => void;
};

export type TodoItemProps = {
    task: Task;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, title: string) => void;
};
