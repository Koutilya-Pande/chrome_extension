console.log('AI Cover Letter Generator content script loaded');

// Function to get the current tab URL
function getCurrentTabUrl(callback) {
    chrome.runtime.sendMessage({ action: "getCurrentTabUrl" }, (response) => {
        if (response && response.url) {
            callback(response.url);
        } else {
            console.error('Failed to get current tab URL');
        }
    });
}



// You can add logic here to extract job descriptions from specific websites if desired
