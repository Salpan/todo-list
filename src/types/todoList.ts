export type Task = {
    id: number;
    title: string;
    isCompleted: boolean;
};

export enum Filter {
    All = 'all',
    Active = 'active',
    Completed = 'completed',
}
