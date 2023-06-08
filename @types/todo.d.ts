type ImportanceType = (0 | 1 | 2 | 3 | 4 | 5);

type stickyDataType = {
    id: string;
    title: string | null;
    body: string;
    created: string;
    updated: string;
    color: string | null;
    pinned: boolean;
    importance: ImportanceType;
    sequence: number;
    done: boolean;
    deadline: Date | 'never';
};

type ModalDataType = {
    type: "edit" | "add",
    data: {
        pId: string | null;
        pTitle: string | null;
        pBody: string | null;
        pColor: string | null;
        pPinned: boolean;
        pImportance: ImportanceType;
        pSequence: number;
        pDeadline: Date | 'never';
    }
};

type AddDataType = {
    id?: string | null;
    title: string | null;
    body: string;
    color: string | null;
    pinned: boolean;
    importance: ImportanceType;
    sequence: number;
    done: boolean;
    deadline: Date | 'never';
}

type StickyProps = {
    todos: stickyDataType[] | null;
    setTodos: Dispatch<SetStateAction<stickyDataType[] | null>>;
}

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
    // todos: stickyDataType[] | null;
    // setTodos: Dispatch<SetStateAction<stickyDataType[] | null>>;
    modalData: ModalDataType | null;
    setModalData: Dispatch<SetStateAction<ModalDataType | null>>;
    // newTodo: (oldTodos: stickyDataType[], todo: stickyDataType) => Promise<stickyDataType[]>;
    // editTodo: (todo: stickyDataType) => Promise<void | null>;
    // deleteTodo: (oldTodos: stickyDataType[], todo: stickyDataType) => Promise<stickyDataType[]>;
}