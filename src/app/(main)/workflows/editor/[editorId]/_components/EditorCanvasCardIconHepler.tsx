"use client";
import { EditorCanvasTypes } from "@/lib/types";
import {
  AppWindow,
  Bus,
  HardDrive,
  MousePointerClickIcon,
  Plus,
  SearchCheck,
  TabletSmartphone,
} from "lucide-react";

type Props = { type: EditorCanvasTypes };

const EditorCanvasIconHelper = ({ type }: Props) => {
  switch (type) {
    case "Web":
      return <AppWindow className="flex-shrink-0" size={30} />;
    case "App":
      return <TabletSmartphone className="flex-shrink-0" size={30} />;
    case "Spring Cloud Gateway":
      return <HardDrive className="flex-shrink-0" size={30} />;
    case "Custom Server":
      return <Plus className="flex-shrink-0" size={30} />;
    case "Eureka Discovery":
      return <SearchCheck className="flex-shrink-0" size={30} />;
    case "User Service":
      return <HardDrive className="flex-shrink-0" size={30} />;
    case "Kafka":
      return <Bus className="flex-shrink-0" size={20} />;
    case "Feign":
      return <Bus className="flex-shrink-0" size={20} />;
    case "Trigger":
      return <MousePointerClickIcon className="flex-shrink-0" size={30} />;
    default:
      return <HardDrive className="flex-shrink-0" size={30} />;
  }
};

export default EditorCanvasIconHelper;
