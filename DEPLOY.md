# Putt to Win — deployment guide

Two manual steps remain that only you can do (they require your Google
account and your hosting account) — everything else is done. Once you
hand me the two resulting URLs, I'll wire them up, push, and verify the
full loop.

## 1. Connect the Google Sheet backend (Apps Script)

Sheet: https://docs.google.com/spreadsheets/d/1z0Q7LL9diEnVE9k4BXsAddh6CR0qZIF1UGWPwG-zzms/edit

1. Open the sheet above.
2. **Extensions > Apps Script**.
3. Delete the boilerplate `myFunction() {}` code and paste in the contents
   of [`google-apps-script/Code.gs`](google-apps-script/Code.gs) from this repo.
4. Save the project (Ctrl/Cmd+S). Name it "Putt to Win Backend" if asked.
5. **Deploy > New deployment**, click the gear icon next to "Select type",
   choose **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy**. Google will ask you to authorize — click through the
   "unverified app" warning (Advanced > Go to Putt to Win Backend) since
   this is your own script.
7. Copy the **Web app URL** (ends in `/exec`) and send it to me.

This creates an `Entries` tab in the sheet with columns
`Timestamp | Name | Business | Email | Entry # | Total Entries`, and appends
one row per entry (a 4-entry putt = 4 identical rows) on every submission.

**Test it works standalone**, before wiring up the game:

```bash
curl -X POST 'YOUR_EXEC_URL' \
  -H 'Content-Type: text/plain' \
  -d '{"timestamp":"2026-01-01T00:00:00.000Z","name":"Test Person","business":"Test Co","email":"test@example.com","totalEntries":3}'
```

Refresh the sheet — you should see 3 new rows.

## 2. Deploy the site to a public URL

`index.html` in this repo is the whole game — no build step, no
dependencies, one file. Any of these takes about 2 minutes and only needs
your login (I don't have credentials for any of them, so this part has to
be you):

- **Netlify**: [app.netlify.com](https://app.netlify.com) → Add new site →
  Import an existing project → connect this GitHub repo
  (`Elesha123/MWS-`), branch `claude/putt-to-win-sheets-crj1pt`, no build
  command, publish directory `/`.
- **Vercel**: [vercel.com/new](https://vercel.com/new) → Import the same
  repo/branch → Framework preset "Other" → no build command → deploy.
- **Cloudflare Pages**: dash.cloudflare.com → Workers & Pages → Create →
  Pages → Connect to Git → same repo/branch → no build command, output
  directory `/`.

All three give you a free subdomain instantly (e.g. `putt-to-win.netlify.app`)
and auto-redeploy whenever this branch is pushed. Once picked, most also
let you set a short custom subdomain in project settings — worth doing
since it keeps the printed QR code scanning fast.

Send me that live URL once it's up.

## 3. What I'll do once I have both URLs

1. Drop the Apps Script `/exec` URL into `SHEET_ENDPOINT` in `index.html`
   and push.
2. Generate a QR code (PNG + SVG) pointing at your live site URL, sized
   for print.
3. Run the putt → submit → row-in-sheet loop end to end against your real
   endpoint and confirm rows land correctly, then hand it back to you to
   test on your own phone.
