Template.configureLoginServiceDialogForVkontakte.siteUrl = function () {
    return Meteor.absoluteUrl({replaceLocalhost: true});
};

Template.configureLoginServiceDialogForVkontakte.fields = function () {
    return [
        {property: 'clientId', label: 'App Id'},
        {property: 'secret', label: 'App Secret'},
        {property: 'scope', label: "Scope"}
    ];
};

