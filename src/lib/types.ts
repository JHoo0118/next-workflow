import { ConnectionProviderProps } from "@/providers/ConnectionsProvider";
import { initialData } from "@/store/editCanvasStore";
import { z } from "zod";

export const EditUserProfileSchema = z.object({
  email: z.string().email("필수 항목입니다."),
  name: z.string().min(1, "필수 항목입니다."),
});

export const NewNodeFormSchema = z.object({
  key: z.string().min(1, "필수 항목입니다."),
  name: z.string().min(1, "필수 항목입니다."),
  description: z.string().min(1, "필수 항목입니다."),
});

export const WorkflowFormSchema = z.object({
  name: z.string().min(1, "필수 항목입니다."),
  description: z.string().min(1, "필수 항목입니다."),
});

export type Connection = {
  title: string;
  description: string;
  image: string;
  connectionKey: keyof ConnectionProviderProps;
  accessTokenKey?: string;
  alwaysTrue?: boolean;
  slackSpecial?: boolean;
};

export type EditorCanvasTypes = keyof typeof initialData;

export type EditorCanvasCardType = {
  title: string;
  description: string;
  completed: boolean;
  current: boolean;
  metadata: any;
  type: EditorCanvasTypes;
};

export type EditorNodeType = {
  id: string;
  type: EditorCanvasCardType["type"];
  position: {
    x: number;
    y: number;
  };
  data: EditorCanvasCardType;
};

export type EditorNode = EditorNodeType;

export type EditorActions =
  | {
      type: "LOAD_DATA";
      payload: {
        elements: EditorNode[];
        edges: {
          id: string;
          source: string;
          target: string;
        }[];
      };
    }
  | {
      type: "UPDATE_NODE";
      payload: {
        elements: EditorNode[];
      };
    }
  | { type: "REDO" }
  | { type: "UNDO" }
  | {
      type: "SELECTED_ELEMENT";
      payload: {
        element: EditorNode;
      };
    };

export const nodeMapper: Record<string, string> = {
  Notion: "notionNode",
  Slack: "slackNode",
  Discord: "discordNode",
  "Google Drive": "googleNode",
};
