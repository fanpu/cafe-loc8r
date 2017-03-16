(function () {
    angular
	.module('loc8rApp')
	.controller('aboutCtrl', aboutCtrl);

    function aboutCtrl() {
	var vm = this;

	vm.pageHeader = {
	    title: 'About Loc8r',
	};
	vm.main = {
	    content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\n Used worldwide in 78 different countries and trusted by millions of daily active users. Loc8 your next productivity haunt today!'
	};
    }
})();
