module.exports = [
    '$scope',
    '$translate',
    '$location',
    '$controller',
    '$stateParams',
    'PostEntity',
    'PostEndpoint',
    'FormEndpoint',
function (
    $scope,
    $translate,
    $location,
    $controller,
    $stateParams,
    postEntity,
    PostEndpoint,
    FormEndpoint
) {
    $translate('post.create_post').then(function (title) {
        $scope.title = title;
        $scope.$emit('setPageTitle', title);
    });

    $scope.post = postEntity();

    PostEndpoint.options().$promise.then(function (options) {
        $scope.post.allowed_privileges = options.allowed_privileges;
    });

    FormEndpoint.getFresh({ id: $stateParams.id }).$promise.then(function (form) {
        $scope.form = form;
    });
}];
