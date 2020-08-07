//MAP LOCATION
var map;
function createMap () {
  var options = {
    center: { lat: 64.133, lng: -21.922 },
    zoom: 7
  };

  map = new google.maps.Map(document.getElementById('map'), options);

  var input = document.getElementById('location');
  var searchBox = new google.maps.places.SearchBox(input);

  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];

  searchBox.addListener('places_changed', function () {
    var places = searchBox.getPlaces();

    if (places.length == 0)
      return;

    markers.forEach(function (m) { m.setMap(null); });
    markers = [];

    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(p) {
      if (!p.geometry)
        return;

      markers.push(new google.maps.Marker({
        map: map,
        title: p.name,
        position: p.geometry.location
      }));

      if (p.geometry.viewport)
        bounds.union(p.geometry.viewport);
      else
        bounds.extend(p.geometry.location);
    });

    map.fitBounds(bounds);
  });
}


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

    let DTStamp= y + m + d + "T" + h + min + "00";
    return DTStamp;
}

//FORM VALIDATION
function submitForm() {

    const summary = document.getElementById('summary').value;
    const startDate = document.getElementById('startDate').value;//.replace(/-/g,'');
    const startTime = document.getElementById('startTime').value;//.replace(':','');
    const endDate = document.getElementById('endDate').value;//.replace(/-/g,'');
    const endTime = document.getElementById('endTime').value;//.replace(':','');

    console.log(startDate+startTime);
    console.log(endDate+endTime);

    if (summary == "") {
        alert('Events must have a title.')
    }
    else if (startDate == "" || endDate == "") {
        alert(`Events must be created with a START time and an END time.`);
    }
    else if (startDate+startTime >= endDate+endTime) {
        alert(`Error: ${endTime} on ${endDate} comes before ${startTime} on ${startDate}`);
    }
    else {
        createFile(createEvent());
    }

}


//EVENT CREATOR
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
    if (tzid === "Etc/UTC") {

        tzOffset = (date.getTimezoneOffset() / -60).toString();
        console.log(tzOffset);

        for (let i = 0; i < tzSelect.length; i++) {
            //console.log(tzSelect.options[i].value);
            if (tzOffset === tzSelect.options[i].value.toString()) {
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

    }
    /*
        else {
            tzOffsetFrom = tzSelect.options[tzSelect.selectedIndex].getAttribute('gmtOffset');

            if (tzSelect.options[tzSelect.selectedIndex].getAttribute('useDaylightTime') == "1") {
                tzOffsetTo = (Number(tzOffsetFrom) + 100).toString();
            } else {
                tzOffsetTo = tzOffsetFrom;
        }
    }
    */

    event = event.concat(`\nTZID:${tzid}`);

    //TIMEZONE OFFSET ADJUSTMENT
    /*
    event = event.concat("\nTZURL:TZURL:http://tzurl.org/zoneinfo-outlook/" + tzid);
    event = event.concat("\nBEGIN:STANDARD");
    event = event.concat("\nTZOFFSETFROM:${tzOffsetFrom);
    event = event.concat("\nTZOFFSETTO:${tzOffsetTo);
    event = event.concat("\nEND:STANDARD");
    event = event.concat("\nEND:VTIMEZONE");
    */

    //EVENT START
    event = event.concat("\nBEGIN:VEVENT");


    //DTSTAMP
    const DTStamp = createDTStamp(date);
    console.log(DTStamp);
    event = event.concat(`\nDTSTAMP:${DTStamp}`);


    //UID
    var sentBy = document.getElementById('sentBy').value;
    (sentBy === "") ? (sentBy = "none@none") : "";
    const UID = DTStamp + "--" + sentBy.replace(/\s/g, '_');
    console.log(UID);
    event = event.concat(`\nUID:${UID}`);


    //SUMMARY
    const summary = document.getElementById('summary').value;
    console.log(summary);
    event = event.concat(`\nSUMMARY:${summary}`);


    //LOCATION
    const location = document.getElementById('location').value;
    console.log(location);
    (location !== "") ? event = event.concat(`\nLOCATION:${location}`) : "";


    //SENT-BY (declaration under UID)
    //const sentBy = document.getElementById('sentBy').value;
    console.log(sentBy);
    (sentBy !== "none@none") ? event = event.concat(`\nSENT-BY:${sentBy}`) : "";

    //RSVP
    var rsvpVar = document.getElementsByName('rsvp');
    for(i = 0; i < rsvpVar.length; i++) {
        if(rsvpVar[i].checked)
            var rsvpVal = rsvpVar[i].value;
    }
    event = event.concat('\nRSVP:' + rsvpVal);


    //DTSTART
    const startDate = document.getElementById('startDate').value.replace(/-/g,'');
    const startTime = document.getElementById('startTime').value.replace(':','');
    console.log(startDate);
    console.log(startTime);
    const DTStart = startDate + "T" + startTime + "00";
    event = event.concat(`\nDTSTART:${DTStart}`);


    //DTEND
    const endDate = document.getElementById('endDate').value.replace(/-/g,'');
    const endTime = document.getElementById('endTime').value.replace(':','');
    console.log(endDate);
    console.log(endTime);

    const DTEnd = endDate + "T" + endTime + "00";
    event = event.concat(`\nDTEND:${DTEnd}`);


    //RRULE
    var rrule = "\nRRULE:";
    var recurrence = document.getElementsByName('recurrence');
    var interval = document.getElementsByName('interval');
    var untilDate = document.getElementById('u_repeat').value.replace(/-/g,'');
    console.log(recurrence);
    console.log(interval);
    console.log(untilDate);

    if(!recurrence[0].checked) {
        for (let i = 1; i < recurrence.length; i++) {
            if (recurrence[i].checked) {
                rrule = rrule.concat(`FREQ=${recurrence[i].value};`);
            }
        }
        if (interval) {
            rrule = rrule.concat(`INTERVAL=${interval[0].value};`);
        }
        if (untilDate) {
            rrule = rrule.concat(`UNTIL=${untilDate}T235900`);
        }
        event = event.concat(rrule)
    }


    //PRIORITY
    var prioElement = document.getElementsByName('priority'); // fetches radio buttons by name
    for(let i = 0; i < prioElement.length; i++) {  // fetches value if radio button selected
        if(prioElement[i].checked)
            var priority = prioElement[i].value;
    }
    event = event.concat('\nPRIORITY:' + priority);


    //CLASSIFICATION
    var classif = document.getElementsByName('classification');
    for(let i = 0; i < classif.length; i++) {
        if(classif[i].checked)
            var classVal = classif[i].value;
    }
    event = event.concat('\nCLASS:' + classVal);


    //RESOURCES
    var resources = "\nRESOURCES:";
    var res = "";
    var resBool = 0;
    var resData = document.getElementsByName('resources');

    for (let i = 0; i < resData.length; i++) {
        if(resData[i].checked) {
            resBool = 1;
            res = res.concat(`${resData[i].value},`);
        }
    }

    res = res.slice(0,-1);
    resources = resources.concat(res);
    console.log(resources);

    if(resBool == 1) {
        event = event.concat(resources);
    }


    //EVENT END
    event = event.concat("\nEND:VEVENT" + "\nEND:VCALENDAR");


    //TEST
    console.log(event);

    return event;
}


function createFile(data) {

    console.log(data);
    const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    // saveAs(blob, "event.ics");
    saveAs(blob, `${document.getElementById('summary').value}.ics`);
    // saveAs(blob, document.getElementById('summary').value.ics);

}
