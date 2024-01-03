/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("(function () {\r\n    'use strict';\r\n    window.addEventListener('load', function () {\r\n        let canvas = document.querySelector('canvas');\r\n        if (!canvas || !canvas.getContext) {\r\n            return false;\r\n        }\r\n\r\n        function rand(min, max) {\r\n            return Math.floor(Math.random() * (max - min + 1) + min);\r\n        }\r\n\r\n        let ctx = canvas.getContext('2d');\r\n        let X = canvas.width = window.innerWidth;\r\n        let Y = canvas.height = window.innerHeight;\r\n\r\n        window.requestAnimationFrame =\r\n            window.requestAnimationFrame ||\r\n            window.mozRequestAnimationFrame ||\r\n            window.webkitRequestAnimationFrame ||\r\n            window.msRequestAnimationFrame ||\r\n            function (cb) {\r\n                setTimeout(cb, 17);\r\n            };\r\n\r\n\r\n        function drawGround() {\r\n            ctx.beginPath();\r\n            ctx.fillStyle = 'rgb(255, 255, 255)';\r\n            ctx.rect(0, Y - Y * 0.05, X, Y - Y * -0.05);\r\n            ctx.fill();\r\n        }\r\n\r\n        let snowNum = 80;\r\n        let backSnowNum = 80;\r\n        let snows = [];\r\n        let backSnows = [];\r\n        if (X < 768) {\r\n            snowNum = 25;\r\n            backSnowNum = 25;\r\n        }\r\n\r\n        function Snow(ctx, x, y, r, g) {\r\n            this.ctx = ctx;\r\n            this.init(x, y, r, g);\r\n        }\r\n        Snow.prototype.init = function (x, y, r, g) {\r\n            this.x = x;\r\n            this.y = y;\r\n            this.r = r;\r\n            this.c = '255, 255, 255';\r\n            this.v = {\r\n                x: 0,\r\n                y: g\r\n            };\r\n        };\r\n        Snow.prototype.updatePosition = function () {\r\n            this.y += this.v.y;\r\n        };\r\n        Snow.prototype.wrapPosition = function () {\r\n            if (this.x - this.r > X) {\r\n                this.x = 0;\r\n            }\r\n            if (this.x + this.r < 0) {\r\n                this.x = X;\r\n            }\r\n            if (this.y - this.r > Y) {\r\n                this.y = 0;\r\n            }\r\n            if (this.y + this.r < 0) {\r\n                this.y = Y;\r\n            }\r\n        };\r\n        Snow.prototype.draw = function () {\r\n            ctx = this.ctx;\r\n            ctx.save();\r\n            ctx.beginPath();\r\n            ctx.fillStyle = this.gradient();\r\n            ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);\r\n            ctx.fill();\r\n            ctx.closePath();\r\n            ctx.restore();\r\n        };\r\n        Snow.prototype.gradient = function () {\r\n            let rgb = this.c;\r\n            let g = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);\r\n            g.addColorStop(0.0, `rgba(${rgb}, ${(1 * 1.0)})`);\r\n            g.addColorStop(0.5, `rgba(${rgb}, ${(1 * 0.2)})`);\r\n            g.addColorStop(1.0, `rgba(${rgb}, ${(1 * 0.0)})`);\r\n            return g;\r\n        };\r\n        Snow.prototype.resize = function () {\r\n            this.x = rand(0, X);\r\n            this.y = rand(0, Y);\r\n        };\r\n        Snow.prototype.render = function () {\r\n            this.updatePosition();\r\n            this.wrapPosition();\r\n            this.draw();\r\n        };\r\n        for (let i = 0; i < backSnowNum; i++) {\r\n            let snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(1, 5), Math.random());\r\n            backSnows.push(snow);\r\n        }\r\n        for (let i = 0; i < snowNum; i++) {\r\n            let snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(10, 15), Math.random() + 0.3);\r\n            snows.push(snow);\r\n        }\r\n\r\n        let treeNum = 30; //White trees\r\n        let trees = [];\r\n        let backTreeNum = 16; //Blue trees\r\n        let backTrees = [];\r\n        let branchRad = 30 * Math.PI / 180;\r\n        if (X < 768) {\r\n            treeNum = 15;\r\n            backTreeNum = 8;\r\n        }\r\n        function Tree(ctx, x, y, t, w, c) {\r\n            this.ctx = ctx;\r\n            this.init(x, y, t, w, c);\r\n        }\r\n        Tree.prototype.init = function (x, y, t, w, c) {\r\n            this.ctx = ctx;\r\n            this.x = x; //X-coordinate\r\n            this.y = y; //Y-coordinate\r\n            this.t = t; //Height\r\n            this.w = w; //Width\r\n            this.c = c;\r\n            this.splitNum = rand(10, 20);\r\n            this.tSplit = this.t / this.splitNum;\r\n            this.bSplit = this.w / this.splitNum;\r\n        };\r\n        Tree.prototype.draw = function () {\r\n            ctx = this.ctx;\r\n            ctx.lineCap = 'round';\r\n            ctx.lineWidth = 3;\r\n            ctx.strokeStyle = this.c;\r\n            ctx.beginPath();\r\n            ctx.moveTo(this.x, this.y);\r\n            ctx.lineTo(this.x, this.y - this.t);\r\n            ctx.stroke();\r\n            ctx.lineWidth = 1;\r\n            for (let i = 1, j = this.splitNum; i < this.splitNum; i++, j--) {\r\n                let bX1 = this.x + this.bSplit * j;\r\n                let bX2 = this.x - this.bSplit * j;\r\n                let bY = this.y - (Math.tan(branchRad) * this.bSplit * j) - this.tSplit * i;\r\n                ctx.moveTo(this.x, this.y - this.tSplit * i);\r\n                ctx.lineTo(bX1, bY);\r\n                ctx.stroke();\r\n                ctx.moveTo(this.x, this.y - this.tSplit * i);\r\n                ctx.lineTo(bX2, bY);\r\n                ctx.stroke();\r\n            }\r\n        };\r\n        Tree.prototype.resize = function (isScroll) {\r\n            if (!isScroll) {\r\n                this.x = rand(0, X); //Randomly fill new width if window was widened\r\n            }\r\n            this.y = Y - Y * 0.05;\r\n        };\r\n        Tree.prototype.render = function () {\r\n            this.draw();\r\n        };\r\n        for (let i = 0; i < backTreeNum; i++) {\r\n            let tree = new Tree(ctx, rand(0, X), Y - Y * 0.05, rand(100, 200), rand(25, 50), 'rgb(126, 158, 209)');\r\n            backTrees.push(tree);\r\n        }\r\n        for (let i = 0; i < treeNum; i++) {\r\n            let tree = new Tree(ctx, rand(0, X), Y - Y * 0.05, rand(100, 150), rand(15, 50), 'rgb(255, 255, 255)');\r\n            trees.push(tree);\r\n        }\r\n\r\n        function render() {\r\n            ctx.clearRect(0, 0, X, Y);\r\n            drawGround();\r\n            for (let i = 0; i < backSnows.length; i++) {\r\n                backSnows[i].render();\r\n            }\r\n            for (let i = 0; i < backTrees.length; i++) {\r\n                backTrees[i].render();\r\n            }\r\n            for (let i = 0; i < trees.length; i++) {\r\n                trees[i].render();\r\n            }\r\n            for (let i = 0; i < snows.length; i++) {\r\n                snows[i].render();\r\n            }\r\n            requestAnimationFrame(render);\r\n        }\r\n        render();\r\n\r\n        function onResize(isScroll) {\r\n            X = canvas.width = window.innerWidth;\r\n            canvas.height = window.innerHeight; //Resize canvas\r\n            Y = window.innerHeight - window.scrollY; //Resize when refreshed in the middle of the page\r\n            drawGround();\r\n            for (let i = 0; i < backSnows.length; i++) {\r\n                backSnows[i].resize();\r\n            }\r\n            for (let i = 0; i < backTrees.length; i++) {\r\n                backTrees[i].resize(isScroll);\r\n            }\r\n            for (let i = 0; i < trees.length; i++) {\r\n                trees[i].resize(isScroll);\r\n            }\r\n            for (let i = 0; i < snows.length; i++) {\r\n                snows[i].resize();\r\n            }\r\n        }\r\n        window.addEventListener('resize', function () {\r\n            onResize();\r\n        });\r\n\r\n        function onScroll() {\r\n            onResize(true);\r\n        }\r\n        window.addEventListener('scroll', function () {\r\n            onScroll();\r\n        });\r\n    });\r\n})();\r\n\n\n//# sourceURL=webpack://portfolio/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;