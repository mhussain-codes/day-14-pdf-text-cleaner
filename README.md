# Linebreak Fixer — Day 14

Clean text copied from a PDF when the words are split across lines, paragraphs run together, or spacing gets messy. Paste, review the result, and copy it back into your document.

**Live demo:** https://mhussain-codes.github.io/day-14-pdf-text-cleaner/

## What it does

- Joins hard line wraps into readable paragraphs.
- Optionally repairs words split by a hyphen at a line ending.
- Keeps blank-line paragraph breaks.
- Preserves bullets and numbered list items on separate lines.
- Normalizes repeated spaces and tabs.
- Copies the result or saves it as a plain-text file.
- Runs entirely in the browser; pasted text is not uploaded or saved.

## Use it

1. Open the [live demo](https://mhussain-codes.github.io/day-14-pdf-text-cleaner/).
2. Paste text copied from your PDF.
3. Keep or change the cleanup options.
4. Select **Clean text**, then copy the result or save a .txt file.

Select **Load example** to see the cleanup before pasting your own text. Ctrl+Enter (or Command+Enter on Mac) also cleans the text.

## Notes

Linebreak Fixer works on text you have already copied. It does not open or extract text from PDF files. Word joining at a line-end hyphen is optional because some hyphens are intentional; review the result before using it.

## Run locally

No build step or third-party dependencies are needed. Open index.html in a browser, or serve this folder with any static file server.

## Privacy

All cleanup happens in the current browser tab. The source and result are not written to local storage and are not sent to a server. Closing or refreshing the tab clears them.

## License

MIT.
