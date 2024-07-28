import EditorProvider from "@/providers/EditorProvider";
import EditorCanvas from "./[editorId]/_components/EditorCanvas";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="h-full">
      <EditorProvider>
        <EditorCanvas />
      </EditorProvider>
    </div>
  );
};

export default Page;
