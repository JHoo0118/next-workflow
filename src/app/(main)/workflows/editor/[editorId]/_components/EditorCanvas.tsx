"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useNodeTypes } from "@/hooks/useNodeTypes";
import {
  EditorCanvasCardType,
  EditorCanvasTypes,
  EditorNodeType,
} from "@/lib/types";
import { useEditor } from "@/providers/EditorProvider";
import { useModal } from "@/providers/ModalProvider";
import { useEditCanvasNodeStore } from "@/store/editCanvasNodeStore";
import { Card, useEditCanvasCardStore } from "@/store/editCanvasStore";
import useTabStore from "@/store/tabStore";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MarkerType,
  NodeChange,
  ReactFlowInstance,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  reconnectEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 } from "uuid";
import { onGetNodesEdges } from "../../../_actions/WorkflowConnections";
import EditorCanvasCardMany from "./EditorCanvasCardMany";
import EditorCanvasCardSimple from "./EditorCanvasCardSimple";
import EditorCanvasCardSingleEnd from "./EditorCanvasCardSingleEnd";
import EditorCanvasCardSingleStart from "./EditorCanvasCardSingleStart";
import EditorCanvasSidebar from "./EditorCanvasSidebar";
import FlowInstance from "./FlowInstance";

type Props = {};

const initialNodes: EditorNodeType[] = [];

const initialEdges: { id: string; source: string; target: string }[] = [];

const EditorCanvas = (props: Props) => {
  const { dispatch, state } = useEditor();
  const { setOpen } = useModal();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [isWorkFlowLoading, setIsWorkFlowLoading] = useState<boolean>(false);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();
  const pathname = usePathname();
  const { cards, addCards } = useEditCanvasCardStore();
  const { setTab } = useTabStore();
  const nodeTypes = useNodeTypes();

  const { addNodeType, addNodeTypes } = useEditCanvasNodeStore();
  const specificNodeTypes = useEditCanvasNodeStore(
    (state) => state.specificNodeTypes
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      //@ts-ignore
      setNodes((nds) => applyNodeChanges(changes, nds));
    },
    [setNodes]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      //@ts-ignore
      setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) => {
        return addEdge(
          {
            ...params,
            markerEnd: { type: MarkerType.Arrow, width: 32, height: 32 },
          },
          eds
        );
      }),
    []
  );

  const onDrop = useCallback(
    (event: any) => {
      event.preventDefault();

      const type: EditorCanvasCardType["type"] = event.dataTransfer.getData(
        "application/reactflow"
      );

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      if (!(type in specificNodeTypes)) {
        if (cards[type]?.cardType) {
          if (cards[type]?.cardType === "Start") {
            addNodeType(type, EditorCanvasCardSingleStart);
          } else if (cards[type]?.cardType === "End") {
            addNodeType(type, EditorCanvasCardSingleEnd);
          } else if (cards[type]?.cardType === "Text") {
            addNodeType(type, EditorCanvasCardSimple);
          } else {
            addNodeType(type, EditorCanvasCardMany);
          }
        } else {
          addNodeType(type, EditorCanvasCardMany);
        }
      }

      // const triggerAlreadyExists = state.editor.elements.find(
      //   (node) => node.type === "Trigger"
      // );

      // if (type === "Trigger" && triggerAlreadyExists) {
      //   toast("Only one trigger can be added to automations at the moment");
      //   return;
      // }
      if (!reactFlowInstance) return;
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: v4(),
        type,
        position,
        data: {
          title: type,
          description: cards[type].description,
          completed: false,
          current: false,
          metadata: {},
          type: type,
        },
      };
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, cards, setOpen, addNodeType, specificNodeTypes]
  );

  const handleClickCanvas = () => {
    dispatch({
      type: "SELECTED_ELEMENT",
      payload: {
        element: {
          data: {
            completed: false,
            current: false,
            description: "",
            metadata: {},
            title: "",
            type: "Trigger",
          },
          id: "",
          position: { x: 0, y: 0 },
          type: "Trigger",
        },
      },
    });
    setTab("actions");
  };

  useEffect(() => {
    dispatch({ type: "LOAD_DATA", payload: { edges, elements: nodes } });
  }, [nodes, edges, dispatch]);

  const onGetWorkFlow = useCallback(async () => {
    setIsWorkFlowLoading(true);
    const response = await onGetNodesEdges(pathname.split("/").pop()!);
    if (response) {
      const nodes: any[] = JSON.parse(response.nodes!);
      const newCards: Record<string, Card> = {};
      const newNodes: Record<EditorCanvasTypes, React.FC<any>> = {};
      nodes.map((node) => {
        const { type } = node;
        if (!(type in cards)) {
          const {
            data: { title, type, description, componentType, cardType },
          } = node;
          const newCard: Card = {
            name: title,
            type,
            description,
            componentType,
            cardType,
          };
          newCards[type] = newCard;
          if (cardType === "Start") {
            newNodes[type] = EditorCanvasCardSingleStart;
          } else if (cardType === "End") {
            newNodes[type] = EditorCanvasCardSingleEnd;
          } else if (cardType === "Text") {
            newNodes[type] = EditorCanvasCardSimple;
          } else {
            newNodes[type] = EditorCanvasCardMany;
          }
        }
      });

      addCards(newCards);
      addNodeTypes(newNodes);
      setEdges(JSON.parse(response.edges!));
      setNodes(nodes);
      setIsWorkFlowLoading(false);
    }
    setIsWorkFlowLoading(false);
  }, [pathname]);

  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    []
  );

  useEffect(() => {
    onGetWorkFlow();
  }, [onGetWorkFlow]);

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel minSize={10} defaultSize={70}>
        <div className="flex h-full items-center justify-center">
          <div
            style={{ width: "100%", height: "100%", paddingBottom: "70px" }}
            className="relative"
          >
            {isWorkFlowLoading ? (
              <div className="absolute flex h-full w-full items-center justify-center">
                <svg
                  aria-hidden="true"
                  className="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <ReactFlow
                className="w-[300px]"
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodes={state.editor.elements}
                onNodesChange={onNodesChange}
                edges={edges}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onInit={setReactFlowInstance}
                fitView
                onClick={handleClickCanvas}
                onEdgeUpdate={onEdgeUpdate}
                nodeTypes={nodeTypes}
              >
                <Controls position="top-left" />
                {/* <MiniMap
                  position="bottom-left"
                  className="!bg-background"
                  zoomable
                  pannable
                /> */}
                <Background
                  //@ts-ignore
                  variant="dots"
                  gap={12}
                  size={1}
                />
              </ReactFlow>
            )}
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel
        minSize={10}
        defaultSize={40}
        className="relative sm:block"
      >
        {isWorkFlowLoading ? (
          <div className="absolute flex h-full w-full items-center justify-center">
            <svg
              aria-hidden="true"
              className="inline h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </div>
        ) : (
          <FlowInstance edges={edges} nodes={nodes}>
            <EditorCanvasSidebar nodes={nodes} />
          </FlowInstance>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default EditorCanvas;
