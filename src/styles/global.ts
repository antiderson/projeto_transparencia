import { shade } from "polished";
import { createGlobalStyle } from "styled-components";

interface Theme {
  name: string;
  colors: {
    background: string;
    backgroundSecond: string;
    text: string;
    secondBg: string;
    secondBgShade: string;
    secondText: string;
    secondTextShade: string;
    third: string;
    placeholder: string;
    danger: string;
    success: string;
    dangerShade: string;
    successShade: string;
  };
  font: number;
}
interface GlobalProps {
  theme: Theme;
}
export default createGlobalStyle<GlobalProps>`

  :root {
    font-size: ${props => props.theme.font * 72.5}%;

    @media (min-width: 700px){
      font-size: ${props => props.theme.font * 85}%;
    }

    --color-background: ${props => props.theme.colors.background};
    --color-background-second: ${props => props.theme.colors.backgroundSecond};
    --color-text: ${props => props.theme.colors.text};
    --color-second-bg: ${props => props.theme.colors.secondBg};
    --color-second-bg-shade: ${props =>
      shade(0.2, props.theme.colors.secondBg)};
    --color-second-text: ${props => props.theme.colors.secondText};
    --color-second-text-shade: ${props =>
      shade(0.2, props.theme.colors.secondText)};
    --color-third: ${props => props.theme.colors.third};
    --color-placeholder: ${props => props.theme.colors.placeholder};
    --color-danger: ${props => props.theme.colors.danger};
    --color-success: ${props => props.theme.colors.success};
    --color-danger-shade: ${props => shade(0.2, props.theme.colors.danger)};
    --color-success-shade: ${props => shade(0.2, props.theme.colors.success)};
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: var(--color-background);
    color: var(--color-text);
    -webkit-font-smoothing: antialiased;
    min-height: 100vh;
  }

  body, input, button, textarea {
    font-family: 'Roboto', serif;

  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
    font-family: 'Roboto', serif;
  }


  button {
    cursor: pointer;
  }
  li {
    list-style-type: none;
  }
`;
