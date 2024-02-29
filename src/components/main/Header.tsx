import React from "react";
import "./Header.scss";
interface HeaderProps {
  title: string;
}


const Header: React.FC<HeaderProps> = ({ title }) => {
  const [counter, setCounter] = React.useState(0);
  const onClick = () => setCounter(counter + 1);

  return (
    <div className='Header'>
      <h1 onClick={onClick}>
        {title} - {counter}
      </h1>
    </div>
  );
};

export default Header;
