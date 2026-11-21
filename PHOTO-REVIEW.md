# VeraSole photo and layout review — 21 November 2026

Code changes: consistent Figtree 600 hero headings with display tracking; white category image wells and labels below; existing images reordered by visual review; mobile leather toe margins fixed; optional per-slide portrait source in picture markup; Classic Formal Slip-On colour renamed Maroon. No images generated, retouched, mirrored or renamed in this revision. Existing owner media is included in the commit.

## Verification

Preview: existing .claude/launch.json verasole-prototype server on 127.0.0.1:8090.
Home, category, product, populated cart and checkout checked at 375, 520, 768, 1024 and 1440px. No horizontal page overflow, broken loaded images or console errors observed. All three banner headings compute to Figtree / 600. All five category image wells use contain; labels are below; gradient is disabled. Leather hero visually checked at 375 and 430px with the complete shoe below the text.
Home → category → product → cart → checkout → simulated confirmation passed. Search → results → product → cart passed.

## Image-order decisions and limitations

Buckle Formal Loafer Black 03; Apron-Toe Formal Slip-On Black 03; Casual Panel Brown 02; Casual Stitched Brown 03; Casual Buckle Moccasin Brown 03; Classic Bit Brown 02; Double Strap Brown/Black 03; Knit Taupe 03/Grey 02. Other available first images retained. Shared catalog data supplies cards, New arrivals, category thumbnails and search/menu product images.
A true toe-right side profile cannot be supplied for every article using only the existing images. Double Strap 03 and Knit Taupe 03 are side-oriented but toe-left. Knit Grey 02 is the closest available side angle, also toe-left. Triangle Badge Tan and Contrast Badge Brown have toe-left side views. Single-photo loafers and Classic Bit Black / Textured Strap Dark Brown lack matching full side views. These are photo gaps, not silently corrected by mirroring or retouching.

## Photos still needed

Use white background, consistent camera distance and shoe about 85% of frame width. For each colour capture side profile toe right, three-quarter front, heel or top-down, and sole.

- Loafers: Emblem Loafer olive; Textured Bit Loafer black; Tassel Moccasin tan; Tassel Loafer navy; Suede Penny brown, olive and grey (one existing photo each). Classic Bit Loafer black has no side view.
- Knit Slip On taupe and grey; Mesh Slip On navy; Textured Strap Sandal dark brown (no side view); Triangle Badge Sandal tan; Contrast Badge Sandal brown (two existing photos each).

## Visible branding requiring an owner decision

MARKS FAIRWALE / M&F on Textured Strap Sandals; NO-ULTRA and 56 on Contrast Badge Sandal; STROBEL heel tab on Knit Slip Ons; FASHION on Buckle Formal Loafer strap. Emblem Loafer badge engraving is garbled. Decide whether these are resold brands and name them on the product, or VeraSole's own range and reshoot without other marks. Check previously AI-generated or retouched imagery against the real pairs.

## Hero assets still needed

Leather and leather-and-sneakers reuse a set: replace one with a formal/loafer or sandals campaign. The sneaker green swoosh is off-palette; supply a gold or warm-neutral version. These assets were left unchanged under the no-photo-edit instruction.
Supply portrait versions about 1080×1350 with shoes centred in lower 60%, named img/heroes/hero-<name>-mobile.webp, alongside the intended 1920×1080 desktop assets (current supplied desktop files are 1672×941). In app.js hero() each slide has an optional mobile property: set it to the supplied existing portrait path. It emits a picture source below 700px; null avoids requesting a missing file. No portrait files currently exist.

## Adding new product views

Use existing names img/products/<category>/<product>-<colour>-angle-NN-detail.webp (1254×1254) and -listing.webp (640×640). Add paired paths and alt text to that colour's imgs array in production-catalog.js, side profile first. Re-run the page and journey checks above. Product names, prices, sizes and availability remain prototype samples.
