// import withEditorCanvasCard from "@/hoc/withEditorCanvasCard";
// import { EditorCanvasCardType } from "@/lib/types";

// type Props = { data: EditorCanvasCardType };

// const EditorCanvasCardMany: React.FC<Props> = ({ data }) => {
//   return null;
// };

// EditorCanvasCardMany.displayName = "EditorCanvasCardMany";

// export default withEditorCanvasCard(EditorCanvasCardMany);

import { Badge } from "@/components/ui/badge";
import { EditorCanvasCardType } from "@/lib/types";
import { useEditor } from "@/providers/EditorProvider";
import { useMemo } from "react";
import { Position, useNodeId } from "reactflow";
import EditorCanvasIconHelper from "./EditorCanvasCardIconHepler";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEditCanvasCardStore } from "@/store/editCanvasStore";
import useTabStore from "@/store/tabStore";
import CustomBidirectionalHandle from "./CustomBidirectionalHandle";

type Props = {};

const EditorCanvasCardMany = ({ data }: { data: EditorCanvasCardType }) => {
  const { dispatch, state } = useEditor();
  const nodeId = useNodeId();
  const { setTab } = useTabStore();
  const cards = useEditCanvasCardStore((state) => state.cards);
  const logo = useMemo(() => {
    return <EditorCanvasIconHelper type={data.type} />;
  }, [data]);

  return (
    <>
      <CustomBidirectionalHandle
        type="target"
        position={Position.Left}
        style={{ zIndex: 100 }}
      />
      <Card
        onClick={(e) => {
          e.stopPropagation();
          const val = state.editor.elements.find((n) => n.id === nodeId);
          if (val) {
            dispatch({
              type: "SELECTED_ELEMENT",
              payload: {
                element: val,
              },
            });
            setTab("details");
          }
        }}
        className="relative max-w-[280px] dark:border-muted-foreground/70"
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <div>{logo}</div>
          <div>
            <CardTitle className="text-md">
              {cards[data.title]?.name ?? data.title}
            </CardTitle>
            <CardDescription>
              {/* <p className="text-xs text-muted-foreground/50">
                <b className="text-muted-foreground/80">ID: </b>
                {nodeId}
              </p> */}
              <p className="line-clamp-1">{data?.description}</p>
            </CardDescription>
          </div>
        </CardHeader>
        <Badge variant="secondary" className="absolute right-2 top-2">
          {data.type}
        </Badge>
        <div
          className={"absolute left-3 top-4 h-2 w-2 rounded-full bg-green-500"}
        ></div>
      </Card>
      {data.type === "Spring Cloud Gateway" && (
        <>
          <CustomBidirectionalHandle
            type="target"
            position={Position.Top}
            id="t"
          />
          <CustomBidirectionalHandle
            type="target"
            position={Position.Bottom}
            id="d"
          />
        </>
      )}
      <CustomBidirectionalHandle
        type="source"
        position={Position.Right}
        id="a"
      />
    </>
  );
};

export default EditorCanvasCardMany;
