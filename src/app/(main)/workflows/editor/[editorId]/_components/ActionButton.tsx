import { ConnectionProviderProps } from "@/providers/ConnectionsProvider";
import { usePathname } from "next/navigation";
import { Option } from "./ContentBasedOnTitle";

type Props = {
  currentService: string;
  nodeConnection: ConnectionProviderProps;
  channels?: Option[];
  setChannels?: (value: Option[]) => void;
};

const ActionButton = ({
  currentService,
  nodeConnection,
  channels,
  setChannels,
}: Props) => {
  const pathname = usePathname();

  const renderActionButton = () => {
    return "TEST BUTTON";
  };
  return renderActionButton();
};

export default ActionButton;
