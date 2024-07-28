import EditorCanvasCardMany from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardMany";
import EditorCanvasCardSimple from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardSimple";
import EditorCanvasCardSingle from "@/app/(main)/workflows/editor/[editorId]/_components/EditorCanvasCardSingle";
import { EditorCanvasTypes } from "@/lib/types";
import { create } from "zustand";

interface EditorCanvasNodeStore {
  specificNodeTypes: Record<EditorCanvasTypes, React.FC<any>>;
  addNodeType: (type: EditorCanvasTypes, component: React.FC<any>) => void;
}

export const useEditCanvasNodeStore = create<EditorCanvasNodeStore>((set) => ({
  specificNodeTypes: {
    Web: EditorCanvasCardSingle,
    App: EditorCanvasCardSingle,
    Trigger: EditorCanvasCardSingle,
    "Spring Cloud Gateway": EditorCanvasCardMany,
    "Custom Server": EditorCanvasCardMany,
    "Eureka Discovery": EditorCanvasCardMany,
    "User Service": EditorCanvasCardMany,
    Feign: EditorCanvasCardSimple,
    Kafka: EditorCanvasCardSimple,
  },
  addNodeType: (type, component) =>
    set((state) => ({
      specificNodeTypes: {
        ...state.specificNodeTypes,
        [type]: component,
      },
    })),
}));
