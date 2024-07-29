"use client";
import { EditorCanvasTypes } from "@/lib/types";
import {
  AppWindow,
  Box,
  Bus,
  Database,
  DoorOpen,
  HardDrive,
  Lock,
  MousePointerClickIcon,
  Network,
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
    case "Ingress Controller":
      return <DoorOpen className="flex-shrink-0" size={30} />;
    case "Eureka Discovery":
      return <SearchCheck className="flex-shrink-0" size={30} />;
    case "User Service":
    case "Keycloak":
      return <Lock className="flex-shrink-0" size={30} />;
    case "Subscription Service":
    case "Policy Service":
    case "Survey Service":
    case "Record Service":
    case "Admin Service":
    case "Audit Service":
    case "Statistics Service":
    case "Notification Service":
    case "AI Service":
      return <HardDrive className="flex-shrink-0" size={30} />;
    case "Kafka":
      return <Bus className="flex-shrink-0" size={30} />;
    case "Feign":
      return <Network className="flex-shrink-0" size={30} />;
    case "Trigger":
      return <MousePointerClickIcon className="flex-shrink-0" size={30} />;
    case "Database":
      return <Database className="flex-shrink-0" size={30} />;
    default:
      return <Box className="flex-shrink-0" size={30} />;
  }
};

export default EditorCanvasIconHelper;
