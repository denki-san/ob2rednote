# Design: Directory Picker Fallback

## Architecture
The application currently relies on the `File System Access API`. To support insecure contexts, we will introduce a "Legacy File Loader" path.

### 1. Data Source Abstraction
`fileManager.js` should not care where the files came from. We will normalize both `FileSystemEntry` objects and `File` objects into a common internal representation (a map of relative paths to `Blob` objects or `File` objects).

### 2. UI Integration
We will add a hidden `<input type="file" id="folderInput" webkitdirectory>` to the DOM.
When `selectFolderBtn` is clicked:
1. Check if `window.showDirectoryPicker` exists.
2. If yes, use the modern API.
3. If no, trigger `folderInput.click()`.

### 3. State Management
`fileHandles` in `fileManager.js` will be updated to store either `FileSystemFileHandle` or standard `File` objects.
`getFile()` logic will be abstracted to handle both cases.
