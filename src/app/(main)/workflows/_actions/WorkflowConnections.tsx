"use server";
import { db } from "@/lib/db";

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  const published = await db.workflows.update({
    where: {
      id: workflowId,
    },
    data: {
      publish: state,
    },
  });
  if (published.publish) return "워크플로가 배포되었습니다.";
  return "워크플로 배포에 실패했습니다.";
};

export const onGetWorkflows = async () => {
  const workflow = await db.workflows.findMany();

  if (workflow) return workflow;
  // }
  return [];
};

export const onCreateWorkflow = async (name: string, description: string) => {
  // const user = await currentUser();

  // if (user) {

  const workflow = await db.workflows.create({
    data: {
      // userId: user.id,
      name,
      description,
    },
  });

  if (workflow) return { message: "워크플로가 생성되었습니다." };
  return { message: "워크플로 생성에 실패했습니다." };
  // }
};

export const onGetNodesEdges = async (flowId: string) => {
  const nodesEdges = await db.workflows.findUnique({
    where: {
      id: flowId,
    },
    select: {
      nodes: true,
      edges: true,
    },
  });
  if (nodesEdges?.nodes && nodesEdges?.edges) return nodesEdges;
};
