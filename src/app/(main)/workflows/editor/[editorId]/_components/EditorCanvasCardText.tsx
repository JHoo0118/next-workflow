import { EditorCanvasCardType } from "@/lib/types";
import { useEditor } from "@/providers/EditorProvider";
import { useMemo } from "react";
import { useNodeId } from "reactflow";
import EditorCanvasIconHelper from "./EditorCanvasCardIconHepler";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useEditCanvasCardStore } from "@/store/editCanvasStore";
import useTabStore from "@/store/tabStore";

type Props = {};

const EditorCanvasCardText = ({ data }: { data: EditorCanvasCardType }) => {
  const { dispatch, state } = useEditor();
  const { setTab } = useTabStore();
  const { cards } = useEditCanvasCardStore();
  const nodeId = useNodeId();
  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type={data.type} />;
  }, [data]);

  return (
    <>
      <Card
        onClick={(e) => {
          e.stopPropagation();
          const val = state.editor.elements.find((n) => n.id === nodeId);
          if (val)
            dispatch({
              type: "SELECTED_ELEMENT",
              payload: {
                element: val,
              },
            });
          setTab("details");
        }}
        className="relative max-w-[120px] border-0 shadow-none bg-transparent"
      >
        <CardHeader className="flex space-x-0 space-y-0 p-2 flex-row items-center gap-2">
          <div>{logo}</div>
          <div>
            <CardTitle className="text-sm">
              {cards[data.title]?.name ?? data.title}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default EditorCanvasCardText;
