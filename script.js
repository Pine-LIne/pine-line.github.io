

function submitForm() {
    createFile();
}

function createFile() {
    const data = "BEGIN:VCALENDAR\n" +
        "PRODID:-//xyz Corp//NONSGML PDA Calendar Version 1.0//EN\n" +
        "VERSION:2.0\n" +
        "BEGIN:VEVENT\n" +
        "DTSTAMP:19960704T120000Z\n" +
        "UID:uid1@example.com\n" +
        "ORGANIZER:mailto:jsmith@example.com\n" +
        "DTSTART:19960918T143000Z\n" +
        "DTEND:19960920T220000Z\n" +
        "STATUS:CONFIRMED\n" +
        "CATEGORIES:CONFERENCE\n" +
        "SUMMARY:Networld+Interop Conference\n" +
        "DESCRIPTION:Networld+Interop Conference and Exhibit\\nAtlanta World Congress Center\\n\n" +
        "Atlanta\\, Georgia\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";

    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "event.ics");
}