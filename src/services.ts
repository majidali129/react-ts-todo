export const saveToLocal = (todos: TodoItemType[]): void =>  {
    localStorage.setItem('my-todos', JSON.stringify(todos))
}