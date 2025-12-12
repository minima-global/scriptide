// Import dependencies
import { create } from 'zustand';
// Import stores
import useFileStore from './useFileStore';
import useWorkspaceStore from './useWorkspaceStore';
// Import libraries
import minima from '@/lib/minima';
// Import types
import { ILivePreviewStore, IWindow } from '@/types';

// Create the store
export const useLivePreviewStore = create<ILivePreviewStore>((set, get) => ({
  livePreview: '',
  setLivePreview: (livePreview) => set({ livePreview }),

  liveURL:
    (window as IWindow & typeof globalThis).DEBUG_MINIDAPPID ||
    window.location.href.split('/')[3] ||
    '0x00',
  setLiveURL: (liveURL) => set({ liveURL }),

  showPreview: false,
  setShowPreview: (showPreview) => set({ showPreview }),

  togglePreview: () => {
    set((state) => {
      const showPreview = !state.showPreview;

      if (!showPreview) {
        set({ livePreview: '' });
      }

      return { showPreview };
    });
  },
  refreshLivePreview: async () => {
    set({ isLoadingLivePreview: true });

    if (!get().showPreview) {
      set({ isLoadingLivePreview: false });
      return;
    }

    const currentWorkspace = useWorkspaceStore.getState().currentWorkspace;
    if (!currentWorkspace) {
      set({ livePreview: '', isLoadingLivePreview: false });
      return;
    }

    await minima.file.delete(`livepreview`);
    await minima.file.deletefromweb(`livepreview`);

    const timestamp = Date.now();
    await minima.file.copy(
      `workspaces/${currentWorkspace}`,
      `livepreview/${currentWorkspace}/${timestamp}`
    );

    let indexHtml =
      (
        await minima.file.load(
          `livepreview/${currentWorkspace}/${timestamp}/index.html`
        )
      ).response?.load.data || '';

    const files = useFileStore.getState().files;
    if (files) {
      // If mds.js exists, rename it to mds-lp.js
      // This is to fix an issue where another version of mds.js had priority
      // By changing the name, we ensure that the live preview prioritize the
      // local mds.js file over the server one
      const findMDS = files.some((f) => f.name === 'mds.js');
      if (findMDS) {
        await minima.file.move(
          `livepreview/${currentWorkspace}/${timestamp}/mds.js`,
          `livepreview/${currentWorkspace}/${timestamp}/mds-lp.js`
        );

        for (const file of files) {
          const { name, location } = file;
          const path = location.split('/').slice(3).join('/');

          if (name === 'index.html') {
            indexHtml = indexHtml.replace('/mds.js', '/mds-lp.js');
            continue;
          }

          if (name.endsWith('.html')) {
            let data =
              (
                await minima.file.load(
                  `livepreview/${currentWorkspace}/${timestamp}/${path}`
                )
              ).response?.load.data || '';
            data = data.replace('/mds.js', '/mds-lp.js');

            await minima.file.save(
              `livepreview/${currentWorkspace}/${timestamp}/${path}`,
              data
            );
          }
        }
      }

      // If debug.conf exists, inject debug settings
      // inject the debug settings into .html files as a <script> in <head>
      const findDebug = files.some((f) => f.name === 'debug.conf');
      if (findDebug) {
        const conf =
          (await minima.file.load(`workspaces/${currentWorkspace}/debug.conf`))
            .response?.load.data || '{}';
        const json = JSON.parse(conf);
        // console.log(json);

        const debug = `
        <script>
          var DEBUG = "${json.debug}" === 'true';
          var DEBUG_HOST = "${json.host}";
          var DEBUG_PORT = "${json.port}";
          var DEBUG_UID = "${json.uid}";
        </script>
      `;

        for (const file of files) {
          const { name, location } = file;
          const path = location.split('/').slice(3).join('/');

          if (name === 'index.html') {
            indexHtml = indexHtml.replace('</head>', debug + '</head>');
            continue;
          }

          if (name.endsWith('.html')) {
            let data =
              (
                await minima.file.load(
                  `livepreview/${currentWorkspace}/${timestamp}/${path}`
                )
              ).response?.load.data || '';
            data = data.replace('</head>', debug + '</head>');

            await minima.file.save(
              `livepreview/${currentWorkspace}/${timestamp}/${path}`,
              data
            );
          }
        }
      }
    }

    // Update the changes made to index.html
    await minima.file.save(
      `livepreview/${currentWorkspace}/${timestamp}/index.html`,
      indexHtml
    );

    // Copy files to web folder for live preview
    await minima.file.copytoweb(
      `livepreview/${currentWorkspace}/${timestamp}`,
      `livepreview/${currentWorkspace}/${timestamp}`
    );

    // Update the live preview URL
    const host = (window as IWindow & typeof globalThis).MDS.filehost || '';
    const apid = get().liveURL || '';
    const livePreview = `${host}${apid}/livepreview/${currentWorkspace}/${timestamp}/index.html`;

    set({
      livePreview,
      isLoadingLivePreview: false,
    });
  },

  isLoadingLivePreview: false,
  setIsLoadingLivePreview: (isLoadingLivePreview) =>
    set({ isLoadingLivePreview }),
}));

export default useLivePreviewStore;
