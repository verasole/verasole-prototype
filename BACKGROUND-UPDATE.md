# Product background update — 22 November 2026

All 60 product views now use category-specific settings inspired by the Mova casual and sneaker collections: warm oak interior for Casual Shoes, Formal Shoes and Loafers; limestone terrace for Sandals; neutral urban paving for Sneakers. All 27 colour variants and the existing view order are retained. Banners and heroes were excluded.

Generated with built-in image_gen, with each existing product image as the identity reference. Full prompts are in media-background-prompts.json. Selected masters and listing/detail exports are saved in the sibling verasole-styled-media directory. Original white masters remain in verasole-production-media; original web exports are archived in verasole-styled-media/_original-web. The deployed image paths are unchanged, with new cache versions. Listing exports are 640px square; detail exports are 1254px square.

Product cards, detail galleries and small thumbnails now use square frames to avoid white bars around the scenes. Existing catalog order, product data, hero assets and unrelated owner changes are retained. These images remain AI background edits and should be checked against real pairs for final commercial use; no supplier branding was intentionally changed.

Verification: all 60 selected masters reviewed; 120 listing/detail files checked at 640×640 and 1254×1254; home, sneaker category and product pages checked at 375, 768 and 1440px with no horizontal overflow, broken loaded images or console errors; colour and gallery switching checked. Git diff confirms no hero assets or app.js changes in this revision.
