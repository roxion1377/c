var Tumblr = function(credentials)
{
};

var baseURL = 'http://localhost:1920/';

Tumblr.prototype = {
  posts: function(blog_hostname,params,callback) {
    var path = '/blog/' + blog_hostname + '/posts';
    this._get(path,params,callback);
  },

  dashboard: function(params,callback) {
    if(callback === undefined) {
      callback = params;
      params = {};
    }
    var path = '/user/dashboard';
    this._get(path,params,callback);
  },

  _get: function(path,params,callback) {
    path = baseURL + path;
    params = params || {};
    $.ajax({
      type: "GET",
      url: path,
      dataType: "json",
      data: params,
      complete: function(data,status) {
        callback(JSON.parse(data.responseText));
        //console.log(JSON.parse(data.responseText));
      }
    });
  }
};
