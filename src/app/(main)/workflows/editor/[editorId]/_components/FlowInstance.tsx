"use client";
import { Button } from "@/components/ui/button";
import { useNodeConnections } from "@/providers/ConnectionsProvider";
import { useEditCanvasCardStore } from "@/store/editCanvasStore";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  onCreateNodesEdges,
  onFlowPublish,
} from "../_actions/WorkflowConnections";

type Props = {
  children: React.ReactNode;
  edges: any[];
  nodes: any[];
};

const FlowInstance = ({ children, edges, nodes }: Props) => {
  const pathname = usePathname();
  const [isFlow, setIsFlow] = useState([]);
  const { nodeConnection } = useNodeConnections();
  const { cards } = useEditCanvasCardStore();
  const router = useRouter();

  const onFlowAutomation = useCallback(async () => {
    const pNodes = nodes.map((node) => {
      const key = node.type;
      node.data.title = cards[key].name;
      node.data["cardType"] = cards[key].cardType;
      node.data["componentType"] = cards[key].componentType;
      return node;
    });
    const flow = await onCreateNodesEdges(
      pathname.split("/").pop()!,
      JSON.stringify(pNodes),
      JSON.stringify(edges),
      JSON.stringify(isFlow)
    );
    if (flow) toast.message(flow.message);
  }, [edges, isFlow, nodes, pathname]);

  const onPublishWorkflow = useCallback(async () => {
    const response = await onFlowPublish(pathname.split("/").pop()!, true);
    if (response) toast.message(response);
  }, [pathname]);

  const onAutomateFlow = useCallback(async () => {
    const flows: any = [];
    const connectedEdges = edges.map((edge) => edge.target);
    connectedEdges.map((target) => {
      nodes.map((node) => {
        if (node.id === target) {
          flows.push(node.type);
        }
      });
    });

    setIsFlow(flows);
  }, [edges, nodes]);

  const onBack = () => {
    router.back();
  };

  useEffect(() => {
    onAutomateFlow();
  }, [edges, onAutomateFlow]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 p-4">
        <Button variant="secondary" onClick={onBack}>
          이전
        </Button>

        <Button onClick={onFlowAutomation} disabled={isFlow.length < 1}>
          저장
        </Button>
        {/* <Button disabled={isFlow.length < 1} onClick={onPublishWorkflow}>
          배포
        </Button> */}
      </div>
      {children}
    </div>
  );
};

export default FlowInstance;
