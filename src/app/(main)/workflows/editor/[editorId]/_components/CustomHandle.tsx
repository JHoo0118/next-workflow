import { useEditor } from "@/providers/EditorProvider";
import { CSSProperties } from "react";
import { Handle, HandleProps } from "reactflow";

type Props = HandleProps & { style?: CSSProperties; handleState?: HandleState };

export type HandleState = "single" | "many";

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomHandle = (props: Props) => {
  const { handleState, ...restProps } = props;
  const { state } = useEditor();

  return (
    <Handle
      {...restProps}
      isValidConnection={(e) => {
        const sourcesFromHandleInState = state.editor.edges.filter(
          (edge) => edge.source === e.source
        ).length;
        const sourceNode = state.editor.elements.find(
          (node) => node.id === e.source
        );
        //target
        const targetFromHandleInState = state.editor.edges.filter(
          (edge) => edge.target === e.target
        ).length;

        if (handleState === "many") {
          return true;
        }

        if (targetFromHandleInState === 1) {
          return false;
        }

        if (handleState === "single") {
          return sourcesFromHandleInState < 1;
        }

        return !handleState;
      }}
      className="!-bottom-2 !h-4 !w-4 dark:bg-neutral-800"
    />
  );
};

export default CustomHandle;
