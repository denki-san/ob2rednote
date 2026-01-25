# Specification: Directory Picker

## ADDED Requirements

### Requirement: Directory Selection Support
The application MUST allow users to select a local directory containing Markdown files and images, regardless of the security context (HTTP/HTTPS).

#### Scenario: Selection in Secure Context
- **Given** the app is running on `https://...` or `localhost`.
- **When** the user clicks "Select Folder".
- **Then** the native `showDirectoryPicker` dialog SHOULD appear.

#### Scenario: Selection in Insecure Context
- **Given** the app is running on `http://<IP_ADDRESS>`.
- **When** the user clicks "Select Folder".
- **Then** a standard directory selection input MUST be triggered as a fallback.
- **And** the app MUST be able to read all .md files and images from the selected directory recursively.
