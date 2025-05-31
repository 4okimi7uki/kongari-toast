# Changelog

## [2.0.0] - 2025-05-31

### Feature

-   Dark mode support for toast notifications
-   Improved developer experience: GitHub Actions, issue templates
-   Demo: First public **demo page** with usage examples

### Changed

-   Switched bundler from Rollup to `tsup`, enabling inline CSS injection

### Fixed

-   Toast container now positions correctly in all layouts
-   Removed empty icon space when no icon is specified

## [1.0.4] - 2025-05-21

### Fixed

-   Package now consistently includes `toast.css` when installed via npm

### Added

-   Internal CSS is now imported in source (`toast.ts`), reducing setup for bundlers
-   Improved npm usability and documentation
-   Added CHANGELOG.md

---

## [1.0.3] - 2025-05-18

### Changed

-   Rewrote `README.md` in English and improved structure & clarity
-   Updated `package.json` with URLs (homepage, bugs, repository)

### Note

-   Considered the first stable release intended for npm/CDN usage
-   Prior versions were experimental and not recommended for production use

---

## [1.0.2] and earlier

These versions were experimental, internal iterations exploring API design, behavior, and build setup.  
They were not published with full documentation or npm usability in mind.
