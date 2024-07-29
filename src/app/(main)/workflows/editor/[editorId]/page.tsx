import { ConnectionsProvider } from "@/providers/ConnectionsProvider";
import EditorProvider from "@/providers/EditorProvider";
import EditorCanvas from "./_components/EditorCanvas";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <ConnectionsProvider>
          <EditorCanvas />
        </ConnectionsProvider>
      </EditorProvider>
    </div>
  );
};

export default Page;
