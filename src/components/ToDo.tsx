import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, IToDo, toDoState } from "./atom";
import { Button } from "./ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const DoLi = styled.li`
  margin: 10px 0px;
  display: flex;
  div {
    background-color: pink;
    width: 3px;
  }
  h2 {
    font-size: 20px;
    background-color: ${(props) => props.theme.secondBgColor};
    padding: 5px 0px 10px 10px;
    width: 400px;
    div {
      width: 5px;
      background-color: red;
    }
  }
  Button {
    margin-left: 5px;
    font-size: 18px;
  }
  Button:last-child {
    margin-left: 5px;
    color: red;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id == id);
      const newToDo = { text, category: name as Categories, id };
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id == id);
      const newToDos = [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
  };

  return (
    <DoLi>
      <div></div>
      <h2>{text}</h2>
      {category !== Categories.TO_DO && (
        <Button btnColor="#ff6348" name={Categories.TO_DO} onClick={onClick}>
          To Do
        </Button>
      )}
      {category !== Categories.DOING && (
        <Button btnColor="#eccc68" name={Categories.DOING} onClick={onClick}>
          Doing
        </Button>
      )}
      {category !== Categories.DONE && (
        <Button btnColor="#5352ed" name={Categories.DONE} onClick={onClick}>
          Done
        </Button>
      )}
      <Button btnColor="white" name="delete" onClick={onDelete}>
        <FontAwesomeIcon icon={faTrashCan} fontSize={16} />
      </Button>
    </DoLi>
  );
}

export default ToDo;
