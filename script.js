//data formatter, adapted from: https://codereview.stackexchange.com/questions/184459/getting-the-date-on-yyyymmdd-format
function createDTStamp(date) {
    let x = date;
    let y = x.getFullYear().toString();
    let m = (x.getMonth() + 1).toString();
    let d = x.getDate().toString();
    let h = x.getHours().toString();
    let min = x.getMinutes().toString();
    (min.length == 1) && (min = '0' + min);
    (h.length == 1) && (h = '0' + h);
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);

    let DTStamp= y + m + d + "T" + h + min + "00Z";
    return DTStamp;
}

//validation goes here
function submitForm() {

    let event = createEvent();

    createFile(event);
}

function createEvent() {

    const date = new Date()

    let event = "BEGIN:VCALENDAR" +
        "\nVERSION:2.0" +
        "\nPRODID:Team-Pine-Line" +
        "\nCALSCALE:GREGORIAN";

    /*
        "\nBEGIN:VTIMEZONE";
        "TZID:Pacific/Honolulu\n" +
        "TZURL:http://tzurl.org/zoneinfo-outlook/Pacific/Honolulu\n" +
        "X-LIC-LOCATION:Pacific/Honolulu\n" +
        "BEGIN:STANDARD\n" +
        "TZOFFSETFROM:-1000\n" +
        "TZOFFSETTO:-1000\n" +
        "END:STANDARD\n" +
     */

    //TZID
    const tzSelect = document.getElementById('timezones');
    let tzid = tzSelect.options[tzSelect.selectedIndex].getAttribute('timeZoneID');
    let tzOffset = "";
    let tzOffsetFrom = "";
    let tzOffsetTo = "";

    //GET DEFAULT/USER TIMEZONE
    if (tzid == "Etc/UTC") {

        tzOffset = (date.getTimezoneOffset() / -60).toString();
        console.log(tzOffset);

        for (let i = 0; i < tzSelect.length; i++) {
            //console.log(tzSelect.options[i].value);
            if (tzOffset == tzSelect.options[i].value.toString()) {
                tzid = tzSelect.options[i].getAttribute('timeZoneId');

                /*
                tzOffsetFrom = tzSelect.options[i].getAttribute('gmtOffset');

                if (tzSelect.options[i].getAttribute('useDaylightTime') == 1) {
                    tzOffsetTo = (Number(tzOffsetFrom) + 100).toString();
                } else {
                    tzOffsetTo = tzOffsetFrom;
                }
                */

                break;
            }
        }

    } /*

        else {

            tzOffsetFrom = tzSelect.options[tzSelect.selectedIndex].getAttribute('gmtOffset');

            if (tzSelect.options[tzSelect.selectedIndex].getAttribute('useDaylightTime') == "1") {
                tzOffsetTo = (Number(tzOffsetFrom) + 100).toString();
            } else {
                tzOffsetTo = tzOffsetFrom;
        }
    } */

    event = event.concat("\nTZID:" + tzid);

    //TIMEZONE OFFSET ADJUSTMENT
    /*
    event = event.concat("\nTZURL:TZURL:http://tzurl.org/zoneinfo-outlook/" + tzid);
    event = event.concat("\nBEGIN:STANDARD");
    event = event.concat("\nTZOFFSETFROM:" + tzOffsetFrom);
    event = event.concat("\nTZOFFSETTO:" + tzOffsetTo);
    event = event.concat("\nEND:STANDARD");
    event = event.concat("\nEND:VTIMEZONE");
    */

    //EVENT START
    event = event.concat("\nBEGIN:VEVENT");

    //DTSTAMP
    const DTStamp = createDTStamp(date);
    console.log(DTStamp);
    event = event.concat("\nDTSTAMP:" + DTStamp);

    //UID
    const sentBy = document.getElementById('sentBy').value;
    const UID = DTStamp + "--" + sentBy.replace(/\s/g, '_');
    console.log(UID);
    event = event.concat("\nUID:" + UID);

    //SUMMARY
    const summary = document.getElementById('summary').value;
    console.log(summary);
    event = event.concat("\nSUMMARY:" + summary);

    //LOCATION
    const location = document.getElementById('location').value;
    console.log(location);
    event = event.concat("\nLOCATION:" + location);

    //SENT-BY
    //const sentBy = document.getElementById('sentBy').value;
    console.log(sentBy);
    event = event.concat("\nSENT-BY:" + sentBy);


    //DTSTART
    const startDate = document.getElementById('startDate').value.replace(/-/g,'');
    const startTime = document.getElementById('startTime').value.replace(':','');
    console.log(startDate);
    console.log(startTime);
    const DTStart = startDate + "T" + startTime + "00";
    event = event.concat("\nDTSTART:" + DTStart);

    //DTEND
    const endDate = document.getElementById('endDate').value.replace(/-/g,'');
    const endTime = document.getElementById('endTime').value.replace(':','');
    console.log(endDate);
    console.log(endTime);

    const DTEnd = endDate + "T" + endTime + "00";
    event = event.concat('\nDTEND:' + DTEnd);


    //EVENT END
    event = event.concat("\nEND:VEVENT" + "\nEND:VCALENDAR");

    //TEST
    console.log(event);

    return event;
}

function createFile(data) {

    console.log(data);
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "event.ics");
}