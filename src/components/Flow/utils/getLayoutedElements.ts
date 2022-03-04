/* eslint-disable no-bitwise */
/* eslint-disable radix */
/* eslint-disable no-param-reassign */
import { isNode, Elements, Position } from "react-flow-renderer";
import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 350;
const nodeHeight = 150;

export const getLayoutedElements = (elements: Elements): Elements => {
  dagreGraph.setGraph({ rankdir: "LR" });

  elements.forEach(el => {
    if (el) {
      if (isNode(el)) {
        dagreGraph.setNode(el.id, {
          width: nodeWidth,
          height: nodeHeight + 50,
        });
      } else {
        dagreGraph.setEdge(el.source, el.target);
      }
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el, index) => {
    if (el) {
      if (isNode(el)) {
        let aux = 0;
        if (index & 1) {
          aux = -1;
        } else {
          aux = 1;
        }
        const nodeWithPosition = dagreGraph.node(el.id);
        el.targetPosition = Position.Left;
        el.sourcePosition = Position.Right;
        el.position = {
          x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
          y: nodeWithPosition.y - nodeHeight / 2,
        };
      }
    }

    return el;
  });
};
