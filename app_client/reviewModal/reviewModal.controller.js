(function () {
    angular
	.module('loc8rApp')
	.controller('reviewModalCtrl', reviewModalCtrl);

    reviewModalCtrl.$inject = ['$modalInstance', 'locationData'];
    function reviewModalCtrl ($modalInstance, locationData) {
	var vm = this;
	vm.locationData = locationData;
	
	vm.modal = {
	    cancel : function () {
		$modalInstance.dismiss('cancel');
	    }
	};

	vm.onSubmit = function () {
	    vm.formError = "";
	    if(!vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
		vm.formError = "All fields required, please try again";
		return false;
	    } else {
		console.log(vm.formData);
		return false;
	    }
	};
    }
})();
