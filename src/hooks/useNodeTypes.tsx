import EditorCanvasCardMany from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardMany";
import { useEditCanvasNodeStore } from "@/store/editCanvasNodeStore";
import { useMemo } from "react";
import { NodeTypes } from "reactflow";

export const useNodeTypes = (): NodeTypes => {
  const specificNodeTypes = useEditCanvasNodeStore(
    (state) => state.specificNodeTypes
  );

  return useMemo<NodeTypes>(() => {
    const allNodeTypes: Record<string, React.FC<any>> = {};

    Object.keys(specificNodeTypes).forEach((key) => {
      allNodeTypes[key] = specificNodeTypes[key];
    });

    return new Proxy(allNodeTypes, {
      get: (target, prop: string) => {
        if (prop in target) {
          return target[prop];
        }
        return EditorCanvasCardMany;
      },
    }) as NodeTypes;
  }, [specificNodeTypes]);
};
