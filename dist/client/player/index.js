'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _serviceViews = require('../shared/serviceViews');

var _serviceViews2 = _interopRequireDefault(_serviceViews);

var _PlayerExperience = require('./PlayerExperience');

var _PlayerExperience2 = _interopRequireDefault(_PlayerExperience);

var _VideoLoader = require('../shared/services/VideoLoader');

var _VideoLoader2 = _interopRequireDefault(_VideoLoader);

var _score = require('../../shared/score');

var _score2 = _interopRequireDefault(_score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function bootstrap() {
  document.body.classList.remove('loading');

  var config = (0, _assign2.default)({ appContainer: '#container' }, window.soundworksConfig);

  soundworks.client.init(config.clientType, config);
  soundworks.client.setServiceInstanciationHook(function (id, instance) {
    if (_serviceViews2.default.has(id)) instance.view = _serviceViews2.default.get(id, config);
  });

  var experience = new _PlayerExperience2.default(_score2.default);
  soundworks.client.start();
}

window.addEventListener('load', bootstrap);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJib290c3RyYXAiLCJkb2N1bWVudCIsImJvZHkiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJjb25maWciLCJhcHBDb250YWluZXIiLCJ3aW5kb3ciLCJzb3VuZHdvcmtzQ29uZmlnIiwiY2xpZW50IiwiaW5pdCIsImNsaWVudFR5cGUiLCJzZXRTZXJ2aWNlSW5zdGFuY2lhdGlvbkhvb2siLCJpZCIsImluc3RhbmNlIiwic2VydmljZVZpZXdzIiwiaGFzIiwidmlldyIsImdldCIsImV4cGVyaWVuY2UiLCJQbGF5ZXJFeHBlcmllbmNlIiwic2NvcmUiLCJzdGFydCIsImFkZEV2ZW50TGlzdGVuZXIiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztJQUFZQSxVOztBQUNaOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVNDLFNBQVQsR0FBcUI7QUFDbkJDLFdBQVNDLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBK0IsU0FBL0I7O0FBRUEsTUFBTUMsU0FBUyxzQkFBYyxFQUFFQyxjQUFjLFlBQWhCLEVBQWQsRUFBOENDLE9BQU9DLGdCQUFyRCxDQUFmOztBQUVBVCxhQUFXVSxNQUFYLENBQWtCQyxJQUFsQixDQUF1QkwsT0FBT00sVUFBOUIsRUFBMENOLE1BQTFDO0FBQ0FOLGFBQVdVLE1BQVgsQ0FBa0JHLDJCQUFsQixDQUE4QyxVQUFDQyxFQUFELEVBQUtDLFFBQUwsRUFBa0I7QUFDOUQsUUFBSUMsdUJBQWFDLEdBQWIsQ0FBaUJILEVBQWpCLENBQUosRUFDRUMsU0FBU0csSUFBVCxHQUFnQkYsdUJBQWFHLEdBQWIsQ0FBaUJMLEVBQWpCLEVBQXFCUixNQUFyQixDQUFoQjtBQUNILEdBSEQ7O0FBS0EsTUFBTWMsYUFBYSxJQUFJQywwQkFBSixDQUFxQkMsZUFBckIsQ0FBbkI7QUFDQXRCLGFBQVdVLE1BQVgsQ0FBa0JhLEtBQWxCO0FBQ0Q7O0FBRURmLE9BQU9nQixnQkFBUCxDQUF3QixNQUF4QixFQUFnQ3ZCLFNBQWhDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgc291bmR3b3JrcyBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5pbXBvcnQgc2VydmljZVZpZXdzIGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlVmlld3MnO1xuaW1wb3J0IFBsYXllckV4cGVyaWVuY2UgZnJvbSAnLi9QbGF5ZXJFeHBlcmllbmNlJztcbmltcG9ydCBWaWRlb0xvYWRlciBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvVmlkZW9Mb2FkZXInO1xuaW1wb3J0IHNjb3JlIGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZSc7XG5cbmZ1bmN0aW9uIGJvb3RzdHJhcCgpIHtcbiAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJyk7XG5cbiAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IGFwcENvbnRhaW5lcjogJyNjb250YWluZXInIH0sIHdpbmRvdy5zb3VuZHdvcmtzQ29uZmlnKTtcblxuICBzb3VuZHdvcmtzLmNsaWVudC5pbml0KGNvbmZpZy5jbGllbnRUeXBlLCBjb25maWcpO1xuICBzb3VuZHdvcmtzLmNsaWVudC5zZXRTZXJ2aWNlSW5zdGFuY2lhdGlvbkhvb2soKGlkLCBpbnN0YW5jZSkgPT4ge1xuICAgIGlmIChzZXJ2aWNlVmlld3MuaGFzKGlkKSlcbiAgICAgIGluc3RhbmNlLnZpZXcgPSBzZXJ2aWNlVmlld3MuZ2V0KGlkLCBjb25maWcpO1xuICB9KTtcblxuICBjb25zdCBleHBlcmllbmNlID0gbmV3IFBsYXllckV4cGVyaWVuY2Uoc2NvcmUpO1xuICBzb3VuZHdvcmtzLmNsaWVudC5zdGFydCgpO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGJvb3RzdHJhcCk7XG4iXX0=