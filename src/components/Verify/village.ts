export interface District {
  id: string;
  name: string;
  lgdCode: string;
}

export interface SubDistrict {
  id: string;
  name: string;
  lgdCode: string;
}

export interface Village {
  id: string;
  name: string;
  lgdCode: string;
}

export interface Plot {
  surveyNumber: string;
  geometry?: any;
  [key: string]: any;
}

export interface VillageData {
  id: string;
  name: string;
  lgdCode: string;
  plots: Plot[];
  villageBoundary?: any;
  villageBoundary2?: any;
  AiPLots?: any;
}

export interface VerificationStatus {
  name?: string;
  status: 'correct' | 'incorrect' | 'Not Verified' | null;
}

export interface PlotCount {
  totalPlots: number;
  verifiedPlots: number;
  mandatoryPlots: number;
}

export type FeedbackType = 'correct' | 'incorrect' | null;
