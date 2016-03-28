function save_options() {
  var obj = document.getElementById('tz');
  var idx = obj.selectedIndex;
	var timeZoneFromDB = parseFloat(obj.options[idx].value);
 	var targetTime = new Date();
	var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
	offset = tzDifference * 60 * 1000;
	chrome.storage.sync.set({
    tz_offset: offset,
    index: idx
  });
	chrome.extension.sendRequest({tz_offset: offset}, function(response) {
	});
}

function restore_options() {
  chrome.storage.sync.get({
    tz_offset: 0,
    index: 0
  }, function(items) {
    document.getElementById('tz').selectedIndex = items.index;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('tz').addEventListener('change',save_options);