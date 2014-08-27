angular.module( 'webrcs.home', [
	'ui.router',
	'ui.bootstrap'
])
.config(function config( $stateProvider ) {
	$stateProvider.state( 'call', {
		url: '/call',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/call.tpl.html'
			}
		}
	})
	.state('chat', {
		url: '/chat',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/chat.tpl.html'
			}
		}
	})
	.state('group_chat', {
		url: '/group_chat',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/group_chat.tpl.html'
			}
		}
	})
	.state('file', {
		url: '/file',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/file.tpl.html'
			}
		}
	})
	.state('message', {
		url: '/message',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/message.tpl.html'
			}
		}
	})
	.state('conference', {
		url: '/conference',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/conference.tpl.html'
			}
		}
	})
	.state('presence', {
		url: '/presence',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/presence.tpl.html'
			}
		}
	})
	.state('capability_discovery', {
		url: '/capability_discovery',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/capability_discovery.tpl.html'
			}
		}
	})
	.state('subscription', {
		url: '/subscription',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/subscription.tpl.html'
			}
		}
	})
	;
})
.controller( 'HomeCtrl', ['$rootScope', '$scope', 'opencom', '$location','$sce', '$window', '$http', '$templateCache', function HomeController( $rootScope, $scope, opencom, $location, $sce, $window, $http, $templateCache ) {
	$scope.console = "console.html";

	/*************************Check Login*************************/	
	if(angular.isUndefined($rootScope.opencom)){
		$location.path('/login');
	}

	/*************************Log out*************************/
	
	$scope.logoff = function(){
		$rootScope.opencom.phone.deleteChannel();
		$location.path('/login');
	};
	

	//old version
	/*
	$scope.logoff = function(){
		$rootScope.opencom.phone.logoff();
		$location.path('/login');
	};
	*/

	/*************************Video Constraints*************************/
	$scope.isVideo = true;

    function gotSources(sourceInfos) {
		var $videoSelect = $("select#camera");
		for (var i = 0; i != sourceInfos.length; ++i) {
			var sourceInfo = sourceInfos[i];
			if (sourceInfo.kind === 'video') {
				var option = document.createElement("option");
				option.value = sourceInfo.id;
				option.text = sourceInfo.label || 'camera ' + ($videoSelect.find("option").size() + 1);
				$videoSelect.append(option);
			}
		}
    }

    if (typeof MediaStreamTrack === 'undefined') {
        alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
    } else {
        MediaStreamTrack.getSources(gotSources);
    }

    function getVideoConstraints() {
        //var videoConstraints = $("#isVideoCheckbox").prop('checked');
        var videoConstraints = $scope.isVideo;
        if (videoConstraints) {
            videoConstraints = {optional: [{sourceId: $("select#camera").val()}]};
            var resolution = $("select#resolution").val();
            if (resolution === "Default") {
                
            }
            else if (resolution === "QVGA"){
				videoConstraints.mandatory = {maxWidth: 320, maxHeight: 180};
            }                 
            else if (resolution === "VGA") {
                videoConstraints.mandatory = {maxWidth: 640, maxHeight: 360};
            }
            else if (resolution === "HD"){
                videoConstraints.mandatory = {maxWidth: 1280, maxHeight: 720};
            }
        }
        return videoConstraints;
    }


    /*************************Call*************************/ //Unfinished
	$scope.remote = "";

	$scope.call = function(){
		var sessionId = $rootScope.opencom.phone.call($scope.remote, $scope.isVideo,
			function gotRemoteStream(stream) {
				attachMediaStream(callBox.remoteVideo, stream);// You must also attach audio stream to an element(no need to attach to DOM), otherwise you can not hear the audio.
				//Need to check
				//callBox.recordRTC = new RecordRTC(stream, $scope.isVideo ? videoRecordOptions : audioRecordOptions);
				//callBox.record.disabled = false;
			}, 
			function gotLocalStream(stream) { 
				if ($scope.isVideo) {
					attachMediaStream(callBox.localVideo, stream);
				}
			});

		if (sessionId) {
			var callBox = creatCallBox(false, $scope.remote, $scope.isVideo, sessionId);
			$("#callArea").append(callBox);
		}

	}; 

	opencom.bindEvent('onIncoming',function (remote, isVideo, sessionId) {
		if (isVideo && !getVideoConstraints()) {isVideo = false;}
        var callBox = creatCallBox(true, remote, isVideo, sessionId);
        $("#callArea").append(callBox);
		$("#ring").get(0).play();
	});

	opencom.bindEvent('onAnswer',function (sessionId) {
		$("#ringback").get(0).pause();
	});

	opencom.bindEvent('onRing',function (sessionId) {
		$("#ringback").get(0).play();
	});

	opencom.bindEvent('onHangup',function (reason, sessionId) {
		var callBox = document.getElementById(sessionId);
		if (callBox) {
			/*
			if (callBox.record.value == "Stop") {
				callBox.record.onclick();
			}
			*/
			callBox.parentNode.removeChild(callBox);
		}

		$("#ring").get(0).pause();
		$("#ringback").get(0).pause();
	});
	

	/*************************Message*************************/  //Receive messages on other page unfinished
	/*
	$scope.sendMessageTo = "1002";
	$scope.messageBody = "Hello!";
	$scope.messages = "";
	$scope.trustMessages = $sce.trustAsHtml($scope.messages);

	$scope.sendMessage = function() {
		var result = $rootScope.opencom.phone.sendMessage($scope.sendMessageTo, $scope.messageBody, "text/plain");
		//You can add some extral sip headers by the following format. 
		//$rootScope.opencom.phone.sendMessage($scope.sendMessageTo, "http://maps.google.com/?q=" + reporterLon + "," + reporterLat, "text/plain", [{name:"Accept-Contact", value:"*;+g.oma.sip-im;geography.Info"}]);
		if (result) {
			$scope.messages = $scope.messages + "me: " + $scope.messageBody + "<br/>";
			$scope.trustMessages = $sce.trustAsHtml($scope.messages);
		}
	};

	opencom.bindEvent('onMessage',function (remote, contentBody, contentType) {
		$scope.messages =  $scope.messages + remote + ": " + contentBody + "<br/>";
		$scope.trustMessages = $sce.trustAsHtml($scope.messages);
		$scope.$apply();
	});
	*/

	/*************************RCS Chat*************************/
	$scope.chatWith = "";

	$scope.chat = function() {
		var sessionId = $rootScope.opencom.phone.chat($scope.chatWith);
		if (sessionId) {
			var chatBox = creatChatBox(sessionId, $scope.chatWith);
			$("#chatArea").append(chatBox);
		}
	};

	opencom.bindEvent('onChatMessageReceived',function (e) { //e: {remote:"xxx", sessionId:"xxx", contentType:"xxx", contentBody:"xxx"}
		var chatBox = document.getElementById(e.sessionId);
		if (!chatBox) {
			chatBox = creatChatBox(e.sessionId, e.remote);
			$("#chatArea").append(chatBox);
		}
		if( e.contentType == "application/im-iscomposing+xml"){
			if(e.contentBody == "active"){
				chatBox.boardFrame.pending.style.display="block";
			} else if(e.contentBody == "idle"){
				chatBox.boardFrame.pending.style.display="none";
			}
		} else {
			chatBox.boardFrame.board.innerHTML += '<div class="clearfix">'+
										'<div class="chat_msg"><em></em>'+
										'<span>'+e.contentBody+'</span></div></div>';
			chatBox.boardFrame.scrollTop = chatBox.boardFrame.scrollHeight;
		}
		
		$scope.$apply();
	});

	opencom.bindEvent('onChatClose',function (e) {//e: {sessionId:"xxx", reason:"xxx"}
		var chatBox = document.getElementById(e.sessionId);
		if (chatBox) {
			chatBox.parentNode.removeChild(chatBox);
		}
		$scope.$apply();
	});

	/*************************RCS Group Chat*************************/
	$scope.groupChatWith = [];
	$scope.newParticipant = "";
	$scope.addParticipantError = "";

	$scope.addNewParticipant = function(){
		$scope.newParticipant.replace(" ", "");
		if($scope.newParticipant === ""){
			$scope.addParticipantError = "Please add a valid participant!";
		} else {
			$scope.groupChatWith.push($scope.newParticipant);
			$scope.addParticipantError = "";
			$scope.newParticipant = "";
		}
		
	};

	$scope.groupChat = function() {
		if($scope.groupChatWith.length !== 0){
			var sessionId = $rootScope.opencom.phone.groupChat($scope.groupChatWith);
			if (sessionId) {
				var chatBox = createGroupChatBox(sessionId, $rootScope.username, $scope.groupChatWith);
				$("#groupChatArea").append(chatBox);
				$scope.groupChatWith = [];
				$scope.newParticipant = "";
			}
		} else {
			alert("Please add a participant first!");
		}	
	};

	opencom.bindEvent('onGroupChatIncoming',function (e) { //e: {sessionId:"xxx", originator:"xxx", participants:[]}
		var chatBox = createGroupChatBox(e.sessionId, e.originator, e.participants);
		$("#groupChatArea").append(chatBox);

	});

	opencom.bindEvent('onGroupChatMessageReceived', function (e) { //e: {remote:"xxx", sessionId:"xxx", contentType:"xxx", contentBody:"xxx"}
		var chatBox = document.getElementById(e.sessionId);
		if (chatBox) {
			if( e.contentType == "application/im-iscomposing+xml"){
				/*
				if(e.contentBody == "active"){
					chatBox.pending.style.display="block";
				} else if(e.contentBody == "idle"){
					chatBox.pending.style.display="none";
				}
				*/
			} else {
			chatBox.rightbox.boardFrame.board.innerHTML += '<div class="clearfix">'+e.remote+
										'<div class="chat_msg"><em></em>'+
										'<span>'+e.contentBody+'</span></div></div>';

			chatBox.rightbox.boardFrame.scrollTop = chatBox.rightbox.boardFrame.scrollHeight;
			}
		}
				
	});

	opencom.bindEvent('onParticipantStatus', function (e){ //e: {sessionId:"xxx", participant:"xxx", status: "Invited"/"Connected"/"Disconnected"}
		var chatBox = document.getElementById(e.sessionId);
		if (chatBox) {
			chatBox.rightbox.boardFrame.board.innerHTML += (e.participant + " Status: " + e.status + "<br/>");

			if(e.status == "Connected"){
				var new_participant = document.createElement("p");
				new_participant.id = e.participant;
				new_participant.innerHTML = e.participant;
				chatBox.leftbox.leftbox_body.appendChild(new_participant);								
			} else if (e.status == "Disconnected"){
				var existed_participant = document.getElementById(e.participant);
				if(existed_participant){
					chatBox.leftbox.leftbox_body.removeChild(existed_participant);
				}
			}
			
		}
	});

	opencom.bindEvent('onGroupChatClose', function (e) { //e: {sessionId:"xxx", reason:"xxx"}
		var chatBox = document.getElementById(e.sessionId);
		if (chatBox) {
            chatBox.parentNode.removeChild(chatBox);
        }
	});

	/*************************RCS File Transfer*************************/ //
	$scope.sendFileTo = "";

	$scope.sendFile = function(){
		document.getElementById('path').click();
	};

    $("#path").change(function(e) {
        var files = e.target.files;
        for (var i = 0, f; f = files[i]; i++) {
            var remote = $scope.sendFileTo;
            var fileId = $rootScope.opencom.phone.sendFile(remote, f);
            if (fileId) {
                var fileBox = creatFileBox(false, remote, fileId, f.name, f.size, f.type);
                $("#fileArea").append(fileBox);
            }
         }
        
        $("#path").val("");
    });
    
    opencom.bindEvent('onFileIncoming', function (e) {//e: {remote:"xxx", fileId:"xxx", type:"xxx", name:"xxx", size:123}
        var fileBox = creatFileBox(true, e.remote, e.fileId, e.name, e.size, e.type);
        $("#fileArea").append(fileBox);
    });
    
    opencom.bindEvent('onFileTransferAccept', function (e) {//e: {fileId:"xxx"}
        var fileBox = document.getElementById(e.fileId);
        if (fileBox) {
            fileBox.processBar.innerHTML += "File Transfer Accept<br/>";
        }
    });
    
    opencom.bindEvent('onFileTransferSuccess', function (e) {//e: {fileId:"xxx"}
        var fileBox = document.getElementById(e.fileId);
        if (fileBox) {
            fileBox.processBar.innerHTML += "File Transfer Success<br/>";
            fileBox.abort.disabled = true;
            $rootScope.opencom.phone.closeFileTransfer(e.fileId);
        }
    });

    opencom.bindEvent('onFileLink', function (e) {//e: {remote:"xxx", fileId:"xxx", type:"xxx", name:"xxx", size:123, link:"xxx"}
        var fileBox = document.getElementById(e.fileId);
        if (fileBox) {
            fileBox.processBar.innerHTML += "<a target=\"_blank\" href=\"" + e.link + "\">Click to open or right click to save</a><br/>";
            fileBox.abort.disabled = true;
        }
    });
    
    opencom.bindEvent('onFileTransferClose', function (e) {//e: {fileId:"xxx", reason:"xxx"}
        var fileBox = document.getElementById(e.fileId);
        if (fileBox) {
			fileBox.processBar.innerHTML += "File Transfer Closed: reason=" + e.reason + "<br/>";
            fileBox.accept.disabled = true;
            fileBox.abort.disabled = true;
        }
    });

    


	/*************************Conference*************************/ //Unfinished
	/*
	$scope.roomId = "";
	$scope.displayName = "";
	$scope.isJoinRoom = true;

	$scope.createRoom = function(){
		$rootScope.opencom.phone.createRoom(); // or input a javascript Date() object as parameter
	};

	opencom.bindEvent('onCreatedRoom',function (e) {//e: {roomId:"xxx"}
		$("#board").append("Created a room: " + e.roomId + "<br/>" );
	});

	opencom.bindEvent('onCreateRoomError',function (e) {//e: {roomId:"xxx", reason:"xxx"}
		$("#board").append("Create room error: " + e.reason + "<br/>");
	});

	$scope.joinRoom = function() {
		$rootScope.opencom.phone.joinRoom($scope.roomId, $scope.displayName);
		$scope.isJoinRoom = false;
	};

	$scope.quitRoom = function(){
		$rootScope.opencom.phone.quitRoom($scope.roomId);
		$scope.isJoinRoom = true;
		$("#roomVideoArea").html("");
	};

	opencom.bindEvent('onJoinedRoom',function (e) {//e: {roomId:"xxx", members: [{id: "xxx", displayName:"xxx"}, ...], localStream:[object]}
		$("#board").append("Joined the room!<br/>" );
		console.log("Joined the room!");

		video = document.createElement("video");
		video.autoplay = "autoplay";
		video.className = "video";
		$("#roomVideoArea").append(video);
		attachMediaStream(video, e.localStream);
		$scope.$apply();
	});

	opencom.bindEvent('onJoinRoomError',function (e) {//e: {roomId:"xxx", reason:"xxx"}
		$scope.isJoinRoom = true;
		$("#board").append("Join the room error: " + e.reason + "<br/>");
		$scope.$apply();
	});

	opencom.bindEvent('onPeerJoinedRoom',function (e) {//e: {roomId:"xxx", peerId:"xxx", displayName:"xxx", stream:[object]}
		video = document.createElement("video");
		video.id = e.peerId;
		video.autoplay = "autoplay";
		video.className = "video";
		video.title = e.displayName + "(" + e.peerId + ")";
		$("#roomVideoArea").append(video);
		attachMediaStream(video, e.stream);
		$scope.$apply();
	});

	opencom.bindEvent('onPeerQuittedRoom',function (e) {//e: {roomId:"xxx", peerId:"xxx", displayName:"xxx"}
		$(document.getElementById(e.peerId)).remove();
		$scope.$apply();
	});
	*/


	/************************* Presence Module *************************/ //(Unfinished)
	/*
	$scope.freeText = "Hello World!";
	$scope.inviteContact = "sip:+8618312341035@c6.huawei.com";
	$scope.remoteContact = "";

	$scope.online = function(){
		var result = $rootScope.opencom.phone.publishPresenceInfo("online", $scope.freeText);
	};

	$scope.offline = function(){
		var result = $rootScope.opencom.phone.publishPresenceInfo("offline");
	};

	$scope.busy = function(){
		var result = $rootScope.opencom.phone.publishPresenceInfo("busy", $scope.freeText);
	};

	$scope.away = function(){
		var result = $rootScope.opencom.phone.publishPresenceInfo("away", $scope.freeText);
	};

	$scope.invitePresence = function(){
		var result = $rootScope.opencom.phone.inviteContactToSharePresence($scope.inviteContact);		
		// clear
		$scope.inviteContact = "";

	};

	$scope.acceptPresence = function(){
		var result = $rootScope.opencom.phone.acceptPresenceSharingInvitation($scope.remoteContact);		
		// clear
		$scope.remoteContact = "";
	};
	
	$scope.rejectPresence = function(){
		var result = $rootScope.opencom.phone.rejectPresenceSharingInvitation($scope.remoteContact);		
		// clear
		$scope.remoteContact = "";
	};
	*/

	/*************************Sensor*************************/
	/*
	opencom.bindEvent('onData',function (data) {
		//Need to check
		$("#board").append("Data: " + data + "<br/>");
	});
	*/


	/*************************Capability Discovery*************************/
	$scope.host = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/";
	$scope.capabilityHost = $scope.host + "webrcsserver/rest/capabilitydiscovery/v1/" + "tel:" + $rootScope.username + "/capabilitySources";
	$scope.contactHost = $scope.host + "webrcsserver/rest/capabilitydiscovery/v1/" + "tel:" + $rootScope.username + "/contactCapabilities";

	$scope.isSent = false;
	$scope.chatEnabled = true;
	$scope.ftEnabled = true;
	$scope.capabilityList = "";
	$scope.capabilityHeader = "";
	$scope.resourceURL = "";

	$scope.contact = "";

	$scope.capabilityData = {
		capabilitySource: {
			serviceCapability:[{ 
					capabilityId : "Chat",
					status : "Enabled"
				},{
					capabilityId : "FileTransfer",
					status:"Enabled"
				}
			]
		}
	};

	$scope.post = function(){
		$scope.isSent = false;

		$http({
			method: "POST",
			url: $scope.capabilityHost,
			data: $scope.capabilityData,
			headers: {'Authorization': $rootScope.b64Token}
		}).success(function(data, status, headers, config) {
			$scope.capabilityList = data;
			$scope.capabilityHeader = status;
			$scope.resourceURL = data.capabilitySource.resourceURL;
			$scope.isSent = true;
		}).error(function (data, status, headers, config) {
			alert("Post Capability Failed!");
		});
	};


	$scope.put_enable_chat = function(){
		$scope.isSent = false;

		if($scope.resourceURL === ""){
			alert("Please post your capability first!");
		}else{
			$scope.putEnableChatData = '<?xml version="1.0" encoding="UTF-8"?>' + 
						'<cd:capabilitySource xmlns:cd="urn:oma:xml:rest:netapi:capabilitydiscovery:1">' + 
							'<serviceCapability> <capabilityId>Chat</capabilityId> <status>Enabled</status></serviceCapability>' + 
							'<resourceURL>' + $scope.resourceURL + '</resourceURL>' + 
						'</cd:capabilitySource>';

			$http({
				method: "PUT",
				url: $scope.resourceURL,
				data: $scope.putEnableChatData,
				headers: {'Authorization': $rootScope.b64Token, 'Content-Type': 'application/xml'}
			}).success(function(data, status, headers, config) {
				$scope.capabilityList = data;
				$scope.capabilityHeader = status;
				$scope.isSent = true;
				$scope.chatEnabled = true;
			}).error(function (data, status, headers, config) {
				alert("Enable Chat Capability Failed!");
			});
		}			
	};

	$scope.put_enable_ft = function(){
		$scope.isSent = false;

		if($scope.resourceURL === ""){
			alert("Please post your capability first!");
		}else{
			$scope.putEnableFTData = '<?xml version="1.0" encoding="UTF-8"?>' + 
						'<cd:capabilitySource xmlns:cd="urn:oma:xml:rest:netapi:capabilitydiscovery:1">' + 
							'<serviceCapability> <capabilityId>FileTransfer</capabilityId> <status>Enabled</status></serviceCapability>' + 
							'<resourceURL>' + $scope.resourceURL + '</resourceURL>' + 
						'</cd:capabilitySource>';
			$http({
				method: "PUT",
				url: $scope.resourceURL,
				data: $scope.putEnableFTData,
				headers: {'Authorization': $rootScope.b64Token, 'Content-Type': 'application/xml'}
			}).success(function(data, status, headers, config) {
				$scope.capabilityList = data;
				$scope.capabilityHeader = status;
				$scope.isSent = true;
				$scope.ftEnabled = true;
			}).error(function (data, status, headers, config) {
				alert("Enable File Transfer Capability Failed!");
			});
		}
			
	};

	$scope.put_disable_chat = function(){
		$scope.isSent = false;

		if($scope.resourceURL === ""){
			alert("Please post your capability first!");
		}else{
			$scope.putDisableChatData = '<?xml version="1.0" encoding="UTF-8"?>' + 
						'<cd:capabilitySource xmlns:cd="urn:oma:xml:rest:netapi:capabilitydiscovery:1">' + 
							'<serviceCapability> <capabilityId>Chat</capabilityId> <status>Disabled</status></serviceCapability>' + 
							'<resourceURL>' + $scope.resourceURL + '</resourceURL>' + 
						'</cd:capabilitySource>';

			$http({
				method: "PUT",
				url: $scope.resourceURL,
				data: $scope.putDisableChatData,
				headers: {'Authorization': $rootScope.b64Token, 'Content-Type': 'application/xml'}
			}).success(function(data, status, headers, config) {
				$scope.capabilityList = data;
				$scope.capabilityHeader = status;
				$scope.isSent = true;
				$scope.chatEnabled = false;
			}).error(function (data, status, headers, config) {
				alert("Disable Chat Capability Failed!");
			});
		}			
	};

	$scope.put_disable_ft = function(){
		$scope.isSent = false;

		if($scope.resourceURL === ""){
			alert("Please post your capability first!");
		}else{
			$scope.putDisableFTData = '<?xml version="1.0" encoding="UTF-8"?>' + 
						'<cd:capabilitySource xmlns:cd="urn:oma:xml:rest:netapi:capabilitydiscovery:1">' + 
							'<serviceCapability> <capabilityId>FileTransfer</capabilityId> <status>Disabled</status></serviceCapability>' + 
							'<resourceURL>' + $scope.resourceURL + '</resourceURL>' + 
						'</cd:capabilitySource>';

			$http({
				method: "PUT",
				url: $scope.resourceURL,
				data: $scope.putDisableFTData,
				headers: {'Authorization': $rootScope.b64Token, 'Content-Type': 'application/xml'}
			}).success(function(data, status, headers, config) {
				$scope.capabilityList = data;
				$scope.capabilityHeader = status;
				$scope.isSent = true;
				$scope.ftEnabled = false;
			}).error(function (data, status, headers, config) {
				alert("Disable File Transfer Capability Failed!");
			});
		}
			
	};

	$scope.get_self = function(){
		$scope.isSent = false;

		$http({
			method: "GET",
			//url: $scope.capabilityHost + "?statusFilter=Enabled",
			url: $scope.capabilityHost,
			headers: {'Authorization': $rootScope.b64Token, 'Content-Type': 'application/xml'}
		}).success(function(data, status, headers, config) {
			$scope.capabilityList = data;
			$scope.capabilityHeader = status;
			$scope.isSent = true;
		}).error(function (data, status, headers, config) {
			alert("Get Self Capability List Failed!");
		});
	};

	$scope.get_contact = function(){
		$scope.isSent = false;

		$http({
			method: "GET",
			url: $scope.contactHost + "/tel:" + $scope.contact,
			headers: {'Authorization': $rootScope.b64Token, 'Content-Type': 'application/xml'}
		}).success(function(data, status, headers, config) {
			$scope.capabilityList = data;
			$scope.capabilityHeader = status;
			$scope.isSent = true;
		}).error(function (data, status, headers, config) {
			alert("Get Contact Capability List Failed!");
		});
	};

	$scope.delete_capability = function(){
		$scope.isSent = false;

		if($scope.resourceURL === ""){
			alert("Please post your capability first!");
		}else{
			$http({
				method: "DELETE",
				url: $scope.resourceURL,
				headers: {'Authorization': $rootScope.b64Token}
			}).success(function(data, status, headers, config) {
				$scope.capabilityList = data;
				$scope.capabilityHeader = status;
				$scope.isSent = true;
			}).error(function (data, status, headers, config) {
				alert("Delete Chat Capability Failed!");
			});			
		}
	};





	/*************************Subscription Management*************************/
	/*
	$scope.subscriptionNumber = "";

	$scope.imSubscriptionID = "";
	$scope.ftSubscriptionID = "";
	
	$scope.imNote = "";
	$scope.ftNote = "";

	$scope.token = "";

	$scope.channelCreated = false;
	$scope.imSubscriptionCreated = false;
	$scope.ftSubscriptionCreated = false;
	$scope.callbackURL = "";
	$scope.channelResourceURL = "";
	$scope.imResourceURL = "";
	$scope.ftResourceURL = "";

	var channelData = { 
		notificationChannel: { 
			applicationTag: "myApp",
			channelData: {
				type: "nc:LongPollingData",
				maxNotifications: "1"  // Note, OMA standard requires Value of JSON go between "", even the value is a number or a boolean.
			},
			clientCorrelator: Math.random()+"",
			channelLifetime: "7200", 
			channelType: "LongPolling" 
		}
	};

	var chatData = { 
		chatNotificationSubscription: {
			callbackReference: {
				callbackData: "chat",
				notifyURL: $scope.callbackURL
			},
			clientCorrelator: Math.random()+"",
				duration: "7200",
				confirmedChatSupported: "true",
				adhocChatSupported: "false"
		}
	};

	$scope.createChannel = function(){
		var token =  "token:" + $scope.subscriptionNumber + "," + "123456"; // Fake token, we need AuthServerDemo application to deal with this token
		var b64Token = window.btoa(unescape(encodeURIComponent( token )));
		$scope.token = "Bearer " + b64Token;

		$http({
			url: $scope.host + 'notificationserver/notificationchannel/v1/tel:' + $scope.subscriptionNumber + '/channels',
			method: "POST",
			data: channelData,
			headers: {'Authorization': $scope.token }
		}).success(function(data, status, headers, config) {
			$scope.callbackURL = data.notificationChannel.callbackURL;
			$scope.channelResourceURL = data.notificationChannel.resourceURL;
			$scope.channelCreated = true;
		}).error(function (data, status, headers, config) {
			alert("Create Channel Failed!");
		});
	};

	$scope.deleteChannel = function(){
		$http({
			url: $scope.channelResourceURL,
			method: "DELETE",
			headers: {'Authorization': $scope.token }
		}).success(function(data, status, headers, config) {
			$scope.notificationChannel = "";
			$scope.channelCreated = false;
		}).error(function (data, status, headers, config) {
			alert("Delete Channel Failed!");
		});
	};

	$scope.createIMSubscription = function(){
		if($scope.callbackURL !== ""){
			$http({
				url: $scope.host + 'webrcsserver/rest/chat/v1/tel:' + $scope.subscriptionNumber + '/subscriptions',
				method: "POST",
				data: chatData,
				headers: {'Authorization': $scope.token }
			}).success(function(data, status, headers, config) {
				$scope.imResourceURL = data.chatNotificationSubscription.resourceURL;
				var imArray = data.chatNotificationSubscription.resourceURL.split("/");
				$scope.imSubscriptionID = imArray[imArray.length-1];
				$scope.imSubscriptionCreated = true;
			}).error(function (data, status, headers, config) {
				alert("Create IM Subscription Failed!");
			});
		}else{
			alert("Please create channel first!");
		}
	};	

	$scope.deleteIMSubscription = function(){
		if($scope.imResourceURL !== ""){
			$http({
				url: $scope.imResourceURL,
				method: "DELETE",
				headers: {'Authorization': $scope.token }
			}).success(function(data, status, headers, config) {
				$scope.imSubscriptionID = "";
				$scope.imResourceURL = "";
				$scope.imSubscriptionCreated = false;
			}).error(function (data, status, headers, config) {
				alert("Delete IM Subscription Failed!");
			});
		}else{
			alert("Please create IM subscription first!");
		}
	};

	$scope.createFTSubscription = function(){
		if($scope.callbackURL !== ""){
			$http({
				url: $scope.host + 'webrcsserver/rest/filetransfer/v1/tel:' + $scope.subscriptionNumber + '/subscriptions',
				method: "POST",
				data: fileData,
				headers: {'Authorization': $scope.token }
			}).success(function(data, status, headers, config) {
				$scope.ftResourceURL = data.fileTransferNotificationSubscription.resourceURL;
				var ftArray = data.fileTransferNotificationSubscription.resourceURL.split("/");
				$scope.ftSubscriptionID = ftArray[ftArray.length-1];
				$scope.ftSubscriptionCreated = true;
			}).error(function (data, status, headers, config) {
				alert("Create FT Subscription Failed!");
			});
		}else{
			alert("Please create channel first!");
		}
	};

	$scope.deleteFTSubscription = function(){
		if($scope.ftResourceURL !== ""){
			$http({
				url: $scope.ftResourceURL,
				method: "DELETE",
				headers: {'Authorization': $scope.token }
			}).success(function(data, status, headers, config) {
				$scope.ftSubscriptionID = "";
				$scope.ftResourceURL = "";
				$scope.ftSubscriptionCreated = false;
			}).error(function (data, status, headers, config) {
				alert("Delete FT Subscription Failed!");
			});
		}else{
			alert("Please create FT subscription first!");
		}
	};
	*/
	

	/************************* Menu Control *************************/
	$("#menu-toggle").click(function(e) {
		//Need to check
		e.preventDefault();
		$("#wrapper").toggleClass("active");
	});



	//private function
	function creatCallBox(isIncoming, remote, isVideo, sessionId) {
        var box = document.createElement("div");
        var title = document.createElement("div");
        var answer = document.createElement("input");
        var hangup = document.createElement("input");
        /*
        var record = document.createElement("input");
        var snapshot = document.createElement("input");
        */
        
        box.appendChild(title);
        if (isIncoming) {box.appendChild(answer);}
        box.appendChild(hangup);
        /*
        box.appendChild(record);
        if (isVideo) {box.appendChild(snapshot);}
        */
        
        box.id = sessionId;
        box.className = "well callBox col-md-9";
        //box.record = record;
        
        title.innerHTML = isIncoming ? ((isVideo ? "Incoming video call from " : "Incoming voice call from ") + remote)
                : ((isVideo ? "Outgoing video call to " : "Outgoing voice call to ") + remote);
        
        var videoArea = document.createElement("div");
        var localVideoArea = document.createElement("div");
        var localVideo = document.createElement("video");
        var remoteVideoArea = document.createElement("div");
        var remoteVideo = document.createElement("video");
        var clearBoth = document.createElement("div");
        
        videoArea.appendChild(remoteVideoArea);
        videoArea.appendChild(localVideoArea);        
        localVideoArea.appendChild(localVideo);
        remoteVideoArea.appendChild(remoteVideo);
        videoArea.appendChild(clearBoth);
        if (!isIncoming && isVideo)  {box.appendChild(videoArea);}

        localVideoArea.className="small_img";
        remoteVideoArea.className="big_img";
        
        localVideo.autoplay = "autoplay";
        remoteVideo.autoplay = "autoplay";
        localVideo.className = "video";
        remoteVideo.className = "video";
        localVideo.width = "217";
        localVideo.height = "162";
        remoteVideo.width = "600";
        remoteVideo.height = "450";
        clearBoth.style.clear = "both";
        
        box.localVideo = localVideo;
        box.remoteVideo = remoteVideo;

        if(isVideo === false){
			localVideo.style.display = "none";
			remoteVideo.style.display = "none";
        }
        
        // answer button
        answer.value = "Answer";
        answer.type = "button";
        answer.className = "btn btn-md btn-primary";
        answer.onclick = function () {
            $rootScope.opencom.phone.answer(sessionId,
                function gotRemoteStream(stream) {
					attachMediaStream(remoteVideo, stream);
					//Need to check
					//box.recordRTC = new RecordRTC(stream, isVideo ? videoRecordOptions : audioRecordOptions);
					//record.disabled = false;
				}, 
                function gotLocalStream(stream) { 
					if (isVideo) {
						attachMediaStream(localVideo, stream);
					}
				},
				true);
				//getVideoConstraints()); // videoConstraints can be undefined (will use incoming isVideo tag), false (force no video), true (use webrtc default video), or webrtc constraints object


            if (isVideo) {box.appendChild(videoArea); } 
            this.disabled = true;
            document.getElementById('ring').pause();
        };

        // hangup button
        hangup.value = "Hangup";
        hangup.type = "button";
        hangup.className = "btn btn-md btn-primary";
        hangup.onclick = function () {
            $rootScope.opencom.phone.hangup(sessionId);
            document.getElementById('ring').pause();
            document.getElementById('ringback').pause();
            //if (record.value == "Stop") {record.onclick(); }
            box.parentNode.removeChild(box);
        };
        
        // record button
        /*
        record.value = "Record";
        record.type = "button";
        record.className = "btn btn-md btn-primary";
        record.disabled = true;
        record.onclick = function () {
            if (this.value == "Record") {
                box.recordRTC.startRecording();
                this.value = "Stop";
            } else {
                box.recordRTC.stopRecording(function(mediaURL) {
                    $("#board").append("<a target=\"_blank\" href=\"" + mediaURL + "\">The record media of " + remote + "</a><br/>");
                });
                this.value = "Record";
            }
        };
        */
        
        // snapshot button
        /*
        snapshot.value = "Snapshot";
        snapshot.type = "button";
        snapshot.className = "btn btn-md btn-primary";
        snapshot.onclick = function () {
            var canvas = document.createElement('canvas');
            canvas.width = remoteVideo.videoWidth;
            canvas.height= remoteVideo.videoHeight;
            canvas.getContext('2d').drawImage(remoteVideo, 0, 0);
            var imageDataURL = canvas.toDataURL('image/png');
            $("#board").append("<a target=\"_blank\" href=\"" + imageDataURL + "\">The Snapshot of " + remote + "</a><br/>");
        };
        */

        return box;
    }

    function creatChatBox(sessionId, remote) {
        var box = document.createElement("div");
        var title = document.createElement("p");
        var board = document.createElement("p");
        var pending = document.createElement("img");
        var input = document.createElement("input");
        var send = document.createElement("input");
        var close = document.createElement("input");
        var boardFrame = document.createElement("div");
        
        box.appendChild(title);
        box.appendChild(close);
        box.appendChild(input);
        box.appendChild(send);
        box.appendChild(boardFrame);


        boardFrame.appendChild(board);
        boardFrame.appendChild(pending);
        
        box.id = sessionId;
        box.className = "well col-md-6 chatBox";
        box.boardFrame = boardFrame;
        boardFrame.board = board;
        
        title.innerHTML = "Chat with " + remote;

        boardFrame.className = "chatBoard col-md-12";

        input.className = "form-control col-md-10 chatInput";
        input.onfocus = function () {
            $rootScope.opencom.phone.sendChatMessage(sessionId, "active", "application/im-iscomposing+xml");
        };
        input.onblur = function () {
            $rootScope.opencom.phone.sendChatMessage(sessionId, "idle", "application/im-iscomposing+xml");
        };

        boardFrame.pending = pending;
        pending.src="assets/images/pending.gif";
        pending.style.display="none";
        
        send.value = "Send";
        send.type = "button";
        send.className = "btn btn-md btn-primary col-md-2 chatSend";
        send.onclick = function () {
			if(input.value.trim() !== ""){
                var messageId = $rootScope.opencom.phone.sendChatMessage(sessionId, input.value, "text/plain");
                board.innerHTML +=  '<div class="chat_opp clearfix"><div class="chat_msg"><em></em><span>'+
									input.value +'</span></div><br/>';
				input.value = "";
				boardFrame.scrollTop = boardFrame.scrollHeight;
			}
		};

        close.type = "button";
        close.value = "x";
        close.style.position = "absolute";
        close.style.top = "3px";
        close.style.right = "3px";
        close.className = "close";
        close.onclick = function () {
            $rootScope.opencom.phone.closeChat(sessionId);
            box.parentNode.removeChild(box);
        };

        return box;
    }

    function createGroupChatBox(sessionId, originator, participants) {
        var box = document.createElement("div");

        var leftbox = document.createElement("div");
        var rightbox = document.createElement("div");

        box.appendChild(leftbox);
        box.appendChild(rightbox);

        //leftbox elements
        var leftbox_head = document.createElement("div");
        var leftbox_hr = document.createElement("hr");
        var leftbox_body = document.createElement("div");

        var addParticipantText = document.createElement("input");
        var addParticipantBtn = document.createElement("span");

        var deleteParticipantText = document.createElement("span");
        var deleteParticipantBtn = document.createElement("span");

        leftbox.appendChild(leftbox_head);
        leftbox.appendChild(leftbox_hr);
        leftbox.appendChild(leftbox_body);

        leftbox.className = "RequestGeaders_Widget_headersFormPanel col-md-5";
        leftbox_head.className = "RequestGeaders_Widget_flex";
        leftbox_body.className = "RequestGeaders_Widget_flex";

        //leftbox head
        addParticipantText.type="text";
        addParticipantText.className = "gwt-SuggestBox";
        addParticipantText.placeholder = "Number";

        addParticipantBtn.className = "removeButton";
        addParticipantBtn.title = "Add";
        addParticipantBtn.innerHTML = "+";

        leftbox_head.appendChild(addParticipantText);
        leftbox_head.appendChild(addParticipantBtn);


        //leftbox body
        //deleteParticipantBtn.className = "removeButton";
        //deleteParticipantBtn.title = "Remote";
        //deleteParticipantBtn.innerHTML = "x";
        box.leftbox = leftbox;
        leftbox.leftbox_body = leftbox_body;

        addParticipantBtn.onclick = function() {
			var addparts = addParticipantText.value.replace(" ", "").split(",");
			$rootScope.opencom.phone.addParticipants(sessionId, addparts);
			var messageId = $rootScope.opencom.phone.sendGroupChatMessage(sessionId, addParticipantText.value + ' was invited to join group chat', "text/plain");
			board.innerHTML += '<div>' + addParticipantText.value + ' was invited to join group chat';
        };

        //rightbox elements
        var title = document.createElement("div");
        var boardFrame = document.createElement("div");
        var board = document.createElement("p");
        var pending = document.createElement("p");
        var input = document.createElement("input");
        var send = document.createElement("input");
        var close = document.createElement("input");
        
        rightbox.appendChild(title);
        rightbox.appendChild(close);
        rightbox.appendChild(input);
        rightbox.appendChild(send);
        rightbox.appendChild(boardFrame);

        boardFrame.appendChild(board);
        boardFrame.appendChild(pending);

        rightbox.className = "col-md-7";
        
        box.id = sessionId;
        box.style.position = "relative";
        box.className = "well col-md-10";


        //rightbox
        box.rightbox = rightbox;
        rightbox.boardFrame = boardFrame;
        boardFrame.board = board;
        
        title.className = "col-md-9 chatTitle";
        title.innerHTML = "Group Chat, Originator: " + originator;

        input.className = "form-control col-md-10 chatInput";
        input.onfocus = function () {
            $rootScope.opencom.phone.sendGroupChatMessage(sessionId, "active", "application/im-iscomposing+xml");
        };
        input.onblur = function () {
            $rootScope.opencom.phone.sendGroupChatMessage(sessionId, "idle", "application/im-iscomposing+xml");
        };

        boardFrame.className = "chatBoard col-md-12";

        boardFrame.pending = pending;
        pending.style.display="none";
        
        send.value = "Send";
        send.type = "button";
        send.className = "btn btn-md btn-primary col-md-2 chatSend";
        send.onclick = function () {
			if(input.value.trim() !== ""){
				var messageId = $rootScope.opencom.phone.sendGroupChatMessage(sessionId, input.value, "text/plain");
				board.innerHTML += '<div class="chat_opp clearfix"><div class="chat_msg"><em></em><span>'+
											input.value +'</span></div><br/>';
				input.value = "";
				boardFrame.scrollTop = boardFrame.scrollHeight;
			}
        };

        close.type = "button";
        close.value = "Leave";
        close.className = "btn btn-md btn-primary col-md-3";
        close.onclick = function () {
			if (this.value === "Leave") {
                $rootScope.opencom.phone.leaveGroupChat(sessionId);
                close.value = "Re-join";
                leftbox_body.innerHTML = "";
            } else {
                $rootScope.opencom.phone.addParticipants(sessionId, [$rootScope.username]);
                close.value = "Leave";
            }            
            //box.parentNode.removeChild(box);
        };

        return box;
    }
          
    function creatFileBox(isIncoming, remote, fileId, fileName, size, type) {
        var box = document.createElement("div");
        var title = document.createElement("div");
        var accept = document.createElement("input");
        var abort = document.createElement("input");
        var processBar = document.createElement("div");
        var close = document.createElement("input");
        
        box.appendChild(title);
        box.appendChild(close);
        if (isIncoming) {box.appendChild(accept);}
        box.appendChild(abort);
        box.appendChild(processBar);
        
        box.id = fileId;
        box.className = "well fileBox";
        box.processBar = processBar;
        box.abort = abort;
        
        title.innerHTML = isIncoming ? (remote + " send file: \"" + fileName + "\"(" + type +  ") to you, size " + bytesToSize(size))
                : ("send file: \"" + fileName + "\"(" + type + ") to " + remote + ", size " + bytesToSize(size));
        
        box.accept = accept;
        accept.value = "Accept";
        accept.type = "button";
        accept.className = "btn btn-md btn-primary col-md-2 chatSend";
        accept.onclick = function () {
            $rootScope.opencom.phone.acceptFileTransfer(fileId); 
            this.disabled = true;
        };
        
        abort.value = " Abort ";
        abort.type = "button";
        abort.className = "btn btn-md btn-primary col-md-2 chatSend";
        abort.onclick = function () {
            $rootScope.opencom.phone.closeFileTransfer(fileId);
            this.disabled = true;
            if (isIncoming) {accept.disabled = true;}
        };
        
        processBar.innerHTML = "";
        processBar.totalsize = size;

        close.type = "button";
        close.value = "x";
        close.style.position = "absolute";
        close.style.top = "3px";
        close.style.right = "3px";
        close.className = "close";
        close.onclick = function () {
            box.parentNode.removeChild(box);
        };

        return box;
    }

    function bytesToSize(bytes) {
		var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes === 0) {return 'n/a';}
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
		if (i === 0) {return bytes + ' ' + sizes[i]; }
		return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
	}



}])

;