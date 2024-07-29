app.controller("MainController", function ($scope) {
  $scope.isAuthenticated = false;
  $scope.isRegistering = false;
  $scope.currentUser = null;
  $scope.user = {};
  $scope.newUser = {};
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

  $scope.register = function () {
    users.push({
      username: $scope.newUser.username,
      password: $scope.newUser.password,
    });
    $scope.isRegistering = false;
    $scope.newUser = {};
    alert("Registration successful");
  };

  $scope.toggleRegister = function () {
    $scope.isRegistering = !$scope.isRegistering;
  };

  $scope.createPost = function () {
    $scope.posts.push({
      username: $scope.currentUser.username,
      content: $scope.newPost.content,
    });
    $scope.newPost = {};
  };

  $scope.friendRequests = [];
  $scope.friends = [];

  $scope.sendFriendRequest = function (username) {
    if (
      !$scope.friendRequests.includes(username) &&
      !$scope.friends.includes(username)
    ) {
      $scope.friendRequests.push(username);
    }
  };

  $scope.acceptFriendRequest = function (username) {
    $scope.friends.push(username);
    $scope.friendRequests = $scope.friendRequests.filter(
      (req) => req !== username
    );
  };

  $scope.rejectFriendRequest = function (username) {
    $scope.friendRequests = $scope.friendRequests.filter(
      (req) => req !== username
    );
  };
});
