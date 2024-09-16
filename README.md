# Sim Companies Helper Userscript

This userscript provides additional insights for the browser game Sim Companies.

## Usage

1. Install a userscript manager like Tampermonkey or Greasemonkey.
2. Load `src/main.js` from github and click "view raw"
3. Install the userscript

## Features

* Shows the sum of all unclaimed + queued production.
* (SOON) Given the current building work, project 24h of work out.
* (EVENTUALLY) Also add resources used to show net gains and losses of each resource in a convenient table.

## Development

### Builds
Builds are managed via webpack.  To run a new build just run:

```bash
npm run build
```

The build will output in `dist/bundle.user.js`.

### Organization

Core components sit in the root of `src`.

The user interface is designed to be modular.  Simply define new tabs in `src/ui.js` as references to each tab component.
Tab components are stored in `src/components`.  Each file should represent an individual tab and hold all logic for that tab
within the file.  If there is shared UI functionality, add it to `src/components/utils.js`.  For generic shared functionality,
place it in the appropriate place, such as `src/api.js` or `src/utils.js`.

