(function () {

    Accounts.oauth.registerService('vkontakte', 2, function(query) {

        var accessToken = getAccessToken(query);
        var profile = getUserInfo(accessToken.access_token);
        profile.city = getCity(accessToken.access_token, profile.city);
        profile.country = getCountry(accessToken.access_token, profile.country);
        profile.name = profile.first_name + ' ' +
            profile.nickname + ' ' +
            profile.last_name;
        return {
            serviceData: {
                id: accessToken.user_id,
                accessToken: accessToken.access_token
            },
            options: { profile: profile }
        };
    });

    var getUserInfo = function (access_token) {
        var result = Meteor.http.post(
            "https://api.vk.com/method/users.get", {params: {
                access_token: access_token,
                fields: 'nickname, sex, bdate, timezone, photo, photo_big, city, country'
            }});
        if (result.error) // if the http response was an error
            throw result.error;
        if (typeof result.content === "string")
            result.content = JSON.parse(result.content);
        if (result.content.error) // if the http response was a json object with an error attribute
            throw result.content;
        profile = result.content.response[0];
        return profile;
    };

    var getCity = function (access_token, cityId) {
        var result = Meteor.http.post(
            "https://api.vk.com/method/places.getCityById", {params: {
                access_token: access_token,
                cids: cityId
            }});
        if (result.error) // if the http response was an error
            throw result.error;
        if (typeof result.content === "string")
            result.content = JSON.parse(result.content);
        if (result.content.error) // if the http response was a json object with an error attribute
            throw result.content;
        return result.content.response[0].name;
    };

    var getCountry = function (access_token, cityId) {
        var result = Meteor.http.post(
            "https://api.vk.com/method/places.getCountryById", {params: {
                access_token: access_token,
                cids: cityId
            }});
        if (result.error) // if the http response was an error
            throw result.error;
        if (typeof result.content === "string")
            result.content = JSON.parse(result.content);
        if (result.content.error) // if the http response was a json object with an error attribute
            throw result.content;
        return result.content.response[0].name;
    };


    var getAccessToken = function (query) {
        var config = Accounts.loginServiceConfiguration.findOne({service: 'vkontakte'});
        if (!config)
            throw new Accounts.ConfigError("Service not configured");

        var result = Meteor.http.post(
            "https://oauth.vk.com/access_token", {params: {
                client_id: config.clientId,
                client_secret: config.secret,
                code: query.code,
                redirect_uri: Meteor.absoluteUrl("_oauth/vkontakte?close=close", {replaceLocalhost: false})
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
