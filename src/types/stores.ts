// Import types
import { TFile } from './file';
import { EModalTypes } from './modal-types';

// ============================================================== //
// Store interfaces --------------------------------------------- //
// ============================================================== //
interface IConsoleStore {
  consoleOutput: string;
  setConsoleOutput: (consoleOutput: string) => void;

  extendConsoleOut: (newOutput: string) => void;
  clearConsoleOut: () => void;
}
interface IDeploymentStore {
  deployedScripts: TScript[];
  setDeployedScripts: (scripts: TScript[]) => void;

  getAllScripts: () => Promise<void>;
  getScript: (address: string) => Promise<void>;
  deployScript: (
    script: string,
    trackall: boolean,
    clean: boolean
  ) => Promise<void>;
  removeScript: (address: string) => Promise<void>;
}
interface IEditorStore {
  code: TCode;
  setCode: (code: TCode) => void;

  allCodes: TAllCodes[];
  setAllCodes: (allCodes: TAllCodes[]) => void;

  tabIndex: number;
  setTabIndex: (tabIndex: number) => void;

  addCode: (file: string, code: TCode, isImg: boolean) => void;
  updateCode: (file: string, code: TCode) => void;
  removeCode: (file: string) => void;
  removeFolderCodes: (file: string) => void;

  editorZoom: number;
  setEditorZoom: (editorZoom: number) => void;
  editorZoomIn: () => void;
  editorZoomOut: () => void;

  editorAutoSave: boolean;
  setEditorAutoSave: (editorAutoSave: boolean) => void;
  toggleEditorAutoSave: () => void;
}
interface IFileStore {
  files: TFile[];
  setFiles: (files: TFile[]) => void;
  allFiles: TFile[];
  setAllFiles: (files: TFile[]) => void;

  refreshFiles: (workspace: string, loader?: boolean) => Promise<void>;
  addFile: (path: string, data?: string) => Promise<void>;
  addFolder: (path: string) => Promise<void>;
  renameFile: (path: string, newPath: string) => Promise<void>;
  saveFile: (path: string, data: string) => Promise<void>;
  loadFile: (path: string) => Promise<void>;
  deleteFile: (path: string) => Promise<void>;
  deleteAllFiles: () => Promise<void>;
  deleteFolder: (path: string) => Promise<void>;

  currentFile: TCurrentFile;
  setCurrentFile: (file: TCurrentFile) => void;
  currentFolder: TCurrentFile;
  setCurrentFolder: (folder: TCurrentFile) => void;

  isLoadingFiles: boolean;
  setIsLoadingFiles: (isLoadingFiles: boolean) => void;
  isAddingFile: boolean;
  setIsAddingFile: (isAddingFile: boolean) => void;
  isFolder: boolean | null;
  setIsFolder: (isFolder: boolean | null) => void;
}
interface IGlobalVariableStore {
  globals: TGlobals;
  setGlobals: (globals: TGlobals) => void;

  globalUpdate: (key: string, value: string) => void;
}
interface ILivePreviewStore {
  livePreview: string;
  setLivePreview: (livePreview: string) => void;

  liveURL: string;
  setLiveURL: (liveURL: string) => void;

  showPreview: boolean;
  setShowPreview: (showPreview: boolean) => void;

  togglePreview: () => void;
  refreshLivePreview: () => Promise<void>;

  isLoadingLivePreview: boolean;
  setIsLoadingLivePreview: (isLoadingLivePreview: boolean) => void;
}
interface ILocalStorage extends Storage {
  getItem: (key: string) => string;
}
interface IModalStore {
  modalType: TModalType;
  setModalType: (modalType: TModalType) => void;

  modalProps: TModalProps;
  setModalProps: (modalProps: TModalProps) => void;

  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
interface INavigationStore {
  navigation: string;
  setNavigation: (navigation: string) => void;
}
interface IPanelStore {
  bottomBarPanelRef: TPanelRef;
  setBottomBarPanelRef: (ref: TPanelRef) => void;
  isBottomBarPanelOpen: boolean;
  setIsBottomBarPanelOpen: (isOpen: boolean) => void;
  toggleBottomBarPanel: () => void;
  openBottomBarPanel: () => void;
  closeBottomBarPanel: () => void;

  leftSidePanelRef: TPanelRef;
  setLeftSidePanelRef: (ref: TPanelRef) => void;
  isLeftSidePanelOpen: boolean;
  setIsLeftSidePanelOpen: (isOpen: boolean) => void;
  toggleLeftSidePanel: (isSameNav: boolean) => void;
  openLeftSidePanel: () => void;
  closeLeftSidePanel: () => void;

  rightSidePanelRef: TPanelRef;
  setRightSidePanelRef: (ref: TPanelRef) => void;
  isRightSidePanelOpen: boolean;
  setIsRightSidePanelOpen: (isOpen: boolean) => void;
  toggleRightSidePanel: () => void;
  openRightSidePanel: () => void;
  closeRightSidePanel: () => void;
}
interface IPrevStateVariableStore {
  prevStateVariables: TStateVariable[];
  setPrevStateVariables: (prevStateVariables: TStateVariable[]) => void;

  addPrevStateVariable: () => void;
  updatePrevStateVariableKey: (index: number, value: string) => void;
  updatePrevStateVariableValue: (index: number, value: string) => void;
  removePrevStateVariable: (index?: number) => void;
  removeAllPrevStateVariables: () => void;
}
interface IRunScriptStore {
  cleanScript: string;
  setCleanScript: (cleanScript: string) => void;

  script0xAddress: string;
  setScript0xAddress: (script0xAddress: string) => void;

  scriptMxAddress: string;
  setScriptMxAddress: (scriptMxAddress: string) => void;

  scriptParse: TStatus;
  setScriptParse: (scriptParse: TStatus) => void;

  scriptSuccess: TStatus;
  setScriptSuccess: (scriptSuccess: TStatus) => void;

  scriptMonotonic: TStatus;
  setScriptMonotonic: (scriptMonotonic: TStatus) => void;

  scriptVariables: TScriptVariables;
  setScriptVariables: (scriptVariables: TScriptVariables) => void;

  totalScriptInstructions: string;
  setTotalScriptInstructions: (totalScriptInstructions: string) => void;
}
interface ISignatureStore {
  signatures: string[];
  setSignatures: (signatures: string[]) => void;

  addSignature: () => void;
  updateSignature: (index: number, value: string) => void;
  removeSignature: (index?: number) => void;
}
interface IStateVariableStore {
  stateVariables: TStateVariable[];
  setStateVariables: (stateVariables: TStateVariable[]) => void;

  addStateVariable: () => void;
  updateStateVariableKey: (index: number, value: string) => void;
  updateStateVariableValue: (index: number, value: string) => void;
  removeStateVariable: (index?: number) => void;
  removeAllStateVariables: () => void;
}
interface IWorkspaceStore {
  workspaces: string[];
  setWorkspaces: (workspace: string[]) => void;

  refreshWorkspaces: () => Promise<void>;
  addWorkspace: (newWorkspace: string) => Promise<void>;
  renameWorkspace: (newWorkspace: string) => Promise<void>;
  copyWorkspace: (newWorkspace: string) => Promise<void>;
  updateWorkspace: (workspace: string) => Promise<void>;
  deleteWorkspace: () => Promise<void>;
  deleteAllWorkspaces: () => Promise<void>;

  currentWorkspace: TCurrentWorkspace;
  setCurrentWorkspace: (workspace: TCurrentWorkspace) => void;
}

// ============================================================== //
// Store types -------------------------------------------------- //
// ============================================================== //
type TAllCodes = { file: string; code: TCode; isImg: boolean };
type TCode = string | null;
type TCurrentFile = string | null;
type TCurrentWorkspace = string | null;
type TGlobals = {
  '@ADDRESS': string | null;
  '@BLOCK': string;
  '@BLOCKMILLI': string;
  '@CREATED': string;
  '@COINAGE': string;
  '@COINID': string;
  '@TOKENID': string;
  '@AMOUNT': string;
  '@INPUT': string;
  '@TOTIN': string;
  '@TOTOUT': string;
};
type TModalType = EModalTypes | null;
type TModalProps = unknown | null;
type TPanelProps = {
  collapse: () => void;
  expand: () => void;
  isCollapsed: () => boolean;
  isExpanded: () => boolean;
};
type TPanelRef = React.RefObject<HTMLDivElement & TPanelProps> | null;
type TScript = {
  address: string;
  default: boolean;
  miniaddress: string;
  publickey: string;
  script: string;
  simple: boolean;
  track: boolean;
};
type TScriptVariables = { [key: string]: string };
type TStateVariable = { index: number; value: string };
type TStatus = boolean | null;

// ============================================================= //
export type {
  // Interfaces
  IConsoleStore,
  IDeploymentStore,
  IEditorStore,
  IFileStore,
  IGlobalVariableStore,
  ILivePreviewStore,
  ILocalStorage,
  IModalStore,
  INavigationStore,
  IPanelStore,
  IPrevStateVariableStore,
  IRunScriptStore,
  ISignatureStore,
  IStateVariableStore,
  IWorkspaceStore,

  // Types
  TAllCodes,
  TCode,
  TCurrentFile,
  TCurrentWorkspace,
  TGlobals,
  TModalType,
  TModalProps,
  TPanelRef,
  TScript,
  TScriptVariables,
  TStateVariable,
  TStatus,
};
