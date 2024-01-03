(function () {
    'use strict';
    window.addEventListener('load', function () {
        let canvas = document.querySelector('canvas');
        if (!canvas || !canvas.getContext) {
            return false;
        }

        function rand(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        let ctx = canvas.getContext('2d');
        let X = canvas.width = window.innerWidth;
        let Y = canvas.height = window.innerHeight;

        window.requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (cb) {
                setTimeout(cb, 17);
            };


        function drawGround() {
            ctx.beginPath();
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.rect(0, Y - Y * 0.05, X, Y - Y * -0.05);
            ctx.fill();
        }

        let snowNum = 80;
        let backSnowNum = 80;
        let snows = [];
        let backSnows = [];
        if (X < 768) {
            snowNum = 25;
            backSnowNum = 25;
        }

        function Snow(ctx, x, y, r, g) {
            this.ctx = ctx;
            this.init(x, y, r, g);
        }
        Snow.prototype.init = function (x, y, r, g) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.c = '255, 255, 255';
            this.v = {
                x: 0,
                y: g
            };
        };
        Snow.prototype.updatePosition = function () {
            this.y += this.v.y;
        };
        Snow.prototype.wrapPosition = function () {
            if (this.x - this.r > X) {
                this.x = 0;
            }
            if (this.x + this.r < 0) {
                this.x = X;
            }
            if (this.y - this.r > Y) {
                this.y = 0;
            }
            if (this.y + this.r < 0) {
                this.y = Y;
            }
        };
        Snow.prototype.draw = function () {
            ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = this.gradient();
            ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        };
        Snow.prototype.gradient = function () {
            let rgb = this.c;
            let g = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
            g.addColorStop(0.0, `rgba(${rgb}, ${(1 * 1.0)})`);
            g.addColorStop(0.5, `rgba(${rgb}, ${(1 * 0.2)})`);
            g.addColorStop(1.0, `rgba(${rgb}, ${(1 * 0.0)})`);
            return g;
        };
        Snow.prototype.resize = function () {
            this.x = rand(0, X);
            this.y = rand(0, Y);
        };
        Snow.prototype.render = function () {
            this.updatePosition();
            this.wrapPosition();
            this.draw();
        };
        for (let i = 0; i < backSnowNum; i++) {
            let snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(1, 5), Math.random());
            backSnows.push(snow);
        }
        for (let i = 0; i < snowNum; i++) {
            let snow = new Snow(ctx, rand(0, X), rand(0, Y), rand(10, 15), Math.random() + 0.3);
            snows.push(snow);
        }

        let treeNum = 30; //White trees
        let trees = [];
        let backTreeNum = 16; //Blue trees
        let backTrees = [];
        let branchRad = 30 * Math.PI / 180;
        if (X < 768) {
            treeNum = 15;
            backTreeNum = 8;
        }
        function Tree(ctx, x, y, t, w, c) {
            this.ctx = ctx;
            this.init(x, y, t, w, c);
        }
        Tree.prototype.init = function (x, y, t, w, c) {
            this.ctx = ctx;
            this.x = x; //X-coordinate
            this.y = y; //Y-coordinate
            this.t = t; //Height
            this.w = w; //Width
            this.c = c;
            this.splitNum = rand(10, 20);
            this.tSplit = this.t / this.splitNum;
            this.bSplit = this.w / this.splitNum;
        };
        Tree.prototype.draw = function () {
            ctx = this.ctx;
            ctx.lineCap = 'round';
            ctx.lineWidth = 3;
            ctx.strokeStyle = this.c;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y - this.t);
            ctx.stroke();
            ctx.lineWidth = 1;
            for (let i = 1, j = this.splitNum; i < this.splitNum; i++, j--) {
                let bX1 = this.x + this.bSplit * j;
                let bX2 = this.x - this.bSplit * j;
                let bY = this.y - (Math.tan(branchRad) * this.bSplit * j) - this.tSplit * i;
                ctx.moveTo(this.x, this.y - this.tSplit * i);
                ctx.lineTo(bX1, bY);
                ctx.stroke();
                ctx.moveTo(this.x, this.y - this.tSplit * i);
                ctx.lineTo(bX2, bY);
                ctx.stroke();
            }
        };
        Tree.prototype.resize = function (isScroll) {
            if (!isScroll) {
                this.x = rand(0, X); //Randomly fill new width if window was widened
            }
            this.y = Y - Y * 0.05;
        };
        Tree.prototype.render = function () {
            this.draw();
        };
        for (let i = 0; i < backTreeNum; i++) {
            let tree = new Tree(ctx, rand(0, X), Y - Y * 0.05, rand(100, 200), rand(25, 50), 'rgb(126, 158, 209)');
            backTrees.push(tree);
        }
        for (let i = 0; i < treeNum; i++) {
            let tree = new Tree(ctx, rand(0, X), Y - Y * 0.05, rand(100, 150), rand(15, 50), 'rgb(255, 255, 255)');
            trees.push(tree);
        }

        function render() {
            ctx.clearRect(0, 0, X, Y);
            drawGround();
            for (let i = 0; i < backSnows.length; i++) {
                backSnows[i].render();
            }
            for (let i = 0; i < backTrees.length; i++) {
                backTrees[i].render();
            }
            for (let i = 0; i < trees.length; i++) {
                trees[i].render();
            }
            for (let i = 0; i < snows.length; i++) {
                snows[i].render();
            }
            requestAnimationFrame(render);
        }
        render();

        function onResize(isScroll) {
            X = canvas.width = window.innerWidth;
            canvas.height = window.innerHeight; //Resize canvas
            Y = window.innerHeight - window.scrollY; //Resize when refreshed in the middle of the page
            drawGround();
            for (let i = 0; i < backSnows.length; i++) {
                backSnows[i].resize();
            }
            for (let i = 0; i < backTrees.length; i++) {
                backTrees[i].resize(isScroll);
            }
            for (let i = 0; i < trees.length; i++) {
                trees[i].resize(isScroll);
            }
            for (let i = 0; i < snows.length; i++) {
                snows[i].resize();
            }
        }
        window.addEventListener('resize', function () {
            onResize();
        });

        function onScroll() {
            onResize(true);
        }
        window.addEventListener('scroll', function () {
            onScroll();
        });
    });
})();
