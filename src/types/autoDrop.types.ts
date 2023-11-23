type AutoDropInitState = null;

export type AutoDropGameState = {
  timestamp: number;
  dropTime: number;
  lockDelayCount: number;
};

export type AutoDropState = AutoDropInitState | AutoDropGameState;
