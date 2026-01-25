# Tasks: Fix Directory Picker

- [ ] Add hidden `<input id="folderInput" type="file" webkitdirectory style="display: none;">` to `index.html`.
- [ ] Refactor `fileManager.js` to support flat `File` list input.
- [ ] Add `processFileList(files)` to `fileManager.js` to handle `webkitdirectory` output.
- [ ] Update `main.js` to bind `change` event to `#folderInput` and handle fallback click.
- [ ] Verify that selecting a folder works over HTTP.
