module.exports = [
    '$rootScope',
    '$http',
    'Util',
    'CONST',
function(
    $rootScope,
    $http,
    Util,
    CONST
) {

    // check if initially we have an old access_token and assume that,
    // if yes, we are still signedin
    var signinStatus = !!localStorage.getItem('access_token'),

            setToSigninState = function(accessToken){
                localStorage.setItem('access_token', accessToken);
                signinStatus = true;
            },

            setToSignoutState = function(){
                localStorage.removeItem('access_token');
                signinStatus = false;
            };

    return {

        signin: function(username, password)
        {
            var claimedScopes = [
                'posts',
                'media',
                'forms',
                'api',
                'tags',
                'sets',
                'users',
                'stats',
                'layers',
                'config',
                'messages',
                'dataproviders'
            ],
            payload = {
                username: username,
                password: password,
                grant_type: 'password',
                client_id: CONST.OAUTH_CLIENT_ID,
                client_secret: CONST.OAUTH_CLIENT_SECRET,
                scope: claimedScopes.join(' ')
            };

            $http.post(Util.url('/oauth/token'), payload)
            .success(function(data){
                setToSigninState(data.access_token);

                $rootScope.$broadcast('event:authentication:signin:succeeded');
            })
            .error(function(/*data, status, headers, config*/){
                setToSignoutState();
                $rootScope.$broadcast('event:authentication:signin:failed');
            });
        },

        signout: function(){
            //TODO: ASK THE BACKEND TO DESTROY SESSION

            setToSignoutState();
            $rootScope.$broadcast('event:authentication:signout:succeeded');
        },

        getSigninStatus: function(){
            return signinStatus;
        }
    };

}];
