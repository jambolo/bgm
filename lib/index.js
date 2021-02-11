(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var BGMGameScene, BGMHudScene, DRAG_THRESHOLD_PIXELS, init;

DRAG_THRESHOLD_PIXELS = 16;

BGMGameScene = class BGMGameScene extends Phaser.Scene {
  constructor() {
    var i, j, k, l, ref, ref1;
    super();
    Phaser.Scene.call(this, {
      key: 'game',
      active: true
    });
    this.dragAccumulator = null;
    this.dragged = false;
    this.width = 60;
    this.height = 30;
    this.grid = new Array(this.width);
    for (i = k = 0, ref = this.width; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      this.grid[i] = new Array(this.height);
      for (j = l = 0, ref1 = this.height; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        this.grid[i][j] = {
          bomb: false,
          sprite: null
        };
      }
    }
  }

  preload() {
    this.load.image('blank', 'images/blank.gif');
    this.load.image('flag', 'images/bombflagged.gif');
    return this.load.plugin('rexpinchplugin', 'lib/rexpinchplugin.min.js', true);
  }

  create() {
    var camera, i, j, k, l, pinch, ref, ref1;
    for (i = k = 0, ref = this.width; (0 <= ref ? k < ref : k > ref); i = 0 <= ref ? ++k : --k) {
      for (j = l = 0, ref1 = this.height; (0 <= ref1 ? l < ref1 : l > ref1); j = 0 <= ref1 ? ++l : --l) {
        this.grid[i][j].sprite = this.add.image(i * 16, j * 16, 'blank');
        this.grid[i][j].sprite.setOrigin(0, 0);
      }
    }
    camera = this.cameras.main;
    pinch = this.plugins.get('rexpinchplugin').add(this);
    // This is really the "pinch" threshold
    // pinch.setDragThreshold(50)
    pinch.on('drag1start', () => {
      return this.dragAccumulator = new Phaser.Math.Vector2(0, 0);
    });
    pinch.on('drag1end', () => {
      var x, y;
      if (!this.dragged) {
        x = this.game.input.activePointer.worldX;
        y = this.game.input.activePointer.worldY;
        this.tap(x, y);
      }
      return this.dragged = false;
    });
    pinch.on('drag1', (pinch) => {
      if (this.dragAccumulator != null) {
        this.dragAccumulator.add(pinch.drag1Vector);
        if (this.dragAccumulator.length() > DRAG_THRESHOLD_PIXELS) {
          camera.scrollX -= this.dragAccumulator.x / camera.zoom;
          camera.scrollY -= this.dragAccumulator.y / camera.zoom;
          this.dragAccumulator = null;
          return this.dragged = true;
        }
      } else {
        camera.scrollX -= pinch.drag1Vector.x / camera.zoom;
        camera.scrollY -= pinch.drag1Vector.y / camera.zoom;
        return this.dragged = true;
      }
    });
    return pinch.on('pinch', (pinch) => {
      var scaleFactor;
      scaleFactor = pinch.scaleFactor;
      camera.zoom *= scaleFactor;
      this.dragAccumulator = null;
      return this.dragged = true;
    });
  }

  tap(worldX, worldY) {
    var hud, x, y;
    hud = this.scene.get('hud');
    hud.debugText.text = `Tapped: ${worldX.toFixed(1)} ${worldY.toFixed(1)}`;
    if ((worldX >= 0) && (worldX < (this.width * 16)) && (worldY >= 0) && (worldY < (this.height * 16))) {
      x = Math.floor(worldX / 16);
      y = Math.floor(worldY / 16);
      this.grid[x][y].bomb = !this.grid[x][y].bomb;
      if (this.grid[x][y].bomb) {
        return this.grid[x][y].sprite.setTexture('flag');
      } else {
        return this.grid[x][y].sprite.setTexture('blank');
      }
    }
  }

  update() {}

};

BGMHudScene = class BGMHudScene extends Phaser.Scene {
  constructor() {
    super();
    Phaser.Scene.call(this, {
      key: 'hud',
      active: true
    });
  }

  preload() {}

  create() {
    return this.debugText = this.add.text(0, 0, 'Tap somewhere!');
  }

};

init = function() {
  var config, game;
  console.log("Bad Guy Minesweeper: init()");
  config = {
    type: Phaser.AUTO,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
    backgroundColor: '#2d2d2d',
    parent: 'screen',
    scene: [BGMGameScene, BGMHudScene]
  };
  return game = new Phaser.Game(config);
};

window.addEventListener('load', function(e) {
  return init();
}, false);


},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvbWFpbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxJQUFBLFlBQUEsRUFBQSxXQUFBLEVBQUEscUJBQUEsRUFBQTs7QUFBQSxxQkFBQSxHQUF3Qjs7QUFFbEIsZUFBTixNQUFBLGFBQUEsUUFBMkIsTUFBTSxDQUFDLE1BQWxDO0VBQ0UsV0FBYSxDQUFBLENBQUE7QUFDZixRQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7U0FBSSxDQUFBO0lBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFiLENBQWtCLElBQWxCLEVBQXdCO01BQUUsR0FBQSxFQUFLLE1BQVA7TUFBZSxNQUFBLEVBQVE7SUFBdkIsQ0FBeEI7SUFFQSxJQUFDLENBQUEsZUFBRCxHQUFtQjtJQUNuQixJQUFDLENBQUEsT0FBRCxHQUFXO0lBRVgsSUFBQyxDQUFBLEtBQUQsR0FBUztJQUNULElBQUMsQ0FBQSxNQUFELEdBQVU7SUFFVixJQUFDLENBQUEsSUFBRCxHQUFRLElBQUksS0FBSixDQUFVLElBQUMsQ0FBQSxLQUFYO0lBQ1IsS0FBUyxxRkFBVDtNQUNFLElBQUMsQ0FBQSxJQUFJLENBQUMsQ0FBRCxDQUFMLEdBQVcsSUFBSSxLQUFKLENBQVUsSUFBQyxDQUFBLE1BQVg7TUFDWCxLQUFTLDJGQUFUO1FBQ0UsSUFBQyxDQUFBLElBQUksQ0FBQyxDQUFELENBQUcsQ0FBQyxDQUFELENBQVIsR0FDRTtVQUFBLElBQUEsRUFBTSxLQUFOO1VBQ0EsTUFBQSxFQUFRO1FBRFI7TUFGSjtJQUZGO0VBWFc7O0VBa0JiLE9BQVMsQ0FBQSxDQUFBO0lBQ1AsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFOLENBQVksT0FBWixFQUFxQixrQkFBckI7SUFDQSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sQ0FBWSxNQUFaLEVBQW9CLHdCQUFwQjtXQUVB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T0FKRjs7RUFKRzs7RUFjTCxNQUFRLENBQUEsQ0FBQSxFQUFBOztBQTdFVjs7QUErRU0sY0FBTixNQUFBLFlBQUEsUUFBMEIsTUFBTSxDQUFDLE1BQWpDO0VBQ0UsV0FBYSxDQUFBLENBQUE7U0FDWCxDQUFBO0lBQ0EsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFiLENBQWtCLElBQWxCLEVBQXdCO01BQUUsR0FBQSxFQUFLLEtBQVA7TUFBYyxNQUFBLEVBQVE7SUFBdEIsQ0FBeEI7RUFGVzs7RUFJYixPQUFTLENBQUEsQ0FBQSxFQUFBOztFQUVULE1BQVEsQ0FBQSxDQUFBO1dBQ04sSUFBQyxDQUFBLFNBQUQsR0FBYSxJQUFDLENBQUEsR0FBRyxDQUFDLElBQUwsQ0FBVSxDQUFWLEVBQWEsQ0FBYixFQUFnQixnQkFBaEI7RUFEUDs7QUFQVjs7QUFVQSxJQUFBLEdBQU8sUUFBQSxDQUFBLENBQUE7QUFDUCxNQUFBLE1BQUEsRUFBQTtFQUFFLE9BQU8sQ0FBQyxHQUFSLENBQVksNkJBQVo7RUFFQSxNQUFBLEdBQ0U7SUFBQSxJQUFBLEVBQU0sTUFBTSxDQUFDLElBQWI7SUFDQSxLQUFBLEVBQU8sUUFBUSxDQUFDLGVBQWUsQ0FBQyxXQURoQztJQUVBLE1BQUEsRUFBUSxRQUFRLENBQUMsZUFBZSxDQUFDLFlBRmpDO0lBR0EsZUFBQSxFQUFpQixTQUhqQjtJQUlBLE1BQUEsRUFBUSxRQUpSO0lBS0EsS0FBQSxFQUFPLENBQ0wsWUFESyxFQUVMLFdBRks7RUFMUDtTQVVGLElBQUEsR0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFYLENBQWdCLE1BQWhCO0FBZEY7O0FBaUJQLE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixNQUF4QixFQUFnQyxRQUFBLENBQUMsQ0FBRCxDQUFBO1NBQzVCLElBQUEsQ0FBQTtBQUQ0QixDQUFoQyxFQUVFLEtBRkYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJEUkFHX1RIUkVTSE9MRF9QSVhFTFMgPSAxNlxyXG5cclxuY2xhc3MgQkdNR2FtZVNjZW5lIGV4dGVuZHMgUGhhc2VyLlNjZW5lXHJcbiAgY29uc3RydWN0b3I6IC0+XHJcbiAgICBzdXBlcigpXHJcbiAgICBQaGFzZXIuU2NlbmUuY2FsbCh0aGlzLCB7IGtleTogJ2dhbWUnLCBhY3RpdmU6IHRydWUgfSk7XHJcblxyXG4gICAgQGRyYWdBY2N1bXVsYXRvciA9IG51bGxcclxuICAgIEBkcmFnZ2VkID0gZmFsc2VcclxuXHJcbiAgICBAd2lkdGggPSA2MFxyXG4gICAgQGhlaWdodCA9IDMwXHJcblxyXG4gICAgQGdyaWQgPSBuZXcgQXJyYXkoQHdpZHRoKVxyXG4gICAgZm9yIGkgaW4gWzAuLi5Ad2lkdGhdXHJcbiAgICAgIEBncmlkW2ldID0gbmV3IEFycmF5KEBoZWlnaHQpXHJcbiAgICAgIGZvciBqIGluIFswLi4uQGhlaWdodF1cclxuICAgICAgICBAZ3JpZFtpXVtqXSA9XHJcbiAgICAgICAgICBib21iOiBmYWxzZVxyXG4gICAgICAgICAgc3ByaXRlOiBudWxsXHJcblxyXG4gIHByZWxvYWQ6IC0+XHJcbiAgICBAbG9hZC5pbWFnZSgnYmxhbmsnLCAnaW1hZ2VzL2JsYW5rLmdpZicpXHJcbiAgICBAbG9hZC5pbWFnZSgnZmxhZycsICdpbWFnZXMvYm9tYmZsYWdnZWQuZ2lmJylcclxuXHJcbiAgICBAbG9hZC5wbHVnaW4oJ3JleHBpbmNocGx1Z2luJywgJ2xpYi9yZXhwaW5jaHBsdWdpbi5taW4uanMnLCB0cnVlKVxyXG5cclxuICBjcmVhdGU6IC0+XHJcbiAgICBmb3IgaSBpbiBbMC4uLkB3aWR0aF1cclxuICAgICAgZm9yIGogaW4gWzAuLi5AaGVpZ2h0XVxyXG4gICAgICAgIEBncmlkW2ldW2pdLnNwcml0ZSA9IEBhZGQuaW1hZ2UoaSAqIDE2LCBqICogMTYsICdibGFuaycpXHJcbiAgICAgICAgQGdyaWRbaV1bal0uc3ByaXRlLnNldE9yaWdpbigwLCAwKVxyXG5cclxuICAgIGNhbWVyYSA9IEBjYW1lcmFzLm1haW5cclxuICAgIHBpbmNoID0gQHBsdWdpbnMuZ2V0KCdyZXhwaW5jaHBsdWdpbicpLmFkZCh0aGlzKVxyXG5cclxuICAgICMgVGhpcyBpcyByZWFsbHkgdGhlIFwicGluY2hcIiB0aHJlc2hvbGRcclxuICAgICMgcGluY2guc2V0RHJhZ1RocmVzaG9sZCg1MClcclxuXHJcbiAgICBwaW5jaC5vbiAnZHJhZzFzdGFydCcsID0+XHJcbiAgICAgIEBkcmFnQWNjdW11bGF0b3IgPSBuZXcgUGhhc2VyLk1hdGguVmVjdG9yMigwLCAwKVxyXG4gICAgcGluY2gub24gJ2RyYWcxZW5kJywgPT5cclxuICAgICAgaWYgbm90IEBkcmFnZ2VkXHJcbiAgICAgICAgeCA9IEBnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIud29ybGRYXHJcbiAgICAgICAgeSA9IEBnYW1lLmlucHV0LmFjdGl2ZVBvaW50ZXIud29ybGRZXHJcbiAgICAgICAgQHRhcCh4LCB5KVxyXG4gICAgICBAZHJhZ2dlZCA9IGZhbHNlXHJcbiAgICBwaW5jaC5vbiAnZHJhZzEnLCAocGluY2gpID0+XHJcbiAgICAgIGlmIEBkcmFnQWNjdW11bGF0b3I/XHJcbiAgICAgICAgQGRyYWdBY2N1bXVsYXRvci5hZGQocGluY2guZHJhZzFWZWN0b3IpXHJcbiAgICAgICAgaWYgQGRyYWdBY2N1bXVsYXRvci5sZW5ndGgoKSA+IERSQUdfVEhSRVNIT0xEX1BJWEVMU1xyXG4gICAgICAgICAgY2FtZXJhLnNjcm9sbFggLT0gQGRyYWdBY2N1bXVsYXRvci54IC8gY2FtZXJhLnpvb21cclxuICAgICAgICAgIGNhbWVyYS5zY3JvbGxZIC09IEBkcmFnQWNjdW11bGF0b3IueSAvIGNhbWVyYS56b29tXHJcbiAgICAgICAgICBAZHJhZ0FjY3VtdWxhdG9yID0gbnVsbFxyXG4gICAgICAgICAgQGRyYWdnZWQgPSB0cnVlXHJcbiAgICAgIGVsc2VcclxuICAgICAgICBjYW1lcmEuc2Nyb2xsWCAtPSBwaW5jaC5kcmFnMVZlY3Rvci54IC8gY2FtZXJhLnpvb21cclxuICAgICAgICBjYW1lcmEuc2Nyb2xsWSAtPSBwaW5jaC5kcmFnMVZlY3Rvci55IC8gY2FtZXJhLnpvb21cclxuICAgICAgICBAZHJhZ2dlZCA9IHRydWVcclxuICAgIHBpbmNoLm9uICdwaW5jaCcsIChwaW5jaCkgPT5cclxuICAgICAgc2NhbGVGYWN0b3IgPSBwaW5jaC5zY2FsZUZhY3RvclxyXG4gICAgICBjYW1lcmEuem9vbSAqPSBzY2FsZUZhY3RvclxyXG4gICAgICBAZHJhZ0FjY3VtdWxhdG9yID0gbnVsbFxyXG4gICAgICBAZHJhZ2dlZCA9IHRydWVcclxuXHJcbiAgdGFwOiAod29ybGRYLCB3b3JsZFkpIC0+XHJcbiAgICBodWQgPSB0aGlzLnNjZW5lLmdldCgnaHVkJylcclxuICAgIGh1ZC5kZWJ1Z1RleHQudGV4dCA9IFwiVGFwcGVkOiAje3dvcmxkWC50b0ZpeGVkKDEpfSAje3dvcmxkWS50b0ZpeGVkKDEpfVwiXHJcblxyXG4gICAgaWYgKHdvcmxkWCA+PSAwKSBhbmQgKHdvcmxkWCA8IChAd2lkdGggKiAxNikpIGFuZCAod29ybGRZID49IDApIGFuZCAod29ybGRZIDwgKEBoZWlnaHQgKiAxNikpXHJcbiAgICAgIHggPSBNYXRoLmZsb29yKHdvcmxkWCAvIDE2KVxyXG4gICAgICB5ID0gTWF0aC5mbG9vcih3b3JsZFkgLyAxNilcclxuICAgICAgQGdyaWRbeF1beV0uYm9tYiA9ICFAZ3JpZFt4XVt5XS5ib21iXHJcbiAgICAgIGlmIEBncmlkW3hdW3ldLmJvbWJcclxuICAgICAgICBAZ3JpZFt4XVt5XS5zcHJpdGUuc2V0VGV4dHVyZSgnZmxhZycpXHJcbiAgICAgIGVsc2VcclxuICAgICAgICBAZ3JpZFt4XVt5XS5zcHJpdGUuc2V0VGV4dHVyZSgnYmxhbmsnKVxyXG5cclxuXHJcbiAgdXBkYXRlOiAtPlxyXG5cclxuY2xhc3MgQkdNSHVkU2NlbmUgZXh0ZW5kcyBQaGFzZXIuU2NlbmVcclxuICBjb25zdHJ1Y3RvcjogLT5cclxuICAgIHN1cGVyKClcclxuICAgIFBoYXNlci5TY2VuZS5jYWxsKHRoaXMsIHsga2V5OiAnaHVkJywgYWN0aXZlOiB0cnVlIH0pO1xyXG5cclxuICBwcmVsb2FkOiAtPlxyXG5cclxuICBjcmVhdGU6IC0+XHJcbiAgICBAZGVidWdUZXh0ID0gQGFkZC50ZXh0KDAsIDAsICdUYXAgc29tZXdoZXJlIScpXHJcblxyXG5pbml0ID0gLT5cclxuICBjb25zb2xlLmxvZyBcIkJhZCBHdXkgTWluZXN3ZWVwZXI6IGluaXQoKVwiXHJcblxyXG4gIGNvbmZpZyA9XHJcbiAgICB0eXBlOiBQaGFzZXIuQVVUT1xyXG4gICAgd2lkdGg6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgaGVpZ2h0OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XHJcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMmQyZDJkJ1xyXG4gICAgcGFyZW50OiAnc2NyZWVuJ1xyXG4gICAgc2NlbmU6IFtcclxuICAgICAgQkdNR2FtZVNjZW5lXHJcbiAgICAgIEJHTUh1ZFNjZW5lXHJcbiAgICBdXHJcblxyXG4gIGdhbWUgPSBuZXcgUGhhc2VyLkdhbWUoY29uZmlnKVxyXG5cclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGUpIC0+XHJcbiAgICBpbml0KClcclxuLCBmYWxzZSlcclxuIl19