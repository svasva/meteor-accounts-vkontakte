(function () {

    Accounts.oauth.registerService('vkontakte', 2, function(query) {

        var accessToken = getAccessToken(query);

        return {
            serviceData: {
                id: accessToken.user_id,
                accessToken: accessToken.access_token
            },
            options: {
            }
        };
    });

    var getAccessToken = function (query) {
        var config = Accounts.loginServiceConfiguration.findOne({service: 'vkontakte'});
        if (!config)
            throw new Accounts.ConfigError("Service not configured");

        var result = Meteor.http.post(
            "https://oauth.vk.com/access_token", {params: {
                client_id: config.clientId,
                client_secret: config.secret,
                code: query.code,
                redirect_uri: Meteor.absoluteUrl("_oauth/vkontakte?close=close", {replaceLocalhost: true})
            }});

        if (result.error) // if the http response was an error
            throw result.error;
        if (typeof result.content === "string")
            result.content = JSON.parse(result.content);
        if (result.content.error) // if the http response was a json object with an error attribute
            throw result.content;
        return result.content;
    };
})();

