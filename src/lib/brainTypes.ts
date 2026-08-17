export type BrainZone = 'pfc' | 'limbic' | 'hippocampus' | 'amygdala';

export type AppCategory = 'shortVideo' | 'messages' | 'search' | 'creative' | 'gaming' | 'other';

export type Symptom =
  | 'fog'
  | 'forgetful'
  | 'anxiety'
  | 'irritation'
  | 'gadgetFatigue'
  | 'stuckPhone'
  | 'noMotivation'
  | 'distracted';

export type BrainZoneState = {
  color: string;
  damage: number;
  label: string;
  status: string;
};

export type BrainState = {
  health: number;
  verdict: string;
  worstZone: BrainZone;
  zones: Record<BrainZone, BrainZoneState>;
};
