// Define your API key
const apiKey = 'AIzaSyCihQ2EZ1syh4w74gCqvQbHFOCXbvI5COw';

// Function to retrieve the subscriber count for a given channel name
function getSubscriberCount() {
	const channelName = $('#channel-name').val();
	if (channelName === '') {
		alert('Please enter a channel name');
		return;
	}
	$.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&forUsername=${channelName}&key=${apiKey}`, function(data) {
		const subscriberCount = data.items[0].statistics.subscriberCount;
		$('#subscriber-count').text(`Subscriber count: ${subscriberCount}`);
	});
}

// Function to retrieve similar channel names and populate the drop-down menu
function getSimilarChannels() {
	const channelName = $('#channel-name').val();
	if (channelName === '') {
		return;
	}
	$.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelName}&key=${apiKey}`, function(data) {
		const items = data.items;
		const select = $('#similar-channels');
		select.empty();
		select.append($('<option>', {
			value: '',
			text: '--Select a channel--'
		}));
		$.each(items, function(index, item) {
			const title = item.snippet.title;
			const channelId = item.snippet.channelId;
			select.append($('<option>', {
				value: channelId,
				text: title
			}));
		});
	});
}

// Call the getSimilarChannels function when the user enters text in the channel name field
$('#channel-name').on('input', function() {
	getSimilarChannels();
});

// Call the getSubscriberCount function when the user selects a channel from the drop-down menu