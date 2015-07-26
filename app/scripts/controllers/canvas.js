'use strict';

/**
 * @ngdoc function
 * @name reportApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the reportApp
 */
angular.module('reportApp').controller
(
    'CanvasController',
    function ($scope)
    {
        var canvas = null;

        var canvasConfig =
        {
            id:         'mainCanvas',
            Width:      $('#canvasParent').width(),
            Height:     $('#canvasParent').width()
        };

        $scope.currentObject = null;

        $scope.controls =
        {
            angle: 0,
            position:
            {
                x: 0,
                y: 0
            },
            scale: 1,
            backgroundColor: ''
        };

        this.init = function()
        {
            $('#canvasParent').append
            (
                $('<canvas/>', canvasConfig)
            );

            canvas = new fabric.Canvas(canvasConfig.id);

            var rect = new fabric.Rect
            (
                {
                    left: 150,
                    top: 200,
                    originX: 'left',
                    originY: 'top',
                    width: 150,
                    height: 120,
                    angle: 0,
                    fill: '#eaeaea',
                    transparentCorners: false
                }
            );

            var triangle = new fabric.Triangle
            (
                {
                    top: 300,
                    left: 210,
                    width: 100,
                    height: 100,
                    fill: '#aaaaaa'
                }
            );

            canvas.add(triangle);
            canvas.add(rect);

            canvas.on
            (
                {
                    'object:rotating'   : updateControls,
                    'object:selected'   : selectCurrentObject,
                    'object:moving'     : updateControls,
                    'object:scaling'    : updateControls
                }
            );

            function updateControls(e)
            {
                $scope.controls.angle = parseInt(e.target.getAngle());
                $scope.controls.position =
                {
                    x: parseInt(e.target.left),
                    y: parseInt(e.target.top)
                };
                $scope.controls.scale = Math.round( e.target.getScaleX() * 10 ) / 10;
                $scope.updateView();
            }

            function selectCurrentObject(e)
            {
                $scope.currentObject = e.target;

                $scope.controls =
                {
                    angle: $scope.currentObject.getAngle(),
                    position:
                    {
                        x: $scope.currentObject.getLeft(),
                        y: $scope.currentObject.getTop()
                    },
                    scale: $scope.currentObject.getScaleX(),
                    backgroundColor: $scope.currentObject.get('fill')
                };
                $scope.$apply()
            }

            $scope.updateView = function()
            {
                $('#angleSlider').val($scope.controls.angle);
                $('#angleText').val($scope.controls.angle);
                $('#positionX').val($scope.controls.position.x);
                $('#positionY').val($scope.controls.position.y);
                $('#scaleX').val($scope.controls.scale);
                $('#scaleSlider').val($scope.controls.scale);
            };
        };

        $scope.updateAngle = function(angle)
        {
            if($scope.currentObject)
            {
                $scope.currentObject.setAngle(angle).setCoords();
                canvas.renderAll();
            }
        };

        $scope.setPosition = function(position)
        {
            if($scope.currentObject)
            {
                $scope.currentObject.setLeft
                (
                    parseInt(position.x)
                ).setCoords();

                $scope.currentObject.setTop
                (
                    parseInt(position.y)
                ).setCoords();

                canvas.renderAll();
            }
        };

        $scope.setBackgroundColor = function(color)
        {
            if($scope.currentObject)
            {
                $scope.currentObject.set('fill', color);
                canvas.renderAll();
            }
        };

        $scope.setScale = function(scale)
        {
            if($scope.currentObject)
            {
                $scope.currentObject.scale(scale).setCoords();
                canvas.renderAll();
            }
        };

        $scope.$watch
        (
            'controls.angle',
            function(value)
            {
                $scope.updateAngle(value);
            }
        );

        $scope.$watch
        (
            'controls.position',
            function(value)
            {
                $scope.setPosition(value);
            }
        );

        $scope.$watch
        (
            'controls.scale',
            function(value)
            {
                $scope.setScale(value);
            }
        );


        $scope.saveToPdf = function()
        {
            var thisCanvas = document.getElementById('mainCanvas');
            var image = thisCanvas.toDataURL();
            var doc = new jsPDF('p', 'mm');

            doc.addImage(image, 'PNG', 0,0, 0,0, 'SLOW');
            doc.save('hi-res.pdf')
        };

        this.init();
    }
);
