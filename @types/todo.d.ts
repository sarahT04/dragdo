type stickyDataType = {
    id: string;
    title?: string | null;
    body: string;
    created: Date;
    updated: Date;
    color: string;
    pinned: boolean;
    importance: (0 | 1 | 2 | 3 | 4 | 5);
    sequence: number;
};

enum TodosActionsKind {
    ACTIVE_DATA = 'ACTIVE_DATA',
    COLOR = 'COLOR',
    OPEN_MODAL = 'OPEN_MODAL',
    // 
    EDIT_TODO = 'EDIT_TODO',
    DELETE_TODO = 'DELETE_TODO',
    ADD_TODO = 'ADD_TODO',
    SET_ACTIVE_DATA = 'SET_ACTIVE_DATA',
    SET_COLOR = 'SET_COLOR',
    SET_OPEN_MODAL = 'SET_OPEN_MODAL',
    SET_CLOSE_MODAL = 'SET_CLOSE_MODAL',
}

type todoAction = {
    type: TodosActionsKind;
    payload: stickyDataType;
}

type stickyContextType = {
    todos: stickyDataType[] | null;
    setTodos: Dispatch<SetStateAction<stickyDataType[] | null>>;
    activeData: stickyDataType | null;
    setActiveData: Dispatch<SetStateAction<stickyDataType | null>>;
    newTodo: (oldTodos: stickyDataType[], todo: stickyDataType) => Promise<stickyDataType[]>;
    editTodo: (todo: stickyDataType) => Promise<void | null>;
    deleteTodo: (oldTodos: stickyDataType[], todo: stickyDataType) => Promise<stickyDataType[]>;
}