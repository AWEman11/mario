
info.set_life(3)
game.splash("Press A to Flap the Bird")

# Setup player
Mario = sprites.create(img("""
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
"""))
Mario.set_kind(SpriteKind.player)
Mario.ay = 190
Mario.x = 40

# Fly
def flap():
    Mario.set_velocity(0, -100)
controller.A.on_event(ControllerButtonEvent.PRESSED, flap)

# Generate Columns
def on_update_interval():
    gate_img = image.create(10, scene.screen_height())
    gate_img.fill(7)
    gate_img.fill_rect(0, randint(10,40), 10, randint(50, 80), 0)
    gate = sprites.create_projectile_from_side(gate_img, -50, 0)
    gate.set_position(scene.screen_width(), scene.screen_height()/2)
    
    # Increase score
    def on_on_destroyed():
        info.change_score_by(1)
    gate.on_destroyed(on_on_destroyed)
game.on_update_interval(1500, on_update_interval)

def on_overlap(sprite, otherSprite):
    death()
sprites.on_overlap(SpriteKind.player, SpriteKind.projectile, on_overlap)

# Game Loop
def on_update():
    if Mario.y > scene.screen_height():
        death()
    elif Mario.y < 0:
        Mario.y = 0
game.on_update(on_update)

# Flappy Dies
def death():
    info.change_life_by(-1)
    if info.life() != 0:
        Mario.vy = 0
        Mario.y = scene.screen_height()/2
        game.splash("Press A to Start")


