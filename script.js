//data formatter, adapted from: https://codereview.stackexchange.com/questions/184459/getting-the-date-on-yyyymmdd-format
function createDTStamp(date) {
    var x = date;
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    var h = x.getHours().toString();
    var min = x.getMinutes().toString();
    (min.length == 1) && (min = '0' + min);
    (h.length == 1) && (h = '0' + h);
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);

    var DTStamp= y + m + d + "T" + h + min + "00Z";
    return DTStamp;
}

function submitForm() {
    createFile(createEvent());
}

function createEvent() {

    let string = "BEGIN:VCALENDAR\n" +
        "VERSION:2.0\n" +
        "PRODID:Team-Pine-Line\n" +
        "CALSCALE:GREGORIAN\n" +
        /*"BEGIN:VTIMEZONE\n" +
        "TZID:Pacific/Honolulu\n" +
        "TZURL:http://tzurl.org/zoneinfo-outlook/Pacific/Honolulu\n" +
        "X-LIC-LOCATION:Pacific/Honolulu\n" +
        "BEGIN:STANDARD\n" +
        "TZOFFSETFROM:-1000\n" +
        "TZOFFSETTO:-1000\n" +
        "TZNAME:HST\n" +
        "END:STANDARD\n" +
        "END:VTIMEZONE\n" +
        */"BEGIN:VEVENT";

    const summary = document.getElementById('summary').value;
    console.log(summary);

    string = string.concat("\nSUMMARY:" + summary);

    const location = document.getElementById('location').value;
    console.log(location);

    string = string.concat("\nLOCATION:" + location);


    const sentBy = document.getElementById('sentBy').value;
    console.log(sentBy);

    string = string.concat("\nSENT-BY:" + sentBy);

    const date = new Date()
    const DTStamp = createDTStamp(date);
    console.log(DTStamp);
    string = string.concat("\nDTSTAMP:" + DTStamp);

    const startDate = document.getElementById('startDate').value.replace(/-/g,'');
    const startTime = document.getElementById('startTime').value.replace(':','');
    console.log(startDate);
    console.log(startTime);
    const DTStart = startDate + "T" + startTime + "00Z";

    string = string.concat("\nDTSTART:" + DTStart);

    const endDate = document.getElementById('endDate').value.replace(/-/g,'');
    const endTime = document.getElementById('endTime').value.replace(':','');
    console.log(endDate);
    console.log(endTime);
    const DTEnd = endDate + "T" + endTime + "00Z";

    string = string.concat('\nDTEND:' + DTEnd);

    string = string.concat("\nEND:VEVENT" + "\nEND:VCALENDAR");

    console.log(string);

    return string;
}

function createFile(data) {

    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "event.ics");
}