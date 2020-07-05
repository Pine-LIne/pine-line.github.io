//data formatter, taken from: https://codereview.stackexchange.com/questions/184459/getting-the-date-on-yyyymmdd-format
function yyyymmdd(date) {
    var x = date;
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + m + d;
    return yyyymmdd;
}

function submitForm() {
    createFile();
}

function createEvent() {

    const title = document.getElementById('title').value;
    console.log(title);

    const date = new Date()
    const DTStamp = yyyymmdd(date) + "T" + date.getHours() + date.getMinutes() + "00";
    console.log(DTStamp);

    //const startDate = ;
    //const endDate = ;
}

function createFile() {
    /*
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
     */

    createEvent();

    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "event.ics");
}