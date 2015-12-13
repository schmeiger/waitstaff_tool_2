var getPerc = function(a, b){
	return a * b / 100;
}

var getTotal = function(a, b){
	return a+b;
}

angular.module("waitstaff", ['ngRoute', 'ngAnimate'])
.config(['$routeProvider', function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl: 'home.html',
		controller: 'homeCtrl'
	})
	.when('/meal', {
		templateUrl: 'meal.html',
		controller: 'mealCtrl'
	})
	.when('/earnings', {
		templateUrl: 'earnings.html',
		controller: 'earningsCtrl'
	});

}])
.run(function($rootScope, $location, $timeout){

	$rootScope.$on('$routeChangeError', function() {
        $location.path("/error");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });

	$rootScope.tipTotal = 0;
	$rootScope.mealCount = 0;
	$rootScope.avrTip = 0;

	$rootScope.subtotal = 0;
	$rootScope.tip = 0;
	$rootScope.customerTotal = 0;
})
.controller("homeCtrl", function($rootScope, $scope){

})
.controller("mealCtrl", function($rootScope, $scope){
	$scope.form = {
		basePrice : '',
		taxRate : '',
		tipPercentage : ''
	}

	$scope.submitMealDetails = function(){
		if( $scope.mealDetails.$valid ) {

			$rootScope.subtotal = getPerc($scope.mealDetails.taxRate.$modelValue, $scope.mealDetails.basePrice.$modelValue) + $scope.mealDetails.basePrice.$modelValue;
			$rootScope.tip = getPerc($scope.mealDetails.tipPercentage.$modelValue, $scope.mealDetails.basePrice.$modelValue);

			$rootScope.customerTotal = getTotal($rootScope.subtotal, $rootScope.tip);

			$rootScope.tipTotal = $rootScope.tipTotal + $rootScope.tip;
			$rootScope.mealCount = $rootScope.mealCount + 1;
			$rootScope.avrTip = $rootScope.tipTotal / $rootScope.mealCount;

			$scope.form = {};
			$scope.mealDetails.$setPristine();
			$scope.mealDetails.$setUntouched();

		}else{

		}
	}

})
.controller("earningsCtrl", function($rootScope,$scope){

	$scope.resetData = function(){

			console.log('asdf');

			$rootScope.tipTotal = 0;
			$rootScope.mealCount = 0;
			$rootScope.avrTip = 0;

			$rootScope.subtotal = 0;
			$rootScope.tip = 0;
			$rootScope.customerTotal = 0;
			
	}

});