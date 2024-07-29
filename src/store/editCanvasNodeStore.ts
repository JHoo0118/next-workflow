import EditorCanvasCardMany from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardMany";
import EditorCanvasCardSimple from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardSimple";
import EditorCanvasCardSingleEnd from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardSingleEnd";
import EditorCanvasCardSingleStart from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardSingleStart";
import EditorCanvasCardText from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardText";
import { EditorCanvasTypes } from "@/lib/types";
import { create } from "zustand";

interface EditorCanvasNodeStore {
  specificNodeTypes: Record<EditorCanvasTypes, React.FC<any>>;
  addNodeType: (type: EditorCanvasTypes, component: React.FC<any>) => void;
  addNodeTypes: (
    newNodeTypes: Record<EditorCanvasTypes, React.FC<any>>
  ) => void;
}

export const useEditCanvasNodeStore = create<EditorCanvasNodeStore>((set) => ({
  specificNodeTypes: {
    Web: EditorCanvasCardSingleStart,
    App: EditorCanvasCardSingleStart,
    Trigger: EditorCanvasCardSingleStart,
    "Spring Cloud Gateway": EditorCanvasCardMany,
    "Eureka Discovery": EditorCanvasCardMany,
    "User Service": EditorCanvasCardMany,
    "Policy Service": EditorCanvasCardMany,
    "Survey Service": EditorCanvasCardMany,
    "Record Service": EditorCanvasCardMany,
    "Admin Service": EditorCanvasCardMany,
    "Audit Service": EditorCanvasCardMany,
    "Statistics Service": EditorCanvasCardMany,
    "Subscription Service": EditorCanvasCardMany,
    "Notification Service": EditorCanvasCardMany,
    "AI Service": EditorCanvasCardMany,
    "Ingress Controller": EditorCanvasCardMany,
    Feign: EditorCanvasCardText,
    Kafka: EditorCanvasCardText,
    Keycloak: EditorCanvasCardSimple,
    Database: EditorCanvasCardSingleEnd,
  },
  addNodeType: (type, component) =>
    set((state) => ({
      specificNodeTypes: {
        ...state.specificNodeTypes,
        [type]: component,
      },
    })),
  addNodeTypes: (newNodeTypes) =>
    set((state) => ({
      specificNodeTypes: {
        ...state.specificNodeTypes,
        ...newNodeTypes,
      },
    })),
}));
