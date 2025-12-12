import minima from '@/lib/minima';
import useFileStore from '@/stores/useFileStore';
import {
  MenuDividerBase,
  MenuItemBase,
  MenuListBase,
} from './systems/MenuListBase';
import { LuDownload, LuPenLine, LuPlus, LuTrash } from 'react-icons/lu';
import useWorkspaceStore from '@/stores/useWorkspaceStore';
import { LOCAL_STORAGE_KEYS } from '@/constants';

// Constants (for debugging)
const MINIDAPP_ID = (window as any).DEBUG_MINIDAPPID;

function FileItemContextMenu({ file, setRenamingFile }) {
  // Define store
  const deleteFile = useFileStore((state) => state.deleteFile);

  // Define handlers
  /* Temporary fix to download files
   *
   * TODO - Improve download support in the future
   */
  async function handleDownload() {
    // On Desktop
    const fileName = file.name + '_minima_download_as_file_';
    const url = `my_downloads/${fileName}`;
    const debug = `https://${import.meta.env.VITE_DEBUG_HOST}:${
      import.meta.env.VITE_DEBUG_MDS_PORT
    }/${MINIDAPP_ID}/${url}`;

    await minima.file.copytoweb(file.location, `/${url}`);

    const link = document.createElement('a');
    link.href = import.meta.env.VITE_DEBUG === 'true' ? debug : url;
    document.body.appendChild(link);
    link.click();
  }

  return (
    <MenuListBase>
      <MenuItemBase
        // label="Rename File"
        icon={<LuPenLine />}
        onClick={() => setRenamingFile(true)}
      >
        Rename...
      </MenuItemBase>

      <MenuItemBase
        // label="Delete File"
        icon={<LuTrash />}
        onClick={() => deleteFile(file.location)}
      >
        Delete
      </MenuItemBase>

      {/* TODO - Add copy and download support */}
      {/* <MenuDividerBase />

      <MenuItemBase
        // label="Copy File"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Name"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy name
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Path"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy path
      </MenuItemBase> */}

      <MenuDividerBase />

      <MenuItemBase
        // label="Download File"
        icon={<LuDownload />}
        onClick={handleDownload}
      >
        Download
      </MenuItemBase>
    </MenuListBase>
  );
}

function FolderItemContextMenu({ file, setRenamingFile, setIsExpanded }) {
  // Define store
  const deleteFile = useFileStore((state) => state.deleteFile);
  const isAddingFile = useFileStore((state) => state.isAddingFile);
  const setIsAddingFile = useFileStore((state) => state.setIsAddingFile);
  const setIsFolder = useFileStore((state) => state.setIsFolder);
  const setCurrentFolder = useFileStore((state) => state.setCurrentFolder);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  // Define handlers
  function handleExpand() {
    setCurrentFolder(file.location);
    setIsExpanded((prevState) => {
      const expand = {
        ...prevState,
        [file.location]: true,
      };

      localStorage.setItem(
        LOCAL_STORAGE_KEYS.fileExplorerExpanded,
        JSON.stringify(expand)
      );

      return expand;
    });
  }
  /* Temporary fix to download files
   *
   * TODO - Improve download support in the future
   */
  /* async function handleDownload() {
    // On Desktop
    const fileName = file.name + '_minima_download_as_file_';
    const url = `my_downloads/${fileName}`;
    const debug = `https://${import.meta.env.VITE_DEBUG_HOST}:${
      import.meta.env.VITE_DEBUG_MDS_PORT
    }/${MINIDAPP_ID}/${url}`;

    await minima.file.copytoweb(file.location, `/${url}`);

    const link = document.createElement('a');
    link.href = import.meta.env.VITE_DEBUG === 'true' ? debug : url;
    document.body.appendChild(link);
    link.click();
  } */

  return (
    <MenuListBase>
      <MenuItemBase
        // label="Copy File"
        icon={<LuPlus />}
        onClick={() => {
          if (!isAddingFile) {
            setIsFolder(false);
            setIsAddingFile(true);
            handleExpand();
          }
        }}
      >
        New File...
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Name"
        icon={<LuPlus />}
        onClick={() => {
          if (!isAddingFile) {
            setIsFolder(true);
            setIsAddingFile(true);
            handleExpand();
          }
        }}
      >
        New Folder...
      </MenuItemBase>

      {file.location.split('/').pop() !== currentWorkspace && (
        <>
          <MenuDividerBase />

          <MenuItemBase
            // label="Rename File"
            icon={<LuPenLine />}
            onClick={() => {
              setIsFolder(true);
              setRenamingFile(true);
            }}
          >
            Rename...
          </MenuItemBase>

          <MenuItemBase
            // label="Delete File"
            icon={<LuTrash />}
            onClick={() => deleteFile(file.location)}
          >
            Delete
          </MenuItemBase>
        </>
      )}

      {/* TODO - Add copy and download support */}
      {/* <MenuDividerBase />

      <MenuItemBase
        // label="Copy File"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Name"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy name
      </MenuItemBase>

      <MenuItemBase
        // label="Copy File Path"
        icon={<LuCopy />}
        onClick={() => {}}
        disabled
      >
        Copy path
      </MenuItemBase>

      <MenuItemBase
        // label="Download File"
        icon={<LuDownload />}
        onClick={handleDownload}
      >
        Download
      </MenuItemBase> */}
    </MenuListBase>
  );
}

export { FileItemContextMenu, FolderItemContextMenu };
