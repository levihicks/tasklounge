export default interface Task {
    title: string;
    id: string;
    description?: string;
    deadline?: string;
    categories?: string[] | undefined;
    progressState: number;
}