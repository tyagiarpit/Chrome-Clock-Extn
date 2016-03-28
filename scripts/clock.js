var offset = 0;

function setTimeText(){
	var date = new Date((new Date()).getTime() + offset);
	console.log(offset);
	var clock_text = (date.getHours()<10?('0'+date.getHours()):date.getHours()) + ":" + (date.getMinutes()<10?('0'+date.getMinutes()):date.getMinutes());
	chrome.browserAction.setBadgeText({text:clock_text});
}

setInterval(setTimeText,10000);

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
    offset = request.tz_offset;
    setTimeText();
});

chrome.storage.sync.get({
    tz_offset: 0
}, function(items) {
   	offset = items.tz_offset;
	setTimeText();
});