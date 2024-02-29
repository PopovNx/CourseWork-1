import React from "react";
import styled from "@emotion/styled";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { increment } from "@/store/counterSlice";
interface HeaderProps {
  title: string;
}

const HeaderContainer = styled.header`
  background-color: #282c34;
  color: white;
  padding: 10px;
  text-align: center;
`;

const Header: React.FC<HeaderProps> = ({ title }) => {
  const counter = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(increment());
  };
  return (
    <HeaderContainer>
      <h1 onClick={onClick}>
        {title} - {counter}
      </h1>
    </HeaderContainer>
  );
};

export default Header;
