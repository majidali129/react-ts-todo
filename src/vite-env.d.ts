/// <reference types="vite/client" />

type StatusType = 'complete' | 'pending';

interface TodoItemType  {
    name: string;
    status: StatusType
    id: string;
}