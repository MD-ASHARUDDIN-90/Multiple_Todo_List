import { useState } from "react";
import style from "./TodoList.module.css";
import Swal from "sweetalert2";

export default function TodoList({ list, setTodoList, todoList }) {
  const [todo, setTodo] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const handleAddTodo = () => {
    if (!todo) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter todo.."
      });
    } else {
      const newTodo = {
        id: Math.random(),
        name: todo,
        description: todoDescription
      };

      list.subTodo = [newTodo, ...list?.subTodo];
      setTodoList([...todoList]);
      setTodo("");
      setTodoDescription("");
    }
  };

  const handleDeletTodo = (item, list) => {
    list.subTodo = list.subTodo.filter((el) => el.id !== item.id);
    setTodoList([...todoList]);
  };

  return (
    <div className={style.todo}>
      <h5>
        {list.name} <span style={{ float: "right", cursor: "pointer" }}></span>
      </h5>
      <div style={{ display: "flex" }}>
        <div className={style.input_Container}>
          <input
            placeholder="Add Todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value.slice(0, 40))}
          />
          <input
            placeholder="Add todo description"
            value={todoDescription}
            onChange={(e) => setTodoDescription(e.target.value.slice(0, 40))}
          />
        </div>
        <button onClick={handleAddTodo} className={style.btn}>
          {"➕"}
        </button>
      </div>
      {list.subTodo.map((el) => {
        return (
          <div className={style.subTodo} key={el.id}>
            <p className={style.heading}>
              {el.name}{" "}
              <span
                onClick={() => handleDeletTodo(el, list)}
                style={{ float: "right" }}
              >
                {"❌"}
              </span>
            </p>
            <p className={style.description}>{el.description}</p>
          </div>
        );
      })}
      {list.subTodo.length > 5 && <button>Show More</button>}
    </div>
  );
}
