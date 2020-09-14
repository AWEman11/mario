info.setLife(3)
game.splash("Press A to Flap the Bird")
//  Setup player
let Mario = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 2 . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`)
Mario.setKind(SpriteKind.Player)
Mario.ay = 190
Mario.x = 40
//  Fly
controller.A.onEvent(ControllerButtonEvent.Pressed, function flap() {
    Mario.setVelocity(0, -100)
})
//  Generate Columns
game.onUpdateInterval(1500, function on_update_interval() {
    let gate_img = image.create(10, scene.screenHeight())
    gate_img.fill(7)
    gate_img.fillRect(0, randint(10, 40), 10, randint(50, 80), 0)
    let gate = sprites.createProjectileFromSide(gate_img, -50, 0)
    gate.setPosition(scene.screenWidth(), scene.screenHeight() / 2)
    //  Increase score
    gate.onDestroyed(function on_on_destroyed() {
        info.changeScoreBy(1)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function on_overlap(sprite: Sprite, otherSprite: Sprite) {
    death()
})
//  Game Loop
game.onUpdate(function on_update() {
    if (Mario.y > scene.screenHeight()) {
        death()
    } else if (Mario.y < 0) {
        Mario.y = 0
    }
    
})
//  Flappy Dies
function death() {
    info.changeLifeBy(-1)
    if (info.life() != 0) {
        Mario.vy = 0
        Mario.y = scene.screenHeight() / 2
        game.splash("Press A to Start")
    }
    
}

