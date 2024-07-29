import { create } from "zustand";

export type Card = {
  name: string;
  description: string;
  type: EditCanvasCardType;
  componentType: EditCanvasCardComponentType;
  cardType?: EditCanvasCardCardType;
};

type CardsState = {
  cards: Record<string, Card>;
  filteredCards: Record<EditCanvasCardComponentType, Record<string, Card>>;
  addCard: (key: string, card: Card) => void;
  addCards: (newCards: Record<string, any>) => void;
  updateCard: (key: string, card: Partial<Card>) => void;
  deleteCard: (key: string) => void;
  filterCards: () => void;
};

export const initialData: Record<string, Card> = {
  Web: {
    name: "웹",
    description: "웹 클라이언트입니다.",
    type: "Trigger",
    componentType: "Client",
  },
  App: {
    name: "앱",
    description: "앱 클라이언트입니다.",
    type: "Trigger",
    componentType: "Client",
  },
  "Eureka Discovery": {
    name: "Eureka Discovery",
    description:
      "Eureka Discovery 서버로 서비스 등록, 서비스 검색 등의 일을 수행합니다.",
    type: "Action",
    componentType: "Server",
  },
  "Spring Cloud Gateway": {
    name: "Spring Cloud Gateway",
    description:
      "Spring Cloud Gateway는 라우팅, 필터링, 로드 밸런싱의 등의 일을 수행하며, 인증 및 권한 부여 등의 보안 기능을 제공합니다.",
    type: "Action",
    componentType: "Server",
  },
  "Ingress Controller": {
    name: "Ingress Controller",
    description: "Ingress Controller로 nginx를 사용합니다.",
    type: "Action",
    componentType: "Server",
  },
  "User Service": {
    name: "사용자 인증 서비스",
    description: "사용자 인증 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Subscription Service": {
    name: "구독 서비스",
    description: "구독 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Survey Service": {
    name: "만족도/불편사항 관리 서비스",
    description: "만족도/불편사항 관리 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Policy Service": {
    name: "정책 서비스",
    description: "정책 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Record Service": {
    name: "이력 관리 서비스",
    description: "이력 관리 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Audit Service": {
    name: "정보 변경 관리 서비스",
    description: "정보 변경 관리 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Statistics Service": {
    name: "통계 관리 서비스",
    description: "통계 관리 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Admin Service": {
    name: "플랫폼 운영 관리 서비스",
    description: "플랫폼 운영 관리 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "Notification Service": {
    name: "알림 서비스",
    description: "알림 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  "AI Service": {
    name: "AI 서비스",
    description: "AI 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  Feign: {
    name: "Feign",
    description:
      "Feign Client는 마이크로서비스 간의 통신을 쉽게 만들어주는 HTTP 클라이언트 바인더입니다.",
    type: "Method",
    componentType: "Etc",
  },
  Kafka: {
    name: "Kafka",
    description:
      "Kafka는 고성능 메시징 시스템으로, 마이크로서비스 간의 비동기 통신을 지원합니다. 이를 통해 서비스 간의 의존성을 줄이고, 느슨하게 결합된 아키텍처를 구현할 수 있습니다. 또한, 서비스 간의 이벤트를 실시간으로 전송하고 처리할 수 있습니다.",
    type: "Method",
    componentType: "Etc",
  },
  Keycloak: {
    name: "Keycloak",
    description: "Keycloak입니다.",
    type: "Method",
    componentType: "Etc",
  },
  Database: {
    name: "Database",
    description: "데이터베이스입니다.",
    type: "Database",
    componentType: "Etc",
  },
};

const filterCardsByComponentType = (cards: Record<string, Card>) => {
  return Object.keys(cards).reduce((acc, key) => {
    const card = cards[key];
    if (!acc[card.componentType]) {
      acc[card.componentType] = {};
    }
    acc[card.componentType][key] = card;
    return acc;
  }, {} as Record<string, Record<string, Card>>);
};

export type EditCanvasCardType = "Trigger" | "Action" | "Method" | "Database";
export type EditCanvasCardComponentType = "Server" | "Client" | "Etc";
export type EditCanvasCardCardType = "Start" | "End" | "Many" | "Text";

export const editCanvasCardComponents: EditCanvasCardComponentType[] = [
  "Client",
  "Server",
  "Etc",
];

export const useEditCanvasCardStore = create<CardsState>((set) => ({
  cards: initialData,
  filteredCards: filterCardsByComponentType(initialData),
  addCard: (key, card) =>
    set((state) => {
      const updatedCards = { ...state.cards, [key]: card };
      return {
        cards: updatedCards,
        filteredCards: filterCardsByComponentType(updatedCards),
      };
    }),
  addCards: (newCards) =>
    set((state) => {
      const updatedCards = { ...state.cards, ...newCards };
      return {
        cards: updatedCards,
        filteredCards: filterCardsByComponentType(updatedCards),
      };
    }),
  updateCard: (key, card) =>
    set((state) => {
      if (!state.cards[key]) return state;
      const updatedCard = { ...state.cards[key], ...card };
      const updatedCards = { ...state.cards, [key]: updatedCard };
      return {
        cards: updatedCards,
        filteredCards: filterCardsByComponentType(updatedCards),
      };
    }),
  deleteCard: (key) =>
    set((state) => {
      const { [key]: _, ...updatedCards } = state.cards;
      return {
        cards: updatedCards,
        filteredCards: filterCardsByComponentType(updatedCards),
      };
    }),
  filterCards: () =>
    set((state) => {
      const filtered = filterCardsByComponentType(state.cards);
      return { filteredCards: filtered };
    }),
}));
