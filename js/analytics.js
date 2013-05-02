$.analytics = {
    id: 5429087,
    apiKey: 'AIzaSyA86qO9HLVjsuiVUpe4a8WNRi81AxUDoAI',
    clientId: '577935248478-10pg2k39kh1ivo7apbmere1t481rn7f7.apps.googleusercontent.com',
    clientSecret: 'WA6oVy3DlY5WDZbbJDKbLJA-',
    refreshToken: '1/CN5Z4VnAIz6bX21SuYmBpi0ekDj4ulYwKCTLhF1n0nw',
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    grantType: 'refresh_token',
    yqlTable: 'http://dl.dropboxusercontent.com/u/8767938/fresca/html5/ga/google.oauth.xml',
    yqlQuery: function () {
        return 'use "' + this.yqlTable + '" as table; select * from table where client_id = "' + this.clientId + '" and client_secret = "' + this.clientSecret + '" and refresh_token = "' + this.refreshToken + '" and grant_type = "' + this.grantType + '"';
    },
    authorisation: function () {
        var auth = {
            url: 'http://query.yahooapis.com/v1/public/yql',
            dataType: 'json',
            async: false,
            data: {
                q: this.yqlQuery(),
                format: 'json',
                diagnostics: 'true'
            }
        }
        return auth;
    },
    getToken: function () {
        if (!$.analytics.accessToken) {
            $.when($.ajax(this.authorisation())).then(function (data) {
                $.analytics.accessToken = data.query.results.json.access_token;
            });
        }
    },
    setApiKey: function () {
        gapi.client.setApiKey($.analytics.apiKey);
    },
    setToken: function () {
        gapi.auth.setToken({
            access_token: $.analytics.accessToken
        });
    },
    lastNDays: function (n) {
        var today = new Date();
        var before = new Date();
        before.setDate(today.getDate() - n);
        var year = before.getFullYear();
        var month = before.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        var day = before.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        return [year, month, day].join('-');
    },
    query: function (data, callback) {;
        gapi.client.analytics.data.ga.get(data).execute(callback);
    },
    init: function () {
        $.when(this.getToken(), this.setApiKey(), this.setToken()).then(function (data, textStatus, jqXHR) {
            gapi.client.load('analytics', 'v3');
        });
    }
};
