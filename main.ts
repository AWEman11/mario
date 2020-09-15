scene.setBackgroundColor(9)
effects.clouds.startScreenEffect()
info.setLife(3)
game.splash("Press A to Boost up")
//  Make character
let Jetboy = sprites.create(img`
    . . . 5 5 5 5 5 5 5 5 5 5 5 . .
    . . . d d d d d d d d 5 5 5 5 .
    . . . d d f d d d d f d d . . .
    . . . d d f d d d d f d d . . .
    . . . d d d d d d d d d d . . .
    . . . d d d f d d f d d d . . .
    . . . d d d d f f d d d d . . .
    . b b 8 8 d d d d d 8 8 . . . .
    b b b d d 8 8 8 8 8 d d . . . .
    f f f d d 8 8 8 8 8 d d . . . .
    f f f d d 8 8 8 8 8 d d . . . .
    b b b d d 8 8 8 8 8 d d . . . .
    5 2 2 5 8 8 8 8 8 8 8 8 . . . .
    2 5 5 5 . a a . . . a a . . . .
    5 2 5 2 . a a . . . a a . . . .
    2 5 2 5 f f f . . . f f f . . .
`)
Jetboy.setKind(SpriteKind.Player)
Jetboy.ay = 190
Jetboy.x = 40
controller.A.onEvent(ControllerButtonEvent.Pressed, function flap() {
    Jetboy.setVelocity(0, -100)
    Jetboy.startEffect(effects.fire, 175)
    music.baDing.play()
})
game.onUpdateInterval(1500, function on_update_interval() {
    let gate_img = image.create(10, scene.screenHeight())
    gate_img.fill(10)
    gate_img.fillRect(0, randint(10, 40), 10, randint(50, 80), 0)
    let gate = sprites.createProjectileFromSide(gate_img, -50, 0)
    gate.setPosition(scene.screenWidth(), scene.screenHeight() / 2)
    gate.onDestroyed(function on_on_destroyed() {
        info.changeScoreBy(1)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    death()
})
game.onUpdate(function on_update() {
    if (Jetboy.y > scene.screenHeight()) {
        death()
    } else if (Jetboy.y < 0) {
        Jetboy.y = 0
    }
    
})
function death() {
    info.changeLifeBy(-1)
    if (info.life() != 0) {
        Jetboy.vy = 0
        Jetboy.y = scene.screenHeight() / 2
        game.splash("Press A to Start")
    }
    
}

