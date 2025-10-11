# Icon Generation Script

## Problem
The manifest.json was referencing icons with incorrect sizes, causing errors:
```
Error: Resource size is not correct - typo in the Manifest?
```

## Solution
This script automatically generates PWA icons in all required sizes.

## Quick Start

```bash
# 1. Install dependencies
npm install sharp --save-dev

# 2. Generate icons
node scripts/generate-icons.js

# 3. Update manifest.json (see ICON-GENERATION.md)
```

## What This Script Does

✅ Reads source image: `/public/assets/images/mini-logo.png`  
✅ Generates icons in sizes: 192x192, 512x512, 180x180, 152x152, 144x144, 128x128, 96x96, 72x72  
✅ Saves to: `/public/assets/icons/`  
✅ Maintains transparency and quality  

## After Running

1. Check generated icons in `public/assets/icons/`
2. Update `public/manifest.json` with new icon paths
3. Test in Chrome DevTools → Application → Manifest
4. Test "Add to Home Screen" on mobile device

## Requirements

- Node.js 14+
- Sharp library (for image processing)
- Source image must exist at `/public/assets/images/mini-logo.png`

## Troubleshooting

**Error: Cannot find module 'sharp'**
```bash
npm install sharp --save-dev
```

**Error: Source image not found**
- Ensure `mini-logo.png` exists in `public/assets/images/`
- Or update `SOURCE_IMAGE` path in the script

**Icons look blurry**
- Use a high-resolution source image (at least 512x512)
- Ensure source has transparent background

## For More Details

See `ICON-GENERATION.md` in the root directory for comprehensive documentation.

