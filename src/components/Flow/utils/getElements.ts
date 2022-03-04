/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { Elements } from "react-flow-renderer";
import SecretariaNode from "../Custom/SecretariaNode";

interface OrgonogramaProps {
  HIERARQUIA: string;
  IDSETOR: number;
  IDSETORPAI: number;
  NIVEL: number;
  NMSETOR: string;
  DSENDERECO: string;
  NRTELEFONE: string;
  IDTIPOSETOR: number;
  HORARIOFUNCIONAMENTO: string;
  RESPONSAVEL: string;
}

const customStyles = {
  main: {
    display: "flex",
    border: "1px solid #0F4780",
    color: "#0F4780",
    padding: "8px",
    fontSize: "24px",
    width: "auto",
    maxWidth: "350px",
  },
  primary: {
    display: "flex",
    border: "1px solid #0F4780",
    background: "var(--color-background)",
    padding: "8px",
    fontSize: "18px",
    width: "auto",
    maxWidth: "350px",
    maxHeight: "150px",
    borderRadius: "8px",
  },
  secretaria: SecretariaNode,
};

export function getElements(elements: OrgonogramaProps[]): Elements {
  const nodes = elements.map((element: OrgonogramaProps) => {
    if (element) {
      return {
        id: `${element.IDSETOR}`,
        type: "secNode",
        data: { title: element.NMSETOR, name: element.RESPONSAVEL },
        style: customStyles.primary,
      };
    }
  });
  const elementsWithoutSetorPai = elements.filter(item => item.IDSETORPAI);
  const edges = elementsWithoutSetorPai.map((element: OrgonogramaProps) => {
    if (element.IDSETORPAI) {
      return {
        id: `e${element.IDSETORPAI}-${element.IDSETOR}`,
        source: `${element.IDSETORPAI}`,
        target: `${element.IDSETOR}`,
        type: "smoothstep",
      };
    }
  });

  const finalElements = [...nodes, ...edges] as Elements;

  return finalElements;
}
