// グローバルに展開
/*
 * メイン
 */
var TIME = 30000; // 制限時間
phina.define("MainScene", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    // グループ
    this.circleGroup = DisplayElement().addChildTo(this);
    // 経過時間
    this.time = TIME;
    // スコア
    this.score = 0;
    // タイマーラベル
    this.timerLabel = Label({
      text: (this.time / 1000).toFixed(3),
      fontSize: 48,
      fill: 'yellow',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(1.5));
    // カウントラベル
    var countLabel = Label({
      text: '',
      fontSize: 128,
      fill: 'yellow',
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    // 配置
    this.locateCircles();
    // カウントダウンスタート
    countLabel.tweener.set({text: '3', alpha: 0}).fadeIn(1000)
                      .set({text: '2', alpha: 0}).fadeIn(1000)
                      .set({text: '1', alpha: 0}).fadeIn(1000)
                      .call(function() {
                        countLabel.hide();
                        this.update = this.timer;
                        // 最初の円選択
                        this.pickupCircle();
                      }, this).play();
  },
  // 毎フレーム更新処理
  timer: function(app) {
    // 終了判定
    if (this.time < 0) {
      // リザルトシーンへ
      this.exit({
        score: this.score,
        url: 'https://alkn203.github.io/touchthecircle/'
      });
    }
    // 経過時間を差し引く
    this.time -= app.deltaTime;
    // 残り秒数表示
    this.timerLabel.text = (this.time / 1000).toFixed(3);
  },
  // 円配置
  locateCircles: function() {
    var self = this;
    var r = 250;
    // 円配置
    Array.range(0, 360, 30).each(function(deg) {
      var rad = Math.degToRad(deg);
      var x = self.gridX.center() + r * Math.cos(rad);
      var y = self.gridY.center() + r * Math.sin(rad);

      var circle = CircleShape({fill: '#7fffd4'}).addChildTo(self.circleGroup);
      circle.setPosition(x, y);
      circle.alpha = 0.25;
      // タッチイベント
      circle.onpointstart = function() {
        Wave().addChildTo(self).setPosition(circle.x, circle.y);
        circle.setInteractive(false);
        circle.alpha = 0.25;
        // スコア加算
        self.score++;
        // 次の円
        self.pickupCircle();
      };
    });
  },
  // ランダムに円選択
  pickupCircle: function() {
    var target = this.circleGroup.children.random();
    target.alpha = 1.0;
    // タッチ可能にする
    target.setInteractive(true);
  },
});

/*
 * メイン処理
 */
phina.main(function () {
  // アプリケーションを生成
  const app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
    debug: false,
    startLabel: 'Title',
    scenes: [
      {
        className: 'Title',
        label: 'Title',
        nextLabel: 'Main',
      },
      {
        className: 'MainScene',
        label: 'Main',
        nextLabel: 'Result',
      },
      {
        className: 'Result',
        label: 'Result',
        nextLabel: 'Main',
      },
    ]
  })

  app.domElement.addEventListener('touchend', function dummy() {
    const s = phina.asset.Sound();
    s.loadFromBuffer();
    s.play().stop();
    app.domElement.removeEventListener('touchend', dummy);
  });

  // 実行
  app.run()
})
