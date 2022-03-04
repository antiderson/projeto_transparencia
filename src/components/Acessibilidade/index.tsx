/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";

import { IoAccessibility } from "react-icons/io5";
import { Container } from "./styles";

import { useTheme } from "../../hooks/theme";

import fontIcon from "../../assets/icons/A.svg";
import Aplus from "../../assets/icons/Aplus.svg";
import Aminus from "../../assets/icons/Aminus.svg";
import cont from "../../assets/icons/cont.svg";
import SaibaMais from "../../assets/icons/saibamais.svg";

const Acessibilidade: React.FC = () => {
  const { toggleTheme, toggleFont, fontSize } = useTheme();
  function handleUpFontSize(size: number) {
    const newSize = size >= 1.5 ? 1.5 : size + 0.1;

    toggleFont(newSize);
  }

  function handleDownFontSize(size: number) {
    const newSize = size <= 0.5 ? 0.5 : size - 0.1;
    toggleFont(newSize);
  }

  const [libras, setLibras] = useState(false);

  return (
    <Container>
      <IoAccessibility />
      <p>Acessibilidade:</p>
      <img src={fontIcon} alt="font" onClick={() => toggleFont(1)} />
      <img
        src={Aplus}
        alt="A-plus"
        onClick={() => handleUpFontSize(fontSize)}
      />
      <img
        src={Aminus}
        alt="A-minus"
        onClick={() => handleDownFontSize(fontSize)}
      />
      <img src={cont} onClick={() => toggleTheme()} alt="cont" />
      <img src={SaibaMais} alt="SaibaMais" onClick={() => setLibras(!libras)} />
    </Container>
  );
};

export default Acessibilidade;
