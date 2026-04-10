# 1.0.0 (2026-04-10)


### Bug Fixes

* bump node to 22 in release workflow for semantic-release compatibility ([55b1a3c](https://github.com/alisatas/hire_match/commit/55b1a3c45dd556cc7c1fc0c8688f3c1b9ec80c09))
* disable Next.js dev toolbar indicator ([d24ede8](https://github.com/alisatas/hire_match/commit/d24ede8930a5a401180e39fd9b36509467140143))
* pass explicit directory to next lint ([974116d](https://github.com/alisatas/hire_match/commit/974116d35addc895e2961f2136feb5f2886d9a92))
* reinstall ai and @ai-sdk/anthropic needed by agents/run route ([bb6da39](https://github.com/alisatas/hire_match/commit/bb6da39b4e5892c1418b090bb11294e4d486b249))
* remove next-themes to fix React 19 script tag error ([0e48339](https://github.com/alisatas/hire_match/commit/0e483391957f9b1b35caa1c0d6e94982ed2dc466))
* replace client-side PDF.js with server-side extraction via unpdf ([d379ccb](https://github.com/alisatas/hire_match/commit/d379ccb5a22c2f8d00c9225010ecca73d13141eb))
* replace Next.js N favicon with document emoji icon ([f799cf1](https://github.com/alisatas/hire_match/commit/f799cf1eea18269699e23d07103f6a72793ccd94))
* security, performance & UX fixes from agent audit ([104e047](https://github.com/alisatas/hire_match/commit/104e0477df0c175520a43774464108d673b87491))
* serve PDF.js worker locally from /public — fixes mobile Safari ([601a2e2](https://github.com/alisatas/hire_match/commit/601a2e21bf5eee017ac1224c35aa73163c285070))
* skip husky in CI, move gate logic into husky pre-push directly ([cc4cadd](https://github.com/alisatas/hire_match/commit/cc4caddb054e4d8357b26768d1c94090697f3df8))
* use Link for back nav, remove unused state in agents page ([1306478](https://github.com/alisatas/hire_match/commit/13064787dd0a543a0a289fee1c717be0dd1270f7))
* use unpkg CDN for PDF.js worker — fixes mobile Safari PDF reading ([a493b6b](https://github.com/alisatas/hire_match/commit/a493b6b434bff954480842155f15d6f73e0e78a9))


### Features

* add Agent HQ dashboard with 8 AI agents (CEO, PM, QA, SEO, Security, Injection, API, UI) ([aa8393f](https://github.com/alisatas/hire_match/commit/aa8393f3420e6197e6e1eebd9390e8f023c294a7))
* add Ko-fi and PayPal buttons side by side in support section ([2dc5b18](https://github.com/alisatas/hire_match/commit/2dc5b1831ed4766bc2c8bbc7837c7a0bb3aa27cd))
* add PayPal button back alongside Stripe ([8028b3c](https://github.com/alisatas/hire_match/commit/8028b3c3b6512f4ad62b7c37c4b56450e2e3f639))
* add QA + SEO pre-deploy agent script ([c3d4d67](https://github.com/alisatas/hire_match/commit/c3d4d67ec4cb3e23c108ff4f7e2618e47efd8238))
* agent HQ UI improvements, auto-fix pre-deploy checks, security headers ([8133308](https://github.com/alisatas/hire_match/commit/813330870e72ac6a8f7cd49867afcda7e68306e9))
* browser-qa agent, pre-push gate, remove premium CV feature ([98a5dc1](https://github.com/alisatas/hire_match/commit/98a5dc10287b29ae720b56c081f946f56873b985))
* CV Scorer minimalist UI dashboard and dynamic URL analyzer ([c0ac3d7](https://github.com/alisatas/hire_match/commit/c0ac3d7373b5e8eaffc0791fdb87c78d9f30b5cf))
* CV stays loaded between analyses, Try Another Job flow ([bfe86d8](https://github.com/alisatas/hire_match/commit/bfe86d824da3d24b509d2f32eb36b49cb4dd2cc9))
* dynamic scoring engine with keyword overlap + confidence weighting ([b4a546e](https://github.com/alisatas/hire_match/commit/b4a546e8c41b35b6b9fd2cc8f24a6dc8e9ad4347))
* full SEO + GEO optimization ([6abb12a](https://github.com/alisatas/hire_match/commit/6abb12aebbb4be73f855d231932fd8fba2ae41be))
* fully job-specific dynamic results ([d3d7d30](https://github.com/alisatas/hire_match/commit/d3d7d3060d804456e9b3f65124de58271295a9af))
* initial commit ([4a53be9](https://github.com/alisatas/hire_match/commit/4a53be999d7dbe1a869622db511a0375e41d349e))
* job description field is URL-only mandatory link ([b998d2f](https://github.com/alisatas/hire_match/commit/b998d2f1b8348710af53f19b2ad84a8f691102b5))
* local skill engine, PDF fix, coffee section, Stripe, better UI ([635ab5a](https://github.com/alisatas/hire_match/commit/635ab5a017ec3de835790ff0a55060e3fae3698a))
* re-analyze in place without empty state flash ([770018f](https://github.com/alisatas/hire_match/commit/770018fa0c609d57df94d7bb184ff9abe7b4f0a2))
* remove CV text paste area, PDF upload only ([75849b1](https://github.com/alisatas/hire_match/commit/75849b1e2114c0496b09e44555eedc3412d5053d))
* replace Ko-fi button with Stripe payment link ([3e5d311](https://github.com/alisatas/hire_match/commit/3e5d3116ec27f1bd36d300ed575515cef3613b68))
* replace Stripe button with Ko-fi, keep PayPal ([10b25df](https://github.com/alisatas/hire_match/commit/10b25df13e5c8aae9eb6b137aaf2cd40f2daaa25))
* replace Stripe button with PayPal.me link for Buy Me a Coffee ([1a17353](https://github.com/alisatas/hire_match/commit/1a17353b79452a9998ba8cbf7a05540540db7003))
* sticky apply bar, re-analyze fix, scrollable results panel ([af7c1ce](https://github.com/alisatas/hire_match/commit/af7c1cef4aef604699ed64f86a7db530f994c955))
* Telegram bot integration with full project control ([5b52e2f](https://github.com/alisatas/hire_match/commit/5b52e2fb8139988414468cadedb2ed64439d3a47))
