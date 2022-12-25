phina.define("Result", {
  superClass: 'DisplayScene',
  init: function(params) {
    // 親クラス初期化
    this.superInit(params);

    // 背景
    this.backgroundColor = "#000000";

    // 評価テキスト
    Label({
      text: 'EVALUATE',
      fontSize: 24,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(7));

    // 評価
    Label({
      text: 'SCORE：' + params.score,
      fontSize: 48,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(4));

    let result = ''
    if (params.score <= 5) {
      result = '🙀'
    } else if (params.score > 5 && params.score <= 10) {
      result = '😑💤'
    } else if (params.score > 10 && params.score <= 15) {
      result = '😯'
    } else if (params.score > 15 && params.score <= 20) {
      result = '😀👍'
    } else if (params.score > 25 && params.score <= 30) {
      result = '😏💯'
    } else if (params.score > 35 && params.score <= 40) {
      result = '👑 '
    } else if (params.score > 45 && params.score <= 50) {
      result = '💖💋'
    } else if (params.score > 50) {
      result = '👽🚀'
    }

    // ラベル
    Label({
      text: result,
      fontSize: 64,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());


    const play = Button({text: "PLAY", fontFamily: "PixelMplus10", fill: '#000000'})
      .setPosition(this.gridX.center(), this.gridY.span(12))
      .addChildTo(this)
      .on('push', ()=> {
        this.exit()
      });

  }
});

