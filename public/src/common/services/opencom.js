angular.module('services.opencom',[]);

angular.module('services.opencom').factory('opencom', function ($rootScope) {
  return {
    bindEvent: function(eventName,callback){
      OpenCom.unbindEvent(eventName);
      $rootScope.opencom.phone[eventName](callback);
    },

    //the opencom events are attached on OpenComEventDispatcher div, just remove the div
    removeAllListeners: function(){
      $('#OpenComEventDispatcher').remove();
    }
  };
});