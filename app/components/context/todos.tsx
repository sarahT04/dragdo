import { ReactNode, createContext, useContext, useReducer, useState } from "react";
import { allDatas } from "../sticky/datasType";
import { ModalContext } from "./modal";

export const StickyContext = createContext<stickyContextType | null>(null);

const newTodo = async (oldTodos: stickyDataType[], todo: stickyDataType) => {
    try {
        // Api call here
        const result = await addNewTodoDb(todo);
        if (result && oldTodos) {
            return [...oldTodos, todo]
        } else if (result) {
            return [todo];
        }
        return oldTodos;
    } catch (e) {
        return oldTodos;
    }
}

const deleteTodo = async (oldTodos: stickyDataType[], todo: stickyDataType) => {
    try {
        const result = await deleteTodoDb(todo);
        if (result !== null) {
            const updatedTodos = oldTodos.filter((oldTodo) => oldTodo.id !== todo.id);
            return updatedTodos;
        }
        return oldTodos;
    } catch (e) {
        return oldTodos;
    }
}

function todosReducer(todos: stickyDataType[], action: todoAction) {
    const { type, payload } = action;
    switch (type) {

        case TodosActionsKind.EDIT_TODO:
            return editTodo(todos, payload);

        case TodosActionsKind.DELETE_TODO:
            return deleteTodo(todos, payload);

        case TodosActionsKind.ADD_TODO:
            return newTodo(todos, payload);

        default:
            return todos;
    }
}

export default function StickyProvider({ children }: { children: ReactNode }) {
    // const initialData: stickyDataType[] = allDatas
    // const [todos, dispatch] = useReducer(todosReducer, initialData);
    const { closeModal, openModal } = useContext(ModalContext)!;

    // All todos
    const [todos, setTodos] = useState<stickyDataType[]>(allDatas);
    // For editing / creating new purpose and also for dragging purpose
    const [activeData, setActiveData] = useState<stickyDataType | null>(null);
    // Modal for edit / create form
    const editTodo = async (todo: stickyDataType) => {
        try {
            const result = await editTodoDb(todo);
            if (result !== null) {
                closeModal();
                return setTodos([...todos, todo]);
            }
            return null;
        } catch (e) {
            return null;
        }
    }



    return (
        <StickyContext.Provider value={{
            todos, setTodos,
            activeData, setActiveData,
            newTodo, editTodo, deleteTodo,
        }}>
            {children}
        </StickyContext.Provider>
    )
}


// case TodosActionsKind.OPEN_MODAL:
//                 return setIsModalOpen(true);

//             case TodosActionsKind.SET_CLOSE_MODAL:
//                 return setIsModalOpen(false);

//             case TodosActionsKind.SET_COLOR:
//                 return setColor(payload as string);

//             case TodosActionsKind.SET_ACTIVE_DATA:
//                 return setActiveData(payload as stickyDataType);