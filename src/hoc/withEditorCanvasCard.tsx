import CustomHandle from "@/app/(main)/workflows/editor/[editorId]/_components/CustomHandle";
import EditorCanvasIconHelper from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardIconHepler";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditorCanvasCardType } from "@/lib/types";
import { useEditor } from "@/providers/EditorProvider";
import { useEditCanvasCardStore } from "@/store/editCanvasStore";
import useTabStore from "@/store/tabStore";
import React, { useMemo } from "react";
import { Position, useNodeId } from "reactflow";

const withEditorCanvasCard = (
  Component: React.FC<{ data: EditorCanvasCardType }>
) => {
  const WrappedComponent: React.FC<{ data: EditorCanvasCardType }> = ({
    data,
  }) => {
    const { dispatch, state } = useEditor();
    const { setTab } = useTabStore();
    const { cards } = useEditCanvasCardStore();
    const nodeId = useNodeId();
    const logo = useMemo(() => {
      return <EditorCanvasIconHelper type={data.type} />;
    }, [data]);

    const handleClick = (e: React.MouseEvent) => {
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
    };

    return (
      <>
        {data.type !== "Trigger" && data.type !== "Web" && (
          <CustomHandle
            type="target"
            position={Position.Left}
            style={{ zIndex: 100 }}
          />
        )}
        <Card
          onClick={handleClick}
          className="relative max-w-[280px] dark:border-muted-foreground/70"
        >
          <CardHeader className="flex flex-row items-center gap-4">
            <div>{logo}</div>
            <div>
              <CardTitle className="text-md line-clamp-1">
                {cards[data.title].name}
              </CardTitle>
              <CardDescription>
                <p className="text-xs text-muted-foreground/50">
                  <b className="text-muted-foreground/80">ID: </b>
                  {nodeId}
                </p>
                <p className="line-clamp-1">{data.description}</p>
              </CardDescription>
            </div>
          </CardHeader>
          <Badge variant="secondary" className="absolute right-2 top-2">
            {data.type}
          </Badge>
          <div
            className={
              "absolute left-3 top-4 h-2 w-2 rounded-full bg-green-500"
            }
          ></div>
        </Card>
        {/* {data.type !== "Eureka Discovery" && ( */}
        <CustomHandle
          type="source"
          position={Position.Right}
          id="a"
          handleState="many"
        />
        {/* )} */}
      </>
    );
  };

  WrappedComponent.displayName = `withEditorCanvasCard(${
    Component.displayName || Component.name || "Component"
  })`;

  return WrappedComponent;
};

export default withEditorCanvasCard;
