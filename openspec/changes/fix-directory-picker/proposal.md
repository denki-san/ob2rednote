# Proposal: Fix Directory Picker Error

## Problem
The application currently uses `window.showDirectoryPicker`, which is only available in secure contexts (HTTPS or localhost). When accessed via an IP address over HTTP, this function is undefined, causing a crash when the user tries to select a folder.

## Solution
Implement a fallback mechanism using the standard `<input type="file" webkitdirectory>` element. This allows users to select a directory in any context.

## Proposed Changes
- Add a hidden folder input to `index.html`.
- Update `fileManager.js` to handle file selection from both `FileSystemHandle` and a list of `File` objects.
- Update `main.js` to trigger the appropriate selection method based on browser support.
