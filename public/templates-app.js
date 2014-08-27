angular.module('templates-app', ['home/call.tpl.html', 'home/capability_discovery.tpl.html', 'home/chat.tpl.html', 'home/conference.tpl.html', 'home/console.tpl.html', 'home/file.tpl.html', 'home/group_chat.tpl.html', 'home/message.tpl.html', 'home/presence.tpl.html', 'home/subscription.tpl.html', 'login/login.tpl.html']);

angular.module("home/call.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/call.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>                      \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Call\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div>\n" +
    "                    <div class=\"col-md-2\">\n" +
    "                        <label for=\"isVideoCheckbox\">Enable Video </label><input id=\"isVideoCheckbox\" type=\"checkbox\" ng-model=\"isVideo\">\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-3 form-inline\">\n" +
    "                        <label for=\"camera\">Camera: </label><select id=\"camera\" class=\"form-control\"></select>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-3 form-inline\">\n" +
    "                        <label for=\"resolution\">Resolution: </label>\n" +
    "                        <select id=\"resolution\" class=\"form-control\">\n" +
    "                            <option value=\"Default\">Default</option>\n" +
    "                            <option value=\"QVGA\">QVGA</option>\n" +
    "                            <option value=\"VGA\">VGA</option>\n" +
    "                            <option value=\"HD\">HD</option>\n" +
    "                        </select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    " \n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-1\">\n" +
    "                    <input id=\"btn-call\" type=\"button\" value=\"Call\" class=\"btn btn-md btn-primary\" ng-click=\"call()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <input id=\"calleeText\" type=\"text\" class=\"form-control\" ng-model=\"remote\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" id=\"callArea\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div>\n" +
    "                <audio id=\"ring\" loop=\"loop\"><source src=\"assets/audio/ring.wav\" type=\"audio/wav\" /></audio>\n" +
    "                <audio id=\"ringback\" loop=\"loop\"><source src=\"assets/audio/ringback.wav\" type=\"audio/wav\" /></audio>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/capability_discovery.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/capability_discovery.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Capability Discovery\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "        	<!-- POST -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input type=\"button\" value=\"Publish Capability\" class=\"btn btn-md btn-primary\" ng-click=\"post()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- PUT -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-3\" ng-hide=\"chatEnabled\">\n" +
    "                    <input type=\"button\" value=\"Enable Chat Capability\" class=\"btn btn-md btn-primary\" ng-click=\"put_enable_chat()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\" ng-show=\"chatEnabled\">\n" +
    "                    <input type=\"button\" value=\"Disable Chat Capability\" class=\"btn btn-md btn-primary\" ng-click=\"put_disable_chat()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\" ng-hide=\"ftEnabled\">\n" +
    "                    <input type=\"button\" value=\"Enable File Transfer Capability\" class=\"btn btn-md btn-primary\" ng-click=\"put_enable_ft()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\" ng-show=\"ftEnabled\">\n" +
    "                    <input type=\"button\" value=\"Disable File Transfer Capability\" class=\"btn btn-md btn-primary\" ng-click=\"put_disable_ft()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- GET -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-5\">\n" +
    "                    <input type=\"button\" value=\"Get Self Capability List\" class=\"btn btn-md btn-primary\" ng-click=\"get_self()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "            	<div class=\"col-md-4\">\n" +
    "                    <input type=\"text\" class=\"form-control\" ng-model=\"contact\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-5\">\n" +
    "                    <input type=\"button\" value=\"Get Capability List\" class=\"btn btn-md btn-primary\" ng-click=\"get_contact()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <!-- DELETE -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input type=\"button\" value=\"Delete Capability\" class=\"btn btn-md btn-primary\" ng-click=\"delete_capability()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\" ng-show=\"isSent\">\n" +
    "            	<div class=\"Response_View_responseRow\"> \n" +
    "        			<div class=\"tabsPanel Response_View_result Response_View_bodyResult\">\n" +
    "        				<span class=\"tabCaption col-md-1\">Response</span>\n" +
    "        				<tabset>\n" +
    "							<tab heading=\"Raw\">\n" +
    "								<div class=\"Response_View_plainPanel\" style=\"width: 100%;\">{{capabilityHeader}}</div> \n" +
    "        						<div class=\"Response_View_plainPanel\" style=\"width: 100%;\">{{capabilityList}}</div> \n" +
    "							</tab> \n" +
    "						</tabset>\n" +
    "        			</div> \n" +
    "        		</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("home/chat.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/chat.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Chat\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-chat\" type=\"button\" value=\"Chat With\" class=\"btn btn-md btn-primary\" ng-click=\"chat()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input id=\"chatWith\" type=\"text\" class=\"form-control\" ng-model=\"chatWith\" placeholder=\"Phone Number\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" id=\"chatArea\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/conference.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/conference.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Conference\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-createRoom\" type=\"button\" value=\"Create Room\" class=\"btn btn-md btn-primary\" ng-click=\"createRoom()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" ng-show=\"isJoinRoom\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-joinRoom\" type=\"button\" value=\"Join Room\" class=\"btn btn-md btn-primary\" ng-click=\"joinRoom()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    Room ID:\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input id=\"roomId\" type=\"text\" class=\"form-control\" ng-model=\"roomId\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    Display Name:\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input id=\"displayName\" type=\"text\" class=\"form-control\" ng-model=\"displayName\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" ng-hide=\"isJoinRoom\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-quitRoom\" type=\"button\" value=\"Quit Room\" class=\"btn btn-md btn-primary\" ng-click=\"quitRoom()\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" id=\"roomVideoArea\">\n" +
    "                \n" +
    "            </div>\n" +
    "            <div class=\"row\" id=\"board\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/console.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/console.tpl.html",
    "");
}]);

angular.module("home/file.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/file.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs File Transfer\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input type=\"file\" id=\"path\" multiple style=\"display:none\"/>\n" +
    "                    <input id=\"btn-sendMessage\" type=\"button\" value=\"Send File To\" class=\"btn btn-md btn-primary\" ng-click=\"sendFile()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <input id=\"sendFileTo\" type=\"text\" class=\"form-control\" ng-model=\"sendFileTo\" placeholder=\"Phone Number\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" id=\"fileArea\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/group_chat.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/group_chat.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>\n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Group Chat\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-group-chat\" type=\"button\" value=\"Chat With\" class=\"btn btn-md btn-primary\" ng-click=\"groupChat()\" placeholder=\"Phone Number\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <div class=\"RequestHeaders_Widget_headersFormPanel\">\n" +
    "                        <div class=\"RequestHeaders_Widget_flex\">\n" +
    "                            <input type=\"text\" class=\"gwt-SuggestBox\" placeholder=\"Number\" ng-model=\"newParticipant\">\n" +
    "                            <span class=\"removeButton\" title=\"Add\" ng-click=\"addNewParticipant()\">+</span>\n" +
    "                            <span class=\"RequestHeaders_Widget_headerSupportHint\" ng-model=\"addParticipantError\"></span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\" ng-hide=\"groupChatWith.length === 0\">\n" +
    "                    <div class=\"well\">\n" +
    "                        <p>Group Chat With:</p>\n" +
    "                        <div class=\"RequestHeaders_Widget_headersFormPanel\">\n" +
    "                            <div class=\"RequestHeaders_Widget_flex\" ng-repeat=\"groupMember in groupChatWith track by $index\">\n" +
    "                                <div class=\"RequestHeaders_Widget_keyBoxContainer RequestHeaders_Widget_flex RequestHeaders_Widget_hasSupport\">\n" +
    "                                    <input type=\"text\" class=\"gwt-SuggestBox formKeyInput\" placeholder=\"Number\" ng-model=\"groupMember\" ng-value=\"groupMember\" readonly>\n" +
    "                                    <span class=\"gwt-InlineLabel RequestHeaders_Widget_headerSupportHint\"></span>\n" +
    "                                </div>\n" +
    "                                <div class=\"RequestHeaders_Widget_flex\">\n" +
    "                                    <span class=\"gwt-InlineLabel removeButton\" title=\"Remove\" ng-click=\"groupChatWith.splice($index, 1)\">x</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\" id=\"groupChatArea\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/message.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/message.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Send Message\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-sendMessage\" type=\"button\" value=\"Send Message\" class=\"btn btn-md btn-primary\" ng-click=\"sendMessage()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <input id=\"sendMessageTo\" type=\"text\" class=\"form-control\" ng-model=\"sendMessageTo\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-4\">\n" +
    "                    <input id=\"messageBody\" type=\"text\" class=\"form-control\" ng-model=\"messageBody\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <hr/>\n" +
    "            <div class=\"row\">\n" +
    "                <div ng-bind-html=\"trustMessages\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/presence.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/presence.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs Presence\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-1\">\n" +
    "                    <input id=\"btn-online\" type=\"button\" value=\"online\" class=\"btn btn-md btn-primary\" ng-click=\"online()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-1\">\n" +
    "                    <input id=\"btn-offline\" type=\"button\" value=\"office\" class=\"btn btn-md btn-primary\" ng-click=\"offline()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-1\">\n" +
    "                    <input id=\"btn-busy\" type=\"button\" value=\"busy\" class=\"btn btn-md btn-primary\" ng-click=\"busy()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-1\">\n" +
    "                    <input id=\"btn-away\" type=\"button\" value=\"away\" class=\"btn btn-md btn-primary\" ng-click=\"away()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input id=\"presenceText\" type=\"text\" class=\"form-control\" ng-model=\"freeText\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <input id=\"btn-invitePresence\" type=\"button\" value=\"Invite Presence\" class=\"btn btn-md btn-primary\" ng-click=\"invitePresence()\">\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input id=\"invitePresenceText\" type=\"text\" class=\"form-control\" ng-model=\"inviteContact\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <button id=\"btn-acceptPresence\" type=\"button\" class=\"btn btn-info btn-circle btn-lg\" ng-click=\"acceptPresence()\"><i class=\"glyphicon glyphicon-ok\"></i></button>\n" +
    "                    <!-- <input id=\"btn-acceptPresence\" type=\"button\" value=\"Accept Presence\" class=\"btn btn-md btn-primary\" ng-click=\"acceptPresence()\"> -->\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"col-md-2\">\n" +
    "                    <button id=\"btn-rejectPresence\" type=\"button\" class=\"btn btn-warning btn-circle btn-lg\" ng-click=\"rejectPresence()\"><i class=\"glyphicon glyphicon-remove\"></i></button>\n" +
    "                    <!-- <input id=\"btn-rejectPresence\" type=\"button\" value=\"Reject Presence\" class=\"btn btn-md btn-primary\" ng-click=\"rejectPresence()\"> -->\n" +
    "                </div>\n" +
    "                <div class=\"col-md-3\">\n" +
    "                    <input id=\"remoteContact\" type=\"text\" class=\"form-control\" title=\"Contact will be accepted/rejected.\" ng-model=\"remoteContact\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("home/subscription.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("home/subscription.tpl.html",
    "<div id=\"wrapper\">\n" +
    "    <!-- Sidebar -->\n" +
    "    <div id=\"sidebar-wrapper\">\n" +
    "        <ul class=\"sidebar-nav\">\n" +
    "            <li class=\"sidebar-brand\"><a href>Huawei webrcs</a></li>\n" +
    "            <li><a href>Welcome, {{username}}</a></li>\n" +
    "            <li><a href ui-sref=\"call\">Call</a></li>\n" +
    "            <li><a href ui-sref=\"chat\">Chat</a></li>\n" +
    "            <li><a href ui-sref=\"group_chat\">Group Chat</a></li>\n" +
    "            <li><a href ui-sref=\"file\">Transfer File</a></li>           \n" +
    "            <li><a href ui-sref=\"capability_discovery\">Capability Discovery</a></li>\n" +
    "            <!--\n" +
    "            <li><a href ui-sref=\"subscription\">Subscription Manager</a></li>\n" +
    "            <li><a href ui-sref=\"message\">Send Message</a></li>\n" +
    "            <li><a href ui-sref=\"conference\">Conference</a></li>\n" +
    "            <li><a href ui-sref=\"presence\">Presence</a></li>\n" +
    "            -->\n" +
    "            <li><a href ng-click=\"logoff()\">Log Off</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Page content -->\n" +
    "    <div id=\"page-content-wrapper\">\n" +
    "        <div class=\"content-header\">\n" +
    "            <h1>\n" +
    "                <a id=\"menu-toggle\" href=\"#\" class=\"btn btn-default\"><i class=\"icon-reorder\"></i></a>\n" +
    "                Webrcs IM/FT Subscription Manager\n" +
    "            </h1>\n" +
    "        </div>\n" +
    "        <!-- Keep all page content within the page-content inset div! -->\n" +
    "        <div class=\"page-content inset\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"well row\" id=\"channel\">\n" +
    "                    Create Channel\n" +
    "                    <div class=\"row\" id=\"channel_create_row\" ng-hide=\"channelCreated\">\n" +
    "                        <div class=\"col-md-1\">\n" +
    "                            <input id=\"btn-ims\" type=\"button\" value=\"Create\" class=\"btn btn-md btn-primary\" ng-click=\"createChannel()\">\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-4\">\n" +
    "                            <input id=\"channelSubscriptionNumber\" type=\"text\" class=\"form-control\" ng-model=\"subscriptionNumber\" placeholder=\"Phone Number\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\" id=\"channel_delete_row\" ng-show=\"channelCreated\">                    \n" +
    "                        <div class=\"col-md-1\">\n" +
    "                            <input id=\"btn-ims\" type=\"button\" value=\"Delete\" class=\"btn btn-md btn-primary\" ng-click=\"deleteChannel()\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"well row\" id=\"im_subscription\">\n" +
    "                    Instant Message Subscription\n" +
    "                    <div class=\"row\" id=\"im_create_row\" ng-hide=\"imSubscriptionCreated\">\n" +
    "                        <div class=\"col-md-1\">\n" +
    "                            <input id=\"btn-ims\" type=\"button\" value=\"Create\" class=\"btn btn-md btn-primary\" ng-click=\"createIMSubscription()\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\" id=\"im_delete_row\" ng-show=\"imSubscriptionCreated\">                    \n" +
    "                        <div class=\"col-md-1\">\n" +
    "                            <input id=\"btn-ims\" type=\"button\" value=\"Delete\" class=\"btn btn-md btn-primary\" ng-click=\"deleteIMSubscription()\">\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-8\">\n" +
    "                            <input id=\"imSubscriptionID\" type=\"text\" class=\"form-control\" ng-model=\"imSubscriptionID\" readonly>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        {{imNote}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"well row\" id=\"ft_subscription\">\n" +
    "                    File Transfer Subscription\n" +
    "                    <div class=\"row\" id=\"ft_create_row\" ng-hide=\"ftSubscriptionCreated\">\n" +
    "                        <div class=\"col-md-1\">\n" +
    "                            <input id=\"btn-ims\" type=\"button\" value=\"Create\" class=\"btn btn-md btn-primary\" ng-click=\"createFTSubscription()\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\" id=\"ft_delete_row\" ng-show=\"ftSubscriptionCreated\">                    \n" +
    "                        <div class=\"col-md-1\">\n" +
    "                            <input id=\"btn-ims\" type=\"button\" value=\"Delete\" class=\"btn btn-md btn-primary\" ng-click=\"deleteFTSubscription()\">\n" +
    "                        </div>\n" +
    "                        <div class=\"col-md-8\">\n" +
    "                            <input id=\"ftSubscriptionID\" type=\"text\" class=\"form-control\" ng-model=\"ftSubscriptionID\" readonly>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"row\">\n" +
    "                        {{ftNote}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "    ");
}]);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<div class=\"container\"> \n" +
    "	<div id=\"loginbox\" style=\"margin-top:50px;\" class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2\">\n" +
    "		<div class=\"panel panel-info\" >\n" +
    "			<div class=\"panel-heading\">\n" +
    "				<div class=\"panel-title\">Huawei Webrcs Sign In</div>\n" +
    "			</div>\n" +
    "\n" +
    "			<div style=\"padding-top:30px\" class=\"panel-body\" >\n" +
    "				<div style=\"display:none\" id=\"login-alert\" class=\"alert alert-danger col-sm-12\"></div>\n" +
    "				<form id=\"loginform\" class=\"form-horizontal\" role=\"form\">\n" +
    "\n" +
    "					<div style=\"margin-bottom: 25px\" class=\"input-group\">\n" +
    "						<span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-user\"></i></span>\n" +
    "						<input id=\"login-username\" type=\"text\" class=\"form-control\" name=\"username\" value=\"\" placeholder=\"phone number\" ng-model=\"username\">                                        \n" +
    "					</div>\n" +
    "\n" +
    "					<div style=\"margin-bottom: 25px\" class=\"input-group\">\n" +
    "						<span class=\"input-group-addon\"><i class=\"glyphicon glyphicon-lock\"></i></span>\n" +
    "						<input id=\"login-password\" type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"password\" ng-model=\"password\">\n" +
    "					</div>\n" +
    "\n" +
    "					<div style=\"margin-top:10px\" class=\"form-group text-center\">\n" +
    "						<div class=\"col-sm-12 controls\">\n" +
    "							<!-- <a id=\"btn-login\"  href=\"#\" class=\"btn btn-success\">Login  </a> -->\n" +
    "							<input type=\"submit\" id=\"btn-login\" value=\"Login\" class=\"btn btn-success\" ng-click=\"login()\">\n" +
    "						</div>\n" +
    "					</div>\n" +
    "\n" +
    "				</form>     \n" +
    "			</div>                     \n" +
    "		</div> \n" +
    "\n" +
    "		<div class=\"well\">\n" +
    "			<p>To test subscription management, please use <a ng-href=\"{{host}}\">webrcs-subscription</a></p>\n" +
    "		</div>\n" +
    "	</div>\n" +
    "</div> \n" +
    "	\n" +
    "\n" +
    "");
}]);
