// TAB CONTENT SIZING
// Function to get the height of all the non-tab content stuff in the sidebar
var tabContentResize = function() {
	var tabContentHeight = $(window).height() - ($('#sidebar-header').height() + $('#sidebar-tabs').height());
	$('.tab-content').height(tabContentHeight-30);
}
// Size the tab content on load
$(document).ready(function() {
	tabContentResize();
})
// Size the tab content on window resize
$(window).resize(function() {
	tabContentResize();
});