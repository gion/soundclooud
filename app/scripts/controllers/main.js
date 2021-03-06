'use strict';

angular.module('soundmapApp')
	.controller('MainCtrl', function ($rootScope, $scope, $timeout, $log, user, $routeParams) {
	    // Enable the new Google Maps visuals until it gets enabled by default.
	    // See http://googlegeodevelopers.blogspot.ca/2013/05/a-fresh-new-look-for-maps-api-for-all.html
	    google.maps.visualRefresh = true;
		
		var map ={
		    position: {
				coords: {
					latitude : 47.15143535829049,
					longitude : 27.59490966796875
				}
		    },
			
			/** the initial center of the map */
			centerProperty: {
				latitude : 47.15143535829049,
				longitude : 27.59490966796875
			},
			
			/** the initial zoom level of the map */
			zoomProperty: 8,
			
			/** list of markers to put in the map */
			markersProperty: [
/*				{
					latitude : 47.15143535829049,
					longitude : 27.59490966796875,
			//		url : 'https://api.soundcloud.com/tracks/93249728'
					url : 'https://api.soundcloud.com/tracks/94818362'
				},*/
				{
					"title":"10 - Fly me to the moon - The Gardeners live@RALET",
					"latitude":47.15594427065246,
					"longitude":27.579835653305054,
					"permalink":"http://soundcloud.com/bogdan-gradinariu/10-fly-me-to-the-moon-the",
					"url":"https://api.soundcloud.com/tracks/94456020",
					"description":"bogdan & radu gradinariu (known as the gardeners) performing at  ralet (http://www.ralet.ro/) restaurant and recorded by vladimir ivanov from \"studioul de baza\" studio (https://www.facebook.com/StudioulDeBaza)",
					"id":94456020
				}
			],
			
			// These 2 properties will be set when clicking on the map
			clickedLatitudeProperty: null,	
			clickedLongitudeProperty: null,
			
			eventsProperty: {
			  click: function (mapModel, eventName, originalEventArgs) {	
			    // 'this' is the directive's scope
			    $log.log("user defined event on map directive with scope", this);
			    $log.log("user defined event: " + eventName, mapModel, originalEventArgs);
			  }
			},

			onMarkerClick : function(marker, url){
				console.log('markcer click', arguments);
				location.url = url;
			/*	widget.load(url, {
					auto_play : true
				});*/
				$scope.$apply();
			}
		};




/*
		// initialize client with app credentials
		SC.initialize({
		  client_id: '9b9d346419c1d9931de96a21d481a033',
		  redirect_uri: 'http://192.168.1.148:9000/'
		});

		// initiate auth popup
		SC.connect(function() {
			SC.get('/me', function(me) {
				$scope.me = me;
			});
		});*/


		var location = {
			options : {
//				callback : function(){},
				auto_play : true
			}
		};

		angular.extend($scope, {
			map : map,
			location : location,
			login : function(){
				user.login(function(){
					console.log('logged in');
					$scope.$apply();
					$rootScope.loggedUser = user.info;
				});
			},
			logout : function(){
				user.logout.apply(user, arguments);
			},
			logManage : function(){
				return user.loggedIn?$scope.logout():$scope.login();
			},
			user : user
		});

		window.scope = $scope;
		
});