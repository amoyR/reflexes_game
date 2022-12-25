phina.define("Title", {
  superClass: 'DisplayScene',
  init: function() {
    // 親クラス初期化
    this.superInit();

    // 背景
    //Sprite('background').addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    this.backgroundColor = "#000000";

    // ラベル
    Label({
      text: 'REFLEXES GAME',
      fontSize: 90,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    //Sprite('titleCow', 256, 256).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    var touchLabel = Label({
      text: 'START',
      fontSize: 32,
      fill: '#ffffff',
      fontFamily: "PixelMplus10",
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.span(12));

    touchLabel.tweener.clear()
      .setLoop(true)
      .to({alpha: 0}, 700)
      .to({alpha: 1}, 700)
  },

  // タッチで次のシーンへ
  onpointstart: function() {
    SoundManager.playMusic('bgm');
    this.exit();
  },
});
