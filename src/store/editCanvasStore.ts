import { create } from "zustand";

export type Card = {
  name: string;
  description: string;
  type: EditCanvasCardType;
  componentType: EditCanvasCardComponentType;
  order?: number;
};

type CardsState = {
  cards: Record<string, Card>;
  filteredCards: Record<EditCanvasCardComponentType, Record<string, Card>>;
  addCard: (key: string, card: Card) => void;
  addCards: (newCards: Record<string, Card>) => void;
  updateCard: (key: string, card: Partial<Card>) => void;
  deleteCard: (key: string) => void;
  filterCards: () => void;
};

export const CustomServer: Record<string, Card> = {
  "Custom Server": {
    name: "사용자 정의 서버",
    description: "사용자 정의 모듈",
    type: "Action",
    componentType: "Server",
    order: 99999,
  },
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
  "User Service": {
    name: "사용자 서비스",
    description: "사용자 서비스 모듈",
    type: "Action",
    componentType: "Server",
  },
  ...CustomServer,
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

export type EditCanvasCardType = "Trigger" | "Action" | "Method";
export type EditCanvasCardComponentType = "Server" | "Client" | "Etc";

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
      const sortedCards = Object.keys(updatedCards)
        .sort(
          (a, b) => (updatedCards[a].order ?? 0) - (updatedCards[b].order ?? 0)
        )
        .reduce((acc, key) => {
          acc[key] = updatedCards[key];
          return acc;
        }, {} as Record<string, Card>);

      return {
        cards: sortedCards,
        filteredCards: filterCardsByComponentType(sortedCards),
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
