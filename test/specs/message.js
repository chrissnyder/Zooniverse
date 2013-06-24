// Generated by CoffeeScript 1.4.0
(function() {
  var $, FakeProxy, Message;

  $ = require('jqueryify');

  Message = require('./message');

  FakeProxy = (function() {

    function FakeProxy() {}

    FakeProxy.prototype.send = function(message) {
      this.message = message;
    };

    FakeProxy.prototype.succeed = function() {
      return this.message.succeed();
    };

    FakeProxy.prototype.fail = function() {
      return this.message.fail();
    };

    return FakeProxy;

  })();

  describe('Message', function() {
    beforeEach(function() {
      var fakeProxy, _ref;
      _ref = [1, 2, 3].map(function() {
        return jasmine.createSpy();
      }), this.success = _ref[0], this.failure = _ref[1], this.always = _ref[2];
      fakeProxy = new FakeProxy;
      this.message = new Message({
        foo: 'foo'
      }, fakeProxy);
      this.message.onSuccess(this.success);
      this.message.onFailure(this.failure);
      return this.message.always(this.always);
    });
    it('should know when it is sent', function() {
      expect(this.message.sent).toBe(false);
      this.message.send();
      return expect(this.message.sent).toBe(true);
    });
    it('should know when it is delivered', function() {
      expect(this.message.isDelivered()).toBe(false);
      this.message.send();
      expect(this.message.isDelivered()).toBe(false);
      this.message.proxy.succeed();
      return expect(this.message.isDelivered()).toBe(true);
    });
    it('handles success', function() {
      this.message.send();
      this.message.proxy.succeed();
      expect(this.success).toHaveBeenCalled();
      expect(this.failure).not.toHaveBeenCalled();
      expect(this.always).toHaveBeenCalled();
      return expect(this.message.isDelivered()).toBe(true);
    });
    return it('handles failure', function() {
      this.message.send();
      this.message.proxy.fail();
      expect(this.success).not.toHaveBeenCalled();
      expect(this.failure).toHaveBeenCalled();
      expect(this.always).toHaveBeenCalled();
      return expect(this.message.isDelivered()).toBe(false);
    });
  });

}).call(this);