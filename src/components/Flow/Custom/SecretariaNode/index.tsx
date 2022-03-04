import React, { FC, memo } from "react";

import { Handle, Position, NodeProps } from "react-flow-renderer";

import { FiHome, FiUser } from "react-icons/fi";
import { Container } from "./styles";

interface SecretariaNodeProps extends NodeProps {
  data: any;
}

const SecretariaNode: FC<SecretariaNodeProps> = ({ data }) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#555" }}
      />
      <Container>
        <div className="title">
          <FiHome />
          {data.title}
        </div>
        {data.name && (
          <div className="name">
            <FiUser />
            {data.name}
          </div>
        )}
      </Container>
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#555" }}
      />
    </>
  );
};

export default memo(SecretariaNode);
