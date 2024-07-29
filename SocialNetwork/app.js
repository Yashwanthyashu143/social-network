var app = angular.module("socialNetworkApp", []);

app.controller("MainController", function ($scope) {
  $scope.isAuthenticated = false;
  $scope.currentUser = null;
  $scope.user = {};
  $scope.newPost = {};
  $scope.posts = [];

  // Simulate user data
  var users = [
    { username: "john", password: "12345" },
    { username: "jane", password: "67890" },
  ];

  // Simulate posts data
  $scope.posts = [
    { username: "john", content: "Hello world!" },
    { username: "jane", content: "AngularJS is great!" },
  ];

  $scope.login = function () {
    var user = users.find(
      (u) =>
        u.username === $scope.user.username &&
        u.password === $scope.user.password
    );
    if (user) {
      $scope.isAuthenticated = true;
      $scope.currentUser = user;
      $scope.user = {};
    } else {
      alert("Invalid credentials");
    }
  };

  $scope.logout = function () {
    $scope.isAuthenticated = false;
    $scope.currentUser = null;
  };

  $scope.createPost = function () {
    $scope.posts.push({
      username: $scope.currentUser.username,
      content: $scope.newPost.content,
    });
    $scope.newPost = {};
  };
});
