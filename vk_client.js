(function () {
    Meteor.loginWithVkontakte = function (options, callback) {
        // support both (options, callback) and (callback).
        if (!callback && typeof options === 'function') {
            callback = options;
            options = {};
        }

        var config = Accounts.loginServiceConfiguration.findOne({service: 'vkontakte'});
        if (!config) {
            callback && callback(new Accounts.ConfigError("Service not configured"));
            return;
        }

        var state = Meteor.uuid();
        var loginUrl =
            'https://oauth.vk.com/authorize' +
                '?client_id=' + config.clientId +
                '&scope=' + config.scope +
                '&redirect_uri=' + Meteor.absoluteUrl('_oauth/vkontakte?close=close', {replaceLocalhost: false}) +
                '&response_type=code' +
                '&state=' + state;

        Accounts.oauth.initiateLogin(state, loginUrl, callback);
    };

}) ();

