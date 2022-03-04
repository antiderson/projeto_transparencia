import React, { useEffect, useState } from "react";

import ReactFlow, { Controls, MiniMap } from "react-flow-renderer";

import { FiMaximize, FiMinimize } from "react-icons/fi";
import { FlowContainer, FullScreen } from "./styles";
import ContainerBlue from "../ContainerBlue";
import SecretariaNode from "./Custom/SecretariaNode";
import { getLayoutedElements } from "./utils/getLayoutedElements";
import { getElements } from "./utils/getElements";
import LoaderPage from "../LoaderPage";

const nodeTypes = {
  secNode: SecretariaNode,
};

interface FlowProps {
  elements: any[];
}

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

const Flow: React.FC<FlowProps> = ({ elements }) => {
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formattedElements, setFormattedElements] = useState<any[]>([]);

  useEffect(() => {
    const elementsFiltered = elements.filter(
      (element: OrgonogramaProps) => element.IDTIPOSETOR !== 9,
    );
    setFormattedElements(getLayoutedElements(getElements(elementsFiltered)));

    setLoading(false);
  }, [elements]);

  return (
    <>
      <LoaderPage loading={loading} />
      {formattedElements.length > 0 && (
        <ContainerBlue fullScreen={fullScreen}>
          <FlowContainer>
            <ReactFlow
              minZoom={0.005}
              defaultZoom={0.1}
              elements={formattedElements}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              selectNodesOnDrag={false}
              nodeTypes={nodeTypes}
            >
              <Controls showInteractive={false} />
              <FullScreen onClick={() => setFullScreen(!fullScreen)}>
                {!fullScreen ? (
                  <>
                    Tela Cheia
                    <FiMaximize />
                  </>
                ) : (
                  <>
                    Tela Normal
                    <FiMinimize />
                  </>
                )}
              </FullScreen>
            </ReactFlow>
          </FlowContainer>
        </ContainerBlue>
      )}
    </>
  );
};

export default Flow;
