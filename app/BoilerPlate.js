/*
Copyright 2016 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var BoilerPlate = module.exports = function() {
	this._events = {};
	this.name = "BoilerPlate";
};

BoilerPlate.prototype = {
	constructor: BoilerPlate,

	traceFunction: function() {
		var args = Array.prototype.slice.call(arguments);
		var func = args.shift();
		console.log(this.name + "." + func + "(" + args + ");"); // eslint-disable-line no-console
	},

	removeEventListener: function(eventName, callback) {
		var events = this._events;
		var callbacks = events[eventName] = events[eventName] || [];
		callbacks.pop(callback);
		return this;
	},

	addEventListener: function(eventName, callback) {
		var events = this._events;
		var callbacks = events[eventName] = events[eventName] || [];
		callbacks.push(callback);
		return this;
	},

	dispatchEvent: function(eventName, args) {
		var callbacks = this._events[eventName];
		if (!callbacks) {
			console.log("Event " + eventName + " not responding."); // eslint-disable-line no-console
			return this;
		}
		for (var i = 0, l = callbacks.length; i < l; i += 1) {
			callbacks[i].apply(null, args);
		}
		return this;
	}

};
