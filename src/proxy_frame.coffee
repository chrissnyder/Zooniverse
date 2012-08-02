class ProxyFrame
  @headers = { }
  
  constructor: (@host) ->
    @append()
    $(window).on 'message', @receive
  
  el: ->
    $('#api-proxy-frame')
  
  elFrame: =>
    @el()[0]
  
  appended: =>
    @elFrame()?
  
  append: ->
    return if @appended()
    $('body').append @html()
  
  html: ->
    $('<iframe></iframe>')
      .attr('id', 'api-proxy-frame')
      .attr('src', "#{ @host }/proxy")
      .css('display', 'none')
  
  bind: (event, callback) ->
    @el().on event, callback
  
  postMessage: (message) =>
    @elFrame().contentWindow.postMessage JSON.stringify(message), @host
  
  send: (message) =>
    message.headers = ProxyFrame.headers
    @postMessage message
  
  receive: ({ originalEvent: e }) =>
    return unless e.origin is @host
    message = JSON.parse e.data
    @el().trigger('response', message) unless message.id is 'READY'

module.exports = ProxyFrame
