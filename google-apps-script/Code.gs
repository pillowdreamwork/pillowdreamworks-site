const SHEET_HEADERS = {
  users: ['User ID', 'Created At', 'Updated At', 'Name', 'Age', 'Gender', 'Email', 'Consent Given', 'Consent Time', 'Last Assessment At', 'Assessment Count'],
  results: ['Result ID', 'Timestamp', 'User ID', 'Assessment ID', 'Assessment Name', 'Result Type', 'Score', 'Max Score', 'Percentage', 'Level', 'Factor Results', 'Interpretation', 'Discussion', 'Conclusion'],
  counselling: ['Counselling ID', 'Requested At', 'User ID', 'Name', 'Age', 'Gender', 'Email', 'Assessment Count', 'Latest Assessment At', 'Request Status', 'Notification Sent']
};

function doPost(event) {
  try {
    const payload = parsePayload_(event);
    if (!payload.action) return json_({ ok: false, error: 'Missing action.' });
    if (payload.consent !== true) return json_({ ok: false, error: 'Consent is required.' });

    switch (payload.action) {
      case 'save_profile':
        return json_(saveProfile_(payload));
      case 'save_assessment':
        return json_(saveAssessment_(payload));
      case 'counselling_booking':
        return json_(saveCounsellingBooking_(payload));
      default:
        return json_({ ok: false, error: 'Unsupported action.' });
    }
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: 'Request could not be processed.' });
  }
}

function parsePayload_(event) {
  if (!event || !event.postData || !event.postData.contents) throw new Error('Empty request.');
  const payload = JSON.parse(event.postData.contents);
  if (!payload || typeof payload !== 'object') throw new Error('Malformed request.');
  return payload;
}

function saveProfile_(payload) {
  const fields = validateProfile_(payload);
  const now = new Date();
  const users = getSheet_('Users', SHEET_HEADERS.users);
  const values = users.getDataRange().getValues();
  const emailIndex = SHEET_HEADERS.users.indexOf('Email');
  const idIndex = SHEET_HEADERS.users.indexOf('User ID');
  let rowNumber = -1;
  for (let i = 1; i < values.length; i += 1) {
    if (String(values[i][emailIndex]).trim().toLowerCase() === fields.email.toLowerCase()) {
      rowNumber = i + 1;
      break;
    }
  }

  const userId = rowNumber > 0
    ? String(values[rowNumber - 1][idIndex])
    : validId_(payload.userId) ? payload.userId : Utilities.getUuid();
  if (rowNumber > 0) {
    users.getRange(rowNumber, 3, 1, 7).setValues([[
      now, fields.name, fields.age, fields.gender, fields.email, true, now
    ]]);
  } else {
    users.appendRow([userId, now, now, fields.name, fields.age, fields.gender, fields.email, true, now, '', 0]);
  }
  return { ok: true, userId: userId };
}

function saveAssessment_(payload) {
  const fields = validateProfile_(payload);
  const userId = ensureUser_(payload, fields);
  const resultId = validId_(payload.resultId) ? payload.resultId : Utilities.getUuid();
  const results = getSheet_('Assessment Results', SHEET_HEADERS.results);
  const existingIds = results.getRange(2, 1, Math.max(results.getLastRow() - 1, 1), 1).getValues().flat().map(String);
  if (existingIds.indexOf(resultId) !== -1) return { ok: true, userId: userId, resultId: resultId, duplicate: true };

  const timestamp = new Date();
  const factorResults = JSON.stringify(Array.isArray(payload.factorResults) ? payload.factorResults : []);
  results.appendRow([
    resultId, timestamp, userId, clean_(payload.assessmentId, 120), clean_(payload.assessmentName, 240),
    clean_(payload.resultType, 40), number_(payload.score), number_(payload.maxScore),
    number_(payload.percentage), clean_(payload.level, 160), factorResults,
    clean_(payload.interpretation, 10000), clean_(payload.discussion, 10000), clean_(payload.conclusion, 5000)
  ]);
  updateUserAssessmentSummary_(userId, timestamp);
  return { ok: true, userId: userId, resultId: resultId };
}

function saveCounsellingBooking_(payload) {
  const fields = validateProfile_(payload);
  const userId = ensureUser_(payload, fields);
  const results = getSheet_('Assessment Results', SHEET_HEADERS.results);
  const values = results.getDataRange().getValues();
  const userIndex = SHEET_HEADERS.results.indexOf('User ID');
  const nameIndex = SHEET_HEADERS.results.indexOf('Assessment Name');
  const timestampIndex = SHEET_HEADERS.results.indexOf('Timestamp');
  const scoreIndex = SHEET_HEADERS.results.indexOf('Score');
  const maxScoreIndex = SHEET_HEADERS.results.indexOf('Max Score');
  const assessmentNames = [];
  const assessmentSummaries = [];
  let latest = '';
  for (let i = 1; i < values.length; i += 1) {
    if (String(values[i][userIndex]) !== userId) continue;
    assessmentNames.push(String(values[i][nameIndex]));
    assessmentSummaries.push(`${values[i][nameIndex]}: ${values[i][scoreIndex]} / ${values[i][maxScoreIndex]}`);
    if (!latest || new Date(values[i][timestampIndex]) > new Date(latest)) latest = values[i][timestampIndex];
  }

  const counsellingId = Utilities.getUuid();
  const requests = getSheet_('Counselling Requests', SHEET_HEADERS.counselling);
  requests.appendRow([counsellingId, new Date(), userId, fields.name, fields.age, fields.gender, fields.email, assessmentNames.length, latest, 'New', false]);
  const notificationSent = sendCounsellingNotification_(counsellingId, userId, fields, assessmentNames, assessmentSummaries, latest);
  requests.getRange(requests.getLastRow(), SHEET_HEADERS.counselling.indexOf('Notification Sent') + 1).setValue(notificationSent);
  return { ok: true, counsellingId: counsellingId, userId: userId };
}

function ensureUser_(payload, fields) {
  const response = saveProfile_(Object.assign({}, payload, fields));
  return response.userId;
}

function updateUserAssessmentSummary_(userId, timestamp) {
  const users = getSheet_('Users', SHEET_HEADERS.users);
  const values = users.getDataRange().getValues();
  const idIndex = SHEET_HEADERS.users.indexOf('User ID');
  for (let i = 1; i < values.length; i += 1) {
    if (String(values[i][idIndex]) !== userId) continue;
    const row = i + 1;
    const countColumn = SHEET_HEADERS.users.indexOf('Assessment Count') + 1;
    const lastColumn = SHEET_HEADERS.users.indexOf('Last Assessment At') + 1;
    users.getRange(row, countColumn).setValue(Number(values[i][countColumn - 1]) + 1);
    users.getRange(row, lastColumn).setValue(timestamp);
    users.getRange(row, 3).setValue(new Date());
    return;
  }
}

function validateProfile_(payload) {
  const email = clean_(payload.email, 240);
  const age = Number(payload.age);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new Error('Invalid email.');
  if (!Number.isInteger(age) || age < 5 || age > 120) throw new Error('Invalid age.');
  const name = clean_(payload.name, 160);
  if (!name) throw new Error('Name is required.');
  return { name: name, age: age, gender: clean_(payload.gender, 80), email: email };
}

function getSheet_(name, headers) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(name);
  if (!sheet) sheet = spreadsheet.insertSheet(name);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  return sheet;
}

function sendCounsellingNotification_(counsellingId, userId, fields, assessmentNames, assessmentSummaries, latest) {
  const recipient = PropertiesService.getScriptProperties().getProperty('COUNSELLING_NOTIFICATION_EMAIL');
  if (!recipient) return false;
  const body = [
    `Name: ${fields.name}`, `Age: ${fields.age}`, `Gender: ${fields.gender}`, `Email: ${fields.email}`,
    `Counselling ID: ${counsellingId}`, `User ID: ${userId}`,
    `Number of assessments completed: ${assessmentNames.length}`,
    `Assessment names: ${assessmentNames.join(', ') || 'None'}`,
    `Scores / max scores: ${assessmentSummaries.join('; ') || 'None'}`,
    `Latest assessment time: ${latest || 'None'}`
  ].join('\n');
  MailApp.sendEmail(recipient, 'New Counselling Booking — Assessment Centre User', body);
  return true;
}

function clean_(value, maxLength) {
  const text = String(value == null ? '' : value).replace(/^[=+@-]/, "'$&").trim();
  return text.slice(0, maxLength);
}

function number_(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new Error('Invalid numeric value.');
  return number;
}

function validId_(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{8,120}$/.test(value);
}

function json_(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
}
