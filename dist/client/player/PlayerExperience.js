'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

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

var _client = require('soundworks/client');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var template = '\n  <div class="video-wrapper">\n    <video id="video" controls></video>\n  </div>\n  <% if (!isEnv) { %>\n  <button class="btn" id="reload">Reload</button>\n  <p id="infos">\n    <span id="part"><%= part %></span>\n    &nbsp;-&nbsp;\n    <span id="section-label"><%= sectionLabel %></span>\n  </p>\n  <% } %>\n';

var PlayerExperience = function (_Experience) {
  (0, _inherits3.default)(PlayerExperience, _Experience);

  function PlayerExperience(score) {
    (0, _classCallCheck3.default)(this, PlayerExperience);

    var _this = (0, _possibleConstructorReturn3.default)(this, (PlayerExperience.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience)).call(this));

    _this.score = score;

    _this.platform = _this.require('platform', { features: [] });
    _this.placer = _this.require('placer');
    _this.sharedParams = _this.require('shared-params');
    _this.syncScheduler = _this.require('sync-scheduler');
    _this.videoLoader = _this.require('video-loader');

    _this.onTransportChange = _this.onTransportChange.bind(_this);
    _this.onUpdateTime = _this.onUpdateTime.bind(_this);

    _this.updateLabel = _this.updateLabel.bind(_this);
    _this.onFirstPlay = _this.onFirstPlay.bind(_this);
    _this.reload = _this.reload.bind(_this);

    _this.isEnv = false;
    _this.isReady = false; // don't listen controls if not ready
    return _this;
  }

  (0, _createClass3.default)(PlayerExperience, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      (0, _get3.default)(PlayerExperience.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlayerExperience.prototype), 'start', this).call(this);

      this.part = this.score.parts[_client.client.label];

      if (this.part.type === 'env') this.isEnv = true;

      // initialize the view
      var model = {
        sectionLabel: '<span class="orange soft-blink">start the video and wait for the beginning</span>',
        part: _client.client.label,
        isEnv: this.isEnv
      };

      var events = {
        'touchstart #reload': function touchstartReload() {
          return _this2.reload(true);
        }
      };

      this.view = new _client.View(template, model, events, {});

      _promise2.default.all([this.show(), this.videoLoader.load(this.part.file)]).then(function (_ref) {
        var _ref2 = (0, _slicedToArray3.default)(_ref, 2),
            empty = _ref2[0],
            objectUrl = _ref2[1];

        _this2.$video = _this2.view.$el.querySelector('#video');
        _this2.$video.src = objectUrl;

        _this2.receive('transport', _this2.onTransportChange);
        _this2.receive('updateTime', _this2.onUpdateTime);

        // this.sharedParams.addParamListener('playbackRate', (value) => this.$video.playbackRate = value);
        // this.sharedParams.addParamListener('seek', (value) => this.$video.currentTime = value);
        _this2.sharedParams.addParamListener('reload', function () {
          return _this2.reload(false);
        });

        if (_this2.part.type !== 'env') _this2.sharedParams.addParamListener('volume:performers', function (value) {
          return _this2.$video.volume = value;
        });else _this2.sharedParams.addParamListener('volume:env:' + _client.client.label, function (value) {
          return _this2.$video.volume = value;
        });

        // update label according to video current time
        _this2.$video.addEventListener('timeupdate', _this2.updateLabel);
        _this2.$video.addEventListener('play', _this2.onFirstPlay);
      });
    }

    // @todo - remove that, use platform hook...

  }, {
    key: 'onFirstPlay',
    value: function onFirstPlay() {
      var _this3 = this;

      setTimeout(function () {
        _this3.$video.pause();

        // remove controls
        _this3.$video.removeAttribute('controls');

        if (!_this3.isEnv) alert('click "ok" and wait for the beginning...');

        _this3.isReady = true; // don't listen controls if not ready
        // feedback for the controller
        _this3.send('ready');
        _this3.$video.removeEventListener('play', _this3.onFirstPlay);
      }, 0);
    }
  }, {
    key: 'onTransportChange',
    value: function onTransportChange(state, transportTime, triggerSyncTime) {
      var _this4 = this;

      if (!this.isReady) return;

      // console.log(state, transportTime, triggerSyncTime);
      var currentSyncTime = this.syncScheduler.currentTime;

      // message received to late execute now and compensate if state is Start
      if (triggerSyncTime < currentSyncTime) {
        if (state === 'Start') {
          var decay = currentSyncTime - triggerSyncTime;

          this.$video.currentTime = transportTime + decay;
          this.$video.play();
        } else {
          this.$video.pause();
          this.$video.currentTime = transportTime;
        }
      } else {
        // defer execution to triggerSyncTime
        this.syncScheduler.defer(function () {
          if (state === 'Start') {
            _this4.$video.currentTime = transportTime;
            _this4.$video.play();
          } else {
            _this4.$video.pause();
            _this4.$video.currentTime = transportTime;
          }
        }, triggerSyncTime);
      }
    }

    // this is triggered every tickPeriod by the server to maintain every client
    // into an acceptable state, or recover if a problem occured

  }, {
    key: 'onUpdateTime',
    value: function onUpdateTime(transportTime, triggerSyncTime) {
      var _this5 = this;

      if (!this.isReady) return;

      // console.log(transportTime, triggerSyncTime);
      var syncTime = this.syncScheduler.currentTime;

      // just wait for the next message if received too late
      if (triggerSyncTime > syncTime) {
        this.syncScheduler.defer(function () {
          var videoCurrentTime = _this5.$video.currentTime;
          var jit = Math.abs(transportTime - videoCurrentTime);
          // we assume a large possible jitter as we have no f****** idea of the
          // video clock resolution... this should be explored
          if (jit > 0.5) {
            _this5.$video.currentTime = transportTime;
          }
        }, triggerSyncTime);
      }
    }
  }, {
    key: 'reload',
    value: function reload() {
      var confirm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (confirm === true) {
        var isConfirmed = window.confirm('are you sure you want to reload?');
        if (!isConfirmed) return;
      }

      window.location.reload();
    }
  }, {
    key: 'updateLabel',
    value: function updateLabel() {
      if (this.isEnv) return;

      var sections = this.score.sections;

      var currentTime = this.$video.currentTime;
      var names = (0, _keys2.default)(sections);
      var label = null;

      for (var i = 0; i < names.length; i++) {
        var section = sections[names[i]];
        var next = sections[names[i + 1]];

        if (next) {
          if (!label && currentTime >= section.time && currentTime < next.time) {
            label = section.label;
            break;
          }
        } else {
          if (!label && currentTime >= section.time) label = section.label;
        }
      };

      if (this.view.model.sectionLabel !== label) {
        this.view.model.sectionLabel = label;
        this.view.render('#section-label');
      }
    }
  }]);
  return PlayerExperience;
}(_client.Experience);

exports.default = PlayerExperience;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBsYXllckV4cGVyaWVuY2UuanMiXSwibmFtZXMiOlsidGVtcGxhdGUiLCJQbGF5ZXJFeHBlcmllbmNlIiwic2NvcmUiLCJwbGF0Zm9ybSIsInJlcXVpcmUiLCJmZWF0dXJlcyIsInBsYWNlciIsInNoYXJlZFBhcmFtcyIsInN5bmNTY2hlZHVsZXIiLCJ2aWRlb0xvYWRlciIsIm9uVHJhbnNwb3J0Q2hhbmdlIiwiYmluZCIsIm9uVXBkYXRlVGltZSIsInVwZGF0ZUxhYmVsIiwib25GaXJzdFBsYXkiLCJyZWxvYWQiLCJpc0VudiIsImlzUmVhZHkiLCJwYXJ0IiwicGFydHMiLCJjbGllbnQiLCJsYWJlbCIsInR5cGUiLCJtb2RlbCIsInNlY3Rpb25MYWJlbCIsImV2ZW50cyIsInZpZXciLCJWaWV3IiwiYWxsIiwic2hvdyIsImxvYWQiLCJmaWxlIiwidGhlbiIsImVtcHR5Iiwib2JqZWN0VXJsIiwiJHZpZGVvIiwiJGVsIiwicXVlcnlTZWxlY3RvciIsInNyYyIsInJlY2VpdmUiLCJhZGRQYXJhbUxpc3RlbmVyIiwidmFsdWUiLCJ2b2x1bWUiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0VGltZW91dCIsInBhdXNlIiwicmVtb3ZlQXR0cmlidXRlIiwiYWxlcnQiLCJzZW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInN0YXRlIiwidHJhbnNwb3J0VGltZSIsInRyaWdnZXJTeW5jVGltZSIsImN1cnJlbnRTeW5jVGltZSIsImN1cnJlbnRUaW1lIiwiZGVjYXkiLCJwbGF5IiwiZGVmZXIiLCJzeW5jVGltZSIsInZpZGVvQ3VycmVudFRpbWUiLCJqaXQiLCJNYXRoIiwiYWJzIiwiY29uZmlybSIsImlzQ29uZmlybWVkIiwid2luZG93IiwibG9jYXRpb24iLCJzZWN0aW9ucyIsIm5hbWVzIiwiaSIsImxlbmd0aCIsInNlY3Rpb24iLCJuZXh0IiwidGltZSIsInJlbmRlciIsIkV4cGVyaWVuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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RXhwZXJpZW5jZSwgVmlldywgY2xpZW50IH0gZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuXG5jb25zdCB0ZW1wbGF0ZSA9IGBcbiAgPGRpdiBjbGFzcz1cInZpZGVvLXdyYXBwZXJcIj5cbiAgICA8dmlkZW8gaWQ9XCJ2aWRlb1wiIGNvbnRyb2xzPjwvdmlkZW8+XG4gIDwvZGl2PlxuICA8JSBpZiAoIWlzRW52KSB7ICU+XG4gIDxidXR0b24gY2xhc3M9XCJidG5cIiBpZD1cInJlbG9hZFwiPlJlbG9hZDwvYnV0dG9uPlxuICA8cCBpZD1cImluZm9zXCI+XG4gICAgPHNwYW4gaWQ9XCJwYXJ0XCI+PCU9IHBhcnQgJT48L3NwYW4+XG4gICAgJm5ic3A7LSZuYnNwO1xuICAgIDxzcGFuIGlkPVwic2VjdGlvbi1sYWJlbFwiPjwlPSBzZWN0aW9uTGFiZWwgJT48L3NwYW4+XG4gIDwvcD5cbiAgPCUgfSAlPlxuYDtcblxuXG5jbGFzcyBQbGF5ZXJFeHBlcmllbmNlIGV4dGVuZHMgRXhwZXJpZW5jZSB7XG4gIGNvbnN0cnVjdG9yKHNjb3JlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuc2NvcmUgPSBzY29yZTtcblxuICAgIHRoaXMucGxhdGZvcm0gPSB0aGlzLnJlcXVpcmUoJ3BsYXRmb3JtJywgeyBmZWF0dXJlczogW10gfSk7XG4gICAgdGhpcy5wbGFjZXIgPSB0aGlzLnJlcXVpcmUoJ3BsYWNlcicpO1xuICAgIHRoaXMuc2hhcmVkUGFyYW1zID0gdGhpcy5yZXF1aXJlKCdzaGFyZWQtcGFyYW1zJyk7XG4gICAgdGhpcy5zeW5jU2NoZWR1bGVyID0gdGhpcy5yZXF1aXJlKCdzeW5jLXNjaGVkdWxlcicpO1xuICAgIHRoaXMudmlkZW9Mb2FkZXIgPSB0aGlzLnJlcXVpcmUoJ3ZpZGVvLWxvYWRlcicpO1xuXG4gICAgdGhpcy5vblRyYW5zcG9ydENoYW5nZSA9IHRoaXMub25UcmFuc3BvcnRDaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uVXBkYXRlVGltZSA9IHRoaXMub25VcGRhdGVUaW1lLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnVwZGF0ZUxhYmVsID0gdGhpcy51cGRhdGVMYWJlbC5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25GaXJzdFBsYXkgPSB0aGlzLm9uRmlyc3RQbGF5LmJpbmQodGhpcyk7XG4gICAgdGhpcy5yZWxvYWQgPSB0aGlzLnJlbG9hZC5iaW5kKHRoaXMpO1xuXG4gICAgdGhpcy5pc0VudiA9IGZhbHNlO1xuICAgIHRoaXMuaXNSZWFkeSA9IGZhbHNlOyAvLyBkb24ndCBsaXN0ZW4gY29udHJvbHMgaWYgbm90IHJlYWR5XG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBzdXBlci5zdGFydCgpO1xuXG4gICAgdGhpcy5wYXJ0ID0gdGhpcy5zY29yZS5wYXJ0c1tjbGllbnQubGFiZWxdO1xuXG4gICAgaWYgKHRoaXMucGFydC50eXBlID09PSAnZW52JylcbiAgICAgIHRoaXMuaXNFbnYgPSB0cnVlO1xuXG4gICAgLy8gaW5pdGlhbGl6ZSB0aGUgdmlld1xuICAgIGNvbnN0IG1vZGVsID0ge1xuICAgICAgc2VjdGlvbkxhYmVsOiBgPHNwYW4gY2xhc3M9XCJvcmFuZ2Ugc29mdC1ibGlua1wiPnN0YXJ0IHRoZSB2aWRlbyBhbmQgd2FpdCBmb3IgdGhlIGJlZ2lubmluZzwvc3Bhbj5gLFxuICAgICAgcGFydDogY2xpZW50LmxhYmVsLFxuICAgICAgaXNFbnY6IHRoaXMuaXNFbnYsXG4gICAgfTtcblxuICAgIGNvbnN0IGV2ZW50cyA9IHtcbiAgICAgICd0b3VjaHN0YXJ0ICNyZWxvYWQnOiAoKSA9PiB0aGlzLnJlbG9hZCh0cnVlKSxcbiAgICB9O1xuXG4gICAgdGhpcy52aWV3ID0gbmV3IFZpZXcodGVtcGxhdGUsIG1vZGVsLCBldmVudHMsIHt9KTtcblxuICAgIFByb21pc2UuYWxsKFt0aGlzLnNob3coKSwgdGhpcy52aWRlb0xvYWRlci5sb2FkKHRoaXMucGFydC5maWxlKV0pXG4gICAgICAudGhlbigoW2VtcHR5LCBvYmplY3RVcmxdKSA9PiB7XG5cbiAgICAgICAgdGhpcy4kdmlkZW8gPSB0aGlzLnZpZXcuJGVsLnF1ZXJ5U2VsZWN0b3IoJyN2aWRlbycpO1xuICAgICAgICB0aGlzLiR2aWRlby5zcmMgPSBvYmplY3RVcmw7XG5cbiAgICAgICAgdGhpcy5yZWNlaXZlKCd0cmFuc3BvcnQnLCB0aGlzLm9uVHJhbnNwb3J0Q2hhbmdlKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlKCd1cGRhdGVUaW1lJywgdGhpcy5vblVwZGF0ZVRpbWUpO1xuXG4gICAgICAgIC8vIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ3BsYXliYWNrUmF0ZScsICh2YWx1ZSkgPT4gdGhpcy4kdmlkZW8ucGxheWJhY2tSYXRlID0gdmFsdWUpO1xuICAgICAgICAvLyB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKCdzZWVrJywgKHZhbHVlKSA9PiB0aGlzLiR2aWRlby5jdXJyZW50VGltZSA9IHZhbHVlKTtcbiAgICAgICAgdGhpcy5zaGFyZWRQYXJhbXMuYWRkUGFyYW1MaXN0ZW5lcigncmVsb2FkJywgKCkgPT4gdGhpcy5yZWxvYWQoZmFsc2UpKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJ0LnR5cGUgIT09ICdlbnYnKVxuICAgICAgICAgIHRoaXMuc2hhcmVkUGFyYW1zLmFkZFBhcmFtTGlzdGVuZXIoJ3ZvbHVtZTpwZXJmb3JtZXJzJywgKHZhbHVlKSA9PiB0aGlzLiR2aWRlby52b2x1bWUgPSB2YWx1ZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0aGlzLnNoYXJlZFBhcmFtcy5hZGRQYXJhbUxpc3RlbmVyKGB2b2x1bWU6ZW52OiR7Y2xpZW50LmxhYmVsfWAsICh2YWx1ZSkgPT4gdGhpcy4kdmlkZW8udm9sdW1lID0gdmFsdWUpO1xuXG4gICAgICAgIC8vIHVwZGF0ZSBsYWJlbCBhY2NvcmRpbmcgdG8gdmlkZW8gY3VycmVudCB0aW1lXG4gICAgICAgIHRoaXMuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCB0aGlzLnVwZGF0ZUxhYmVsKTtcbiAgICAgICAgdGhpcy4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHRoaXMub25GaXJzdFBsYXkpO1xuICAgICAgfSk7XG4gIH1cblxuICAvLyBAdG9kbyAtIHJlbW92ZSB0aGF0LCB1c2UgcGxhdGZvcm0gaG9vay4uLlxuICBvbkZpcnN0UGxheSgpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuJHZpZGVvLnBhdXNlKClcblxuICAgICAgLy8gcmVtb3ZlIGNvbnRyb2xzXG4gICAgICB0aGlzLiR2aWRlby5yZW1vdmVBdHRyaWJ1dGUoJ2NvbnRyb2xzJyk7XG5cbiAgICAgIGlmICghdGhpcy5pc0VudilcbiAgICAgICAgYWxlcnQoJ2NsaWNrIFwib2tcIiBhbmQgd2FpdCBmb3IgdGhlIGJlZ2lubmluZy4uLicpO1xuXG4gICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlOyAvLyBkb24ndCBsaXN0ZW4gY29udHJvbHMgaWYgbm90IHJlYWR5XG4gICAgICAvLyBmZWVkYmFjayBmb3IgdGhlIGNvbnRyb2xsZXJcbiAgICAgIHRoaXMuc2VuZCgncmVhZHknKTtcbiAgICAgIHRoaXMuJHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BsYXknLCB0aGlzLm9uRmlyc3RQbGF5KTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIG9uVHJhbnNwb3J0Q2hhbmdlKHN0YXRlLCB0cmFuc3BvcnRUaW1lLCB0cmlnZ2VyU3luY1RpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNSZWFkeSlcbiAgICAgIHJldHVybjtcblxuICAgIC8vIGNvbnNvbGUubG9nKHN0YXRlLCB0cmFuc3BvcnRUaW1lLCB0cmlnZ2VyU3luY1RpbWUpO1xuICAgIGNvbnN0IGN1cnJlbnRTeW5jVGltZSA9IHRoaXMuc3luY1NjaGVkdWxlci5jdXJyZW50VGltZTtcblxuICAgIC8vIG1lc3NhZ2UgcmVjZWl2ZWQgdG8gbGF0ZSBleGVjdXRlIG5vdyBhbmQgY29tcGVuc2F0ZSBpZiBzdGF0ZSBpcyBTdGFydFxuICAgIGlmICh0cmlnZ2VyU3luY1RpbWUgPCBjdXJyZW50U3luY1RpbWUpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gJ1N0YXJ0JyApIHtcbiAgICAgICAgY29uc3QgZGVjYXkgPSBjdXJyZW50U3luY1RpbWUgLSB0cmlnZ2VyU3luY1RpbWU7XG5cbiAgICAgICAgdGhpcy4kdmlkZW8uY3VycmVudFRpbWUgPSB0cmFuc3BvcnRUaW1lICsgZGVjYXk7XG4gICAgICAgIHRoaXMuJHZpZGVvLnBsYXkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuJHZpZGVvLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuJHZpZGVvLmN1cnJlbnRUaW1lID0gdHJhbnNwb3J0VGltZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkZWZlciBleGVjdXRpb24gdG8gdHJpZ2dlclN5bmNUaW1lXG4gICAgICB0aGlzLnN5bmNTY2hlZHVsZXIuZGVmZXIoKCkgPT4ge1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdTdGFydCcpIHtcbiAgICAgICAgICB0aGlzLiR2aWRlby5jdXJyZW50VGltZSA9IHRyYW5zcG9ydFRpbWU7XG4gICAgICAgICAgdGhpcy4kdmlkZW8ucGxheSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuJHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgdGhpcy4kdmlkZW8uY3VycmVudFRpbWUgPSB0cmFuc3BvcnRUaW1lO1xuICAgICAgICB9XG4gICAgICB9LCB0cmlnZ2VyU3luY1RpbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRoaXMgaXMgdHJpZ2dlcmVkIGV2ZXJ5IHRpY2tQZXJpb2QgYnkgdGhlIHNlcnZlciB0byBtYWludGFpbiBldmVyeSBjbGllbnRcbiAgLy8gaW50byBhbiBhY2NlcHRhYmxlIHN0YXRlLCBvciByZWNvdmVyIGlmIGEgcHJvYmxlbSBvY2N1cmVkXG4gIG9uVXBkYXRlVGltZSh0cmFuc3BvcnRUaW1lLCB0cmlnZ2VyU3luY1RpbWUpIHtcbiAgICBpZiAoIXRoaXMuaXNSZWFkeSlcbiAgICAgIHJldHVybjtcblxuICAgIC8vIGNvbnNvbGUubG9nKHRyYW5zcG9ydFRpbWUsIHRyaWdnZXJTeW5jVGltZSk7XG4gICAgY29uc3Qgc3luY1RpbWUgPSB0aGlzLnN5bmNTY2hlZHVsZXIuY3VycmVudFRpbWU7XG5cbiAgICAvLyBqdXN0IHdhaXQgZm9yIHRoZSBuZXh0IG1lc3NhZ2UgaWYgcmVjZWl2ZWQgdG9vIGxhdGVcbiAgICBpZiAodHJpZ2dlclN5bmNUaW1lID4gc3luY1RpbWUpIHtcbiAgICAgIHRoaXMuc3luY1NjaGVkdWxlci5kZWZlcigoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZpZGVvQ3VycmVudFRpbWUgPSB0aGlzLiR2aWRlby5jdXJyZW50VGltZTtcbiAgICAgICAgY29uc3Qgaml0ID0gTWF0aC5hYnModHJhbnNwb3J0VGltZSAtIHZpZGVvQ3VycmVudFRpbWUpO1xuICAgICAgICAvLyB3ZSBhc3N1bWUgYSBsYXJnZSBwb3NzaWJsZSBqaXR0ZXIgYXMgd2UgaGF2ZSBubyBmKioqKioqIGlkZWEgb2YgdGhlXG4gICAgICAgIC8vIHZpZGVvIGNsb2NrIHJlc29sdXRpb24uLi4gdGhpcyBzaG91bGQgYmUgZXhwbG9yZWRcbiAgICAgICAgaWYgKGppdCA+IDAuNSkge1xuICAgICAgICAgIHRoaXMuJHZpZGVvLmN1cnJlbnRUaW1lID0gdHJhbnNwb3J0VGltZTtcbiAgICAgICAgfVxuICAgICAgfSwgdHJpZ2dlclN5bmNUaW1lKTtcbiAgICB9XG4gIH1cblxuICByZWxvYWQoY29uZmlybSA9IGZhbHNlKSB7XG4gICAgaWYgKGNvbmZpcm0gPT09IHRydWUpIHtcbiAgICAgIGNvbnN0IGlzQ29uZmlybWVkID0gd2luZG93LmNvbmZpcm0oJ2FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byByZWxvYWQ/Jyk7XG4gICAgICBpZiAoIWlzQ29uZmlybWVkKSByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9XG5cbiAgdXBkYXRlTGFiZWwoKSB7XG4gICAgaWYgKHRoaXMuaXNFbnYpXG4gICAgICByZXR1cm47XG5cbiAgICBjb25zdCBzZWN0aW9ucyA9IHRoaXMuc2NvcmUuc2VjdGlvbnM7XG5cbiAgICBjb25zdCBjdXJyZW50VGltZSA9IHRoaXMuJHZpZGVvLmN1cnJlbnRUaW1lO1xuICAgIGNvbnN0IG5hbWVzID0gT2JqZWN0LmtleXMoc2VjdGlvbnMpO1xuICAgIGxldCBsYWJlbCA9IG51bGw7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzZWN0aW9uID0gc2VjdGlvbnNbbmFtZXNbaV1dO1xuICAgICAgY29uc3QgbmV4dCA9IHNlY3Rpb25zW25hbWVzW2kgKyAxXV07XG5cbiAgICAgIGlmIChuZXh0KSB7XG4gICAgICAgIGlmICghbGFiZWwgJiYgY3VycmVudFRpbWUgPj0gc2VjdGlvbi50aW1lICYmIGN1cnJlbnRUaW1lIDwgbmV4dC50aW1lKSB7XG4gICAgICAgICAgbGFiZWwgPSBzZWN0aW9uLmxhYmVsO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIWxhYmVsICYmIGN1cnJlbnRUaW1lID49IHNlY3Rpb24udGltZSlcbiAgICAgICAgICBsYWJlbCA9IHNlY3Rpb24ubGFiZWw7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0aGlzLnZpZXcubW9kZWwuc2VjdGlvbkxhYmVsICE9PSBsYWJlbCkge1xuICAgICAgdGhpcy52aWV3Lm1vZGVsLnNlY3Rpb25MYWJlbCA9IGxhYmVsO1xuICAgICAgdGhpcy52aWV3LnJlbmRlcignI3NlY3Rpb24tbGFiZWwnKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyRXhwZXJpZW5jZTtcbiJdfQ==