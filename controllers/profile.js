// Generated by CoffeeScript 1.6.3
(function() {
  var $, BaseController, Favorite, LoginForm, Paginator, Profile, Recent, User, itemTemplate, template, _base, _base1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  if (window.zooniverse == null) {
    window.zooniverse = {};
  }

  if ((_base = window.zooniverse).controllers == null) {
    _base.controllers = {};
  }

  if ((_base1 = window.zooniverse).views == null) {
    _base1.views = {};
  }

  BaseController = zooniverse.controllers.BaseController || require('./base-controller');

  template = zooniverse.views.profile || require('../views/profile');

  LoginForm = zooniverse.controllers.LoginForm || require('zooniverse/controllers/login-form');

  Paginator = zooniverse.controllers.Paginator || require('./paginator');

  Recent = zooniverse.models.Recent || require('../models/recent');

  Favorite = zooniverse.models.Favorite || require('../models/favorite');

  itemTemplate = zooniverse.views.profileItem || require('../views/profile-item');

  User = zooniverse.models.User || require('../models/user');

  $ = window.jQuery;

  Profile = (function(_super) {
    __extends(Profile, _super);

    Profile.prototype.className = 'zooniverse-profile';

    Profile.prototype.template = template;

    Profile.prototype.recentTemplate = itemTemplate;

    Profile.prototype.favoriteTemplate = itemTemplate;

    Profile.prototype.loginForm = null;

    Profile.prototype.recentsList = null;

    Profile.prototype.favoritesList = null;

    Profile.prototype.events = {
      'click button[name="unfavorite"]': 'onClickUnfavorite',
      'click button[name="turn-page"]': 'onTurnPage'
    };

    Profile.prototype.elements = {
      'nav': 'navigation',
      'button[name="turn-page"]': 'pageTurners'
    };

    function Profile() {
      var _this = this;
      Profile.__super__.constructor.apply(this, arguments);
      this.loginForm = new LoginForm({
        el: this.el.find('.sign-in-form')
      });
      this.recentsList = new Paginator({
        type: Recent,
        perPage: 12,
        className: "" + Paginator.prototype.className + " recents",
        el: this.el.find('.recents'),
        itemTemplate: this.recentTemplate
      });
      this.favoritesList = new Paginator({
        type: Favorite,
        perPage: 12,
        className: "" + Paginator.prototype.className + " favorites",
        el: this.el.find('.favorites'),
        itemTemplate: this.favoriteTemplate
      });
      User.on('change', function() {
        return _this.onUserChange.apply(_this, arguments);
      });
    }

    Profile.prototype.onUserChange = function(e, user) {
      this.el.toggleClass('signed-in', user != null);
      return this.pageTurners.first().click();
    };

    Profile.prototype.onClickUnfavorite = function(e) {
      var favorite, id, target;
      target = $(e.currentTarget);
      id = target.val();
      favorite = Favorite.find(id);
      favorite["delete"]();
      return target.parents('[data-item-id]').first().remove();
    };

    Profile.prototype.onTurnPage = function(e) {
      var target, targetType;
      this.pageTurners.removeClass('active');
      target = $(e.target);
      target.addClass('active');
      targetType = target.val();
      this.recentsList.el.add(this.favoritesList.el).removeClass('active');
      return this["" + targetType + "List"].el.addClass('active');
    };

    return Profile;

  })(BaseController);

  window.zooniverse.controllers.Profile = Profile;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Profile;
  }

}).call(this);
