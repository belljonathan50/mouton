'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

// --------------------------- example
/**
 * Interface for the view of the `audio-buffer-manager` service.
 *
 * @interface AbstractAudioBufferManagerView
 * @extends module:soundworks/client.View
 */
/**
 * Method called when a new information about the currently loaded assets
 * is received.
 *
 * @function
 * @name AbstractAudioBufferManagerView.onProgress
 * @param {Number} percent - The purcentage of loaded assets.
 */
// ------------------------------------

var noop = function noop() {};

var serviceViews = {
  // ------------------------------------------------
  // AudioBufferManager
  // ------------------------------------------------
  'service:audio-buffer-manager': function (_SegmentedView) {
    (0, _inherits3.default)(AudioBufferManagerView, _SegmentedView);

    function AudioBufferManagerView() {
      (0, _classCallCheck3.default)(this, AudioBufferManagerView);

      var _this = (0, _possibleConstructorReturn3.default)(this, (AudioBufferManagerView.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferManagerView)).call(this));

      _this.template = '\n        <div class="section-top flex-middle">\n          <p><%= msg[status] %></p>\n        </div>\n        <div class="section-center flex-center">\n          <% if (showProgress) { %>\n          <div class="progress-wrap">\n            <div class="progress-bar"></div>\n          </div>\n          <% } %>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this.model = {
        status: 'loading',
        showProgress: true,
        msg: {
          loading: 'Loading sounds...',
          decoding: 'Decoding sounds...'
        }
      };
      return _this;
    }

    (0, _createClass3.default)(AudioBufferManagerView, [{
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(AudioBufferManagerView.prototype.__proto__ || (0, _getPrototypeOf2.default)(AudioBufferManagerView.prototype), 'onRender', this).call(this);
        this.$progressBar = this.$el.querySelector('.progress-bar');
      }
    }, {
      key: 'onProgress',
      value: function onProgress(ratio) {
        var percent = Math.round(ratio * 100);

        if (percent === 100) {
          this.model.status = 'decoding';
          this.render('.section-top');
        }

        if (this.model.showProgress) this.$progressBar.style.width = percent + '%';
      }
    }]);
    return AudioBufferManagerView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Auth
  // ------------------------------------------------
  'service:auth': function (_SegmentedView2) {
    (0, _inherits3.default)(AuthView, _SegmentedView2);

    function AuthView() {
      (0, _classCallCheck3.default)(this, AuthView);

      var _this2 = (0, _possibleConstructorReturn3.default)(this, (AuthView.__proto__ || (0, _getPrototypeOf2.default)(AuthView)).call(this));

      _this2.template = '\n        <% if (!rejected) { %>\n          <div class="section-top flex-middle">\n            <p><%= instructions %></p>\n          </div>\n          <div class="section-center flex-center">\n            <div>\n              <input type="password" id="password" />\n              <button class="btn" id="send"><%= send %></button>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <button id="reset" class="btn"><%= reset %></button>\n          </div>\n        <% } else { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= rejectMessage %></p>\n          </div>\n          <div class="section-bottom flex-middle">\n            <button id="reset" class="btn"><%= reset %></button>\n          </div>\n        <% } %>\n      ';

      _this2.model = {
        instructions: 'Login',
        send: 'Send',
        reset: 'Reset',
        rejectMessage: 'Sorry, you don\'t have access to this client',
        rejected: false
      };

      _this2._sendPasswordCallback = noop;
      _this2._resetCallback = noop;
      return _this2;
    }

    (0, _createClass3.default)(AuthView, [{
      key: 'onRender',
      value: function onRender() {
        var _this3 = this;

        (0, _get3.default)(AuthView.prototype.__proto__ || (0, _getPrototypeOf2.default)(AuthView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'click #send': function clickSend() {
            var password = _this3.$el.querySelector('#password').value;

            if (password !== '') _this3._sendPasswordCallback(password);
          },
          'click #reset': function clickReset() {
            return _this3._resetCallback();
          }
        });
      }
    }, {
      key: 'setSendPasswordCallback',
      value: function setSendPasswordCallback(callback) {
        this._sendPasswordCallback = callback;
      }
    }, {
      key: 'setResetCallback',
      value: function setResetCallback(callback) {
        this._resetCallback = callback;
      }
    }, {
      key: 'updateRejectedStatus',
      value: function updateRejectedStatus(value) {
        this.model.rejected = value;
        this.render();
      }
    }]);
    return AuthView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Checkin
  // ------------------------------------------------
  'service:checkin': function (_SegmentedView3) {
    (0, _inherits3.default)(CheckinView, _SegmentedView3);

    function CheckinView() {
      (0, _classCallCheck3.default)(this, CheckinView);

      var _this4 = (0, _possibleConstructorReturn3.default)(this, (CheckinView.__proto__ || (0, _getPrototypeOf2.default)(CheckinView)).call(this));

      _this4.template = '\n        <% if (label) { %>\n          <div class="section-top flex-middle">\n            <p class="big"><%= labelPrefix %></p>\n          </div>\n          <div class="section-center flex-center">\n            <div class="checkin-label">\n              <p class="huge bold"><%= label %></p>\n            </div>\n          </div>\n          <div class="section-bottom flex-middle">\n            <p class="small"><%= labelPostfix %></p>\n          </div>\n        <% } else { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= error ? errorMessage : wait %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } %>\n      ';

      _this4.model = {
        labelPrefix: 'Go to',
        labelPostfix: 'Touch the screen<br class="portrait-only" />when you are ready.',
        error: false,
        errorMessage: 'Sorry,<br/>no place available',
        wait: 'Please wait...',
        label: ''
      };

      _this4._readyCallback = null;
      return _this4;
    }

    (0, _createClass3.default)(CheckinView, [{
      key: 'onRender',
      value: function onRender() {
        var _this5 = this;

        (0, _get3.default)(CheckinView.prototype.__proto__ || (0, _getPrototypeOf2.default)(CheckinView.prototype), 'onRender', this).call(this);

        var eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';

        this.installEvents((0, _defineProperty3.default)({}, eventName, function () {
          return _this5._readyCallback();
        }));
      }
    }, {
      key: 'setReadyCallback',
      value: function setReadyCallback(callback) {
        this._readyCallback = callback;
      }
    }, {
      key: 'updateLabel',
      value: function updateLabel(value) {
        this.model.label = value;
        this.render();
      }
    }, {
      key: 'updateErrorStatus',
      value: function updateErrorStatus(value) {
        this.model.error = value;
        this.render();
      }
    }]);
    return CheckinView;
  }(_client.SegmentedView),

  'service:language': function (_SegmentedView4) {
    (0, _inherits3.default)(LanguageView, _SegmentedView4);

    function LanguageView() {
      (0, _classCallCheck3.default)(this, LanguageView);

      var _this6 = (0, _possibleConstructorReturn3.default)(this, (LanguageView.__proto__ || (0, _getPrototypeOf2.default)(LanguageView)).call(this));

      _this6.template = '\n        <div class="section-top"></div>\n        <div class="section-center">\n          <% for (let key in options) { %>\n            <button class="btn" data-id="<%= key %>"><%= options[key] %></button>\n          <% } %>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this6.model = {};

      _this6._selectionCallback = noop;
      return _this6;
    }

    (0, _createClass3.default)(LanguageView, [{
      key: 'onRender',
      value: function onRender() {
        var _this7 = this;

        (0, _get3.default)(LanguageView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LanguageView.prototype), 'onRender', this).call(this);

        var eventName = this.options.interaction === 'mouse' ? 'click' : 'touchstart';
        this.installEvents((0, _defineProperty3.default)({}, eventName + ' .btn', function undefined(e) {
          var target = e.target;
          var id = target.getAttribute('data-id');
          _this7._selectionCallback(id);
        }));
      }
    }, {
      key: 'setSelectionCallback',
      value: function setSelectionCallback(callback) {
        this._selectionCallback = callback;
      }
    }]);
    return LanguageView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Locator
  // ------------------------------------------------
  'service:locator': function (_SquaredView) {
    (0, _inherits3.default)(LocatorView, _SquaredView);

    function LocatorView() {
      (0, _classCallCheck3.default)(this, LocatorView);

      var _this8 = (0, _possibleConstructorReturn3.default)(this, (LocatorView.__proto__ || (0, _getPrototypeOf2.default)(LocatorView)).call(this));

      _this8.template = '\n        <div class="section-square"></div>\n        <div class="section-float flex-middle">\n          <% if (!showBtn) { %>\n            <p class="small"><%= instructions %></p>\n          <% } else { %>\n            <button class="btn"><%= send %></button>\n          <% } %>\n        </div>\n      ';

      _this8.model = {
        instructions: 'Define your position in the area',
        send: 'Send',
        showBtn: false
      };

      _this8.area = null;
      _this8._selectCallback = noop;

      _this8._onAreaTouchStart = _this8._onAreaTouchStart.bind(_this8);
      _this8._onAreaTouchMove = _this8._onAreaTouchMove.bind(_this8);
      return _this8;
    }

    (0, _createClass3.default)(LocatorView, [{
      key: 'show',
      value: function show() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'show', this).call(this);
        this.selector.show();
      }
    }, {
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'onRender', this).call(this);
        this.$areaContainer = this.$el.querySelector('.section-square');
      }
    }, {
      key: 'setArea',
      value: function setArea(area) {
        this._area = area;
        this._renderArea();
      }
    }, {
      key: 'setSelectCallback',
      value: function setSelectCallback(callback) {
        this._selectCallback = callback;
      }
    }, {
      key: 'remove',
      value: function remove() {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'remove', this).call(this);

        this.surface.removeListener('touchstart', this._onAreaTouchStart);
        this.surface.removeListener('touchmove', this._onAreaTouchMove);
      }
    }, {
      key: 'onResize',
      value: function onResize(viewportWidth, viewportHeight, orientation) {
        (0, _get3.default)(LocatorView.prototype.__proto__ || (0, _getPrototypeOf2.default)(LocatorView.prototype), 'onResize', this).call(this, viewportWidth, viewportHeight, orientation);

        if (this.selector) this.selector.onResize(viewportWidth, viewportHeight, orientation);
      }
    }, {
      key: '_renderArea',
      value: function _renderArea() {
        this.selector = new _client.SpaceView();
        this.selector.setArea(this._area);

        this.selector.render();
        this.selector.appendTo(this.$areaContainer);
        this.selector.onRender();

        this.surface = new _client.TouchSurface(this.selector.$svgContainer);
        this.surface.addListener('touchstart', this._onAreaTouchStart);
        this.surface.addListener('touchmove', this._onAreaTouchMove);
      }
    }, {
      key: '_onAreaTouchStart',
      value: function _onAreaTouchStart(id, normX, normY) {
        var _this9 = this;

        if (!this.position) {
          this._createPosition(normX, normY);

          this.model.showBtn = true;
          this.render('.section-float');
          this.installEvents({
            'click .btn': function clickBtn(e) {
              return _this9._selectCallback(_this9.position.x, _this9.position.y);
            }
          });
        } else {
          this._updatePosition(normX, normY);
        }
      }
    }, {
      key: '_onAreaTouchMove',
      value: function _onAreaTouchMove(id, normX, normY) {
        this._updatePosition(normX, normY);
      }
    }, {
      key: '_createPosition',
      value: function _createPosition(normX, normY) {
        this.position = {
          id: 'locator',
          x: normX * this._area.width,
          y: normY * this._area.height
        };

        this.selector.addPoint(this.position);
      }
    }, {
      key: '_updatePosition',
      value: function _updatePosition(normX, normY) {
        this.position.x = normX * this._area.width;
        this.position.y = normY * this._area.height;

        this.selector.updatePoint(this.position);
      }
    }]);
    return LocatorView;
  }(_client.SquaredView),

  // ------------------------------------------------
  // Placer
  // ------------------------------------------------
  'service:placer': function (_SquaredView2) {
    (0, _inherits3.default)(PlacerViewList, _SquaredView2);

    function PlacerViewList() {
      (0, _classCallCheck3.default)(this, PlacerViewList);

      var _this10 = (0, _possibleConstructorReturn3.default)(this, (PlacerViewList.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList)).call(this));

      _this10.template = '\n        <div class="section-square flex-middle">\n          <% if (rejected) { %>\n          <div class="fit-container flex-middle">\n            <p><%= reject %></p>\n          </div>\n          <% } %>\n        </div>\n        <div class="section-float flex-middle">\n          <% if (!rejected) { %>\n            <% if (showBtn) { %>\n              <button class="btn"><%= send %></button>\n            <% } %>\n          <% } %>\n        </div>\n      ';

      _this10.model = {
        instructions: 'Select your position',
        send: 'Send',
        reject: 'Sorry, no place is available',
        showBtn: false,
        rejected: false
      };

      _this10._onSelectionChange = _this10._onSelectionChange.bind(_this10);
      return _this10;
    }

    (0, _createClass3.default)(PlacerViewList, [{
      key: 'show',
      value: function show() {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'show', this).call(this);
        this.selector.show();
      }
    }, {
      key: '_onSelectionChange',
      value: function _onSelectionChange(e) {
        var _this11 = this;

        this.model.showBtn = true;
        this.render('.section-float');

        this.installEvents({
          'click .btn': function clickBtn(e) {
            var position = _this11.selector.value;

            if (position) _this11._onSelect(position.index, position.label, position.coordinates);
          }
        });
      }
    }, {
      key: 'setArea',
      value: function setArea(area) {/* no need for area */}
    }, {
      key: 'onRender',
      value: function onRender() {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'onRender', this).call(this);
        this.$selectorContainer = this.$el.querySelector('.section-square');
      }
    }, {
      key: 'onResize',
      value: function onResize(viewportWidth, viewportHeight, orientation) {
        (0, _get3.default)(PlacerViewList.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlacerViewList.prototype), 'onResize', this).call(this, viewportWidth, viewportHeight, orientation);

        if (this.selector) this.selector.onResize(viewportWidth, viewportHeight, orientation);
      }
    }, {
      key: 'displayPositions',
      value: function displayPositions(capacity) {
        var labels = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var coordinates = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var maxClientsPerPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

        this.positions = [];
        this.numberPositions = capacity / maxClientsPerPosition;

        for (var index = 0; index < this.numberPositions; index++) {
          var label = labels !== null ? labels[index] : (index + 1).toString();
          var position = { index: index, label: label };

          if (coordinates) position.coordinates = coordinates[index];

          this.positions.push(position);
        }

        this.selector = new _client.SelectView({
          instructions: this.model.instructions,
          entries: this.positions
        });

        this.selector.render();
        this.selector.appendTo(this.$selectorContainer);
        this.selector.onRender();

        this.selector.installEvents({
          'change': this._onSelectionChange
        });
      }
    }, {
      key: 'updateDisabledPositions',
      value: function updateDisabledPositions(indexes) {
        for (var index = 0; index < this.numberPositions; index++) {
          if (indexes.indexOf(index) === -1) this.selector.enableIndex(index);else this.selector.disableIndex(index);
        }
      }
    }, {
      key: 'setSelectCallack',
      value: function setSelectCallack(callback) {
        this._onSelect = callback;
      }
    }, {
      key: 'reject',
      value: function reject(disabledPositions) {
        this.model.rejected = true;
        this.render();
      }
    }]);
    return PlacerViewList;
  }(_client.SquaredView),

  // graphic placer flavor for predetermined coordinates
  // 'service:placer': class PlacerViewGraphic extends SquaredView {
  //   constructor() {
  //     super();

  //     this.template = `
  //       <div class="section-square flex-middle">
  //         <% if (rejected) { %>
  //         <div class="fit-container flex-middle">
  //           <p><%= reject %></p>
  //         </div>
  //         <% } %>
  //       </div>
  //       <div class="section-float flex-middle">
  //         <% if (!rejected) { %>
  //           <% if (showBtn) { %>
  //             <button class="btn"><%= send %></button>
  //           <% } %>
  //         <% } %>
  //       </div>
  //     `;

  //     this.model = {
  //       instructions: 'Select your position',
  //       send: 'Send',
  //       reject: 'Sorry, no place is available',
  //       showBtn: false,
  //       rejected: false,
  //     };

  //     this._area = null;
  //     this._disabledPositions = [];
  //     this._onSelectionChange = this._onSelectionChange.bind(this);
  //   }

  //   show() {
  //     super.show();
  //     this.selector.show();
  //   }

  //   onRender() {
  //     super.onRender();
  //     this.$selectorContainer = this.$el.querySelector('.section-square');
  //   }

  //   onResize(viewportWidth, viewportHeight, orientation) {
  //     super.onResize(viewportWidth, viewportHeight, orientation);

  //     if (this.selector)
  //       this.selector.onResize(viewportWidth, viewportHeight, orientation);
  //   }

  //   _onSelectionChange(e) {
  //     const position = this.selector.shapePointMap.get(e.target);
  //     const disabledIndex = this._disabledPositions.indexOf(position.index);

  //     if (disabledIndex === -1)
  //       this._onSelect(position.id, position.label, [position.x, position.y]);
  //   }

  //   setArea(area) {
  //     this._area = area;
  //   }

  //   displayPositions(capacity, labels = null, coordinates = null, maxClientsPerPosition = 1) {
  //     this.numberPositions = capacity / maxClientsPerPosition;
  //     this.positions = [];

  //     for (let i = 0; i < this.numberPositions; i++) {
  //       const label = labels !== null ? labels[i] : (i + 1).toString();
  //       const position = { id: i, label: label };
  //       const coords = coordinates[i];
  //       position.x = coords[0];
  //       position.y = coords[1];

  //       this.positions.push(position);
  //     }

  //     this.selector = new SpaceView();
  //     this.selector.setArea(this._area);
  //     this.selector.render();
  //     this.selector.appendTo(this.$selectorContainer);
  //     this.selector.onRender();
  //     this.selector.setPoints(this.positions);

  //     this.selector.installEvents({
  //       'click .point': this._onSelectionChange
  //     });
  //   }

  //   updateDisabledPositions(indexes) {
  //     this._disabledPositions = indexes;

  //     for (let index = 0; index < this.numberPositions; index++) {
  //       const position = this.positions[index];
  //       const isDisabled = indexes.indexOf(index) !== -1;
  //       position.selected = isDisabled ? true : false;
  //       this.selector.updatePoint(position);
  //     }
  //   }

  //   setSelectCallack(callback) {
  //     this._onSelect = callback;
  //   }

  //   reject(disabledPositions) {
  //     this.model.rejected = true;
  //     this.render();
  //   }
  // },

  // ------------------------------------------------
  // Platform
  // ------------------------------------------------
  'service:platform': function (_SegmentedView5) {
    (0, _inherits3.default)(PlatformView, _SegmentedView5);

    function PlatformView() {
      (0, _classCallCheck3.default)(this, PlatformView);

      var _this12 = (0, _possibleConstructorReturn3.default)(this, (PlatformView.__proto__ || (0, _getPrototypeOf2.default)(PlatformView)).call(this));

      _this12.template = '\n        <% if (isCompatible === false) { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= errorCompatibleMessage %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } else if (hasAuthorizations === false) { %>\n          <div class="section-top"></div>\n          <div class="section-center flex-center">\n            <p><%= errorHooksMessage %></p>\n          </div>\n          <div class="section-bottom"></div>\n        <% } else { %>\n          <div class="section-top flex-middle"></div>\n          <div class="section-center flex-center">\n              <p class="big">\n                <b><%= globals.appName %></b>\n              </p>\n          </div>\n          <div class="section-bottom flex-middle">\n            <% if (checking === true) { %>\n            <p class="small soft-blink"><%= checkingMessage %></p>\n            <% } else if (hasAuthorizations === true) { %>\n            <p class="small soft-blink"><%= instructions %></p>\n            <% } %>\n          </div>\n        <% } %>\n      ';

      _this12.model = {
        isCompatible: null,
        hasAuthorizations: null,
        checking: false,
        instructions: 'Touch the screen to join!',
        checkingMessage: 'Please wait while checking compatiblity',
        errorCompatibleMessage: 'Sorry,<br />Your device is not compatible with the application.',
        errorHooksMessage: 'Sorry,<br />The application didn\'t obtain the necessary authorizations.'
      };

      _this12._touchstartCallback = noop;
      _this12._mousedownCallback = noop;
      return _this12;
    }

    (0, _createClass3.default)(PlatformView, [{
      key: 'onRender',
      value: function onRender() {
        var _this13 = this;

        (0, _get3.default)(PlatformView.prototype.__proto__ || (0, _getPrototypeOf2.default)(PlatformView.prototype), 'onRender', this).call(this);

        this.installEvents({
          'mousedown': function mousedown(e) {
            return _this13._mousedownCallback(e);
          },
          'touchstart': function touchstart(e) {
            return _this13._touchstartCallback(e);
          }
        });
      }
    }, {
      key: 'setTouchStartCallback',
      value: function setTouchStartCallback(callback) {
        this._touchstartCallback = callback;
      }
    }, {
      key: 'setMouseDownCallback',
      value: function setMouseDownCallback(callback) {
        this._mousedownCallback = callback;
      }
    }, {
      key: 'updateCheckingStatus',
      value: function updateCheckingStatus(value) {
        this.model.checking = value;
        this.render();
      }
    }, {
      key: 'updateIsCompatibleStatus',
      value: function updateIsCompatibleStatus(value) {
        this.model.isCompatible = value;
        this.render();
      }
    }, {
      key: 'updateHasAuthorizationsStatus',
      value: function updateHasAuthorizationsStatus(value) {
        this.model.hasAuthorizations = value;
        this.render();
      }
    }]);
    return PlatformView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Raw-Socket
  // ------------------------------------------------
  'service:raw-socket': function (_SegmentedView6) {
    (0, _inherits3.default)(RawSocketView, _SegmentedView6);

    function RawSocketView() {
      (0, _classCallCheck3.default)(this, RawSocketView);

      var _this14 = (0, _possibleConstructorReturn3.default)(this, (RawSocketView.__proto__ || (0, _getPrototypeOf2.default)(RawSocketView)).call(this));

      _this14.template = '\n        <div class="section-top"></div>\n        <div class="section-center flex-center">\n          <p class="soft-blink"><%= wait %></p>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this14.model = {
        wait: 'Opening socket,<br />stand by&hellip;'
      };
      return _this14;
    }

    return RawSocketView;
  }(_client.SegmentedView),

  // ------------------------------------------------
  // Sync
  // ------------------------------------------------
  'service:sync': function (_SegmentedView7) {
    (0, _inherits3.default)(RawSocketView, _SegmentedView7);

    function RawSocketView() {
      (0, _classCallCheck3.default)(this, RawSocketView);

      var _this15 = (0, _possibleConstructorReturn3.default)(this, (RawSocketView.__proto__ || (0, _getPrototypeOf2.default)(RawSocketView)).call(this));

      _this15.template = '\n        <div class="section-top"></div>\n        <div class="section-center flex-center">\n          <p class="soft-blink"><%= wait %></p>\n        </div>\n        <div class="section-bottom"></div>\n      ';

      _this15.model = {
        wait: 'Clock syncing,<br />stand by&hellip;'
      };
      return _this15;
    }

    return RawSocketView;
  }(_client.SegmentedView),

  // public API
  has: function has(id) {
    return !!this[id];
  },
  get: function get(id, config) {
    var ctor = this[id];
    var view = new ctor();
    // additionnal configuration
    view.model.globals = (0, _assign2.default)({}, config);
    view.options.id = id.replace(/\:/g, '-');

    return view;
  }
};

exports.default = serviceViews;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZpY2VWaWV3cy5qcyJdLCJuYW1lcyI6WyJub29wIiwic2VydmljZVZpZXdzIiwidGVtcGxhdGUiLCJtb2RlbCIsInN0YXR1cyIsInNob3dQcm9ncmVzcyIsIm1zZyIsImxvYWRpbmciLCJkZWNvZGluZyIsIiRwcm9ncmVzc0JhciIsIiRlbCIsInF1ZXJ5U2VsZWN0b3IiLCJyYXRpbyIsInBlcmNlbnQiLCJNYXRoIiwicm91bmQiLCJyZW5kZXIiLCJzdHlsZSIsIndpZHRoIiwiU2VnbWVudGVkVmlldyIsImluc3RydWN0aW9ucyIsInNlbmQiLCJyZXNldCIsInJlamVjdE1lc3NhZ2UiLCJyZWplY3RlZCIsIl9zZW5kUGFzc3dvcmRDYWxsYmFjayIsIl9yZXNldENhbGxiYWNrIiwiaW5zdGFsbEV2ZW50cyIsInBhc3N3b3JkIiwidmFsdWUiLCJjYWxsYmFjayIsImxhYmVsUHJlZml4IiwibGFiZWxQb3N0Zml4IiwiZXJyb3IiLCJlcnJvck1lc3NhZ2UiLCJ3YWl0IiwibGFiZWwiLCJfcmVhZHlDYWxsYmFjayIsImV2ZW50TmFtZSIsIm9wdGlvbnMiLCJpbnRlcmFjdGlvbiIsIl9zZWxlY3Rpb25DYWxsYmFjayIsImUiLCJ0YXJnZXQiLCJpZCIsImdldEF0dHJpYnV0ZSIsInNob3dCdG4iLCJhcmVhIiwiX3NlbGVjdENhbGxiYWNrIiwiX29uQXJlYVRvdWNoU3RhcnQiLCJiaW5kIiwiX29uQXJlYVRvdWNoTW92ZSIsInNlbGVjdG9yIiwic2hvdyIsIiRhcmVhQ29udGFpbmVyIiwiX2FyZWEiLCJfcmVuZGVyQXJlYSIsInN1cmZhY2UiLCJyZW1vdmVMaXN0ZW5lciIsInZpZXdwb3J0V2lkdGgiLCJ2aWV3cG9ydEhlaWdodCIsIm9yaWVudGF0aW9uIiwib25SZXNpemUiLCJTcGFjZVZpZXciLCJzZXRBcmVhIiwiYXBwZW5kVG8iLCJvblJlbmRlciIsIlRvdWNoU3VyZmFjZSIsIiRzdmdDb250YWluZXIiLCJhZGRMaXN0ZW5lciIsIm5vcm1YIiwibm9ybVkiLCJwb3NpdGlvbiIsIl9jcmVhdGVQb3NpdGlvbiIsIngiLCJ5IiwiX3VwZGF0ZVBvc2l0aW9uIiwiaGVpZ2h0IiwiYWRkUG9pbnQiLCJ1cGRhdGVQb2ludCIsIlNxdWFyZWRWaWV3IiwicmVqZWN0IiwiX29uU2VsZWN0aW9uQ2hhbmdlIiwiX29uU2VsZWN0IiwiaW5kZXgiLCJjb29yZGluYXRlcyIsIiRzZWxlY3RvckNvbnRhaW5lciIsImNhcGFjaXR5IiwibGFiZWxzIiwibWF4Q2xpZW50c1BlclBvc2l0aW9uIiwicG9zaXRpb25zIiwibnVtYmVyUG9zaXRpb25zIiwidG9TdHJpbmciLCJwdXNoIiwiU2VsZWN0VmlldyIsImVudHJpZXMiLCJpbmRleGVzIiwiaW5kZXhPZiIsImVuYWJsZUluZGV4IiwiZGlzYWJsZUluZGV4IiwiZGlzYWJsZWRQb3NpdGlvbnMiLCJpc0NvbXBhdGlibGUiLCJoYXNBdXRob3JpemF0aW9ucyIsImNoZWNraW5nIiwiY2hlY2tpbmdNZXNzYWdlIiwiZXJyb3JDb21wYXRpYmxlTWVzc2FnZSIsImVycm9ySG9va3NNZXNzYWdlIiwiX3RvdWNoc3RhcnRDYWxsYmFjayIsIl9tb3VzZWRvd25DYWxsYmFjayIsImhhcyIsImdldCIsImNvbmZpZyIsImN0b3IiLCJ2aWV3IiwiZ2xvYmFscyIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFRQTtBQUNBOzs7Ozs7QUFNQTs7Ozs7Ozs7QUFRQTs7QUFFQSxJQUFNQSxPQUFPLFNBQVBBLElBQU8sR0FBTSxDQUFFLENBQXJCOztBQUVBLElBQU1DLGVBQWU7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFBQTs7QUFDRSxzQ0FBcUI7QUFBQTs7QUFBQTs7QUFHbkIsWUFBS0MsUUFBTDs7QUFjQSxZQUFLQyxLQUFMLEdBQWE7QUFDWEMsZ0JBQVEsU0FERztBQUVYQyxzQkFBYyxJQUZIO0FBR1hDLGFBQUs7QUFDSEMsbUJBQVMsbUJBRE47QUFFSEMsb0JBQVU7QUFG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QUw7O0FBUUEsY0FBS0MsS0FBTCxHQUFhO0FBQ1hnQztBQURXLE9BQWI7QUFYWTtBQWNiOztBQWZIO0FBQUEsSUFBNENoQixxQkFBNUMsQ0FocUJtQjs7QUFtckJuQjtBQUNBMEYsS0FwckJtQixlQW9yQmZqRSxFQXByQmUsRUFvckJYO0FBQ04sV0FBTyxDQUFDLENBQUMsS0FBS0EsRUFBTCxDQUFUO0FBQ0QsR0F0ckJrQjtBQXdyQm5Ca0UsS0F4ckJtQixlQXdyQmZsRSxFQXhyQmUsRUF3ckJYbUUsTUF4ckJXLEVBd3JCSDtBQUNkLFFBQU1DLE9BQU8sS0FBS3BFLEVBQUwsQ0FBYjtBQUNBLFFBQU1xRSxPQUFPLElBQUlELElBQUosRUFBYjtBQUNBO0FBQ0FDLFNBQUs5RyxLQUFMLENBQVcrRyxPQUFYLEdBQXFCLHNCQUFjLEVBQWQsRUFBa0JILE1BQWxCLENBQXJCO0FBQ0FFLFNBQUsxRSxPQUFMLENBQWFLLEVBQWIsR0FBa0JBLEdBQUd1RSxPQUFILENBQVcsS0FBWCxFQUFrQixHQUFsQixDQUFsQjs7QUFFQSxXQUFPRixJQUFQO0FBQ0Q7QUFoc0JrQixDQUFyQjs7a0JBbXNCZWhILFkiLCJmaWxlIjoic2VydmljZVZpZXdzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgU2VnbWVudGVkVmlldyxcbiAgU2VsZWN0VmlldyxcbiAgU3BhY2VWaWV3LFxuICBTcXVhcmVkVmlldyxcbiAgVG91Y2hTdXJmYWNlLFxufSBmcm9tICdzb3VuZHdvcmtzL2NsaWVudCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBleGFtcGxlXG4vKipcbiAqIEludGVyZmFjZSBmb3IgdGhlIHZpZXcgb2YgdGhlIGBhdWRpby1idWZmZXItbWFuYWdlcmAgc2VydmljZS5cbiAqXG4gKiBAaW50ZXJmYWNlIEFic3RyYWN0QXVkaW9CdWZmZXJNYW5hZ2VyVmlld1xuICogQGV4dGVuZHMgbW9kdWxlOnNvdW5kd29ya3MvY2xpZW50LlZpZXdcbiAqL1xuLyoqXG4gKiBNZXRob2QgY2FsbGVkIHdoZW4gYSBuZXcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGN1cnJlbnRseSBsb2FkZWQgYXNzZXRzXG4gKiBpcyByZWNlaXZlZC5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBuYW1lIEFic3RyYWN0QXVkaW9CdWZmZXJNYW5hZ2VyVmlldy5vblByb2dyZXNzXG4gKiBAcGFyYW0ge051bWJlcn0gcGVyY2VudCAtIFRoZSBwdXJjZW50YWdlIG9mIGxvYWRlZCBhc3NldHMuXG4gKi9cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBub29wID0gKCkgPT4ge307XG5cbmNvbnN0IHNlcnZpY2VWaWV3cyA9IHtcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIEF1ZGlvQnVmZmVyTWFuYWdlclxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6YXVkaW8tYnVmZmVyLW1hbmFnZXInOiBjbGFzcyBBdWRpb0J1ZmZlck1hbmFnZXJWaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgPHA+PCU9IG1zZ1tzdGF0dXNdICU+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgPCUgaWYgKHNob3dQcm9ncmVzcykgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9ncmVzcy13cmFwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZ3Jlc3MtYmFyXCI+PC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCUgfSAlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICBzdGF0dXM6ICdsb2FkaW5nJyxcbiAgICAgICAgc2hvd1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICBtc2c6IHtcbiAgICAgICAgICBsb2FkaW5nOiAnTG9hZGluZyBzb3VuZHMuLi4nLFxuICAgICAgICAgIGRlY29kaW5nOiAnRGVjb2Rpbmcgc291bmRzLi4uJyxcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgIHN1cGVyLm9uUmVuZGVyKCk7XG4gICAgICB0aGlzLiRwcm9ncmVzc0JhciA9IHRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJy5wcm9ncmVzcy1iYXInKTtcbiAgICB9XG5cbiAgICBvblByb2dyZXNzKHJhdGlvKSB7XG4gICAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5yb3VuZChyYXRpbyAqIDEwMCk7XG5cbiAgICAgIGlmIChwZXJjZW50ID09PSAxMDApIHtcbiAgICAgICAgdGhpcy5tb2RlbC5zdGF0dXMgPSAnZGVjb2RpbmcnO1xuICAgICAgICB0aGlzLnJlbmRlcignLnNlY3Rpb24tdG9wJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm1vZGVsLnNob3dQcm9ncmVzcylcbiAgICAgICAgdGhpcy4kcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xuICAgIH1cbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQXV0aFxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6YXV0aCc6IGNsYXNzIEF1dGhWaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8JSBpZiAoIXJlamVjdGVkKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgICA8cD48JT0gaW5zdHJ1Y3Rpb25zICU+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwicGFzc3dvcmRcIiAvPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCIgaWQ9XCJzZW5kXCI+PCU9IHNlbmQgJT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlc2V0XCIgY2xhc3M9XCJidG5cIj48JT0gcmVzZXQgJT48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCUgfSBlbHNlIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3BcIj48L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXIgZmxleC1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxwPjwlPSByZWplY3RNZXNzYWdlICU+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cInJlc2V0XCIgY2xhc3M9XCJidG5cIj48JT0gcmVzZXQgJT48L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCUgfSAlPlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAnTG9naW4nLFxuICAgICAgICBzZW5kOiAnU2VuZCcsXG4gICAgICAgIHJlc2V0OiAnUmVzZXQnLFxuICAgICAgICByZWplY3RNZXNzYWdlOiBgU29ycnksIHlvdSBkb24ndCBoYXZlIGFjY2VzcyB0byB0aGlzIGNsaWVudGAsXG4gICAgICAgIHJlamVjdGVkOiBmYWxzZSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX3NlbmRQYXNzd29yZENhbGxiYWNrID0gbm9vcDtcbiAgICAgIHRoaXMuX3Jlc2V0Q2FsbGJhY2sgPSBub29wO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcblxuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgJ2NsaWNrICNzZW5kJzogKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhc3N3b3JkID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignI3Bhc3N3b3JkJykudmFsdWU7XG5cbiAgICAgICAgICBpZiAocGFzc3dvcmQgIT09ICcnKVxuICAgICAgICAgICAgdGhpcy5fc2VuZFBhc3N3b3JkQ2FsbGJhY2socGFzc3dvcmQpO1xuICAgICAgICB9LFxuICAgICAgICAnY2xpY2sgI3Jlc2V0JzogKCkgPT4gdGhpcy5fcmVzZXRDYWxsYmFjaygpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2VuZFBhc3N3b3JkQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3NlbmRQYXNzd29yZENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgc2V0UmVzZXRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fcmVzZXRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHVwZGF0ZVJlamVjdGVkU3RhdHVzKHZhbHVlKSB7XG4gICAgICB0aGlzLm1vZGVsLnJlamVjdGVkID0gdmFsdWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gQ2hlY2tpblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgJ3NlcnZpY2U6Y2hlY2tpbic6IGNsYXNzIENoZWNraW5WaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8JSBpZiAobGFiZWwpIHsgJT5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3AgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYmlnXCI+PCU9IGxhYmVsUHJlZml4ICU+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoZWNraW4tbGFiZWxcIj5cbiAgICAgICAgICAgICAgPHAgY2xhc3M9XCJodWdlIGJvbGRcIj48JT0gbGFiZWwgJT48L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b20gZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48JT0gbGFiZWxQb3N0Zml4ICU+PC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8JSB9IGVsc2UgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPHA+PCU9IGVycm9yID8gZXJyb3JNZXNzYWdlIDogd2FpdCAlPjwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgICAgPCUgfSAlPlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgbGFiZWxQcmVmaXg6ICdHbyB0bycsXG4gICAgICAgIGxhYmVsUG9zdGZpeDogJ1RvdWNoIHRoZSBzY3JlZW48YnIgY2xhc3M9XCJwb3J0cmFpdC1vbmx5XCIgLz53aGVuIHlvdSBhcmUgcmVhZHkuJyxcbiAgICAgICAgZXJyb3I6IGZhbHNlLFxuICAgICAgICBlcnJvck1lc3NhZ2U6ICdTb3JyeSw8YnIvPm5vIHBsYWNlIGF2YWlsYWJsZScsXG4gICAgICAgIHdhaXQ6ICdQbGVhc2Ugd2FpdC4uLicsXG4gICAgICAgIGxhYmVsOiAnJyxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuX3JlYWR5Q2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcblxuICAgICAgY29uc3QgZXZlbnROYW1lID0gdGhpcy5vcHRpb25zLmludGVyYWN0aW9uID09PSAnbW91c2UnID8gJ2NsaWNrJyA6ICd0b3VjaHN0YXJ0JztcblxuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgW2V2ZW50TmFtZV06ICgpID0+IHRoaXMuX3JlYWR5Q2FsbGJhY2soKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFJlYWR5Q2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3JlYWR5Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICB1cGRhdGVMYWJlbCh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5sYWJlbCA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVFcnJvclN0YXR1cyh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5lcnJvciA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH0sXG5cbiAgJ3NlcnZpY2U6bGFuZ3VhZ2UnOiBjbGFzcyBMYW5ndWFnZVZpZXcgZXh0ZW5kcyBTZWdtZW50ZWRWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgIHN1cGVyKCk7XG5cbiAgICAgIHRoaXMudGVtcGxhdGUgPSBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1jZW50ZXJcIj5cbiAgICAgICAgICA8JSBmb3IgKGxldCBrZXkgaW4gb3B0aW9ucykgeyAlPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0blwiIGRhdGEtaWQ9XCI8JT0ga2V5ICU+XCI+PCU9IG9wdGlvbnNba2V5XSAlPjwvYnV0dG9uPlxuICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbVwiPjwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHt9O1xuXG4gICAgICB0aGlzLl9zZWxlY3Rpb25DYWxsYmFjayA9IG5vb3A7XG4gICAgfVxuXG4gICAgb25SZW5kZXIoKSB7XG4gICAgICBzdXBlci5vblJlbmRlcigpO1xuXG4gICAgICBjb25zdCBldmVudE5hbWUgPSB0aGlzLm9wdGlvbnMuaW50ZXJhY3Rpb24gPT09ICdtb3VzZScgPyAnY2xpY2snIDogJ3RvdWNoc3RhcnQnO1xuICAgICAgdGhpcy5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgW2Ake2V2ZW50TmFtZX0gLmJ0bmBdOiAoZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgIGNvbnN0IGlkID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1pZCcpO1xuICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbkNhbGxiYWNrKGlkKTtcbiAgICAgICAgfSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgc2V0U2VsZWN0aW9uQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX3NlbGVjdGlvbkNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBMb2NhdG9yXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnc2VydmljZTpsb2NhdG9yJzogY2xhc3MgTG9jYXRvclZpZXcgZXh0ZW5kcyBTcXVhcmVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1zcXVhcmVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tZmxvYXQgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICA8JSBpZiAoIXNob3dCdG4pIHsgJT5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwic21hbGxcIj48JT0gaW5zdHJ1Y3Rpb25zICU+PC9wPlxuICAgICAgICAgIDwlIH0gZWxzZSB7ICU+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCI+PCU9IHNlbmQgJT48L2J1dHRvbj5cbiAgICAgICAgICA8JSB9ICU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAnRGVmaW5lIHlvdXIgcG9zaXRpb24gaW4gdGhlIGFyZWEnLFxuICAgICAgICBzZW5kOiAnU2VuZCcsXG4gICAgICAgIHNob3dCdG46IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5hcmVhID0gbnVsbDtcbiAgICAgIHRoaXMuX3NlbGVjdENhbGxiYWNrID0gbm9vcDtcblxuICAgICAgdGhpcy5fb25BcmVhVG91Y2hTdGFydCA9IHRoaXMuX29uQXJlYVRvdWNoU3RhcnQuYmluZCh0aGlzKTtcbiAgICAgIHRoaXMuX29uQXJlYVRvdWNoTW92ZSA9IHRoaXMuX29uQXJlYVRvdWNoTW92ZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBzdXBlci5zaG93KCk7XG4gICAgICB0aGlzLnNlbGVjdG9yLnNob3coKTtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgIHN1cGVyLm9uUmVuZGVyKCk7XG4gICAgICB0aGlzLiRhcmVhQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3F1YXJlJyk7XG4gICAgfVxuXG4gICAgc2V0QXJlYShhcmVhKSB7XG4gICAgICB0aGlzLl9hcmVhID0gYXJlYTtcbiAgICAgIHRoaXMuX3JlbmRlckFyZWEoKTtcbiAgICB9XG5cbiAgICBzZXRTZWxlY3RDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fc2VsZWN0Q2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICB9XG5cbiAgICByZW1vdmUoKSB7XG4gICAgICBzdXBlci5yZW1vdmUoKTtcblxuICAgICAgdGhpcy5zdXJmYWNlLnJlbW92ZUxpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fb25BcmVhVG91Y2hTdGFydCk7XG4gICAgICB0aGlzLnN1cmZhY2UucmVtb3ZlTGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX29uQXJlYVRvdWNoTW92ZSk7XG4gICAgfVxuXG4gICAgb25SZXNpemUodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIG9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RvcilcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuICAgIH1cblxuICAgIF9yZW5kZXJBcmVhKCkge1xuICAgICAgdGhpcy5zZWxlY3RvciA9IG5ldyBTcGFjZVZpZXcoKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iuc2V0QXJlYSh0aGlzLl9hcmVhKTtcblxuICAgICAgdGhpcy5zZWxlY3Rvci5yZW5kZXIoKTtcbiAgICAgIHRoaXMuc2VsZWN0b3IuYXBwZW5kVG8odGhpcy4kYXJlYUNvbnRhaW5lcik7XG4gICAgICB0aGlzLnNlbGVjdG9yLm9uUmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuc3VyZmFjZSA9IG5ldyBUb3VjaFN1cmZhY2UodGhpcy5zZWxlY3Rvci4kc3ZnQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuc3VyZmFjZS5hZGRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMuX29uQXJlYVRvdWNoU3RhcnQpO1xuICAgICAgdGhpcy5zdXJmYWNlLmFkZExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLl9vbkFyZWFUb3VjaE1vdmUpO1xuICAgIH1cblxuICAgIF9vbkFyZWFUb3VjaFN0YXJ0KGlkLCBub3JtWCwgbm9ybVkpIHtcbiAgICAgIGlmICghdGhpcy5wb3NpdGlvbikge1xuICAgICAgICB0aGlzLl9jcmVhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpO1xuXG4gICAgICAgIHRoaXMubW9kZWwuc2hvd0J0biA9IHRydWU7XG4gICAgICAgIHRoaXMucmVuZGVyKCcuc2VjdGlvbi1mbG9hdCcpO1xuICAgICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAgICdjbGljayAuYnRuJzogKGUpID0+IHRoaXMuX3NlbGVjdENhbGxiYWNrKHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIF9vbkFyZWFUb3VjaE1vdmUoaWQsIG5vcm1YLCBub3JtWSkge1xuICAgICAgdGhpcy5fdXBkYXRlUG9zaXRpb24obm9ybVgsIG5vcm1ZKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlUG9zaXRpb24obm9ybVgsIG5vcm1ZKSB7XG4gICAgICB0aGlzLnBvc2l0aW9uID0ge1xuICAgICAgICBpZDogJ2xvY2F0b3InLFxuICAgICAgICB4OiBub3JtWCAqIHRoaXMuX2FyZWEud2lkdGgsXG4gICAgICAgIHk6IG5vcm1ZICogdGhpcy5fYXJlYS5oZWlnaHQsXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnNlbGVjdG9yLmFkZFBvaW50KHRoaXMucG9zaXRpb24pO1xuICAgIH1cblxuICAgIF91cGRhdGVQb3NpdGlvbihub3JtWCwgbm9ybVkpIHtcbiAgICAgIHRoaXMucG9zaXRpb24ueCA9IG5vcm1YICogdGhpcy5fYXJlYS53aWR0aDtcbiAgICAgIHRoaXMucG9zaXRpb24ueSA9IG5vcm1ZICogdGhpcy5fYXJlYS5oZWlnaHQ7XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IudXBkYXRlUG9pbnQodGhpcy5wb3NpdGlvbik7XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBQbGFjZXJcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnBsYWNlcic6IGNsYXNzIFBsYWNlclZpZXdMaXN0IGV4dGVuZHMgU3F1YXJlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tc3F1YXJlIGZsZXgtbWlkZGxlXCI+XG4gICAgICAgICAgPCUgaWYgKHJlamVjdGVkKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImZpdC1jb250YWluZXIgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICAgIDxwPjwlPSByZWplY3QgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPCUgfSAlPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tZmxvYXQgZmxleC1taWRkbGVcIj5cbiAgICAgICAgICA8JSBpZiAoIXJlamVjdGVkKSB7ICU+XG4gICAgICAgICAgICA8JSBpZiAoc2hvd0J0bikgeyAlPlxuICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuXCI+PCU9IHNlbmQgJT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgICA8JSB9ICU+XG4gICAgICAgIDwvZGl2PlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgaW5zdHJ1Y3Rpb25zOiAnU2VsZWN0IHlvdXIgcG9zaXRpb24nLFxuICAgICAgICBzZW5kOiAnU2VuZCcsXG4gICAgICAgIHJlamVjdDogJ1NvcnJ5LCBubyBwbGFjZSBpcyBhdmFpbGFibGUnLFxuICAgICAgICBzaG93QnRuOiBmYWxzZSxcbiAgICAgICAgcmVqZWN0ZWQ6IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fb25TZWxlY3Rpb25DaGFuZ2UgPSB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICBzdXBlci5zaG93KCk7XG4gICAgICB0aGlzLnNlbGVjdG9yLnNob3coKTtcbiAgICB9XG5cbiAgICBfb25TZWxlY3Rpb25DaGFuZ2UoZSkge1xuICAgICAgdGhpcy5tb2RlbC5zaG93QnRuID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVuZGVyKCcuc2VjdGlvbi1mbG9hdCcpO1xuXG4gICAgICB0aGlzLmluc3RhbGxFdmVudHMoe1xuICAgICAgICAnY2xpY2sgLmJ0bic6IChlKSA9PiB7XG4gICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnNlbGVjdG9yLnZhbHVlO1xuXG4gICAgICAgICAgaWYgKHBvc2l0aW9uKVxuICAgICAgICAgICAgdGhpcy5fb25TZWxlY3QocG9zaXRpb24uaW5kZXgsIHBvc2l0aW9uLmxhYmVsLCBwb3NpdGlvbi5jb29yZGluYXRlcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldEFyZWEoYXJlYSkgeyAvKiBubyBuZWVkIGZvciBhcmVhICovIH1cblxuICAgIG9uUmVuZGVyKCkge1xuICAgICAgc3VwZXIub25SZW5kZXIoKTtcbiAgICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3F1YXJlJyk7XG4gICAgfVxuXG4gICAgb25SZXNpemUodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIG9yaWVudGF0aW9uKSB7XG4gICAgICBzdXBlci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuXG4gICAgICBpZiAodGhpcy5zZWxlY3RvcilcbiAgICAgICAgdGhpcy5zZWxlY3Rvci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuICAgIH1cblxuICAgIGRpc3BsYXlQb3NpdGlvbnMoY2FwYWNpdHksIGxhYmVscyA9IG51bGwsIGNvb3JkaW5hdGVzID0gbnVsbCwgbWF4Q2xpZW50c1BlclBvc2l0aW9uID0gMSkge1xuICAgICAgdGhpcy5wb3NpdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMubnVtYmVyUG9zaXRpb25zID0gY2FwYWNpdHkgLyBtYXhDbGllbnRzUGVyUG9zaXRpb247XG5cbiAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm51bWJlclBvc2l0aW9uczsgaW5kZXgrKykge1xuICAgICAgICBjb25zdCBsYWJlbCA9IGxhYmVscyAhPT0gbnVsbCA/IGxhYmVsc1tpbmRleF0gOiAoaW5kZXggKyAxKS50b1N0cmluZygpO1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHsgaW5kZXg6IGluZGV4LCBsYWJlbDogbGFiZWwgfTtcblxuICAgICAgICBpZiAoY29vcmRpbmF0ZXMpXG4gICAgICAgICAgcG9zaXRpb24uY29vcmRpbmF0ZXMgPSBjb29yZGluYXRlc1tpbmRleF07XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IgPSBuZXcgU2VsZWN0Vmlldyh7XG4gICAgICAgIGluc3RydWN0aW9uczogdGhpcy5tb2RlbC5pbnN0cnVjdGlvbnMsXG4gICAgICAgIGVudHJpZXM6IHRoaXMucG9zaXRpb25zLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuc2VsZWN0b3IucmVuZGVyKCk7XG4gICAgICB0aGlzLnNlbGVjdG9yLmFwcGVuZFRvKHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyKTtcbiAgICAgIHRoaXMuc2VsZWN0b3Iub25SZW5kZXIoKTtcblxuICAgICAgdGhpcy5zZWxlY3Rvci5pbnN0YWxsRXZlbnRzKHtcbiAgICAgICAgJ2NoYW5nZSc6IHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlRGlzYWJsZWRQb3NpdGlvbnMoaW5kZXhlcykge1xuICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMubnVtYmVyUG9zaXRpb25zOyBpbmRleCsrKSB7XG4gICAgICAgIGlmIChpbmRleGVzLmluZGV4T2YoaW5kZXgpID09PSAtMSlcbiAgICAgICAgICB0aGlzLnNlbGVjdG9yLmVuYWJsZUluZGV4KGluZGV4KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRoaXMuc2VsZWN0b3IuZGlzYWJsZUluZGV4KGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRTZWxlY3RDYWxsYWNrKGNhbGxiYWNrKSB7XG4gICAgICB0aGlzLl9vblNlbGVjdCA9IGNhbGxiYWNrO1xuICAgIH1cblxuICAgIHJlamVjdChkaXNhYmxlZFBvc2l0aW9ucykge1xuICAgICAgdGhpcy5tb2RlbC5yZWplY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cbiAgfSxcblxuICAvLyBncmFwaGljIHBsYWNlciBmbGF2b3IgZm9yIHByZWRldGVybWluZWQgY29vcmRpbmF0ZXNcbiAgLy8gJ3NlcnZpY2U6cGxhY2VyJzogY2xhc3MgUGxhY2VyVmlld0dyYXBoaWMgZXh0ZW5kcyBTcXVhcmVkVmlldyB7XG4gIC8vICAgY29uc3RydWN0b3IoKSB7XG4gIC8vICAgICBzdXBlcigpO1xuXG4gIC8vICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAvLyAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1zcXVhcmUgZmxleC1taWRkbGVcIj5cbiAgLy8gICAgICAgICA8JSBpZiAocmVqZWN0ZWQpIHsgJT5cbiAgLy8gICAgICAgICA8ZGl2IGNsYXNzPVwiZml0LWNvbnRhaW5lciBmbGV4LW1pZGRsZVwiPlxuICAvLyAgICAgICAgICAgPHA+PCU9IHJlamVjdCAlPjwvcD5cbiAgLy8gICAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgICA8JSB9ICU+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1mbG9hdCBmbGV4LW1pZGRsZVwiPlxuICAvLyAgICAgICAgIDwlIGlmICghcmVqZWN0ZWQpIHsgJT5cbiAgLy8gICAgICAgICAgIDwlIGlmIChzaG93QnRuKSB7ICU+XG4gIC8vICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG5cIj48JT0gc2VuZCAlPjwvYnV0dG9uPlxuICAvLyAgICAgICAgICAgPCUgfSAlPlxuICAvLyAgICAgICAgIDwlIH0gJT5cbiAgLy8gICAgICAgPC9kaXY+XG4gIC8vICAgICBgO1xuXG4gIC8vICAgICB0aGlzLm1vZGVsID0ge1xuICAvLyAgICAgICBpbnN0cnVjdGlvbnM6ICdTZWxlY3QgeW91ciBwb3NpdGlvbicsXG4gIC8vICAgICAgIHNlbmQ6ICdTZW5kJyxcbiAgLy8gICAgICAgcmVqZWN0OiAnU29ycnksIG5vIHBsYWNlIGlzIGF2YWlsYWJsZScsXG4gIC8vICAgICAgIHNob3dCdG46IGZhbHNlLFxuICAvLyAgICAgICByZWplY3RlZDogZmFsc2UsXG4gIC8vICAgICB9O1xuXG4gIC8vICAgICB0aGlzLl9hcmVhID0gbnVsbDtcbiAgLy8gICAgIHRoaXMuX2Rpc2FibGVkUG9zaXRpb25zID0gW107XG4gIC8vICAgICB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZSA9IHRoaXMuX29uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gIC8vICAgfVxuXG4gIC8vICAgc2hvdygpIHtcbiAgLy8gICAgIHN1cGVyLnNob3coKTtcbiAgLy8gICAgIHRoaXMuc2VsZWN0b3Iuc2hvdygpO1xuICAvLyAgIH1cblxuICAvLyAgIG9uUmVuZGVyKCkge1xuICAvLyAgICAgc3VwZXIub25SZW5kZXIoKTtcbiAgLy8gICAgIHRoaXMuJHNlbGVjdG9yQ29udGFpbmVyID0gdGhpcy4kZWwucXVlcnlTZWxlY3RvcignLnNlY3Rpb24tc3F1YXJlJyk7XG4gIC8vICAgfVxuXG4gIC8vICAgb25SZXNpemUodmlld3BvcnRXaWR0aCwgdmlld3BvcnRIZWlnaHQsIG9yaWVudGF0aW9uKSB7XG4gIC8vICAgICBzdXBlci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuXG4gIC8vICAgICBpZiAodGhpcy5zZWxlY3RvcilcbiAgLy8gICAgICAgdGhpcy5zZWxlY3Rvci5vblJlc2l6ZSh2aWV3cG9ydFdpZHRoLCB2aWV3cG9ydEhlaWdodCwgb3JpZW50YXRpb24pO1xuICAvLyAgIH1cblxuICAvLyAgIF9vblNlbGVjdGlvbkNoYW5nZShlKSB7XG4gIC8vICAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuc2VsZWN0b3Iuc2hhcGVQb2ludE1hcC5nZXQoZS50YXJnZXQpO1xuICAvLyAgICAgY29uc3QgZGlzYWJsZWRJbmRleCA9IHRoaXMuX2Rpc2FibGVkUG9zaXRpb25zLmluZGV4T2YocG9zaXRpb24uaW5kZXgpO1xuXG4gIC8vICAgICBpZiAoZGlzYWJsZWRJbmRleCA9PT0gLTEpXG4gIC8vICAgICAgIHRoaXMuX29uU2VsZWN0KHBvc2l0aW9uLmlkLCBwb3NpdGlvbi5sYWJlbCwgW3Bvc2l0aW9uLngsIHBvc2l0aW9uLnldKTtcbiAgLy8gICB9XG5cbiAgLy8gICBzZXRBcmVhKGFyZWEpIHtcbiAgLy8gICAgIHRoaXMuX2FyZWEgPSBhcmVhO1xuICAvLyAgIH1cblxuICAvLyAgIGRpc3BsYXlQb3NpdGlvbnMoY2FwYWNpdHksIGxhYmVscyA9IG51bGwsIGNvb3JkaW5hdGVzID0gbnVsbCwgbWF4Q2xpZW50c1BlclBvc2l0aW9uID0gMSkge1xuICAvLyAgICAgdGhpcy5udW1iZXJQb3NpdGlvbnMgPSBjYXBhY2l0eSAvIG1heENsaWVudHNQZXJQb3NpdGlvbjtcbiAgLy8gICAgIHRoaXMucG9zaXRpb25zID0gW107XG5cbiAgLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1iZXJQb3NpdGlvbnM7IGkrKykge1xuICAvLyAgICAgICBjb25zdCBsYWJlbCA9IGxhYmVscyAhPT0gbnVsbCA/IGxhYmVsc1tpXSA6IChpICsgMSkudG9TdHJpbmcoKTtcbiAgLy8gICAgICAgY29uc3QgcG9zaXRpb24gPSB7IGlkOiBpLCBsYWJlbDogbGFiZWwgfTtcbiAgLy8gICAgICAgY29uc3QgY29vcmRzID0gY29vcmRpbmF0ZXNbaV07XG4gIC8vICAgICAgIHBvc2l0aW9uLnggPSBjb29yZHNbMF07XG4gIC8vICAgICAgIHBvc2l0aW9uLnkgPSBjb29yZHNbMV07XG5cbiAgLy8gICAgICAgdGhpcy5wb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gIC8vICAgICB9XG5cbiAgLy8gICAgIHRoaXMuc2VsZWN0b3IgPSBuZXcgU3BhY2VWaWV3KCk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLnNldEFyZWEodGhpcy5fYXJlYSk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLnJlbmRlcigpO1xuICAvLyAgICAgdGhpcy5zZWxlY3Rvci5hcHBlbmRUbyh0aGlzLiRzZWxlY3RvckNvbnRhaW5lcik7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLm9uUmVuZGVyKCk7XG4gIC8vICAgICB0aGlzLnNlbGVjdG9yLnNldFBvaW50cyh0aGlzLnBvc2l0aW9ucyk7XG5cbiAgLy8gICAgIHRoaXMuc2VsZWN0b3IuaW5zdGFsbEV2ZW50cyh7XG4gIC8vICAgICAgICdjbGljayAucG9pbnQnOiB0aGlzLl9vblNlbGVjdGlvbkNoYW5nZVxuICAvLyAgICAgfSk7XG4gIC8vICAgfVxuXG4gIC8vICAgdXBkYXRlRGlzYWJsZWRQb3NpdGlvbnMoaW5kZXhlcykge1xuICAvLyAgICAgdGhpcy5fZGlzYWJsZWRQb3NpdGlvbnMgPSBpbmRleGVzO1xuXG4gIC8vICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdGhpcy5udW1iZXJQb3NpdGlvbnM7IGluZGV4KyspIHtcbiAgLy8gICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLnBvc2l0aW9uc1tpbmRleF07XG4gIC8vICAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBpbmRleGVzLmluZGV4T2YoaW5kZXgpICE9PSAtMTtcbiAgLy8gICAgICAgcG9zaXRpb24uc2VsZWN0ZWQgPSBpc0Rpc2FibGVkID8gdHJ1ZSA6IGZhbHNlO1xuICAvLyAgICAgICB0aGlzLnNlbGVjdG9yLnVwZGF0ZVBvaW50KHBvc2l0aW9uKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG5cbiAgLy8gICBzZXRTZWxlY3RDYWxsYWNrKGNhbGxiYWNrKSB7XG4gIC8vICAgICB0aGlzLl9vblNlbGVjdCA9IGNhbGxiYWNrO1xuICAvLyAgIH1cblxuICAvLyAgIHJlamVjdChkaXNhYmxlZFBvc2l0aW9ucykge1xuICAvLyAgICAgdGhpcy5tb2RlbC5yZWplY3RlZCA9IHRydWU7XG4gIC8vICAgICB0aGlzLnJlbmRlcigpO1xuICAvLyAgIH1cbiAgLy8gfSxcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgLy8gUGxhdGZvcm1cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnBsYXRmb3JtJzogY2xhc3MgUGxhdGZvcm1WaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8JSBpZiAoaXNDb21wYXRpYmxlID09PSBmYWxzZSkgeyAlPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLXRvcFwiPjwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgICAgPHA+PCU9IGVycm9yQ29tcGF0aWJsZU1lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICAgIDwlIH0gZWxzZSBpZiAoaGFzQXV0aG9yaXphdGlvbnMgPT09IGZhbHNlKSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICA8cD48JT0gZXJyb3JIb29rc01lc3NhZ2UgJT48L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICAgIDwlIH0gZWxzZSB7ICU+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wIGZsZXgtbWlkZGxlXCI+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgICAgIDxwIGNsYXNzPVwiYmlnXCI+XG4gICAgICAgICAgICAgICAgPGI+PCU9IGdsb2JhbHMuYXBwTmFtZSAlPjwvYj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWJvdHRvbSBmbGV4LW1pZGRsZVwiPlxuICAgICAgICAgICAgPCUgaWYgKGNoZWNraW5nID09PSB0cnVlKSB7ICU+XG4gICAgICAgICAgICA8cCBjbGFzcz1cInNtYWxsIHNvZnQtYmxpbmtcIj48JT0gY2hlY2tpbmdNZXNzYWdlICU+PC9wPlxuICAgICAgICAgICAgPCUgfSBlbHNlIGlmIChoYXNBdXRob3JpemF0aW9ucyA9PT0gdHJ1ZSkgeyAlPlxuICAgICAgICAgICAgPHAgY2xhc3M9XCJzbWFsbCBzb2Z0LWJsaW5rXCI+PCU9IGluc3RydWN0aW9ucyAlPjwvcD5cbiAgICAgICAgICAgIDwlIH0gJT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPCUgfSAlPlxuICAgICAgYDtcblxuICAgICAgdGhpcy5tb2RlbCA9IHtcbiAgICAgICAgaXNDb21wYXRpYmxlOiBudWxsLFxuICAgICAgICBoYXNBdXRob3JpemF0aW9uczogbnVsbCxcbiAgICAgICAgY2hlY2tpbmc6IGZhbHNlLFxuICAgICAgICBpbnN0cnVjdGlvbnM6ICdUb3VjaCB0aGUgc2NyZWVuIHRvIGpvaW4hJyxcbiAgICAgICAgY2hlY2tpbmdNZXNzYWdlOiAnUGxlYXNlIHdhaXQgd2hpbGUgY2hlY2tpbmcgY29tcGF0aWJsaXR5JyxcbiAgICAgICAgZXJyb3JDb21wYXRpYmxlTWVzc2FnZTogJ1NvcnJ5LDxiciAvPllvdXIgZGV2aWNlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIGFwcGxpY2F0aW9uLicsXG4gICAgICAgIGVycm9ySG9va3NNZXNzYWdlOiBgU29ycnksPGJyIC8+VGhlIGFwcGxpY2F0aW9uIGRpZG4ndCBvYnRhaW4gdGhlIG5lY2Vzc2FyeSBhdXRob3JpemF0aW9ucy5gLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5fdG91Y2hzdGFydENhbGxiYWNrID0gbm9vcDtcbiAgICAgIHRoaXMuX21vdXNlZG93bkNhbGxiYWNrID0gbm9vcDtcbiAgICB9XG5cbiAgICBvblJlbmRlcigpIHtcbiAgICAgIHN1cGVyLm9uUmVuZGVyKCk7XG5cbiAgICAgIHRoaXMuaW5zdGFsbEV2ZW50cyh7XG4gICAgICAgICdtb3VzZWRvd24nOiAoZSkgPT4gdGhpcy5fbW91c2Vkb3duQ2FsbGJhY2soZSksXG4gICAgICAgICd0b3VjaHN0YXJ0JzogKGUpID0+IHRoaXMuX3RvdWNoc3RhcnRDYWxsYmFjayhlKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFRvdWNoU3RhcnRDYWxsYmFjayhjYWxsYmFjaykge1xuICAgICAgdGhpcy5fdG91Y2hzdGFydENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgc2V0TW91c2VEb3duQ2FsbGJhY2soY2FsbGJhY2spIHtcbiAgICAgIHRoaXMuX21vdXNlZG93bkNhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgfVxuXG4gICAgdXBkYXRlQ2hlY2tpbmdTdGF0dXModmFsdWUpIHtcbiAgICAgIHRoaXMubW9kZWwuY2hlY2tpbmcgPSB2YWx1ZTtcbiAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlSXNDb21wYXRpYmxlU3RhdHVzKHZhbHVlKSB7XG4gICAgICB0aGlzLm1vZGVsLmlzQ29tcGF0aWJsZSA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVIYXNBdXRob3JpemF0aW9uc1N0YXR1cyh2YWx1ZSkge1xuICAgICAgdGhpcy5tb2RlbC5oYXNBdXRob3JpemF0aW9ucyA9IHZhbHVlO1xuICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIC8vIFJhdy1Tb2NrZXRcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICdzZXJ2aWNlOnJhdy1zb2NrZXQnOiBjbGFzcyBSYXdTb2NrZXRWaWV3IGV4dGVuZHMgU2VnbWVudGVkVmlldyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICBzdXBlcigpO1xuXG4gICAgICB0aGlzLnRlbXBsYXRlID0gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10b3BcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tY2VudGVyIGZsZXgtY2VudGVyXCI+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzb2Z0LWJsaW5rXCI+PCU9IHdhaXQgJT48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi1ib3R0b21cIj48L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIHRoaXMubW9kZWwgPSB7XG4gICAgICAgIHdhaXQ6IGBPcGVuaW5nIHNvY2tldCw8YnIgLz5zdGFuZCBieSZoZWxsaXA7YCxcbiAgICAgIH07XG4gICAgfVxuICB9LFxuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyBTeW5jXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAnc2VydmljZTpzeW5jJzogY2xhc3MgUmF3U29ja2V0VmlldyBleHRlbmRzIFNlZ21lbnRlZFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgc3VwZXIoKTtcblxuICAgICAgdGhpcy50ZW1wbGF0ZSA9IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdG9wXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uLWNlbnRlciBmbGV4LWNlbnRlclwiPlxuICAgICAgICAgIDxwIGNsYXNzPVwic29mdC1ibGlua1wiPjwlPSB3YWl0ICU+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tYm90dG9tXCI+PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICB0aGlzLm1vZGVsID0ge1xuICAgICAgICB3YWl0OiBgQ2xvY2sgc3luY2luZyw8YnIgLz5zdGFuZCBieSZoZWxsaXA7YCxcbiAgICAgIH07XG4gICAgfVxuICB9LFxuXG5cbiAgLy8gcHVibGljIEFQSVxuICBoYXMoaWQpIHtcbiAgICByZXR1cm4gISF0aGlzW2lkXTtcbiAgfSxcblxuICBnZXQoaWQsIGNvbmZpZykge1xuICAgIGNvbnN0IGN0b3IgPSB0aGlzW2lkXTtcbiAgICBjb25zdCB2aWV3ID0gbmV3IGN0b3IoKTtcbiAgICAvLyBhZGRpdGlvbm5hbCBjb25maWd1cmF0aW9uXG4gICAgdmlldy5tb2RlbC5nbG9iYWxzID0gT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnKTtcbiAgICB2aWV3Lm9wdGlvbnMuaWQgPSBpZC5yZXBsYWNlKC9cXDovZywgJy0nKTtcblxuICAgIHJldHVybiB2aWV3O1xuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgc2VydmljZVZpZXdzO1xuIl19