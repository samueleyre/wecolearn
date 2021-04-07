export interface StatsInterface {
  global: {
    conversations: number;
    people: number;
    averageConversation: number;
  };
  lastWeek: {
    conversations: number;
    people: number;
  };
}
