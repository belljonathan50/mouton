'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _client = require('soundworks/client');

var soundworks = _interopRequireWildcard(_client);

var _serviceViews = require('../shared/serviceViews');

var _serviceViews2 = _interopRequireDefault(_serviceViews);

var _Conductor = require('./Conductor');

var _Conductor2 = _interopRequireDefault(_Conductor);

var _score = require('../../shared/score');

var _score2 = _interopRequireDefault(_score);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.addEventListener('load', function () {
  document.body.classList.remove('loading');

  var config = (0, _assign2.default)({
    appContainer: '#container'
  }, window.soundworksConfig);

  soundworks.client.init(config.clientType, config);
  soundworks.client.setServiceInstanciationHook(function (id, instance) {
    if (_serviceViews2.default.has(id)) instance.view = _serviceViews2.default.get(id, config);
  });

  var conductor = new _Conductor2.default(_score2.default);
  soundworks.client.start();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZG9jdW1lbnQiLCJib2R5IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiY29uZmlnIiwiYXBwQ29udGFpbmVyIiwic291bmR3b3Jrc0NvbmZpZyIsImNsaWVudCIsImluaXQiLCJjbGllbnRUeXBlIiwic2V0U2VydmljZUluc3RhbmNpYXRpb25Ib29rIiwiaWQiLCJpbnN0YW5jZSIsInNlcnZpY2VWaWV3cyIsImhhcyIsInZpZXciLCJnZXQiLCJjb25kdWN0b3IiLCJDb25kdWN0b3IiLCJzY29yZSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7SUFBWUEsVTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUFDLE9BQU9DLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDcENDLFdBQVNDLElBQVQsQ0FBY0MsU0FBZCxDQUF3QkMsTUFBeEIsQ0FBK0IsU0FBL0I7O0FBRUEsTUFBTUMsU0FBUyxzQkFBYztBQUMzQkMsa0JBQWM7QUFEYSxHQUFkLEVBRVpQLE9BQU9RLGdCQUZLLENBQWY7O0FBSUFULGFBQVdVLE1BQVgsQ0FBa0JDLElBQWxCLENBQXVCSixPQUFPSyxVQUE5QixFQUEwQ0wsTUFBMUM7QUFDQVAsYUFBV1UsTUFBWCxDQUFrQkcsMkJBQWxCLENBQThDLFVBQUNDLEVBQUQsRUFBS0MsUUFBTCxFQUFrQjtBQUM5RCxRQUFJQyx1QkFBYUMsR0FBYixDQUFpQkgsRUFBakIsQ0FBSixFQUNFQyxTQUFTRyxJQUFULEdBQWdCRix1QkFBYUcsR0FBYixDQUFpQkwsRUFBakIsRUFBcUJQLE1BQXJCLENBQWhCO0FBQ0gsR0FIRDs7QUFLQSxNQUFNYSxZQUFZLElBQUlDLG1CQUFKLENBQWNDLGVBQWQsQ0FBbEI7QUFDQXRCLGFBQVdVLE1BQVgsQ0FBa0JhLEtBQWxCO0FBQ0QsQ0FmRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHNvdW5kd29ya3MgZnJvbSAnc291bmR3b3Jrcy9jbGllbnQnO1xuaW1wb3J0IHNlcnZpY2VWaWV3cyBmcm9tICcuLi9zaGFyZWQvc2VydmljZVZpZXdzJztcbmltcG9ydCBDb25kdWN0b3IgZnJvbSAnLi9Db25kdWN0b3InO1xuaW1wb3J0IHNjb3JlIGZyb20gJy4uLy4uL3NoYXJlZC9zY29yZSc7XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKTtcblxuICBjb25zdCBjb25maWcgPSBPYmplY3QuYXNzaWduKHtcbiAgICBhcHBDb250YWluZXI6ICcjY29udGFpbmVyJ1xuICB9LCB3aW5kb3cuc291bmR3b3Jrc0NvbmZpZyk7XG5cbiAgc291bmR3b3Jrcy5jbGllbnQuaW5pdChjb25maWcuY2xpZW50VHlwZSwgY29uZmlnKTtcbiAgc291bmR3b3Jrcy5jbGllbnQuc2V0U2VydmljZUluc3RhbmNpYXRpb25Ib29rKChpZCwgaW5zdGFuY2UpID0+IHtcbiAgICBpZiAoc2VydmljZVZpZXdzLmhhcyhpZCkpXG4gICAgICBpbnN0YW5jZS52aWV3ID0gc2VydmljZVZpZXdzLmdldChpZCwgY29uZmlnKTtcbiAgfSk7XG5cbiAgY29uc3QgY29uZHVjdG9yID0gbmV3IENvbmR1Y3RvcihzY29yZSk7XG4gIHNvdW5kd29ya3MuY2xpZW50LnN0YXJ0KCk7XG59KTtcbiJdfQ==