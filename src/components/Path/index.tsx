import React, { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";

import { FiCornerDownRight } from "react-icons/fi";
import menuOptions from "../../config/menuOptions";

import { Container, PathItem } from "./styles";
import trimString from "../../utils/trimString";

interface PathProps {
  title: string;
  path: string;
}

interface PathComponentProps {
  lastPath?: PathProps[];
}

const Path: React.FC<PathComponentProps> = ({ lastPath }) => {
  const location = useLocation();

  const arrayLocation = location.pathname.split("/");

  const paths = [] as PathProps[];

  const indexOf = menuOptions.options.findIndex(
    option => option.path === `/${arrayLocation[1]}`,
  );

  if (indexOf >= 0) {
    paths.push({
      title: menuOptions.options[indexOf].title,
      path: menuOptions.options[indexOf].path,
    });

    if (menuOptions.options[indexOf].subMenu) {
      const indexOfSub = menuOptions.options[indexOf].subMenu.findIndex(
        option => option.path === `/${arrayLocation[1]}/${arrayLocation[2]}`,
      );
      if (indexOfSub >= 0) {
        paths.push({
          title: menuOptions.options[indexOf].subMenu[indexOfSub].title,
          path: menuOptions.options[indexOf].subMenu[indexOfSub].path,
        });
      }
    }

    return (
      <Container id="PathContainer">
        <FiCornerDownRight />
        <Link to="/">Início</Link>
        {paths?.map(path => (
          <PathItem key={path.path}>
            <p>/</p>
            <Link to={path.path}>
              {window.innerWidth > 440
                ? path.title
                : trimString(path.title, 15)}
            </Link>
          </PathItem>
        ))}
        {lastPath?.map(path => (
          <PathItem key={path.path}>
            <p>/</p>
            <Link to={path.path}>
              {window.innerWidth > 440
                ? path.title
                : trimString(path.title, 15)}
            </Link>
          </PathItem>
        ))}
      </Container>
    );
  }
  return (
    <Container>
      <FiCornerDownRight />
      <Link to="/">Início</Link>
    </Container>
  );
};

export default Path;
