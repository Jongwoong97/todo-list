import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categories,
  categoryState,
  IToDo,
  toDoState,
} from "./atom";
import { Button } from "./ToDoList";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  input {
    border: 2px solid ${(props) => props.theme.textColor};
    font-size: 18px;
    padding-left: 10px;
  }
  Button {
    margin-left: 5px;
    border-radius: 5px;
    padding: 4px 5px 2px 5px;
    font-size: 18px;
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState) as Categories;
  const handleValid = ({ toDo }: IForm) => {
    console.log("add to do", toDo);
    setToDos((oldToDos) => {
      const newToDos = [
        { text: toDo, category: category, id: Date.now() },
        ...oldToDos,
      ];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
          maxLength: {
            value: 30,
            message: "Text is too long.",
          },
        })}
        placeholder="Add work"
      />
      <Button btnColor="#2f3542">+</Button>
    </Form>
  );
}

export default CreateToDo;
