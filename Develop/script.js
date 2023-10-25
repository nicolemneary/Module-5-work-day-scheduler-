
var today = moment().format('MMMM Do YYYY');

var now = moment().format('H A');

$("#currentDay").text(today);


var currentDay = [
    {
        id: "0",
        hour: "09",
        time: "09",
        meridiem: "am",
        reminder: "",
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: "",
    },

    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: "",
    },

    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: "",
    },

    {
        id: "4",
        hour: "01",
        time: "13",
        meridiem: "pmm",
        reminder: "",
    },
    {

        id: "5",
        hour: "02",
        time: "14",
        meridiem: "pm",
        reminder: "",
    },

    {

        id: "6",
        hour: "03",
        time: "15",
        meridiem: "pm",
        reminder: "",
    },

    {

        id: "7",
        hour: "04",
        time: "16",
        meridiem: "pm",
        reminder: "",
    },


    {

        id: "8",
        hour: "05",
        time: "17",
        meridiem: "pm",
        reminder: "",
    },
]

function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

function saveReminders() {
    localStorage.setItem("currentDay", JSON.stringify(myDay));
}

function displayReminders() {
    myDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

function init() {
    var storedDay = JSON.parse(localStorage.getItem("currentDay"));

    if (storedDay) {
        myDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

var workEvents = JSON.parse(localStorage.getItem("workDay"));
if (workEvents) {
    planWorkday = workEvents;
}

$("#currentDay").text(today);

planWorkday.forEach(function(timeBlock, index) {
    var timeLabel = timeBlock.time;
    var BlockColor = colorRow(timeLabel);   
    var row =
    '<div class="time-block" id="' +
		index +
		'"><div class="row no-gutters input-group"><div class="col-sm col-lg-1 input-group-prepend hour justify-content-sm-end pr-3 pt-3">' +
		timeLabel +
		'</div><textarea class="form-control ' +
		blockColor +
		'">' +
		timeBlock.event +
		'</textarea><div class="col-sm col-lg-1 input-group-append"><button class="saveBtn btn-block" type="submit"><i class="fas fa-save"></i></button></div></div></div>';


	$(".container").append(row);
});


function colorRow(time) {
	var planNow = moment(now, "H A");
	var planEntry = moment(time, "H A");
	if (planNow.isBefore(planEntry) === true) {
		return "future";
	} else if (planNow.isAfter(planEntry) === true) {
		return "past";
	} else {
		return "present";
	}
}


$(".saveBtn").on("click", function() {
	var blockID = parseInt(
		$(this)
			.closest(".time-block")
			.attr("id")
	);
    var userEntry = $.trim(
		$(this)
			.parent()
			.siblings("textarea")
			.val()
	);
	planWorkday[blockID].event = userEntry;

	/* Set local storage */
	localStorage.setItem("workDay", JSON.stringify(planWorkday));
});