'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cwd = process.cwd();

// Configuration of the application.
// Other entries can be added (as long as their name doesn't conflict with
// existing ones) to define global parameters of the application (e.g. BPM,
// synth parameters) that can then be shared easily among all clients using
// the `shared-config` service.
exports.default = {
  // name of the application, used in the `.ejs` template and by default in
  // the `platform` service to populate its view
  appName: 'Template',

  // name of the environnement ('production' enable cache in express application)
  env: 'production',

  // version of application, can be used to force reload css and js files
  // from server (cf. `html/default.ejs`)
  version: '1.0.0',

  // name of the default client type, i.e. the client that can access the
  // application at its root URL
  defaultClient: 'player',

  // define from where the assets (static files) should be loaded, these value
  // could also refer to a separate server for scalability reasons. This value
  // should also be used client-side to configure the `loader` service.
  assetsDomain: '/',

  // port used to open the http server, in production this value is typically 80
  port: 8000,

  // describe the location where the experience takes places, theses values are
  // used by the `placer`, `checkin` and `locator` services.
  // if one of these service is required, this entry shouldn't be removed.
  setup: {
    area: {
      width: 1,
      height: 1,
      // path to an image to be used in the area representation
      background: null
    },
    // list of predefined labels
    labels: null,
    // list of predefined coordinates given as an array of `[x:Number, y:Number]`
    coordinates: null,
    // maximum number of clients allowed in a position
    maxClientsPerPosition: 100,
    // maximum number of positions (may limit or be limited by the number of
    // labels and/or coordinates)
    capacity: Infinity
  },

  // socket.io configuration
  socketIO: {
    url: '',
    transports: ['websocket']
    // @note: EngineIO defaults
    // pingTimeout: 3000,
    // pingInterval: 1000,
    // upgradeTimeout: 10000,
    // maxHttpBufferSize: 10E7,
  },

  // define if the HTTP server should be launched using secure connections.
  // For development purposes when set to `true` and no certificates are given
  // (cf. `httpsInfos`), a self-signed certificate is created.
  useHttps: false,

  // paths to the key and certificate to be used in order to launch the https
  // server. Both entries are required otherwise a self-signed certificate
  // is generated.
  httpsInfos: {
    key: null,
    cert: null
  },

  // password to be used by the `auth` service
  password: '',

  // configuration of the `osc` service
  osc: {
    // IP of the currently running node server
    receiveAddress: '127.0.0.1',
    // port listening for incomming messages
    receivePort: 57121,
    // IP of the remote application
    sendAddress: '127.0.0.1',
    // port where the remote application is listening for messages
    sendPort: 57120
  },

  // define if the server should use gzip compression for static files
  enableGZipCompression: true,

  // location of the public directory (accessible through http(s) requests)
  publicDirectory: _path2.default.join(cwd, 'public'),

  // directory where the server templating system looks for the `ejs` templates
  templateDirectory: _path2.default.join(cwd, 'html'),

  // bunyan configuration
  logger: {
    name: 'soundworks',
    level: 'info',
    streams: [{
      level: 'info',
      stream: process.stdout
    }]
  },

  // directory where error reported from the clients are written
  errorReporterDirectory: _path2.default.join(cwd, 'logs', 'clients')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlZmF1bHQuanMiXSwibmFtZXMiOlsiY3dkIiwicHJvY2VzcyIsImFwcE5hbWUiLCJlbnYiLCJ2ZXJzaW9uIiwiZGVmYXVsdENsaWVudCIsImFzc2V0c0RvbWFpbiIsInBvcnQiLCJzZXR1cCIsImFyZWEiLCJ3aWR0aCIsImhlaWdodCIsImJhY2tncm91bmQiLCJsYWJlbHMiLCJjb29yZGluYXRlcyIsIm1heENsaWVudHNQZXJQb3NpdGlvbiIsImNhcGFjaXR5IiwiSW5maW5pdHkiLCJzb2NrZXRJTyIsInVybCIsInRyYW5zcG9ydHMiLCJ1c2VIdHRwcyIsImh0dHBzSW5mb3MiLCJrZXkiLCJjZXJ0IiwicGFzc3dvcmQiLCJvc2MiLCJyZWNlaXZlQWRkcmVzcyIsInJlY2VpdmVQb3J0Iiwic2VuZEFkZHJlc3MiLCJzZW5kUG9ydCIsImVuYWJsZUdaaXBDb21wcmVzc2lvbiIsInB1YmxpY0RpcmVjdG9yeSIsInBhdGgiLCJqb2luIiwidGVtcGxhdGVEaXJlY3RvcnkiLCJsb2dnZXIiLCJuYW1lIiwibGV2ZWwiLCJzdHJlYW1zIiwic3RyZWFtIiwic3Rkb3V0IiwiZXJyb3JSZXBvcnRlckRpcmVjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7OztBQUNBLElBQU1BLE1BQU1DLFFBQVFELEdBQVIsRUFBWjs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO2tCQUNlO0FBQ2I7QUFDQTtBQUNBRSxXQUFTLFVBSEk7O0FBS2I7QUFDQUMsT0FBSyxZQU5ROztBQVFiO0FBQ0E7QUFDQUMsV0FBUyxPQVZJOztBQVliO0FBQ0E7QUFDQUMsaUJBQWUsUUFkRjs7QUFnQmI7QUFDQTtBQUNBO0FBQ0FDLGdCQUFjLEdBbkJEOztBQXFCYjtBQUNBQyxRQUFNLElBdEJPOztBQXdCYjtBQUNBO0FBQ0E7QUFDQUMsU0FBTztBQUNMQyxVQUFNO0FBQ0pDLGFBQU8sQ0FESDtBQUVKQyxjQUFRLENBRko7QUFHSjtBQUNBQyxrQkFBWTtBQUpSLEtBREQ7QUFPTDtBQUNBQyxZQUFRLElBUkg7QUFTTDtBQUNBQyxpQkFBYSxJQVZSO0FBV0w7QUFDQUMsMkJBQXVCLEdBWmxCO0FBYUw7QUFDQTtBQUNBQyxjQUFVQztBQWZMLEdBM0JNOztBQTZDYjtBQUNBQyxZQUFVO0FBQ1JDLFNBQUssRUFERztBQUVSQyxnQkFBWSxDQUFDLFdBQUQ7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBUFEsR0E5Q0c7O0FBd0RiO0FBQ0E7QUFDQTtBQUNBQyxZQUFVLEtBM0RHOztBQTZEYjtBQUNBO0FBQ0E7QUFDQUMsY0FBWTtBQUNWQyxTQUFLLElBREs7QUFFVkMsVUFBTTtBQUZJLEdBaEVDOztBQXFFYjtBQUNBQyxZQUFVLEVBdEVHOztBQXdFYjtBQUNBQyxPQUFLO0FBQ0g7QUFDQUMsb0JBQWdCLFdBRmI7QUFHSDtBQUNBQyxpQkFBYSxLQUpWO0FBS0g7QUFDQUMsaUJBQWEsV0FOVjtBQU9IO0FBQ0FDLGNBQVU7QUFSUCxHQXpFUTs7QUFvRmI7QUFDQUMseUJBQXVCLElBckZWOztBQXVGYjtBQUNBQyxtQkFBaUJDLGVBQUtDLElBQUwsQ0FBVWxDLEdBQVYsRUFBZSxRQUFmLENBeEZKOztBQTBGYjtBQUNBbUMscUJBQW1CRixlQUFLQyxJQUFMLENBQVVsQyxHQUFWLEVBQWUsTUFBZixDQTNGTjs7QUE2RmI7QUFDQW9DLFVBQVE7QUFDTkMsVUFBTSxZQURBO0FBRU5DLFdBQU8sTUFGRDtBQUdOQyxhQUFTLENBQUM7QUFDUkQsYUFBTyxNQURDO0FBRVJFLGNBQVF2QyxRQUFRd0M7QUFGUixLQUFEO0FBSEgsR0E5Rks7O0FBMEdiO0FBQ0FDLDBCQUF3QlQsZUFBS0MsSUFBTCxDQUFVbEMsR0FBVixFQUFlLE1BQWYsRUFBdUIsU0FBdkI7QUEzR1gsQyIsImZpbGUiOiJkZWZhdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5jb25zdCBjd2QgPSBwcm9jZXNzLmN3ZCgpO1xuXG5cbi8vIENvbmZpZ3VyYXRpb24gb2YgdGhlIGFwcGxpY2F0aW9uLlxuLy8gT3RoZXIgZW50cmllcyBjYW4gYmUgYWRkZWQgKGFzIGxvbmcgYXMgdGhlaXIgbmFtZSBkb2Vzbid0IGNvbmZsaWN0IHdpdGhcbi8vIGV4aXN0aW5nIG9uZXMpIHRvIGRlZmluZSBnbG9iYWwgcGFyYW1ldGVycyBvZiB0aGUgYXBwbGljYXRpb24gKGUuZy4gQlBNLFxuLy8gc3ludGggcGFyYW1ldGVycykgdGhhdCBjYW4gdGhlbiBiZSBzaGFyZWQgZWFzaWx5IGFtb25nIGFsbCBjbGllbnRzIHVzaW5nXG4vLyB0aGUgYHNoYXJlZC1jb25maWdgIHNlcnZpY2UuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8vIG5hbWUgb2YgdGhlIGFwcGxpY2F0aW9uLCB1c2VkIGluIHRoZSBgLmVqc2AgdGVtcGxhdGUgYW5kIGJ5IGRlZmF1bHQgaW5cbiAgLy8gdGhlIGBwbGF0Zm9ybWAgc2VydmljZSB0byBwb3B1bGF0ZSBpdHMgdmlld1xuICBhcHBOYW1lOiAnVGVtcGxhdGUnLFxuXG4gIC8vIG5hbWUgb2YgdGhlIGVudmlyb25uZW1lbnQgKCdwcm9kdWN0aW9uJyBlbmFibGUgY2FjaGUgaW4gZXhwcmVzcyBhcHBsaWNhdGlvbilcbiAgZW52OiAncHJvZHVjdGlvbicsXG5cbiAgLy8gdmVyc2lvbiBvZiBhcHBsaWNhdGlvbiwgY2FuIGJlIHVzZWQgdG8gZm9yY2UgcmVsb2FkIGNzcyBhbmQganMgZmlsZXNcbiAgLy8gZnJvbSBzZXJ2ZXIgKGNmLiBgaHRtbC9kZWZhdWx0LmVqc2ApXG4gIHZlcnNpb246ICcxLjAuMCcsXG5cbiAgLy8gbmFtZSBvZiB0aGUgZGVmYXVsdCBjbGllbnQgdHlwZSwgaS5lLiB0aGUgY2xpZW50IHRoYXQgY2FuIGFjY2VzcyB0aGVcbiAgLy8gYXBwbGljYXRpb24gYXQgaXRzIHJvb3QgVVJMXG4gIGRlZmF1bHRDbGllbnQ6ICdwbGF5ZXInLFxuXG4gIC8vIGRlZmluZSBmcm9tIHdoZXJlIHRoZSBhc3NldHMgKHN0YXRpYyBmaWxlcykgc2hvdWxkIGJlIGxvYWRlZCwgdGhlc2UgdmFsdWVcbiAgLy8gY291bGQgYWxzbyByZWZlciB0byBhIHNlcGFyYXRlIHNlcnZlciBmb3Igc2NhbGFiaWxpdHkgcmVhc29ucy4gVGhpcyB2YWx1ZVxuICAvLyBzaG91bGQgYWxzbyBiZSB1c2VkIGNsaWVudC1zaWRlIHRvIGNvbmZpZ3VyZSB0aGUgYGxvYWRlcmAgc2VydmljZS5cbiAgYXNzZXRzRG9tYWluOiAnLycsXG5cbiAgLy8gcG9ydCB1c2VkIHRvIG9wZW4gdGhlIGh0dHAgc2VydmVyLCBpbiBwcm9kdWN0aW9uIHRoaXMgdmFsdWUgaXMgdHlwaWNhbGx5IDgwXG4gIHBvcnQ6IDgwMDAsXG5cbiAgLy8gZGVzY3JpYmUgdGhlIGxvY2F0aW9uIHdoZXJlIHRoZSBleHBlcmllbmNlIHRha2VzIHBsYWNlcywgdGhlc2VzIHZhbHVlcyBhcmVcbiAgLy8gdXNlZCBieSB0aGUgYHBsYWNlcmAsIGBjaGVja2luYCBhbmQgYGxvY2F0b3JgIHNlcnZpY2VzLlxuICAvLyBpZiBvbmUgb2YgdGhlc2Ugc2VydmljZSBpcyByZXF1aXJlZCwgdGhpcyBlbnRyeSBzaG91bGRuJ3QgYmUgcmVtb3ZlZC5cbiAgc2V0dXA6IHtcbiAgICBhcmVhOiB7XG4gICAgICB3aWR0aDogMSxcbiAgICAgIGhlaWdodDogMSxcbiAgICAgIC8vIHBhdGggdG8gYW4gaW1hZ2UgdG8gYmUgdXNlZCBpbiB0aGUgYXJlYSByZXByZXNlbnRhdGlvblxuICAgICAgYmFja2dyb3VuZDogbnVsbCxcbiAgICB9LFxuICAgIC8vIGxpc3Qgb2YgcHJlZGVmaW5lZCBsYWJlbHNcbiAgICBsYWJlbHM6IG51bGwsXG4gICAgLy8gbGlzdCBvZiBwcmVkZWZpbmVkIGNvb3JkaW5hdGVzIGdpdmVuIGFzIGFuIGFycmF5IG9mIGBbeDpOdW1iZXIsIHk6TnVtYmVyXWBcbiAgICBjb29yZGluYXRlczogbnVsbCxcbiAgICAvLyBtYXhpbXVtIG51bWJlciBvZiBjbGllbnRzIGFsbG93ZWQgaW4gYSBwb3NpdGlvblxuICAgIG1heENsaWVudHNQZXJQb3NpdGlvbjogMTAwLFxuICAgIC8vIG1heGltdW0gbnVtYmVyIG9mIHBvc2l0aW9ucyAobWF5IGxpbWl0IG9yIGJlIGxpbWl0ZWQgYnkgdGhlIG51bWJlciBvZlxuICAgIC8vIGxhYmVscyBhbmQvb3IgY29vcmRpbmF0ZXMpXG4gICAgY2FwYWNpdHk6IEluZmluaXR5LFxuICB9LFxuXG4gIC8vIHNvY2tldC5pbyBjb25maWd1cmF0aW9uXG4gIHNvY2tldElPOiB7XG4gICAgdXJsOiAnJyxcbiAgICB0cmFuc3BvcnRzOiBbJ3dlYnNvY2tldCddLFxuICAgIC8vIEBub3RlOiBFbmdpbmVJTyBkZWZhdWx0c1xuICAgIC8vIHBpbmdUaW1lb3V0OiAzMDAwLFxuICAgIC8vIHBpbmdJbnRlcnZhbDogMTAwMCxcbiAgICAvLyB1cGdyYWRlVGltZW91dDogMTAwMDAsXG4gICAgLy8gbWF4SHR0cEJ1ZmZlclNpemU6IDEwRTcsXG4gIH0sXG5cbiAgLy8gZGVmaW5lIGlmIHRoZSBIVFRQIHNlcnZlciBzaG91bGQgYmUgbGF1bmNoZWQgdXNpbmcgc2VjdXJlIGNvbm5lY3Rpb25zLlxuICAvLyBGb3IgZGV2ZWxvcG1lbnQgcHVycG9zZXMgd2hlbiBzZXQgdG8gYHRydWVgIGFuZCBubyBjZXJ0aWZpY2F0ZXMgYXJlIGdpdmVuXG4gIC8vIChjZi4gYGh0dHBzSW5mb3NgKSwgYSBzZWxmLXNpZ25lZCBjZXJ0aWZpY2F0ZSBpcyBjcmVhdGVkLlxuICB1c2VIdHRwczogZmFsc2UsXG5cbiAgLy8gcGF0aHMgdG8gdGhlIGtleSBhbmQgY2VydGlmaWNhdGUgdG8gYmUgdXNlZCBpbiBvcmRlciB0byBsYXVuY2ggdGhlIGh0dHBzXG4gIC8vIHNlcnZlci4gQm90aCBlbnRyaWVzIGFyZSByZXF1aXJlZCBvdGhlcndpc2UgYSBzZWxmLXNpZ25lZCBjZXJ0aWZpY2F0ZVxuICAvLyBpcyBnZW5lcmF0ZWQuXG4gIGh0dHBzSW5mb3M6IHtcbiAgICBrZXk6IG51bGwsXG4gICAgY2VydDogbnVsbCxcbiAgfSxcblxuICAvLyBwYXNzd29yZCB0byBiZSB1c2VkIGJ5IHRoZSBgYXV0aGAgc2VydmljZVxuICBwYXNzd29yZDogJycsXG5cbiAgLy8gY29uZmlndXJhdGlvbiBvZiB0aGUgYG9zY2Agc2VydmljZVxuICBvc2M6IHtcbiAgICAvLyBJUCBvZiB0aGUgY3VycmVudGx5IHJ1bm5pbmcgbm9kZSBzZXJ2ZXJcbiAgICByZWNlaXZlQWRkcmVzczogJzEyNy4wLjAuMScsXG4gICAgLy8gcG9ydCBsaXN0ZW5pbmcgZm9yIGluY29tbWluZyBtZXNzYWdlc1xuICAgIHJlY2VpdmVQb3J0OiA1NzEyMSxcbiAgICAvLyBJUCBvZiB0aGUgcmVtb3RlIGFwcGxpY2F0aW9uXG4gICAgc2VuZEFkZHJlc3M6ICcxMjcuMC4wLjEnLFxuICAgIC8vIHBvcnQgd2hlcmUgdGhlIHJlbW90ZSBhcHBsaWNhdGlvbiBpcyBsaXN0ZW5pbmcgZm9yIG1lc3NhZ2VzXG4gICAgc2VuZFBvcnQ6IDU3MTIwLFxuICB9LFxuXG4gIC8vIGRlZmluZSBpZiB0aGUgc2VydmVyIHNob3VsZCB1c2UgZ3ppcCBjb21wcmVzc2lvbiBmb3Igc3RhdGljIGZpbGVzXG4gIGVuYWJsZUdaaXBDb21wcmVzc2lvbjogdHJ1ZSxcblxuICAvLyBsb2NhdGlvbiBvZiB0aGUgcHVibGljIGRpcmVjdG9yeSAoYWNjZXNzaWJsZSB0aHJvdWdoIGh0dHAocykgcmVxdWVzdHMpXG4gIHB1YmxpY0RpcmVjdG9yeTogcGF0aC5qb2luKGN3ZCwgJ3B1YmxpYycpLFxuXG4gIC8vIGRpcmVjdG9yeSB3aGVyZSB0aGUgc2VydmVyIHRlbXBsYXRpbmcgc3lzdGVtIGxvb2tzIGZvciB0aGUgYGVqc2AgdGVtcGxhdGVzXG4gIHRlbXBsYXRlRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAnaHRtbCcpLFxuXG4gIC8vIGJ1bnlhbiBjb25maWd1cmF0aW9uXG4gIGxvZ2dlcjoge1xuICAgIG5hbWU6ICdzb3VuZHdvcmtzJyxcbiAgICBsZXZlbDogJ2luZm8nLFxuICAgIHN0cmVhbXM6IFt7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgc3RyZWFtOiBwcm9jZXNzLnN0ZG91dCxcbiAgICB9LCAvKiB7XG4gICAgICBsZXZlbDogJ2luZm8nLFxuICAgICAgcGF0aDogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdsb2dzJywgJ3NvdW5kd29ya3MubG9nJyksXG4gICAgfSAqL11cbiAgfSxcblxuICAvLyBkaXJlY3Rvcnkgd2hlcmUgZXJyb3IgcmVwb3J0ZWQgZnJvbSB0aGUgY2xpZW50cyBhcmUgd3JpdHRlblxuICBlcnJvclJlcG9ydGVyRGlyZWN0b3J5OiBwYXRoLmpvaW4oY3dkLCAnbG9ncycsICdjbGllbnRzJyksXG59XG4iXX0=