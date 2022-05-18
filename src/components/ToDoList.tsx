import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categories,
  categoryState,
  IToDo,
  toDoSelector,
  toDoState,
} from "./atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const Header = styled.h1`
  font-size: 40px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  margin: 25px 0px;
`;
const Hr = styled.hr`
  height: 1px;
  border: 0px;
  background-color: ${(props) => props.theme.secondBgColor};
  margin: 15px 0px;
`;

const MainColumns = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 25px 15px 15px;
`;

const SubTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: ${(props) => props.theme.accentColor};
`;

const SelectContainer = styled.div`
  border: none;
  display: flex;
  align-items: center;
`;
const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &::-ms-expand {
    display: none;
  }
  border: none;
  font-size: 18px;
  width: 100%;
  height: 100%;
  padding: 0 15px 0 10px;
`;

export const Button = styled.button<{ btnColor: string }>`
  border: 0px;
  background-color: ${(props) => props.btnColor};
  color: ${(props) => props.theme.bgColor};
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector) as IToDo[];
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setCategory(event.currentTarget.value as Categories);
  };

  return (
    <>
      <Helmet>
        <title>To Do List</title>
      </Helmet>
      <div>
        <Header>Work Planner</Header>
        <MainColumns>
          <SubTitle>{category === "TO_DO" ? "TO DO" : category}</SubTitle>
        </MainColumns>
        <Hr />
        <MainColumns>
          <SelectContainer>
            <FontAwesomeIcon icon={faList} fontSize={18} />
            <Select value={category} onInput={onInput}>
              <option value={Categories.TO_DO}>To Do</option>
              <option value={Categories.DOING}>Doing</option>
              <option value={Categories.DONE}>Done</option>
            </Select>
          </SelectContainer>
          <CreateToDo />
        </MainColumns>
        <MainColumns>
          <ul>
            {toDos.map((toDo) => (
              <ToDo key={toDo.id} {...toDo} />
            ))}
          </ul>
        </MainColumns>
      </div>
    </>
  );
}

export default ToDoList;
