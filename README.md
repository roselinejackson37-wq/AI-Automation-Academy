# AI Automation & Systems Design — Student Portal

This is **Phase 1** of the platform build: the foundation. It's a real, working
app — sign-in, enrollment check, and a dashboard with all 16 weeks — built so
every phase after this one adds to it without rebuilding anything.

## What's in this phase

- Passwordless sign-in (magic link by email) via Firebase
- An enrollment check: only emails you've added to Firestore can get into the dashboard
- A dashboard listing all 4 phases and 16 weeks
- A week/lesson page showing what's taught and built each week
- Styling matched to your landing page (same colors, fonts, feel)
- Ready to deploy on Cloudflare Pages, backed by Firebase

## What's *not* in this phase yet (coming in later phases — see bottom)

- Automatically syncing purchases from Selar (for now, you add students by hand — takes 30 seconds each, explained below)
- Assignment submissions
- Progress tracking / completed lessons
- Downloadable templates and blueprints
- The rich lesson content from the full curriculum document (right now each week shows a short summary — swapping in the full lesson text is a small, safe change, not a rebuild)

---

## 1. Run it on your own computer

You'll need [Node.js](https://nodejs.org) installed (any recent version).

```bash
npm install
npm run dev
```

This opens the app at `http://localhost:5173`. It won't fully work yet — it
needs a Firebase project connected first (next section).

---

## 2. Firebase setup (about 10 minutes)

Firebase is what handles sign-in and stores your student list. It has a generous free tier — you won't pay anything at this scale.

1. Go to [console.firebase.google.com](https://console.firebase.google.com) and click **Add project**. Name it something like `ai-automation-academy`.
2. Once created, click the **</>** (web) icon to register a web app. Give it any nickname.
3. Firebase will show you a `firebaseConfig` object with keys like `apiKey`, `authDomain`, etc. Keep this tab open.
4. In this project folder, copy `.env.example` to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```
5. Open `.env` and paste each value from the `firebaseConfig` object into the matching line (e.g. `apiKey` → `VITE_FIREBASE_API_KEY`).
6. In the Firebase console, go to **Build → Authentication → Get started**. Under **Sign-in method**, enable **Email link (passwordless sign-in)**.
7. Still in Authentication, go to the **Settings** tab → **Authorized domains**, and add the domain you'll deploy to (you'll get this in step 3 below — you can come back and add it after deploying).
8. Go to **Build → Firestore Database → Create database**. Start in **production mode**. Any region is fine.
9. Once created, go to the **Rules** tab and paste in the contents of `firestore.rules` from this project, then click **Publish**.

### Adding a student (until Selar is connected automatically)

In Firestore, click **Start collection**, name it `students`. For each paying student:
- **Document ID**: their email address, all lowercase (e.g. `roseline@example.com`)
- Add any one field, e.g. `enrolledAt` (string) with today's date — the document just needs to *exist*, the app only checks for its presence.

That's it — that email can now sign in and reach the dashboard.

---

## 3. Deploy on Cloudflare Pages (about 5 minutes)

1. Push this project to a GitHub repository (Cloudflare deploys from a repo).
2. In the [Cloudflare dashboard](https://dash.cloudflare.com), go to **Workers & Pages → Create → Pages → Connect to Git**, and select this repository.
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Under **Environment variables**, add the same six `VITE_FIREBASE_...` values from your `.env` file.
5. Click **Save and Deploy**. Cloudflare gives you a URL like `academy.pages.dev`.
6. Go back to Firebase → Authentication → Settings → Authorized domains, and add that Cloudflare URL (and your own custom domain too, once you connect one).

Once that's done, the sign-in link emails will work correctly for real visitors.

---

## The phased build plan

This is Phase 1 of a build we're doing together, step by step, so it never
feels like too much at once:

- **Phase 1 (this delivery)** — Foundation: auth, enrollment gate, dashboard, week pages
- **Phase 2** — Move curriculum content into Firestore (so lessons can be edited without touching code), and bring in the full lesson text from the curriculum document
- **Phase 3** — Connect Selar purchases automatically (a small Cloud Function triggered by a Selar webhook, replacing the manual add-a-student step)
- **Phase 4** — Progress tracking: mark lessons complete, see percentage through the program
- **Phase 5** — Assignment submissions and downloadable templates/blueprints per week
- **Phase 6** — Admin view so you can edit content and see student progress without opening Firebase directly

We'll do these one at a time — no need to think about Phase 2 until Phase 1 is live and feels good.
