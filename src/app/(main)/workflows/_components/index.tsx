import { onGetWorkflows } from "../_actions/WorkflowConnections";
import Workflow from "./Workflow";

type Props = {};

const Workflows = async (props: Props) => {
  const workflows = await onGetWorkflows();
  return (
    <section className="relative flex flex-col gap-4 p-4">
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {workflows?.length ? (
          workflows.map((flow: any) => <Workflow key={flow.id} {...flow} />)
        ) : (
          <div className="mt-28 flex text-muted-foreground items-center justify-center">
            등록된 워크플로가 없습니다.
          </div>
        )}
      </div>
    </section>
    // <div className="relative flex flex-col gap-4">
    //   <section className="flex flex-col m-2">
    //     {workflows?.length ? (
    //       workflows.map((flow: any) => <Workflow key={flow.id} {...flow} />)
    //     ) : (
    //       <div className="mt-28 flex text-muted-foreground items-center justify-center">
    //         등록된 워크플로가 없습니다.
    //       </div>
    //     )}
    //   </section>
    // </div>
  );
};

export default Workflows;
