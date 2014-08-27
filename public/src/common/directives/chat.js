angular.module('directives.chat',['services.opencom','directives.file'])

.directive('chat', ['$rootScope','$compile','opencom',function($rootScope,$compile,opencom) {
  return {
     //restrict it's use to attribute only.
    restrict: 'E',

    templateUrl: "chat.html",

    //set up the directive. use the same scope as the controller
    link: function(scope, elem, attr) {
      if($rootScope.chatRender){
        $rootScope.chatRender();
      }

      var $chat=$("#scroller_chat");

      $chat.perfectScrollbar();
         
      $(".chat_txt").keypress(function(event){
        if ( event.which == 13 ) {
          scope.sendMessage();
          event.preventDefault();
        }       
      });

      scope.sendFile = function(){
          $("#file").click();
      };

      $("#file").change(function(e) {
        scope.file = e.target.files[0];
        scope.byteSize = scope.file.size;
        scope.fileSize = bytesToSize(scope.file.size);
        angular.forEach(scope.messagePool,function(number,receiver){
          $rootScope.opencom.phone.sendMessage(number,"I send you a file","text/plain");
          scope.fileId = $rootScope.opencom.phone.sendFile(number, scope.file);
          goBottom();
        });
        $("#scroller_chat").append(
          $compile('<sendfile file="{{file}}" file-id="{{fileId}}" file-size="{{fileSize}}" byte-size="{{byteSize}}"></sendfile>')(scope)
        );          
      });
  
      opencom.bindEvent("onFileIncoming",function(e ){
        scope.remote = e.remote;
        scope.byteSize = e.size;
        scope.fileSize = bytesToSize(e.size);
        scope.fileId = e.fileId;
        scope.fileName = e.fileName;
        $("#scroller_chat").append(
          $compile('<receivefile remote="{{remote}}" file-id="{{fileId}}" byte-size="{{byteSize}}" file-name="{{fileName}}" file-size="{{fileSize}}"></receivefile>')(scope)
        );
        goBottom();        
      });


      scope.sendMessage = function(){
        var $txtInput=$(".chat_txt"),
            msg=$txtInput.val(),
            msgHtml = '<ul class="clearfix"><li class="patientAvatar"><img src="' + $rootScope.patient.PatImage + '" width="80" height="80" /></li>' + 
                      '<li class="patientDialog" style="max-width:'+$rootScope.chatDialogMaxWidth+'px;" ><span></span>' + msg + '</li></ul>';
        if(msg !== ""){
            angular.forEach(scope.messagePool,function(number,receiver){
              $rootScope.opencom.phone.sendMessage(number, msg, "text/plain");
            });
            $(msgHtml).appendTo("#scroller_chat");
            goBottom();
        }
        $txtInput.val("").focus();
        return false;
      };

      function goBottom() {
        $("#scroller_chat").scrollTop($("#scroller_chat")[0].scrollHeight);
      } 

      var chatHtml = function(imageUrl, contentBody){
        return '<ul class="clearfix"><li class="doctorAvatar"><img src="' + imageUrl + '" width="80" height="80" /></li>' + 
          '<li class="doctorDialog" style="max-width:'+$rootScope.chatDialogMaxWidth+'px;" ><span></span>' + contentBody + '</li></ul>';
      };  

      function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0){
            return 'n/a';
        }

        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        if (i === 0){
            return bytes + ' ' + sizes[i];
        }

        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
      }      

      //Receive message, strip unsafe tags with $sanitize
      opencom.bindEvent('onMessage',function (remote, contentBody, contentType) {
        console.log("Incoming message");
        scope.$apply(function(){
          var msgHtml = "";
          if(scope.appointment.Doctor.DocNum === remote){
            msgHtml = chatHtml(scope.appointment.Doctor.DocImage, contentBody);
            console.log("Condition 1");                              
          } 
          else if(scope.appointment.InvitedDoctor && scope.appointment.InvitedDoctor.DocNum === remote){
            msgHtml = chatHtml(scope.appointment.InvitedDoctor.DocImage, contentBody);
            console.log("Condition 3");             
          }
          else{
            //the invited doctor 
            msgHtml = chatHtml('public/assets/images/icon27.png', contentBody);
            console.log("Condition 2");                        
          }
          //turn the string to html element
          $(msgHtml).appendTo("#scroller_chat");
          goBottom(); 

          if(!scope.onMessageTab){
            scope.messageNum = scope.messageNum + 1;
          }

        });
      });

    }
  };
}]);