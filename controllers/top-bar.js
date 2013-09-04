// Generated by CoffeeScript 1.4.0
(function() {
  var Api, BaseController, TopBar, User, enUs, loginDialog, signupDialog, template, _base, _base1, _ref, _ref1, _ref2,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if ((_ref = window.zooniverse) == null) {
    window.zooniverse = {};
  }

  if ((_ref1 = (_base = window.zooniverse).controllers) == null) {
    _base.controllers = {};
  }

  if ((_ref2 = (_base1 = window.zooniverse).views) == null) {
    _base1.views = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  enUs = zooniverse.enUs || require('../lib/en-us');

  loginDialog = zooniverse.controllers.loginDialog || require('./login-dialog');

  signupDialog = zooniverse.controllers.signupDialog || require('./signup-dialog');

  template = zooniverse.views.topBar || require('../views/top-bar');

  Api = zooniverse.Api || require('../lib/api');

  User = zooniverse.models.User || require('../models/user');

  TopBar = (function(_super) {

    __extends(TopBar, _super);

    TopBar.prototype.className = 'zooniverse-top-bar';

    TopBar.prototype.template = template;

    TopBar.prototype.heading = enUs.topBar.heading;

    TopBar.prototype.messageCheckTimeout = 2 * 60 * 1000;

    TopBar.prototype.events = {
      'click button[name="sign-in"]': 'onClickSignIn',
      'click button[name="sign-up"]': 'onClickSignUp',
      'click button[name="sign-out"]': 'onClickSignOut'
    };

    TopBar.prototype.elements = {
      '.current-user-name': 'currentUserName',
      'select[name="group"]': 'groupSelect',
      '.message-count': 'messageCount',
      '.avatar img': 'avatarImage',
      '.group': 'currentGroup'
    };

    function TopBar() {
      this.onChangeGroup = __bind(this.onChangeGroup, this);

      this.getMessages = __bind(this.getMessages, this);

      this.onUserChange = __bind(this.onUserChange, this);
      TopBar.__super__.constructor.apply(this, arguments);
      User.on('change', this.onUserChange);
      this.groupSelect.on('change', this.onChangeGroup);
    }

    TopBar.prototype.onClickSignIn = function() {
      return loginDialog.show();
    };

    TopBar.prototype.onClickSignUp = function() {
      return signupDialog.show();
    };

    TopBar.prototype.onClickSignOut = function() {
      return User.logout();
    };

    TopBar.prototype.onUserChange = function(e, user) {
      this.el.toggleClass('signed-in', user != null);
      this.getMessages();
      this.processGroup();
      this.currentUserName.html((user != null ? user.name : void 0) || '');
      return this.avatarImage.attr({
        src: user != null ? user.avatar : void 0
      });
    };

    TopBar.prototype.getMessages = function() {
      var _this = this;
      if (User.current != null) {
        return Api.current.get('/talk/messages/count', function(messages) {
          _this.el.toggleClass('has-messages', messages !== 0);
          _this.messageCount.html(messages);
          return setTimeout(_this.getMessages, _this.messageCheckTimeout);
        });
      } else {
        this.el.removeClass('has-messages');
        return this.messageCount.html('0');
      }
    };

    TopBar.prototype.processGroup = function() {
      var id, name, option, _i, _len, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
      this.el.toggleClass('has-groups', ((_ref3 = User.current) != null ? (_ref4 = _ref3.user_groups) != null ? _ref4.length : void 0 : void 0) > 0);
      this.groupSelect.empty();
      this.groupSelect.append("<option value=''>(No group)</option>");
      _ref6 = ((_ref5 = User.current) != null ? _ref5.user_groups : void 0) || [];
      for (_i = 0, _len = _ref6.length; _i < _len; _i++) {
        _ref7 = _ref6[_i], id = _ref7.id, name = _ref7.name;
        option = "<option value='" + id + "'>" + name + "</option>";
        this.groupSelect.append(option);
      }
      return this.groupSelect.val(((_ref8 = User.current) != null ? _ref8.user_group_id : void 0) || '');
    };

    TopBar.prototype.onChangeGroup = function(e) {
      var setGroup,
        _this = this;
      this.groupSelect.attr('disabled', true);
      return setGroup = User.current.setGroup(this.groupSelect.val(), function() {
        return _this.groupSelect.attr('disabled', false);
      });
    };

    return TopBar;

  })(BaseController);

  window.zooniverse.controllers.TopBar = TopBar;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = TopBar;
  }

}).call(this);
