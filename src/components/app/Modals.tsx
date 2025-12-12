// Import dependencies
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useMemo } from 'react';
// Import store
import useModalStore from '@/stores/useModalStore';
// Import types
import { EModalTypes } from '@/types';
// Import components
import DeployedScripts from '../ui/modals/DeployedScripts';
import FilesDeleteAll from '../ui/modals/FilesDeleteAll';
import FilesUpload from '../ui/modals/FilesUpload';
import KissVMFileCreate from '../ui/modals/KissVMFileCreate';
import KissVMFileDelete from '../ui/modals/KissVMFileDelete';
import KissVMFileDeleteAll from '../ui/modals/KissVMFileDeleteAll';
import KissVMFileRename from '../ui/modals/KissVMFileRename';
import ModalNotFound from '../ui/modals/ModalNotFound';
import WorkspaceCreateBlank from '@/components/ui/modals/WorkspaceCreateBlank';
import WorkspaceCopy from '@/components/ui/modals/WorkspaceCopy';
import WorkspaceDelete from '@/components/ui/modals/WorkspaceDelete';
import WorkspaceDeleteAll from '@/components/ui/modals/WorkspaceDeleteAll';
import WorkspaceExport from '@/components/ui/modals/WorkspaceExport';
import WorkspaceImport from '@/components/ui/modals/WorkspaceImport';
import WorkspaceRename from '@/components/ui/modals/WorkspaceRename';

// Modals component
function Modals() {
  // Define store
  const modalType = useModalStore((state) => state.modalType);
  const isOpen = useModalStore((state) => state.isOpen);
  const onClose = useModalStore((state) => state.onClose);

  // Define memo
  const currentModal = useMemo(() => {
    switch (modalType) {
      // Workspace modals
      case EModalTypes.RENAME_WORKSPACE:
        return <WorkspaceRename />;

      case EModalTypes.CREATE_BLANK_WORKSPACE:
        return <WorkspaceCreateBlank />;

      case EModalTypes.COPY_WORKSPACE:
        return <WorkspaceCopy />;

      case EModalTypes.EXPORT_WORKSPACE:
        return <WorkspaceExport />;

      case EModalTypes.IMPORT_WORKSPACE:
        return <WorkspaceImport />;

      case EModalTypes.DELETE_WORKSPACE:
        return <WorkspaceDelete />;

      case EModalTypes.DELETE_ALL_WORKSPACES:
        return <WorkspaceDeleteAll />;

      // File modals
      case EModalTypes.UPLOAD_FILE:
        return <FilesUpload />;

      case EModalTypes.DELETE_ALL_FILES:
        return <FilesDeleteAll />;

      // Script modals
      case EModalTypes.VIEW_SCRIPT:
        return <DeployedScripts />;

      case EModalTypes.RENAME_SCRIPT:
        return <KissVMFileRename />;

      case EModalTypes.CREATE_SCRIPT:
        return <KissVMFileCreate />;

      case EModalTypes.DELETE_SCRIPT:
        return <KissVMFileDelete />;

      case EModalTypes.DELETE_ALL_SCRIPT:
        return <KissVMFileDeleteAll />;

      // Other modals
      default:
        return <ModalNotFound />;
    }
  }, [modalType]);

  // Render
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      {currentModal}
    </Modal>
  );
}

// Export
export default Modals;
