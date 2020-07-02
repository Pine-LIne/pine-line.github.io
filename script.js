

function submitForm() {
    createFile();
}

function createFile() {
    const data = "BEGIN:VCALENDAR\n" +
        "VERSION:2.0\n" +
        "PRODID:Team-Pine-Line\n" +
        "CALSCALE:GREGORIAN\n" +
        "BEGIN:VTIMEZONE\n" +
        "TZID:Pacific/Honolulu\n" +
        "TZURL:http://tzurl.org/zoneinfo-outlook/Pacific/Honolulu\n" +
        "X-LIC-LOCATION:Pacific/Honolulu\n" +
        "BEGIN:STANDARD\n" +
        "TZOFFSETFROM:-1000\n" +
        "TZOFFSETTO:-1000\n" +
        "TZNAME:HST\n" +
        "END:STANDARD\n" +
        "END:VTIMEZONE\n" +
        "BEGIN:VEVENT\n" +
        "DTSTAMP:20200630T000000Z\n" +
        "UID:\n" +
        "DTSTART;TZID=Pacific/Honolulu:20200813T100000\n" +
        "DTEND;TZID=Pacific/Honolulu:20200813T130000\n" +
        "SUMMARY:Study for Exam\n" +
        "LOCATION:Hamilton Library\n" +
        "END:VEVENT\n" +
        "END:VCALENDAR";



    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "event.ics");
}