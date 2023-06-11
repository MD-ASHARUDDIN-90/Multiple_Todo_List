import { useState } from "react";
import TodoList from "./component/todo-list/TodoList";
import style from "./App.module.css";
import Swal from "sweetalert2";

export default function App() {
  const [todos, setTodos] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: Math.random(),
      name: "React",
      subTodo: [
        {
          id: Math.random(),
          name: "React State",
          description: "State and set State"
        }
      ]
    },
    {
      id: Math.random(),
      name: "Node-Js",
      subTodo: []
    }
  ]);

  const handleAddTodoList = () => {
    if (todoList.length >= 3) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Only Three Todo List Can Be Created.."
      });
    } else {
      if (!todos) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Enter The Todo Name..."
        });
      } else {
        const newTodoList = {
          id: Math.random(),
          name: todos,
          subTodo: []
        };
        setTodoList((todoList) => [...todoList, newTodoList]);
        setTodos("");
      }
    }
  };

  const handleDeleteTodoList = (list) => {
    setTodoList(todoList.filter((el) => el.id !== list.id));
  };

  return (
    <div className={style.main}>
      <div className={style.todo_Container}>
        <div className={style.sectionContainer}>
          <div className={style.todo_Container_Left}>
            {todoList?.map((list, index) => {
              return (
                <div key={index} style={{ display: "flex" }}>
                  <TodoList
                    list={list}
                    todoList={todoList}
                    setTodoList={setTodoList}
                  />
                  <span
                    onClick={() => handleDeleteTodoList(list)}
                    style={{ cursor: "pointer" }}
                  >
                    {"⛔"}
                  </span>
                </div>
              );
            })}

            <div className={style.input_Container}>
              <input
                placeholder="Add Todo List"
                value={todos}
                onChange={(e) => setTodos(e.target.value.slice(0, 28))}
              />
              <button onClick={handleAddTodoList}>{"➕"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
