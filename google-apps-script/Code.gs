/**
 * Putt to Win — Google Sheets backend.
 *
 * Deploy this bound to the target Google Sheet (Extensions > Apps Script),
 * then deploy as a Web App ("Execute as: Me", "Who has access: Anyone").
 * Paste the resulting /exec URL into SHEET_ENDPOINT in index.html.
 */

var SHEET_NAME = 'Entries';
var HEADERS = ['Timestamp', 'Name', 'Business', 'Email', 'Entry #', 'Total Entries', 'Marketing Opt-in'];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var name = String(data.name || '').trim();
    var business = String(data.business || '').trim();
    var email = String(data.email || '').trim();
    var timestamp = data.timestamp || new Date().toISOString();
    var total = Math.floor(Number(data.totalEntries)) || 1;
    total = Math.max(1, Math.min(total, 25)); // sanity bound against malformed requests
    var marketingOptIn = data.marketingOptIn === true ? 'Yes' : 'No';

    if (!name || !email) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false, error: 'missing name/email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    var sheet = getSheet_();
    var rows = [];
    for (var i = 1; i <= total; i++) {
      rows.push([timestamp, name, business, email, i, total, marketingOptIn]);
    }
    sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, HEADERS.length).setValues(rows);

    return ContentService.createTextOutput(JSON.stringify({ ok: true, rows: rows.length }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('Putt to Win endpoint is live.');
}
