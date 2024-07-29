import { useEditor } from "@/providers/EditorProvider";
import { CSSProperties } from "react";
import { Handle, HandleProps } from "reactflow";

type Props = HandleProps & { style?: CSSProperties };

const selector = (s: any) => ({
  nodeInternals: s.nodeInternals,
  edges: s.edges,
});

const CustomBidirectionalHandle = (props: Props) => {
  const { state } = useEditor();

  return (
    <>
      <Handle
        {...props}
        type="target"
        className="!-bottom-2 !h-4 !w-4 !bg-neutral-400 dark:!bg-neutral-800"
        isValidConnection={() => true}
      />
      <Handle
        {...props}
        type="source"
        className="!-bottom-2 !h-4 !w-4 !bg-neutral-400 dark:!bg-neutral-800"
        isValidConnection={() => true}
      />
    </>
  );
};

export default CustomBidirectionalHandle;
