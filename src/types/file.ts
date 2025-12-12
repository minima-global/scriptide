type TFile = {
  name: string;
  isdir: boolean;
  isfile: boolean;
  location: string;
  _children?: TFile[];
};

export type { TFile };
