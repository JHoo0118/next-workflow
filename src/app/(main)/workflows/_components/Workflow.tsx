import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ContainerIcon, MemoryStick, WorkflowIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { onFlowPublish } from "../editor/[editorId]/_actions/WorkflowConnections";
// import { onFlowPublish } from '../_actions/workflow-connections'

type Props = {
  name: string;
  description: string;
  id: string;
  publish: boolean | null;
};

const Workflow = ({ description, id, name, publish }: Props) => {
  const onPublishFlow = async (event: any) => {
    const response = await onFlowPublish(
      id,
      event.target.ariaChecked === "false"
    );
    if (response) toast.message(response);
  };

  return (
    <Link href={`/workflows/editor/${id}`}>
      <Card className="flex w-full items-center justify-between">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex flex-row gap-2">
            <WorkflowIcon className="flex-shrink-0" size={30} />
            <ContainerIcon className="flex-shrink-0" size={30} />
            <MemoryStick className="flex-shrink-0" size={30} />
          </div>
          <div className="">
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        {/* <div className="flex flex-col items-center gap-2 p-4">
        <Label htmlFor="airplane-mode" className="text-muted-foreground">
          {publish! ? "On" : "Off"}
        </Label>
         <Switch
          id="airplane-mode"
          onClick={onPublishFlow}
          defaultChecked={publish!}
        />
      </div> */}
      </Card>
    </Link>
  );
};

export default Workflow;
