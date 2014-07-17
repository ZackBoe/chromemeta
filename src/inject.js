console.log("%c ChromeMeta background script injected.", "color: blue;"); 

meta = document.getElementsByTagName('meta');

message = { title: document.title, meta: {}}

if (meta.description) message.meta.description = meta.description.content;
if (meta.keywords) message.meta.keywords = meta.keywords.content;

chrome.runtime.sendMessage(message);