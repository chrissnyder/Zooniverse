// Generated by CoffeeScript 1.4.0
(function() {
  var BaseController, Dialog, template, _base, _base1, _ref, _ref1, _ref2,
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

  template = zooniverse.views.Dialog || require('../views/dialog');

  Dialog = (function(_super) {

    __extends(Dialog, _super);

    Dialog.prototype.content = '';

    Dialog.prototype.className = 'zooniverse-dialog';

    Dialog.prototype.template = template;

    Dialog.prototype.events = {
      'click button[name="close-dialog"]': 'hide'
    };

    Dialog.prototype.elements = {
      '.dialog': 'contentContainer'
    };

    function Dialog() {
      Dialog.__super__.constructor.apply(this, arguments);
      this.hide();
      this.contentContainer.append(this.content);
      this.el.appendTo(document.body);
    }

    Dialog.prototype.show = function() {
      return this.el.removeClass('hidden');
    };

    Dialog.prototype.hide = function() {
      return this.el.addClass('hidden');
    };

    return Dialog;

  })(BaseController);

  window.zooniverse.controllers.Dialog = Dialog;

  if (typeof module !== "undefined" && module !== null) {
    module.exports = Dialog;
  }

}).call(this);