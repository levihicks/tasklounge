export default interface Task {
    title: string;
    description?: string;
    deadline?: string;
    categories?: string[] | undefined;
}