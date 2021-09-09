'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _set = require('babel-runtime/core-js/set');

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _server = require('soundworks/server');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Server-side 'player' experience.
 */
var SharedExperience = function (_Experience) {
  (0, _inherits3.default)(SharedExperience, _Experience);

  function SharedExperience(clientType, score) {
    (0, _classCallCheck3.default)(this, SharedExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SharedExperience.__proto__ || (0, _getPrototypeOf2.default)(SharedExperience)).call(this, clientType));

    _this.score = score;

    _this.placer = _this.require('placer');
    _this.sync = _this.require('sync');
    _this.syncScheduler = _this.require('sync-scheduler');
    _this.sharedParams = _this.require('shared-params');

    _this.players = new _set2.default();

    _this.currentTransportTime = 0;
    _this.lastSyncTime = null;

    _this.state = 'Stop';
    _this.tickId = null;
    _this.tickPeriod = 1000; // 1 second

    _this.propagationDelay = 0.2; //

    _this.tick = _this.tick.bind(_this);
    _this.updateTransport = _this.updateTransport.bind(_this);
    return _this;
  }

  // update logical time every `this.tickPeriod`


  (0, _createClass3.default)(SharedExperience, [{
    key: 'tick',
    value: function tick() {
      // update current time
      var syncTime = this.sync.getSyncTime();
      var triggerTime = syncTime + this.propagationDelay;
      var dt = syncTime - this.lastSyncTime;
      this.currentTransportTime += dt;

      // console.log('tick', this.currentTransportTime);
      this.broadcast('player', null, 'updateTime', this.currentTransportTime, triggerTime);

      this.lastSyncTime = syncTime;

      this.tickId = setTimeout(this.tick, this.tickPeriod);
    }
  }, {
    key: 'updateTransport',
    value: function updateTransport(value) {
      // prevent multiple calls
      if (this.state === value) return;

      this.state = value;

      var syncTime = this.sync.getSyncTime();

      switch (value) {
        case 'Start':
          // currentTransportTime shouln't be updated here
          this.lastSyncTime = syncTime;
          this.tickId = setTimeout(this.tick, this.tickPeriod);
          break;
        case 'Pause':
          clearTimeout(this.tickId);

          if (this.lastSyncTime) {
            var dt = syncTime - this.lastSyncTime;
            this.currentTransportTime += dt;
          }
          break;
        case 'Stop':
          clearTimeout(this.tickId);

          this.currentTransportTime = 0;
          this.lastSyncTime = null;
          break;
      }

      console.log(this.state, this.currentTransportTime);

      var triggerTime = syncTime + this.propagationDelay;
      this.broadcast('player', null, 'transport', value, this.currentTransportTime, triggerTime);
      // this.osc.send('/transport', [value.toLowerCase(), delay]);
    }
  }, {
    key: 'pauseAndSetTransportTime',
    value: function pauseAndSetTransportTime(time) {
      clearTimeout(this.tickId);

      this.state = 'Pause';
      this.currentTransportTime = time;

      var triggerTime = this.sync.getSyncTime() + this.propagationDelay;
      this.broadcast('player', null, 'transport', 'Pause', this.currentTransportTime, triggerTime);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.sharedParams.addParamListener('transport', this.updateTransport);

      (0, _keys2.default)(this.score.sections).forEach(function (sectionName) {
        _this2.sharedParams.addParamListener(sectionName, function () {
          _this2.pauseAndSetTransportTime(_this2.score.sections[sectionName].time);
        });
      });

      this.sharedParams.addParamListener('seek', function (value) {
        _this2.pauseAndSetTransportTime(value);
      });
    }
  }, {
    key: 'enter',
    value: function enter(client) {
      var _this3 = this;

      (0, _get3.default)(SharedExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(SharedExperience.prototype), 'enter', this).call(this, client);

      if (client.type === 'player') {
        this.receive(client, 'ready', function () {
          _this3.players.add(client);

          // send current state of the application to the new client
          var currentTransportTime = _this3.currentTransportTime;
          var syncTime = _this3.sync.getSyncTime();
          var triggerTime = syncTime + _this3.propagationDelay;

          // give a proper currentTime as we are probably between two ticks
          if (_this3.state === 'Start') {
            var dt = syncTime - _this3.lastSyncTime;
            currentTransportTime = currentTransportTime + dt;
          }

          console.log('connection', currentTransportTime, triggerTime);
          _this3.send(client, 'transport', _this3.state, currentTransportTime, triggerTime);

          // update controller
          _this3.sharedParams.update('numClients', _this3.players.size);
        });
      }
    }
  }, {
    key: 'exit',
    value: function exit(client) {
      (0, _get3.default)(SharedExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(SharedExperience.prototype), 'exit', this).call(this, client);

      if (client.type === 'player') {
        this.players.delete(client);
        this.sharedParams.update('numClients', this.players.size);
      }
    }
  }]);
  return SharedExperience;
}(_server.Experience); // Import Soundworks server side Experience


exports.default = SharedExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNoYXJlZEV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsiU2hhcmVkRXhwZXJpZW5jZSIsImNsaWVudFR5cGUiLCJzY29yZSIsInBsYWNlciIsInJlcXVpcmUiLCJzeW5jIiwic3luY1NjaGVkdWxlciIsInNoYXJlZFBhcmFtcyIsInBsYXllcnMiLCJjdXJyZW50VHJhbnNwb3J0VGltZSIsImxhc3RTeW5jVGltZSIsInN0YXRlIiwidGlja0lkIiwidGlja1BlcmlvZCIsInByb3BhZ2F0aW9uRGVsYXkiLCJ0aWNrIiwiYmluZCIsInVwZGF0ZVRyYW5zcG9ydCIsInN5bmNUaW1lIiwiZ2V0U3luY1RpbWUiLCJ0cmlnZ2VyVGltZSIsImR0IiwiYnJvYWRjYXN0Iiwic2V0VGltZW91dCIsInZhbHVlIiwiY2xlYXJUaW1lb3V0IiwiY29uc29sZSIsImxvZyIsInRpbWUiLCJhZGRQYXJhbUxpc3RlbmVyIiwic2VjdGlvbnMiLCJmb3JFYWNoIiwic2VjdGlvbk5hbWUiLCJwYXVzZUFuZFNldFRyYW5zcG9ydFRpbWUiLCJjbGllbnQiLCJ0eXBlIiwicmVjZWl2ZSIsImFkZCIsInNlbmQiLCJ1cGRhdGUiLCJzaXplIiwiZGVsZXRlIiwiRXhwZXJpZW5jZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUVBOzs7SUFHcUJBLGdCOzs7QUFDbkIsNEJBQVlDLFVBQVosRUFBd0JDLEtBQXhCLEVBQStCO0FBQUE7O0FBQUEsMEpBQ3ZCRCxVQUR1Qjs7QUFHN0IsVUFBS0MsS0FBTCxHQUFhQSxLQUFiOztBQUVBLFVBQUtDLE1BQUwsR0FBYyxNQUFLQyxPQUFMLENBQWEsUUFBYixDQUFkO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQUtELE9BQUwsQ0FBYSxNQUFiLENBQVo7QUFDQSxVQUFLRSxhQUFMLEdBQXFCLE1BQUtGLE9BQUwsQ0FBYSxnQkFBYixDQUFyQjtBQUNBLFVBQUtHLFlBQUwsR0FBb0IsTUFBS0gsT0FB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O0FBQ0QsU0FuQkQ7QUFvQkQ7QUFDRjs7O3lCQUVJTixNLEVBQVE7QUFDWCxxSkFBV0EsTUFBWDs7QUFFQSxVQUFJQSxPQUFPQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzVCLGFBQUszQixPQUFMLENBQWFpQyxNQUFiLENBQW9CUCxNQUFwQjtBQUNBLGFBQUszQixZQUFMLENBQWtCZ0MsTUFBbEIsQ0FBeUIsWUFBekIsRUFBdUMsS0FBSy9CLE9BQUwsQ0FBYWdDLElBQXBEO0FBQ0Q7QUFDRjs7O0VBMUkyQ0Usa0IsR0FOOUM7OztrQkFNcUIxQyxnQiIsImZpbGUiOiJTaGFyZWRFeHBlcmllbmNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IFNvdW5kd29ya3Mgc2VydmVyIHNpZGUgRXhwZXJpZW5jZVxuaW1wb3J0IHsgRXhwZXJpZW5jZSB9IGZyb20gJ3NvdW5kd29ya3Mvc2VydmVyJztcblxuLyoqXG4gKiBTZXJ2ZXItc2lkZSAncGxheWVyJyBleHBlcmllbmNlLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTaGFyZWRFeHBlcmllbmNlIGV4dGVuZHMgRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudFR5cGUsIHNjb3JlKSB7XG4gICAgc3VwZXIoY2xpZW50VHlwZSk7XG5cbiAgICB0aGlzLnNjb3JlID0gc2NvcmU7XG5cbiAgICB0aGlzLnBsYWNlciA9IHRoaXMucmVxdWlyZSgncGxhY2VyJyk7XG4gICAgdGhpcy5zeW5jID0gdGhpcy5yZXF1aXJlKCdzeW5jJyk7XG4gICAgdGhpcy5zeW5jU2NoZWR1bGVyID0gdGhpcy5yZXF1aXJlKCdzeW5jLXNjaGVkdWxlcicpO1xuICAgIHRoaXMuc2hhcmVkUGFyYW1zID0gdGhpcy5yZXF1aXJlKCdzaGFyZWQtcGFyYW1zJyk7XG5cbiAgICB0aGlzLnBsYXllcnMgPSBuZXcgU2V0KCk7XG5cbiAgICB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lID0gMDtcbiAgICB0aGlzLmxhc3RTeW5jVGltZSA9IG51bGw7XG5cbiAgICB0aGlzLnN0YXRlID0gJ1N0b3AnO1xuICAgIHRoaXMudGlja0lkID0gbnVsbDtcbiAgICB0aGlzLnRpY2tQZXJpb2QgPSAxMDAwOyAvLyAxIHNlY29uZFxuXG4gICAgdGhpcy5wcm9wYWdhdGlvbkRlbGF5ID0gMC4yOyAvL1xuXG4gICAgdGhpcy50aWNrID0gdGhpcy50aWNrLmJpbmQodGhpcyk7XG4gICAgdGhpcy51cGRhdGVUcmFuc3BvcnQgPSB0aGlzLnVwZGF0ZVRyYW5zcG9ydC5iaW5kKHRoaXMpO1xuICB9XG5cbiAgLy8gdXBkYXRlIGxvZ2ljYWwgdGltZSBldmVyeSBgdGhpcy50aWNrUGVyaW9kYFxuICB0aWNrKCkge1xuICAgIC8vIHVwZGF0ZSBjdXJyZW50IHRpbWVcbiAgICBjb25zdCBzeW5jVGltZSA9IHRoaXMuc3luYy5nZXRTeW5jVGltZSgpO1xuICAgIGNvbnN0IHRyaWdnZXJUaW1lID0gc3luY1RpbWUgKyB0aGlzLnByb3BhZ2F0aW9uRGVsYXk7XG4gICAgY29uc3QgZHQgPSBzeW5jVGltZSAtIHRoaXMubGFzdFN5bmNUaW1lO1xuICAgIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUgKz0gZHQ7XG5cbiAgICAvLyBjb25zb2xlLmxvZygndGljaycsIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUpO1xuICAgIHRoaXMuYnJvYWRjYXN0KCdwbGF5ZXInLCBudWxsLCAndXBkYXRlVGltZScsIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUsIHRyaWdnZXJUaW1lKTtcblxuICAgIHRoaXMubGFzdFN5bmNUaW1lID0gc3luY1RpbWU7XG5cbiAgICB0aGlzLnRpY2tJZCA9IHNldFRpbWVvdXQodGhpcy50aWNrLCB0aGlzLnRpY2tQZXJpb2QpO1xuICB9XG5cbiAgdXBkYXRlVHJhbnNwb3J0KHZhbHVlKSB7XG4gICAgLy8gcHJldmVudCBtdWx0aXBsZSBjYWxsc1xuICAgIGlmICh0aGlzLnN0YXRlID09PSB2YWx1ZSlcbiAgICAgIHJldHVybjtcblxuICAgIHRoaXMuc3RhdGUgPSB2YWx1ZTtcblxuICAgIGNvbnN0IHN5bmNUaW1lID0gdGhpcy5zeW5jLmdldFN5bmNUaW1lKCk7XG5cbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICBjYXNlICdTdGFydCc6XG4gICAgICAgIC8vIGN1cnJlbnRUcmFuc3BvcnRUaW1lIHNob3Vsbid0IGJlIHVwZGF0ZWQgaGVyZVxuICAgICAgICB0aGlzLmxhc3RTeW5jVGltZSA9IHN5bmNUaW1lO1xuICAgICAgICB0aGlzLnRpY2tJZCA9IHNldFRpbWVvdXQodGhpcy50aWNrLCB0aGlzLnRpY2tQZXJpb2QpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1BhdXNlJzpcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGlja0lkKTtcblxuICAgICAgICBpZiAodGhpcy5sYXN0U3luY1RpbWUpIHtcbiAgICAgICAgICBjb25zdCBkdCA9IHN5bmNUaW1lIC0gdGhpcy5sYXN0U3luY1RpbWU7XG4gICAgICAgICAgdGhpcy5jdXJyZW50VHJhbnNwb3J0VGltZSArPSBkdDtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ1N0b3AnOlxuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aWNrSWQpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmxhc3RTeW5jVGltZSA9IG51bGw7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnNvbGUubG9nKHRoaXMuc3RhdGUsIHRoaXMuY3VycmVudFRyYW5zcG9ydFRpbWUpO1xuXG4gICAgY29uc3QgdHJpZ2dlclRpbWUgPSBzeW5jVGltZSArIHRoaXMucHJvcGFnYXRpb25EZWxheTtcbiAgICB0aGlzLmJyb2FkY2FzdCgncGxheWVyJywgbnVsbCwgJ3RyYW5zcG9ydCcsIHZhbHVlLCB0aGlzLmN1cnJlbnRUcmFuc3BvcnRUaW1lLCB0cmlnZ2VyVGltZSk7XG4gICAgLy8gdGhpcy5vc2Muc2VuZCgnL3RyYW5zcG9ydCcsIFt2YWx1ZS50b0xvd2VyQ2FzZSgpLCBkZWxheV0pO1xuICB9XG5cbiAgcGF1c2VBbmRTZXRUcmFuc3BvcnRUaW1lKHRpbWUpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy50aWNrSWQpO1xuXG4gICAgdGhpcy5zdGF0ZSA9ICdQYXVzZSc7XG4gICAgdGhpcy5jdXJyZW50VHJhbnNwb3J0VGltZSA9IHRpbWU7XG5cbiAgICBjb25zdCB0cmlnZ2VyVGltZSA9IHRoaXMuc3luYy5nZXRTeW5jVGltZSgpICsgdGhpcy5wcm9wYWdhdGlvbkRlbGF5O1xuICAgIHRoaXMuYnJvYWRjYXN0KCdwbGF5ZXInLCBudWxsLCAndHJhbnNwb3J0JywgJ1BhdXNlJywgdGhpcy5jdXJyZW50VHJhbnNwb3J0VGltZSwgdHJpZ2dlclRpbWUpO1xuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcigndHJhbnNwb3J0JywgdGhpcy51cGRhdGVUcmFuc3BvcnQpO1xuXG4gICAgT2JqZWN0LmtleXModGhpcy5zY29yZS5zZWN0aW9ucykuZm9yRWFjaChzZWN0aW9uTmFtZSA9PiB7XG4gICAgICB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKHNlY3Rpb25OYW1lLCAoKSA9PiB7XG4gICAgICAgIHRoaXMucGF1c2VBbmRTZXRUcmFuc3BvcnRUaW1lKHRoaXMuc2NvcmUuc2VjdGlvbnNbc2VjdGlvbk5hbWVdLnRpbWUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCdzZWVrJywgdmFsdWUgPT4ge1xuICAgICAgdGhpcy5wYXVzZUFuZFNldFRyYW5zcG9ydFRpbWUodmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgZW50ZXIoY2xpZW50KSB7XG4gICAgc3VwZXIuZW50ZXIoY2xpZW50KTtcblxuICAgIGlmIChjbGllbnQudHlwZSA9PT0gJ3BsYXllcicpIHtcbiAgICAgIHRoaXMucmVjZWl2ZShjbGllbnQsICdyZWFkeScsICgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmFkZChjbGllbnQpO1xuXG4gICAgICAgIC8vIHNlbmQgY3VycmVudCBzdGF0ZSBvZiB0aGUgYXBwbGljYXRpb24gdG8gdGhlIG5ldyBjbGllbnRcbiAgICAgICAgbGV0IGN1cnJlbnRUcmFuc3BvcnRUaW1lID0gdGhpcy5jdXJyZW50VHJhbnNwb3J0VGltZTtcbiAgICAgICAgY29uc3Qgc3luY1RpbWUgPSB0aGlzLnN5bmMuZ2V0U3luY1RpbWUoKTtcbiAgICAgICAgY29uc3QgdHJpZ2dlclRpbWUgPSBzeW5jVGltZSArIHRoaXMucHJvcGFnYXRpb25EZWxheTtcblxuICAgICAgICAvLyBnaXZlIGEgcHJvcGVyIGN1cnJlbnRUaW1lIGFzIHdlIGFyZSBwcm9iYWJseSBiZXR3ZWVuIHR3byB0aWNrc1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ1N0YXJ0Jykge1xuICAgICAgICAgIGNvbnN0IGR0ID0gc3luY1RpbWUgLSB0aGlzLmxhc3RTeW5jVGltZTtcbiAgICAgICAgICBjdXJyZW50VHJhbnNwb3J0VGltZSA9IGN1cnJlbnRUcmFuc3BvcnRUaW1lICsgZHQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZygnY29ubmVjdGlvbicsIGN1cnJlbnRUcmFuc3BvcnRUaW1lLCB0cmlnZ2VyVGltZSk7XG4gICAgICAgIHRoaXMuc2VuZChjbGllbnQsICd0cmFuc3BvcnQnLCB0aGlzLnN0YXRlLCBjdXJyZW50VHJhbnNwb3J0VGltZSwgdHJpZ2dlclRpbWUpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBjb250cm9sbGVyXG4gICAgICAgIHRoaXMuc2hhcmVkUGFyYW1zLnVwZGF0ZSgnbnVtQ2xpZW50cycsIHRoaXMucGxheWVycy5zaXplKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGV4aXQoY2xpZW50KSB7XG4gICAgc3VwZXIuZXhpdChjbGllbnQpO1xuXG4gICAgaWYgKGNsaWVudC50eXBlID09PSAncGxheWVyJykge1xuICAgICAgdGhpcy5wbGF5ZXJzLmRlbGV0ZShjbGllbnQpO1xuICAgICAgdGhpcy5zaGFyZWRQYXJhbXMudXBkYXRlKCdudW1DbGllbnRzJywgdGhpcy5wbGF5ZXJzLnNpemUpO1xuICAgIH1cbiAgfVxufVxuIl19