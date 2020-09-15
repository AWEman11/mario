scene.set_background_color(9)
effects.clouds.start_screen_effect()
info.set_life(3)
game.splash("Press A to Boost up")

# Make character
Jetboy = sprites.create(img("""
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
"""))
Jetboy.set_kind(SpriteKind.player)
Jetboy.ay = 190
Jetboy.x = 40

def flap():
    Jetboy.set_velocity(0, -100)
    Jetboy.start_effect(effects.fire, 175)
    
    music.ba_ding.play()
controller.A.on_event(ControllerButtonEvent.PRESSED, flap)


def on_update_interval():
    gate_img = image.create(10, scene.screen_height())
    gate_img.fill(10)
    gate_img.fill_rect(0, randint(10,40), 10, randint(50, 80), 0)
    gate = sprites.create_projectile_from_side(gate_img, -50, 0)
    gate.set_position(scene.screen_width(), scene.screen_height()/2)
    
    
    def on_on_destroyed():
        info.change_score_by(1)
    gate.on_destroyed(on_on_destroyed)
game.on_update_interval(1500, on_update_interval)

def on_overlap(sprite, otherSprite):
    death()
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_overlap)


def on_update():
    if Jetboy.y > scene.screen_height():
        death()
    elif Jetboy.y < 0:
        Jetboy.y = 0
game.on_update(on_update)


def death():
    info.change_life_by(-1)
    if info.life() != 0:
        Jetboy.vy = 0
        Jetboy.y = scene.screen_height()/2
        game.splash("Press A to Start")
