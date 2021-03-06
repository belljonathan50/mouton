'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

require('source-map-support/register');

var _server = require('soundworks/server');

var soundworks = _interopRequireWildcard(_server);

var _SharedExperience = require('./SharedExperience');

var _SharedExperience2 = _interopRequireDefault(_SharedExperience);

var _score = require('../shared/score');

var _score2 = _interopRequireDefault(_score);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configName = process.env.ENV || 'default';
var configPath = _path2.default.join(__dirname, 'config', configName);

var config = void 0;

try {
  config = require(configPath).default;
} catch (err) {
  console.error('Invalid ENV "' + configName + '", file "' + configPath + '.js" not found');
  console.error(err.stack);
  process.exit(1);
}

if (process.env.PORT) config.port = process.env.PORT;

// configure express environment ('production' enables cache system)
process.env.NODE_ENV = config.env;

config.appName = _score2.default.title;
// configure setup
var labels = (0, _keys2.default)(_score2.default.parts);
config.setup.labels = labels;

// initialize application with configuration options.
soundworks.server.init(config);

var sharedParams = soundworks.server.require('shared-params');

sharedParams.addText('numClients', 'Number Clients Ready', 0, ['conductor']);
sharedParams.addEnum('transport', 'Transport', ['Start', 'Pause', 'Stop'], 'Stop', ['conductor']);
sharedParams.addText('currentSection', 'Current Section', '');

for (var key in _score2.default.sections) {
  var section = _score2.default.sections[key];
  var min = parseInt(section.time / 60, 10);
  var sec = section.time % 60;
  var label = section.label + ' - ' + min + ':' + sec + ' (' + section.time + ' sec)';
  // send to 'dummy' client
  sharedParams.addTrigger(key, label, ['conductor']);
}

sharedParams.addNumber('seek', 'Seek', 0, _score2.default.duration, 1, 0, ['conductor']);
// sharedParams.addNumber('playbackRate', 'Playback Rate', 0.5, 1.5, 0.01, 1, null);
// volumes
sharedParams.addNumber('volume:performers', 'Volume performers', 0, 1, 0.01, 1, null);
sharedParams.addNumber('volume:env', 'Volume environments', 0, 1, 0.01, 1, null);

for (var name in _score2.default.parts) {
  if (_score2.default.parts[name].type === 'env') sharedParams.addNumber('volume:env:' + name, 'Volume ' + name, 0, 1, 0.01, 1, null);
}

sharedParams.addTrigger('reload', 'reload', 'player');

// define the configuration object to be passed to the `.ejs` template
soundworks.server.setClientConfigDefinition(function (clientType, config, httpRequest) {
  return {
    clientType: clientType,
    env: config.env,
    appName: config.appName,
    websockets: config.websockets,
    version: config.version,
    defaultType: config.defaultClient,
    assetsDomain: config.assetsDomain
  };
});

// Create the experience activity.
var experience = new _SharedExperience2.default(['player', 'conductor'], _score2.default);
// Start the application.
soundworks.server.start();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbInNvdW5kd29ya3MiLCJjb25maWdOYW1lIiwicHJvY2VzcyIsImVudiIsIkVOViIsImNvbmZpZ1BhdGgiLCJwYXRoIiwiam9pbiIsIl9fZGlybmFtZSIsImNvbmZpZyIsInJlcXVpcmUiLCJkZWZhdWx0IiwiZXJyIiwiY29uc29sZSIsImVycm9yIiwic3RhY2siLCJleGl0IiwiUE9SVCIsInBvcnQiLCJOT0RFX0VOViIsImFwcE5hbWUiLCJzY29yZSIsInRpdGxlIiwibGFiZWxzIiwicGFydHMiLCJzZXR1cCIsInNlcnZlciIsImluaXQiLCJzaGFyZWRQYXJhbXMiLCJhZGRUZXh0IiwiYWRkRW51bSIsImtleSIsInNlY3Rpb25zIiwic2VjdGlvbiIsIm1pbiIsInBhcnNlSW50IiwidGltZSIsInNlYyIsImxhYmVsIiwiYWRkVHJpZ2dlciIsImFkZE51bWJlciIsImR1cmF0aW9uIiwibmFtZSIsInR5cGUiLCJzZXRDbGllbnRDb25maWdEZWZpbml0aW9uIiwiY2xpZW50VHlwZSIsImh0dHBSZXF1ZXN0Iiwid2Vic29ja2V0cyIsInZlcnNpb24iLCJkZWZhdWx0VHlwZSIsImRlZmF1bHRDbGllbnQiLCJhc3NldHNEb21haW4iLCJleHBlcmllbmNlIiwiU2hhcmVkRXhwZXJpZW5jZSIsInN0YXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7QUFDQTs7SUFBWUEsVTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQyxhQUFhQyxRQUFRQyxHQUFSLENBQVlDLEdBQVosSUFBbUIsU0FBdEM7QUFDQSxJQUFNQyxhQUFhQyxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsUUFBckIsRUFBK0JQLFVBQS9CLENBQW5COztBQUVBLElBQUlRLGVBQUo7O0FBRUEsSUFBSTtBQUNGQSxXQUFTQyxRQUFRTCxVQUFSLEVBQW9CTSxPQUE3QjtBQUNELENBRkQsQ0FFRSxPQUFNQyxHQUFOLEVBQVc7QUFDWEMsVUFBUUMsS0FBUixtQkFBOEJiLFVBQTlCLGlCQUFvREksVUFBcEQ7QUFDQVEsVUFBUUMsS0FBUixDQUFjRixJQUFJRyxLQUFsQjtBQUNBYixVQUFRYyxJQUFSLENBQWEsQ0FBYjtBQUNEOztBQUVELElBQUlkLFFBQVFDLEdBQVIsQ0FBWWMsSUFBaEIsRUFDRVIsT0FBT1MsSUFBUCxHQUFjaEIsUUFBUUMsR0FBUixDQUFZYyxJQUExQjs7QUFFRjtBQUNBZixRQUFRQyxHQUFSLENBQVlnQixRQUFaLEdBQXVCVixPQUFPTixHQUE5Qjs7QUFFQU0sT0FBT1csT0FBUCxHQUFpQkMsZ0JBQU1DLEtBQXZCO0FBQ0E7QUFDQSxJQUFNQyxTQUFTLG9CQUFZRixnQkFBTUcsS0FBbEIsQ0FBZjtBQUNBZixPQUFPZ0IsS0FBUCxDQUFhRixNQUFiLEdBQXNCQSxNQUF0Qjs7QUFFQTtBQUNBdkIsV0FBVzBCLE1BQVgsQ0FBa0JDLElBQWxCLENBQXVCbEIsTUFBdkI7O0FBRUEsSUFBTW1CLGVBQWU1QixXQUFXMEIsTUFBWCxDQUFrQmhCLE9BQWxCLENBQTBCLGVBQTFCLENBQXJCOztBQUVBa0IsYUFBYUMsT0FBYixDQUFxQixZQUFyQixFQUFtQyxzQkFBbkMsRUFBMkQsQ0FBM0QsRUFBOEQsQ0FBQyxXQUFELENBQTlEO0FBQ0FELGFBQWFFLE9BQWIsQ0FBcUIsV0FBckIsRUFBa0MsV0FBbEMsRUFBK0MsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixNQUFuQixDQUEvQyxFQUEyRSxNQUEzRSxFQUFtRixDQUFDLFdBQUQsQ0FBbkY7QUFDQUYsYUFBYUMsT0FBYixDQUFxQixnQkFBckIsRUFBdUMsaUJBQXZDLEVBQTBELEVBQTFEOztBQUVBLEtBQUssSUFBSUUsR0FBVCxJQUFnQlYsZ0JBQU1XLFFBQXRCLEVBQWdDO0FBQzlCLE1BQU1DLFVBQVVaLGdCQUFNVyxRQUFOLENBQWVELEdBQWYsQ0FBaEI7QUFDQSxNQUFNRyxNQUFNQyxTQUFTRixRQUFRRyxJQUFSLEdBQWUsRUFBeEIsRUFBNEIsRUFBNUIsQ0FBWjtBQUNBLE1BQU1DLE1BQU1KLFFBQVFHLElBQVIsR0FBZSxFQUEzQjtBQUNBLE1BQU1FLFFBQVdMLFFBQVFLLEtBQW5CLFdBQThCSixHQUE5QixTQUFxQ0csR0FBckMsVUFBNkNKLFFBQVFHLElBQXJELFVBQU47QUFDQTtBQUNBUixlQUFhVyxVQUFiLENBQXdCUixHQUF4QixFQUE2Qk8sS0FBN0IsRUFBb0MsQ0FBQyxXQUFELENBQXBDO0FBQ0Q7O0FBRURWLGFBQWFZLFNBQWIsQ0FBdUIsTUFBdkIsRUFBK0IsTUFBL0IsRUFBdUMsQ0FBdkMsRUFBMENuQixnQkFBTW9CLFFBQWhELEVBQTBELENBQTFELEVBQTZELENBQTdELEVBQWdFLENBQUMsV0FBRCxDQUFoRTtBQUNBO0FBQ0E7QUFDQWIsYUFBYVksU0FBYixDQUF1QixtQkFBdkIsRUFBNEMsbUJBQTVDLEVBQWlFLENBQWpFLEVBQW9FLENBQXBFLEVBQXVFLElBQXZFLEVBQTZFLENBQTdFLEVBQWdGLElBQWhGO0FBQ0FaLGFBQWFZLFNBQWIsQ0FBdUIsWUFBdkIsRUFBcUMscUJBQXJDLEVBQTRELENBQTVELEVBQStELENBQS9ELEVBQWtFLElBQWxFLEVBQXdFLENBQXhFLEVBQTJFLElBQTNFOztBQUVBLEtBQUssSUFBSUUsSUFBVCxJQUFpQnJCLGdCQUFNRyxLQUF2QixFQUE4QjtBQUM1QixNQUFJSCxnQkFBTUcsS0FBTixDQUFZa0IsSUFBWixFQUFrQkMsSUFBbEIsS0FBMkIsS0FBL0IsRUFDRWYsYUFBYVksU0FBYixpQkFBcUNFLElBQXJDLGNBQXVEQSxJQUF2RCxFQUErRCxDQUEvRCxFQUFrRSxDQUFsRSxFQUFxRSxJQUFyRSxFQUEyRSxDQUEzRSxFQUE4RSxJQUE5RTtBQUNIOztBQUVEZCxhQUFhVyxVQUFiLENBQXdCLFFBQXhCLEVBQWtDLFFBQWxDLEVBQTRDLFFBQTVDOztBQUVBO0FBQ0F2QyxXQUFXMEIsTUFBWCxDQUFrQmtCLHlCQUFsQixDQUE0QyxVQUFDQyxVQUFELEVBQWFwQyxNQUFiLEVBQXFCcUMsV0FBckIsRUFBcUM7QUFDL0UsU0FBTztBQUNMRCxnQkFBWUEsVUFEUDtBQUVMMUMsU0FBS00sT0FBT04sR0FGUDtBQUdMaUIsYUFBU1gsT0FBT1csT0FIWDtBQUlMMkIsZ0JBQVl0QyxPQUFPc0MsVUFKZDtBQUtMQyxhQUFTdkMsT0FBT3VDLE9BTFg7QUFNTEMsaUJBQWF4QyxPQUFPeUMsYUFOZjtBQU9MQyxrQkFBYzFDLE9BQU8wQztBQVBoQixHQUFQO0FBU0QsQ0FWRDs7QUFZQTtBQUNBLElBQU1DLGFBQWEsSUFBSUMsMEJBQUosQ0FBcUIsQ0FBQyxRQUFELEVBQVcsV0FBWCxDQUFyQixFQUE4Q2hDLGVBQTlDLENBQW5CO0FBQ0E7QUFDQXJCLFdBQVcwQixNQUFYLENBQWtCNEIsS0FBbEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3NvdXJjZS1tYXAtc3VwcG9ydC9yZWdpc3Rlcic7XG5pbXBvcnQgKiBhcyBzb3VuZHdvcmtzIGZyb20gJ3NvdW5kd29ya3Mvc2VydmVyJztcbmltcG9ydCBTaGFyZWRFeHBlcmllbmNlIGZyb20gJy4vU2hhcmVkRXhwZXJpZW5jZSc7XG5pbXBvcnQgc2NvcmUgZnJvbSAnLi4vc2hhcmVkL3Njb3JlJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY29uc3QgY29uZmlnTmFtZSA9IHByb2Nlc3MuZW52LkVOViB8fMKgJ2RlZmF1bHQnO1xuY29uc3QgY29uZmlnUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICdjb25maWcnLCBjb25maWdOYW1lKTtcblxubGV0IGNvbmZpZztcblxudHJ5IHtcbiAgY29uZmlnID0gcmVxdWlyZShjb25maWdQYXRoKS5kZWZhdWx0O1xufSBjYXRjaChlcnIpIHtcbiAgY29uc29sZS5lcnJvcihgSW52YWxpZCBFTlYgXCIke2NvbmZpZ05hbWV9XCIsIGZpbGUgXCIke2NvbmZpZ1BhdGh9LmpzXCIgbm90IGZvdW5kYCk7XG4gIGNvbnNvbGUuZXJyb3IoZXJyLnN0YWNrKTtcbiAgcHJvY2Vzcy5leGl0KDEpO1xufVxuXG5pZiAocHJvY2Vzcy5lbnYuUE9SVClcbiAgY29uZmlnLnBvcnQgPSBwcm9jZXNzLmVudi5QT1JUO1xuXG4vLyBjb25maWd1cmUgZXhwcmVzcyBlbnZpcm9ubWVudCAoJ3Byb2R1Y3Rpb24nIGVuYWJsZXMgY2FjaGUgc3lzdGVtKVxucHJvY2Vzcy5lbnYuTk9ERV9FTlYgPSBjb25maWcuZW52O1xuXG5jb25maWcuYXBwTmFtZSA9IHNjb3JlLnRpdGxlO1xuLy8gY29uZmlndXJlIHNldHVwXG5jb25zdCBsYWJlbHMgPSBPYmplY3Qua2V5cyhzY29yZS5wYXJ0cyk7XG5jb25maWcuc2V0dXAubGFiZWxzID0gbGFiZWxzO1xuXG4vLyBpbml0aWFsaXplIGFwcGxpY2F0aW9uIHdpdGggY29uZmlndXJhdGlvbiBvcHRpb25zLlxuc291bmR3b3Jrcy5zZXJ2ZXIuaW5pdChjb25maWcpO1xuXG5jb25zdCBzaGFyZWRQYXJhbXMgPSBzb3VuZHdvcmtzLnNlcnZlci5yZXF1aXJlKCdzaGFyZWQtcGFyYW1zJyk7XG5cbnNoYXJlZFBhcmFtcy5hZGRUZXh0KCdudW1DbGllbnRzJywgJ051bWJlciBDbGllbnRzIFJlYWR5JywgMCwgWydjb25kdWN0b3InXSk7XG5zaGFyZWRQYXJhbXMuYWRkRW51bSgndHJhbnNwb3J0JywgJ1RyYW5zcG9ydCcsIFsnU3RhcnQnLCAnUGF1c2UnLCAnU3RvcCddLCAnU3RvcCcsIFsnY29uZHVjdG9yJ10pO1xuc2hhcmVkUGFyYW1zLmFkZFRleHQoJ2N1cnJlbnRTZWN0aW9uJywgJ0N1cnJlbnQgU2VjdGlvbicsICcnKTtcblxuZm9yIChsZXQga2V5IGluIHNjb3JlLnNlY3Rpb25zKSB7XG4gIGNvbnN0IHNlY3Rpb24gPSBzY29yZS5zZWN0aW9uc1trZXldO1xuICBjb25zdCBtaW4gPSBwYXJzZUludChzZWN0aW9uLnRpbWUgLyA2MCwgMTApO1xuICBjb25zdCBzZWMgPSBzZWN0aW9uLnRpbWUgJSA2MDtcbiAgY29uc3QgbGFiZWwgPSBgJHtzZWN0aW9uLmxhYmVsfSAtICR7bWlufToke3NlY30gKCR7c2VjdGlvbi50aW1lfSBzZWMpYDtcbiAgLy8gc2VuZCB0byAnZHVtbXknIGNsaWVudFxuICBzaGFyZWRQYXJhbXMuYWRkVHJpZ2dlcihrZXksIGxhYmVsLCBbJ2NvbmR1Y3RvciddKTtcbn1cblxuc2hhcmVkUGFyYW1zLmFkZE51bWJlcignc2VlaycsICdTZWVrJywgMCwgc2NvcmUuZHVyYXRpb24sIDEsIDAsIFsnY29uZHVjdG9yJ10pO1xuLy8gc2hhcmVkUGFyYW1zLmFkZE51bWJlcigncGxheWJhY2tSYXRlJywgJ1BsYXliYWNrIFJhdGUnLCAwLjUsIDEuNSwgMC4wMSwgMSwgbnVsbCk7XG4vLyB2b2x1bWVzXG5zaGFyZWRQYXJhbXMuYWRkTnVtYmVyKCd2b2x1bWU6cGVyZm9ybWVycycsICdWb2x1bWUgcGVyZm9ybWVycycsIDAsIDEsIDAuMDEsIDEsIG51bGwpO1xuc2hhcmVkUGFyYW1zLmFkZE51bWJlcigndm9sdW1lOmVudicsICdWb2x1bWUgZW52aXJvbm1lbnRzJywgMCwgMSwgMC4wMSwgMSwgbnVsbCk7XG5cbmZvciAobGV0IG5hbWUgaW4gc2NvcmUucGFydHMpIHtcbiAgaWYgKHNjb3JlLnBhcnRzW25hbWVdLnR5cGUgPT09ICdlbnYnKVxuICAgIHNoYXJlZFBhcmFtcy5hZGROdW1iZXIoYHZvbHVtZTplbnY6JHtuYW1lfWAsIGBWb2x1bWUgJHtuYW1lfWAsIDAsIDEsIDAuMDEsIDEsIG51bGwpO1xufVxuXG5zaGFyZWRQYXJhbXMuYWRkVHJpZ2dlcigncmVsb2FkJywgJ3JlbG9hZCcsICdwbGF5ZXInKTtcblxuLy8gZGVmaW5lIHRoZSBjb25maWd1cmF0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG8gdGhlIGAuZWpzYCB0ZW1wbGF0ZVxuc291bmR3b3Jrcy5zZXJ2ZXIuc2V0Q2xpZW50Q29uZmlnRGVmaW5pdGlvbigoY2xpZW50VHlwZSwgY29uZmlnLCBodHRwUmVxdWVzdCkgPT4ge1xuICByZXR1cm4ge1xuICAgIGNsaWVudFR5cGU6IGNsaWVudFR5cGUsXG4gICAgZW52OiBjb25maWcuZW52LFxuICAgIGFwcE5hbWU6IGNvbmZpZy5hcHBOYW1lLFxuICAgIHdlYnNvY2tldHM6IGNvbmZpZy53ZWJzb2NrZXRzLFxuICAgIHZlcnNpb246IGNvbmZpZy52ZXJzaW9uLFxuICAgIGRlZmF1bHRUeXBlOiBjb25maWcuZGVmYXVsdENsaWVudCxcbiAgICBhc3NldHNEb21haW46IGNvbmZpZy5hc3NldHNEb21haW5cbiAgfTtcbn0pO1xuXG4vLyBDcmVhdGUgdGhlIGV4cGVyaWVuY2UgYWN0aXZpdHkuXG5jb25zdCBleHBlcmllbmNlID0gbmV3IFNoYXJlZEV4cGVyaWVuY2UoWydwbGF5ZXInLCAnY29uZHVjdG9yJ10sIHNjb3JlKTtcbi8vIFN0YXJ0IHRoZSBhcHBsaWNhdGlvbi5cbnNvdW5kd29ya3Muc2VydmVyLnN0YXJ0KCk7XG4iXX0=