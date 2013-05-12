var Controller = Controller || {};

Controller.Metric = Controller.Metric || {};

Controller.Metric.List = function ($scope) {
    $scope.artifactList = [
        {"link": "package",
         "name": "Packages"},
        {"link": "class",
         "name": "Classes"},
        {"link": "method",
         "name": "Methods"}
    ];
};

Controller.Metric.Table = function( $scope, Metrics ) {
    var count = 5; 

    $scope.$watch(
        function () {
            return Metrics.artifacts.metrics.length;
        },
        function ( newArtifacts, oldArtifacts, scope ) {
            var artifacts = Metrics.artifacts.metrics;

            scope.noOfPages = artifacts.length / count;

            scope.setPage = function ( pageNo ) {
                scope.currentPage = pageNo;
                scope.selection = artifacts.slice(
                    ( scope.currentPage - 1 ) * count,
                    count
                );
            };

            scope.setPage( 1 );
            scope.maxSize = 5;
        },
        true
    );
};

Controller.Metric.Package = function ($scope, Metrics) {
    Metrics.get( function( metrics ) {
        var metric = "cr";

        metrics = new Model.Metric(metrics);

        $scope.metric = metric;
        $scope.artifacts = metrics.getPackages(metric);
        $scope.metrics = metrics.packageMetrics;

        Metrics.setArtifacts( $scope.artifacts );
    });
};

Controller.Metric.Class = function ($scope, Metrics) {
    Metrics.get( function( metrics ) {
        var metric = "cr";

        metrics = new Model.Metric(metrics);

        $scope.metric = metric;
        $scope.artifacts = metrics.getClasses(metric);
        $scope.metrics = metrics.classMetrics;

        Metrics.setArtifacts( $scope.artifacts );
    });
};

Controller.Metric.Method = function ($scope, Metrics) {
    Metrics.get( function( metrics ) {
        var metric = "ccn";

        metrics = new Model.Metric(metrics);

        $scope.metric = metric;
        $scope.artifacts = metrics.getMethods(metric);
        $scope.metrics = metrics.methodMetrics;

        Metrics.setArtifacts( $scope.artifacts );
    });
};
