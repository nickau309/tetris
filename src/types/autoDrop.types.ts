export type AutoDropInitState = {
  timestamp: null;
  dropTime: null;
  lockDelayCount: 0;
};

export type AutoDropGameState = {
  timestamp: number;
  dropTime: number;
  lockDelayCount: number;
};
