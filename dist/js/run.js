"use strict";var n=function e(t,i,a){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,a)}if("value"in s)return s.value;var n=s.get;return void 0!==n?n.call(a):void 0},h=function(){function a(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(e,t,i){return t&&a(e.prototype,t),i&&a(e,i),e}}();function m(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function y(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function v(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}!function s(o,n,h){function r(i,e){if(!n[i]){if(!o[i]){var t="function"==typeof require&&require;if(!e&&t)return t(i,!0);if(d)return d(i,!0);throw new Error("Cannot find module '"+i+"'")}var a=n[i]={exports:{}};o[i][0].call(a.exports,function(e){var t=o[i][1][e];return r(t||e)},a,a.exports,s,o,n,h)}return n[i].exports}for(var d="function"==typeof require&&require,e=0;e<h.length;e++)r(h[e]);return r}({1:[function(e,t,i){var a=e("../helper"),s=function(){function t(e){v(this,t),this.scene=e,this.color=a.intColor("#020723")}return h(t,[{key:"loadSpace",value:function(){this.dragXStart=this.scene.game.add.graphics(0,0),this.dragXEnd=this.scene.game.add.graphics(this.scene.game.width,0)}},{key:"onDragStart",value:function(e,t){this.dragXStart.clear(),this.dragXStart.beginFill(this.color,.7),this.dragXStart.moveTo(0,0),this.dragXStart.quadraticCurveTo(e+10,t,0,this.scene.game.height),this.dragXStart.endFill(),this.dragXStart.width=0,this.dragXStart.alpha=0,this.dragXEnd.clear(),this.dragXEnd.beginFill(this.color,.7),this.dragXEnd.moveTo(0,0),this.dragXEnd.quadraticCurveTo(-1*(this.scene.game.width-e+10),t,0,this.scene.game.height),this.dragXEnd.endFill(),this.dragXEnd.width=0,this.dragXEnd.alpha=0}},{key:"curveUpdateStart",value:function(e){this.dragXStart.width=Math.abs(e)*(.05*this.scene.game.width)/this.scene.game.width*(this.scene.game.screenScale/2),this.dragXStart.alpha=Math.abs(e)/this.scene.game.width}},{key:"curveUpdateEnd",value:function(e){this.dragXEnd.width=Math.abs(e)*(.05*this.scene.game.width)/this.scene.game.width*(this.scene.game.screenScale/2),this.dragXEnd.alpha=Math.abs(e)/this.scene.game.width}},{key:"resetCurve",value:function(){this.scene.game.add.tween(this.dragXStart).to({width:0,alpha:0},100,"Linear",!0),this.scene.game.add.tween(this.dragXEnd).to({width:0,alpha:0},100,"Linear",!0)}}]),t}();t.exports=s},{"../helper":7}],2:[function(e,t,i){var a=e("./scene"),s=e("../helper"),o=function(e){function t(){return v(this,t),m(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return y(t,a),h(t,[{key:"preload",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"preload",this).call(this),this.game.load.atlasJSONHash("tile","dist/image/tile.png","dist/json/tile.json"),this.game.load.atlasJSONHash("tileBase","dist/image/tileBase.png","dist/json/tileBase.json"),this.gameTile={},this.tileBaseIndex=0,this.tileLeftMargin=10*this.game.screenScale,this.leftSpace=4*this.tileLeftMargin}},{key:"initGameSpace",value:function(){this.currentScale={main:.3*this.game.screenScale,base:.45*this.game.screenScale},this.game.isMobile&&(this.currentScale.main=.25*this.game.screenScale,this.game.scale.isGameLandscape),this.gameSpace=this.game.add.graphics(0,0),this.gamePlayeSpace=this.game.add.group(),this.gamePlayeSpace.y=this.game.groundPosition,this.gameSpace.addChild(this.gamePlayeSpace)}},{key:"gameSpaceDraggable",value:function(){var i=this;this.gameSpace.beginFill(s.intColor("#000"),0),this.gameSpace.drawRect(0,0,s.limitValue(this.gamePlayeSpace.width+8*this.tileLeftMargin,this.game.width),this.game.height,50),this.gameSpace.endFill(),this.gameSpace.inputEnabled=!0,this.gameSpace.input.allowVerticalDrag=!1,this.gameSpace.input.priorityID=1,this.gameSpace.input.enableDrag(),this.gameSpace.events.onDragStart.add(function(e,t){i.dragEffect.onDragStart(t.x,t.y)}),this.gameSpace.events.onDragUpdate.add(function(){0<=i.gameSpace.x?i.dragEffect.curveUpdateStart(i.gameSpace.x):Math.abs(i.gameSpace.x)>i.gameSpace.width-i.game.width&&i.dragEffect.curveUpdateEnd(i.gameSpace.width-i.game.width-Math.abs(i.gameSpace.x))}),this.gameSpace.events.onDragStop.add(function(){i.dragEffect.resetCurve(),0<=i.gameSpace.x?i.game.add.tween(i.gameSpace).to({x:0},200,"Linear",!0):Math.abs(i.gameSpace.x)>i.gameSpace.width-i.game.width&&i.game.add.tween(i.gameSpace).to({x:-1*(i.gameSpace.width-i.game.width)},200,"Linear",!0)})}},{key:"addMainTile",value:function(e){var t=this.game.add.sprite(this.leftSpace,0,"tile",e);t.anchor.setTo(0,1),t.scale.setTo(this.currentScale.main,this.currentScale.main),t.inputEnabled=!0,t.input.pixelPerfectClick=!0,t.input.pixelPerfectOver=!0,t.input.useHandCursor=!0,t.input.priorityID=10,t.events.onInputDown.add(function(){console.log("ok")}),this.gamePlayeSpace.add(t),this.gameTile[e]=t,this.leftSpace+=t.width+this.tileLeftMargin}},{key:"addBaseTile",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"_0_12",t=this,i=this.tileBaseIndex,a=this.game.add.sprite(this.leftSpace,this.game.rnd.integerInRange(1,25)*this.game.screenScale*-1,"tileBase",e);a.anchor.setTo(0,1),a.scale.setTo(this.currentScale.base,this.currentScale.base),a.inputEnabled=!0,a.input.pixelPerfectClick=!0,a.input.pixelPerfectOver=!0,a.input.useHandCursor=!0,a.input.priorityID=10,a.events.onInputDown.add(function(){t.movePlayer(i)}),this.gamePlayeSpace.add(a),this.gameTile["tileBase"+this.tileBaseIndex]=a,this.tileBaseIndex++,this.leftSpace+=a.width+this.tileLeftMargin}},{key:"addPlayer",value:function(){this.gamePlayeSpace.add(this.game.player.bodyGroup)}},{key:"jumpPlayer",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;this.gameTile["tileBase"+e];this.game.add.tween(this.game.player.headGroup).to({rotation:.1},200,"Linear",!0),this.game.add.tween(this.game.player.leftFootGroup).to({rotation:-.2},200,"Linear",!0),this.game.add.tween(this.game.player.rightFootGroup).to({rotation:-.2},200,"Linear",!0),this.game.add.tween(this.game.player.leftFootBottom).to({rotation:.4},200,"Linear",!0),this.game.add.tween(this.game.player.rightFootBottom).to({rotation:.4},200,"Linear",!0),this.game.add.tween(this.game.player.upperBodyGroup).to({rotation:.03,y:this.game.player.upperBodyGroup.y+20},200,"Linear",!0),this.game.add.tween(this.game.player.leftHandGroup).to({rotation:.3},200,"Linear",!0),this.game.add.tween(this.game.player.rightHandGroup).to({rotation:.3},200,"Linear",!0),this.game.add.tween(this.game.player.leftHandBottom).to({rotation:-.4},200,"Linear",!0),this.game.add.tween(this.game.player.rightHandBottom).to({rotation:-.4},200,"Linear",!0);var t={x:this.game.player.bodyGroup.x+150,y:this.game.player.bodyGroup.y-80};this.game.add.tween(this.game.player.bodyGroup).to({rotation:0,x:t.x,y:t.y},300,"Linear",!0,300)}},{key:"movePlayer",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,t=this.gameTile["tileBase"+e];this.game.player.bodyGroup.x=t.x+.4*t.width,this.game.player.bodyGroup.y=t.y-.5*t.height}},{key:"create",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"create",this).call(this)}},{key:"update",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"update",this).call(this)}}]),t}();t.exports=o},{"../helper":7,"./scene":5}],3:[function(e,t,i){var r=e("../helper"),a=function(){function t(e){v(this,t),this.scene=e,this.index=0,this.notifications=[],this.toTopTween=null}return h(t,[{key:"load",value:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:5e3,a=this;if(!(3<this.notifications.length)){t=t?"#072104":"#210804",this.index+=1;var s={id:r.randId(),index:this.index},o=150*this.scene.game.screenScale,n=25*this.scene.game.screenScale,h=this.scene.padding*this.scene.game.screenScale;s.background=this.scene.game.add.graphics(0,0),s.background.alpha=0,s.margin=h,s.text=this.scene.game.make.text(0,0,e,this.scene.textStyle(10)),s.text.width>o&&(o=1.2*s.text.width),s.text.height>n&&(n=1.1*s.text.height),s.background.beginFill(r.intColor(t),1),s.background.drawRoundedRect(0,0,o,n,10),s.background.endFill(),s.background.addChild(s.text),s.text.setTextBounds(0,2*this.scene.game.screenScale,o,n),s.background.x=this.scene.game.width-o-h,s.background.y=h+(n+h)*this.notifications.length,this.notifications.push(s),this.notificationTween=this.scene.game.add.tween(s.background).to({alpha:1},400,"Linear",!0),this.notificationTween.onComplete.add(function(){setTimeout(function(){a.clear(s.id)},i)},this)}}},{key:"clear",value:function(){var i=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;clearTimeout(this.toTopTween);var s=this,o=[];this.notifications.forEach(function(e,t){0==i?e.background.destroy():e.id==i&&(o.push([e.index,e.background.height+e.margin]),e.background.destroy(),s.notifications.splice(t,1))}),0==i?this.notifications=[]:0<s.notifications.length&&this.notifications.forEach(function(i,e){var a=0;o.forEach(function(e,t){i.index>e[0]&&(a+=e[1])}),s.toTopTween=setTimeout(function(){s.scene.game.add.tween(i.background).to({y:i.background.y-a},200,"Linear",!0)},500)})}}]),t}();t.exports=a},{"../helper":7}],4:[function(e,t,i){e("../helper");var a=function(){function t(e){v(this,t),this.game=e,this.name="",this.saveCoins=0,this.activeLevel=1,this.bodyType=2,this.faceType=2,this.beardType=2,this.eyesType=1,this.optic=1,this.idleAnimate=[]}return h(t,[{key:"preload",value:function(){this.game.load.atlasJSONHash("player","dist/image/player.png","dist/json/player.json")}},{key:"create",value:function(e){this.state=e,this.bodyGroup=this.game.add.sprite(0,0,"player","group_body"),this.bodyGroup.anchor.setTo(.5,1),this.lowerBodyGroup=this.game.make.sprite(28,375,"player","group_lowerBody"),this.rightFootGroup=this.game.make.sprite(60,5,"player","group_rightFoot"),this.rightFootBottom=this.game.make.sprite(0,132,"player","body_"+this.bodyType+"_foot_right_bottom"),this.rightFootTop=this.game.make.sprite(0,0,"player","body_"+this.bodyType+"_foot_right_top"),this.leftFootGroup=this.game.make.sprite(0,0,"player","group_leftFoot"),this.leftFootBottom=this.game.make.sprite(3,142,"player","body_"+this.bodyType+"_foot_left_bottom"),this.leftFootTop=this.game.make.sprite(0,0,"player","body_"+this.bodyType+"_foot_left_top"),this.upperBodyGroup=this.game.make.sprite(0,0,"player","group_upperBody"),this.rightHandGroup=this.game.make.sprite(137,205,"player","group_rightHand"),this.rightHandBottom=this.game.make.sprite(0,104,"player","body_"+this.bodyType+"_hand_right_bottom"),this.rightHandTop=this.game.make.sprite(0,0,"player","body_"+this.bodyType+"_hand_right_top"),this.body=this.game.make.sprite(0,144,"player","body_"+this.bodyType+"_body"),this.headGroup=this.game.make.sprite(27,0,"player","group_head"),this.face=this.game.make.sprite(24,29,"player","face_"+this.faceType+"_"+this.beardType+"_"+this.eyesType),this.opticOver=this.game.make.sprite(24,29,"player","face_optic"),this.headOver=this.game.make.sprite(0,0,"player","body_"+this.bodyType+"_head_over"),this.leftHandGroup=this.game.make.sprite(0,193,"player","group_leftHand"),this.leftHandBottom=this.game.make.sprite(2,107,"player","body_"+this.bodyType+"_hand_left_bottom"),this.leftHandTop=this.game.make.sprite(0,0,"player","body_"+this.bodyType+"_hand_left_top"),this.addToParent(this.lowerBodyGroup,this.bodyGroup,72,28),this.addToParent(this.rightFootGroup,this.lowerBodyGroup,32,31),this.addToParent(this.rightFootBottom,this.rightFootGroup,30,23),this.addToParent(this.rightFootTop,this.rightFootGroup,0,0),this.addToParent(this.leftFootGroup,this.lowerBodyGroup,40,30),this.addToParent(this.leftFootBottom,this.leftFootGroup,38,23),this.addToParent(this.leftFootTop,this.leftFootGroup,0,0),this.addToParent(this.upperBodyGroup,this.bodyGroup,100,400),this.addToParent(this.rightHandGroup,this.upperBodyGroup,23,30),this.addToParent(this.rightHandBottom,this.rightHandGroup,13,18),this.addToParent(this.rightHandTop,this.rightHandGroup,0,0),this.addToParent(this.body,this.upperBodyGroup,100,261),this.addToParent(this.leftHandGroup,this.upperBodyGroup,40,27),this.addToParent(this.headGroup,this.upperBodyGroup,83,170),this.addToParent(this.face,this.headGroup,0,0),this.addToParent(this.opticOver,this.headGroup,0,0),this.addToParent(this.headOver,this.headGroup,0,0),this.addToParent(this.leftHandBottom,this.leftHandGroup,28,15),this.addToParent(this.leftHandTop,this.leftHandGroup,0,0),this.bodyGroup.scale.setTo(.16*this.game.screenScale,.16*this.game.screenScale)}},{key:"idle",value:function(){!(0<arguments.length&&void 0!==arguments[0])||arguments[0]?(this.idleAnimate.push(this.game.add.tween(this.game.player.upperBodyGroup).to({rotation:.03},700,"Linear",!0,0,-1,!0)),this.idleAnimate.push(this.game.add.tween(this.game.player.headGroup).to({rotation:.04},500,"Linear",!0,0,-1,!0)),this.idleAnimate.push(this.game.add.tween(this.game.player.rightHandBottom).to({rotation:.08},600,"Linear",!0,200,-1,!0)),this.idleAnimate.push(this.game.add.tween(this.game.player.leftHandBottom).to({rotation:.08},600,"Linear",!0,0,-1,!0))):(this.game.player.upperBodyGroup.rotation=0,this.idleAnimate.forEach(function(e,t){e.stop()}))}},{key:"addToParent",value:function(e,t,i,a){t.addChild(e),e.anchor.setTo(i/e.width,a/e.height),e.x=t.width*t.anchor.x*-1+(e.x+e.width*e.anchor.x),e.y=t.height*t.anchor.y*-1+(e.y+e.height*e.anchor.y)}},{key:"setName",value:function(e){this.name=e}},{key:"setSaveCoins",value:function(e){this.saveCoins=e}},{key:"setActiveLevel",value:function(e){this.activeLevel=e}}]),t}();t.exports=a},{"../helper":7}],5:[function(e,t,i){var a=e("./notify"),s=e("./dragEffect"),o=e("../helper"),n=function(){function t(e){v(this,t),this.game=e,this.coverCoinsUpAnimation=20,this.padding=7,this.notify=new a(this),this.dragEffect=new s(this)}return h(t,[{key:"preload",value:function(){var e=!(0<arguments.length&&void 0!==arguments[0])||arguments[0],t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],a=this;this.imgObj={},this.isPopupOpen=!1,this.saveCoins=0,this.coinAmountUpdateNeed=!1,this.game.player.saveCoins>this.coverCoinsUpAnimation&&(this.saveCoins=this.game.player.saveCoins-this.coverCoinsUpAnimation),this.stateBounds={radius:30,width:{size:this.game.world.width,one:0,two:this.game.world.width},height:{size:this.game.world.height,one:0,two:this.game.world.height}},this.notify.clear(),this.game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL,this.game.stage.backgroundColor="#000623",this.game.scale.pageAlignHorizontally=!0,this.game.scale.pageAlignVeritcally=!0,e&&(this.game.load.image("backgroundStar","dist/image/star.png"),this.game.load.image("background","dist/image/background.png"),this.game.load.image("popupFrame","dist/image/popupFrame.png"),this.game.load.image("coinBox_1","dist/image/coinBox_1.png"),this.game.load.image("coinBox_2","dist/image/coinBox_2.png"),this.game.load.image("coinWithStroke","dist/image/coinWithStroke.png"),this.game.load.atlasJSONHash("btn","dist/image/btn.png","dist/json/btn.json")),t&&this.game.player.preload(),this.game.load.onFileComplete.add(function(e,t){o.loadingProcess(e);var i=a.game.cache.getItem(t,Phaser.Cache.IMAGE);a.imgObj[t]={s:Math.round(Math.round(1/(i.base.width/i.base.height/a.game.screenScale)*100)/100/i.frameData._frames.length*100)/100,w:i.base.width,h:i.base.height},i.scale=a.imgObj[t].s})}},{key:"create",value:function(){var e=0<arguments.length&&void 0!==arguments[0]&&arguments[0];this.backGroundGradientCreator(),this.backgroundStar={},this.backgroundStar=this.game.add.tileSprite(this.game.world.centerX,0,this.game.width/(.2*this.game.screenScale),.8*this.game.height/(.2*this.game.screenScale),"backgroundStar"),this.backgroundStar.anchor.set(.5,0),this.backgroundStar.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.background=this.game.add.tileSprite(this.game.world.centerX,0,this.game.width/(.2*this.game.screenScale),this.imgObj.background.h,"background"),this.background.anchor.set(.5,1),this.background.y=.88*this.game.height,this.game.groundPosition=this.background.y-15*this.game.screenScale,this.background.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.dragEffect.loadSpace(),e?(this.addPopUpStage(),this.addPlayerSaveCoinsBox(this.game.world.centerX,this.stateBounds.height.two)):(this.addPlayerNameBox(),this.addPlayerSaveCoinsBox(this.padding*this.game.screenScale,this.playerNameBox.height+this.playerNameBox.y+this.padding*this.game.screenScale,{x:0,y:0})),this.updatePlayerSaveCoins(this.game.player.saveCoins)}},{key:"addMainBtn",value:function(){var e=this;this.shopSceneBtn=this.game.add.button(this.game.width-7*this.game.screenScale,this.game.height-7*this.game.screenScale,"btn",function(){e.startState("Shop")},null,"_01_0","_01_1","_01_0","_01_1"),this.shopSceneBtn.anchor.set(1,1),this.shopSceneBtn.input.pixelPerfectClick=!0,this.shopSceneBtn.input.pixelPerfectOver=!0,this.shopSceneBtn.input.priorityID=200,this.shopSceneBtn.scale.setTo(.4*this.game.screenScale,.4*this.game.screenScale),this.levelSceneBtn=this.game.add.button(8*this.game.screenScale,this.game.height-7*this.game.screenScale,"btn",function(){e.startState("Level")},null,"_03_0","_03_1","_03_0","_03_1"),this.levelSceneBtn.anchor.set(0,1),this.levelSceneBtn.input.pixelPerfectClick=!0,this.levelSceneBtn.input.pixelPerfectOver=!0,this.levelSceneBtn.input.priorityID=200,this.levelSceneBtn.scale.setTo(.4*this.game.screenScale,.4*this.game.screenScale)}},{key:"addPopUpStage",value:function(){this.isPopupOpen=!0,this.stateBounds.height.size=.8*this.game.world.height,this.stateBounds.height.one=.1*this.game.world.height,this.stateBounds.height.two=.9*this.game.world.height,this.stateBounds.width.size=this.stateBounds.height.size,this.stateBounds.width.one=(this.game.world.width-this.stateBounds.height.size)/2,this.stateBounds.width.two=this.stateBounds.width.one+this.stateBounds.width.size,this.game.scale.isGameLandscape?this.game.device.desktop||(this.stateBounds.width.size=.6*this.game.world.width,this.stateBounds.width.one=.2*this.game.world.width,this.stateBounds.width.two=.8*this.game.world.width):(this.stateBounds.width.size=.8*this.game.world.width,this.stateBounds.width.one=.1*this.game.world.width,this.stateBounds.width.two=.9*this.game.world.width),this.popupBackground=this.game.add.graphics(0,0),this.popupBackground.hitArea=0,this.popupBackground.beginFill(o.intColor("#010a26"),.8),this.popupBackground.moveTo(0,0),this.popupBackground.lineTo(this.game.world.width,0),this.popupBackground.lineTo(this.game.world.width,this.game.world.height),this.popupBackground.lineTo(0,this.game.world.height),this.popupBackground.lineTo(0,this.stateBounds.height.size/2),this.popupBackground.lineTo(this.stateBounds.width.one,this.stateBounds.height.size/2),this.popupBackground.lineTo(this.stateBounds.width.one,this.stateBounds.height.two-this.stateBounds.radius),this.popupBackground.quadraticCurveTo(this.stateBounds.width.one,this.stateBounds.height.two,this.stateBounds.width.one+this.stateBounds.radius,this.stateBounds.height.two),this.popupBackground.lineTo(this.stateBounds.width.two-this.stateBounds.radius,this.stateBounds.height.two),this.popupBackground.quadraticCurveTo(this.stateBounds.width.two,this.stateBounds.height.two,this.stateBounds.width.two,this.stateBounds.height.two-this.stateBounds.radius),this.popupBackground.lineTo(this.stateBounds.width.two,this.stateBounds.height.one+this.stateBounds.radius),this.popupBackground.quadraticCurveTo(this.stateBounds.width.two,this.stateBounds.height.one,this.stateBounds.width.two-this.stateBounds.radius,this.stateBounds.height.one),this.popupBackground.lineTo(this.stateBounds.width.one+this.stateBounds.radius,this.stateBounds.height.one),this.popupBackground.quadraticCurveTo(this.stateBounds.width.one,this.stateBounds.height.one,this.stateBounds.width.one,this.stateBounds.height.one+this.stateBounds.radius),this.popupBackground.lineTo(this.stateBounds.width.one,this.stateBounds.height.size/2),this.popupBackground.lineTo(0,this.stateBounds.height.size/2),this.popupBackground.endFill(),this.popupFrameTop=this.game.add.image(this.game.world.centerX,this.stateBounds.height.one-this.game.screenScale,"popupFrame"),this.popupFrameTop.anchor.set(.5,1),this.popupFrameTop.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.popupFrameBottom=this.game.add.image(this.game.world.centerX,this.stateBounds.height.two+this.game.screenScale,"popupFrame"),this.popupFrameBottom.anchor.set(.5,1),this.popupFrameBottom.angle=180,this.popupFrameBottom.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.popupFrameLeft=this.game.add.image(this.stateBounds.width.one-this.game.screenScale,this.game.world.centerY,"popupFrame"),this.popupFrameLeft.anchor.set(.5,1),this.popupFrameLeft.angle=-90,this.popupFrameLeft.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.popupFrameRight=this.game.add.image(this.stateBounds.width.two+this.game.screenScale,this.game.world.centerY,"popupFrame"),this.popupFrameRight.anchor.set(.5,1),this.popupFrameRight.angle=90,this.popupFrameRight.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.popupCoinBox=this.game.add.image(this.stateBounds.width.one,this.stateBounds.height.two,"coinBox_1"),this.popupCoinBox.anchor.set(.3,.8),this.popupCoinBox.scale.setTo(.2*this.game.screenScale,.2*this.game.screenScale),this.stateBounds.width._size=this.stateBounds.width.size,this.stateBounds.width._one=this.stateBounds.width.one,this.stateBounds.width._two=this.stateBounds.width.two,this.stateBounds.height._size=this.stateBounds.height.size,this.stateBounds.height._one=this.stateBounds.height.one,this.stateBounds.height._two=this.stateBounds.height.two,this.game.device.desktop||(this.game.scale.isGameLandscape?(this.stateBounds.width._size=this.stateBounds.height.size,this.stateBounds.width._one=(this.game.world.width-this.stateBounds.height.size)/2,this.stateBounds.width._two=this.stateBounds.width._one+this.stateBounds.width._size):(this.stateBounds.height._size=this.stateBounds.width.size,this.stateBounds.height._one=(this.game.world.height-this.stateBounds.width.size)/2,this.stateBounds.height._two=this.stateBounds.height._one+this.stateBounds.height._size))}},{key:"addPlayerNameBox",value:function(){var e=60*this.game.screenScale,t=25*this.game.screenScale,i=this.padding*this.game.screenScale;this.playerNameBox=this.game.add.graphics(0,0),this.playerNameText=this.game.make.text(0,0,this.game.player.name,this.textStyle(12)),this.playerNameText.width>e&&(e=1.2*this.playerNameText.width),this.playerNameText.height>t&&(t=1.1*this.playerNameText.height),this.playerNameBox.beginFill(o.intColor("#040a21"),1),this.playerNameBox.drawRoundedRect(0,0,e,t,10),this.playerNameBox.endFill(),this.playerNameBox.addChild(this.playerNameText),this.playerNameBox.x=i,this.playerNameBox.y=i,this.playerNameText.setTextBounds(0,2*this.game.screenScale,e,t)}},{key:"updatePlayerSaveCoins",value:function(e){!(1<arguments.length&&void 0!==arguments[1])||arguments[1]?this.saveCoins+=e:this.saveCoins-=e,this.saveCoinsText&&(this.coinAmountUpdateNeed=!0)}},{key:"addPlayerSaveCoinsBox",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{x:.5,y:.5},a=this.padding*this.game.screenScale;this.saveCoinsBox=this.game.add.graphics(0,0),this.saveCoinsBox.anchor.set(i.x,i.y),this.coinAmountImage=this.game.make.image(0,0,"coinWithStroke"),this.coinAmountImage.anchor.set(.5,.5),this.saveCoinsBox.addChild(this.coinAmountImage),this.saveCoinsText=this.game.make.text(0,0,this.saveCoins,this.textStyle(10)),this.saveCoinsBox.beginFill(o.intColor("#040a21"),1),this.saveCoinsBox.drawRoundedRect(0,0,this.saveCoinsText.width+4*a,this.saveCoinsText.height+1.7*a,10),this.saveCoinsBox.endFill(),this.saveCoinsText.setTextBounds(0,2*this.game.screenScale,this.saveCoinsBox.width,.95*this.saveCoinsBox.height),this.saveCoinsBox.addChild(this.saveCoinsText),this.saveCoinsBox.x=e-this.saveCoinsBox.width*i.x,this.saveCoinsBox.y=t-this.saveCoinsBox.height*i.y,this.coinAmountImage.x=.5*this.saveCoinsBox.width,this.coinAmountImage.y=this.saveCoinsBox.height,this.coinAmountImage.scale.setTo(.3*this.game.screenScale,.3*this.game.screenScale)}},{key:"backGroundGradientCreator",value:function(){var e=this.game.add.bitmapData(this.game.width,this.game.height),t=e.context.createLinearGradient(0,0,0,this.game.height);t.addColorStop(0,"#020723"),t.addColorStop(.48,"#1d58aa"),t.addColorStop(.56,"#1d58aa"),t.addColorStop(.8,"#0d337b"),t.addColorStop(1,"#000623"),e.context.fillStyle=t,e.context.fillRect(0,0,this.game.width,this.game.height),this.backgroundGradient=this.game.add.sprite(0,0,e),this.backgroundGradient.fixedToCamera=!0}},{key:"startFullScreen",value:function(){this.game.scale.fullScreenScaleMode=Phaser.ScaleManager.SHOW_ALL,!this.game.scale.isFullScreen&&this.game.scale.isGameLandscape&&this.game.scale.startFullScreen(!1)}},{key:"startState",value:function(e){if(this.game.state.current!==e){o.domObject("loading",!0,"display",!1);var t=this;setTimeout(function(){t.game.state.start(e)},500)}}},{key:"showState",value:function(){(!(0<arguments.length&&void 0!==arguments[0])||arguments[0])&&this.addMainBtn(),o.domObject("loading",!1,"display",!1),o.domObject("game",!0)}},{key:"textStyle",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:20;return{fill:1<arguments.length&&void 0!==arguments[1]?arguments[1]:"#fff",font:e*this.game.screenScale+"px gameWebFont",boundsAlignH:"center",boundsAlignV:"middle"}}},{key:"coinsValueUpdate",value:function(){if(this.coinAmountUpdateNeed){var e=Number(this.saveCoinsText.text);e<this.game.player.saveCoins?this.saveCoinsText.setText(e+1):e>this.game.player.saveCoins?this.saveCoinsText.setText(e-1):this.coinAmountUpdateNeed=!1}}},{key:"update",value:function(){this.backgroundStar.tilePosition.y-=1,this.backgroundStar.tilePosition.x+=1,this.background.tilePosition.x-=.8,this.coinsValueUpdate()}}]),t}();t.exports=n},{"../helper":7,"./dragEffect":1,"./notify":3}],6:[function(e,t,i){var d=e("./class/player"),l=e("./scene/boot"),c=e("./scene/shop"),p=e("./scene/level"),g=e("./scene/level/level_1"),u=e("./helper"),s=(window.devicePixelRatio,new NoSleep),o=void 0,n=function(e){function r(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.innerWidth,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.innerHeight;v(this,r);var i=u.screenObject(e,t),a=m(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,{width:i.width,height:i.height,renderer:Phaser.AUTO,parent:"game",transparent:!0,antialias:!0}));a.isMobile=u.isMobile(),a.screenScale=i.scale,a.pixelRatio=1+(window.devicePixelRatio-1)/2,a.groundPosition=0,a.player=new d(a),a.player.setName("امیر رضا"),a.player.setSaveCoins(50),a.player.setActiveLevel(1);var s=new l(a),o=new c(a),n=new p(a),h=new g(a);return a.state.add("Boot",s,!1),a.state.add("Shop",o,!1),a.state.add("Level",n,!1),a.state.add("Level_1",h,!1),a}return y(r,Phaser.Game),r}();window.addEventListener("load",function(){var e=window.innerWidth,t=window.innerHeight,i=new n(e,t);WebFont.load({active:function(){i.state.start("Level_1")},custom:{families:["gameWebFont"],urls:["/dist/css/font.css"]}});var a=function(){u.domObject("loading",!0,"display",!1),u.domObject("game",!1,"visibility",!1),clearTimeout(o),o=setTimeout(function(){var e=u.screenObject();i.screenScale=e.scale,i.scale.setGameSize(e.width,e.height),i.scale.refresh(),i.state.restart(!0,!1),u.domObject("game",!0),u.domObject("loading",!1,"display",!1)},500)};window.addEventListener("orientationchange",a),window.addEventListener("resize",a),window.addEventListener("contextmenu",function(e){e.preventDefault()}),window.addEventListener("click",function e(){s.enable(),window.removeEventListener("click",e,!1)},!1)})},{"./class/player":4,"./helper":7,"./scene/boot":8,"./scene/level":9,"./scene/level/level_1":10,"./scene/shop":11}],7:[function(e,t,i){var n={getWithId:function(e){return document.getElementById(e)},domObject:function(e){var t=!(1<arguments.length&&void 0!==arguments[1])||arguments[1],i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:"visibility",a=!(3<arguments.length&&void 0!==arguments[3])||arguments[3];"loading"==e&&(n.getWithId("load").innerText="");var s=n.getWithId(e),o={display:"none",visibility:"hidden"};t&&(o={display:"block",visibility:"visible"}),a?(t?(s.style.opacity=0,s.style[i]=o[i],this.addClass(s,"fadeIn")):this.addClass(s,"fadeOut"),s.addEventListener("webkitAnimationEnd",function(){n.endOfFadeAnimation(s,t,i)}),s.addEventListener("animationend",function(){n.endOfFadeAnimation(s,t,i)})):s.style[i]=o[i]},endOfFadeAnimation:function(e,t,i){t?(e.style.opacity=1,this.removeClass(e,"fadeIn")):(e.style.opacity=0,"visibility"==i?e.style.visibility="hidden":e.style.display="none",this.removeClass(e,"fadeOut"))},removeClass:function(e,t){return e.classList.remove(t),e},addClass:function(e,t){return e.classList.add(t),e},intColor:function(e){return Phaser.Color.hexToColor(e).color},randId:function(){return(new Date).getTime().toString(36).substr(-3)+Math.random().toString(36).substr(-3)},isMobile:function(){var e=navigator.userAgent||navigator.vendor||window.opera;return!(!/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)&&!/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4)))},screenObject:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:window.innerWidth,t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:window.innerHeight,i=window.devicePixelRatio,a=e*i,s=t*i,o=1024/.9;return n.isMobile()&&(o*=.7),{width:a,height:s,scale:Math.floor(Math.sqrt(Math.pow(a,2)+Math.pow(s,2)))/o}},loadingProcess:function(e){n.getWithId("load").innerText=Math.floor(e-100*Math.random()/10)},limitValue:function(e){var t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null,i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;return null!=t&&e<t?t:null!=i&&i<e?i:e}};t.exports=n},{}],8:[function(e,t,i){var a=e("../class/scene"),s=(e("../helper"),function(e){function t(){return v(this,t),m(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return y(t,a),h(t,[{key:"preload",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"preload",this).call(this),this.game.load.audio("background",["dist/audio/background.mp3","dist/audio/background.ogg"])}},{key:"create",value:function(){this.backgroundAudio||(this.backgroundAudio=this.game.add.audio("background",.5,!0)),n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"create",this).call(this,!1),this.text=this.game.add.text(this.game.world.centerX,this.game.world.centerY,"بوت",this.textStyle(20)),this.text.anchor.set(.5,.5),this.showState()}},{key:"update",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"update",this).call(this)}}]),t}());t.exports=s},{"../class/scene":5,"../helper":7}],9:[function(e,t,i){var a=e("../class/scene"),s=(e("../helper"),function(e){function i(){return v(this,i),m(this,(i.__proto__||Object.getPrototypeOf(i)).apply(this,arguments))}return y(i,a),h(i,[{key:"preload",value:function(){n(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"preload",this).call(this),this.game.load.atlasJSONHash("tile","dist/image/tile.png","dist/json/tile.json")}},{key:"create",value:function(){n(i.prototype.__proto__||Object.getPrototypeOf(i.prototype),"create",this).call(this,!0),this.frameGroup=this.game.add.group(),this.levelFrame={},this.levelImage={},this.levelLock={};var e=25*this.game.screenScale;this.game.isMobile&&(e=10*this.game.screenScale,this.game.scale.isGameLandscape&&(e=7*this.game.screenScale)),this.frameGroup._width=this.stateBounds.width._size-2*e*this.game.screenScale,this.frameGroup._height=this.stateBounds.height._size-2*e*this.game.screenScale,this.frameGroup.x=this.stateBounds.width._one+e*this.game.screenScale,this.frameGroup.y=this.stateBounds.height._one+e*this.game.screenScale;for(var t=1;t<=9;t++)this.addLevelItem(t);this.showState(!1)}},{key:"addLevelItem",value:function(e){var t=!1;this.currentScale=.22*this.game.screenScale;this.game.isMobile&&(this.game.scale.isGameLandscape?this.currentScale=.16*this.game.screenScale:this.currentScale=.2*this.game.screenScale),e<=this.game.player.activeLevel&&(t=!0);var i=e%3==0?2:e%3-1,a=Math.ceil(e/3)-1,s={width:.3*this.frameGroup._width,height:.3*this.frameGroup._height,x:i*(.05*this.frameGroup._width)+i*(.3*this.frameGroup._width),y:a*(.05*this.frameGroup._height)+a*(.3*this.frameGroup._height)};if(this.levelFrame[e]=new Phaser.Rectangle(s.x,s.y,s.width,s.height),this.levelImage[e]=this.game.add.sprite(0,0,"tile","_"+e+"_00"),this.levelImage[e].anchor.setTo(.5,1),this.levelImage[e].scale.setTo(this.currentScale,this.currentScale),this.levelImage[e].alignIn(this.levelFrame[e],Phaser.BOTTOM_CENTER),this.levelImage[e].inputEnabled=!0,this.levelImage[e].input.pixelPerfectClick=!0,this.levelImage[e].input.pixelPerfectOver=!0,this.levelImage[e].input.useHandCursor=!0,this.frameGroup.add(this.levelImage[e]),t)this.levelImage[e].events.onInputDown.add(this.startState.bind(this,"Level_"+e),this),e==this.game.player.activeLevel?this.game.add.tween(this.levelImage[e].scale).to({x:this.currentScale+.025*this.currentScale,y:this.currentScale+.025*this.currentScale},200,"Linear",!0).loop(!0):this.levelImage[e].alpha=.7;else{this.levelImage[e].alpha=.7;var o="_05_1";e%2==0&&(o="_06_1"),this.levelLock[e]=this.game.add.image(0,0,"btn",o),this.levelLock[e].anchor.set(.5,.5),this.levelLock[e].scale.setTo(this.currentScale,this.currentScale),this.levelLock[e].alignIn(this.levelImage[e],Phaser.CENTER,10*this.currentScale,40*this.currentScale),this.frameGroup.add(this.levelLock[e]),this.levelImage[e].events.onInputDown.add(this.alertInactiveLevel,this)}}},{key:"alertInactiveLevel",value:function(){this.notify.load("شما مجوز ورود به این مرحله را ندارید!",!1)}}]),i}());t.exports=s},{"../class/scene":5,"../helper":7}],10:[function(e,t,i){var a=e("../../class/level"),s=(e("../../helper"),function(e){function t(){return v(this,t),m(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return y(t,a),h(t,[{key:"preload",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"preload",this).call(this)}},{key:"create",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"create",this).call(this),this.game.player.create(this),this.game.player.idle(),this.initGameSpace(),this.addBaseTile(),this.addBaseTile(),this.addBaseTile(),this.addMainTile("_1_00"),this.addBaseTile(),this.addBaseTile(),this.addMainTile("_2_00"),this.addPlayer(),this.movePlayer(),this.gameSpaceDraggable(),this.showState()}},{key:"update",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"update",this).call(this)}}]),t}());t.exports=s},{"../../class/level":2,"../../helper":7}],11:[function(e,t,i){var a=e("../class/scene"),s=(e("../helper"),function(e){function t(){return v(this,t),m(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return y(t,a),h(t,[{key:"preload",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"preload",this).call(this)}},{key:"create",value:function(){n(t.prototype.__proto__||Object.getPrototypeOf(t.prototype),"create",this).call(this),this.text=this.game.add.text(this.game.world.centerX,this.game.world.centerY,"فروشگاه",this.textStyle(20)),this.text.anchor.set(.5,.5),this.showState()}}]),t}());t.exports=s},{"../class/scene":5,"../helper":7}]},{},[6]);