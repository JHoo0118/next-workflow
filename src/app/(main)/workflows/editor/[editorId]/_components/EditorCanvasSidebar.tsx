"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditorCanvasTypes, EditorNodeType } from "@/lib/types";
import { useEditor } from "@/providers/EditorProvider";

import CustomModal from "@/components/global/CustomModal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { mappingComponentTypeName } from "@/lib/constant";
import { onDragStart } from "@/lib/editorUtils";
import { useNodeConnections } from "@/providers/ConnectionsProvider";
import { useModal } from "@/providers/ModalProvider";
import {
  editCanvasCardComponents,
  useEditCanvasCardStore,
} from "@/store/editCanvasStore";
import useTabStore from "@/store/tabStore";
import { Plus } from "lucide-react";
import EditorCanvasIconHelper from "./EditorCanvasCardIconHepler";
import NewNodeForm from "./NewNodeForm";

type Props = {
  nodes: EditorNodeType[];
};

const EditorCanvasSidebar = ({ nodes }: Props) => {
  const { state } = useEditor();
  const { nodeConnection } = useNodeConnections();
  const { filteredCards } = useEditCanvasCardStore();
  const { tab, setTab } = useTabStore();
  const { setOpen } = useModal();

  return (
    <aside>
      <Tabs
        defaultValue="actions"
        value={tab}
        className="h-screen overflow-scroll pb-24"
      >
        <TabsList className="bg-transparent">
          <TabsTrigger value="actions" onClick={() => setTab("actions")}>
            액션
          </TabsTrigger>
          <TabsTrigger value="details" onClick={() => setTab("details")}>
            상세
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="actions" className="flex flex-col gap-4 p-4">
          <Button
            variant="ghost"
            onClick={() => {
              setOpen(
                <CustomModal
                  title="사용자 정의 노드 만들기"
                  subheading="노드 이름과 설명을 작성해 주세요."
                  size="h-[34rem]"
                >
                  <NewNodeForm />
                </CustomModal>
              );
            }}
          >
            <Plus className="mr-2" />
            노드 추가하기
          </Button>
          {editCanvasCardComponents.map((componentType) => (
            <>
              <h3>{mappingComponentTypeName[componentType]}</h3>
              {Object.entries(filteredCards[componentType]).map(
                ([cardKey, cardValue]) => (
                  <Card
                    key={cardKey}
                    draggable
                    className="w-full cursor-grab border-black bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900"
                    onDragStart={(event) =>
                      onDragStart(event, cardKey as EditorCanvasTypes)
                    }
                  >
                    <CardHeader className="flex flex-row items-center gap-4 p-4">
                      <EditorCanvasIconHelper
                        type={cardKey as EditorCanvasTypes}
                      />
                      <CardTitle className="text-md">
                        {/* {cardKey} */}
                        {filteredCards[componentType][cardKey].name}
                        <CardDescription className="line-clamp-5">
                          {cardValue.description}
                        </CardDescription>
                      </CardTitle>
                    </CardHeader>
                  </Card>
                )
              )}
              <Separator />
            </>
          ))}
        </TabsContent>
        <TabsContent value="details" className="-mt-6">
          <div className="px-2 py-4 text-center text-xl font-bold">
            {state.editor.selectedNode.data.title}

            <p className="text-xs text-muted-foreground/50">
              {state.editor.selectedNode.id}
            </p>
          </div>
          <div className="px-3">
            <h3>{state.editor.selectedNode.data.description}</h3>
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
};

export default EditorCanvasSidebar;
