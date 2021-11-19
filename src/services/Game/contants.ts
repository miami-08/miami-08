import { isServer } from 'store/rootStore';

export const DISCRET_WIDTH_SIZE = 50;

export const GAMER_RAD_MODIFIER = 0.9;

export const GameConstants = {
    get PERFECT_ONE() {
        return isServer ? 1 : window.innerWidth / DISCRET_WIDTH_SIZE;
    },
    get GAMER_DIAMETR() {
        return GameConstants.PERFECT_ONE * GAMER_RAD_MODIFIER;
    },
};

// movement
export const LEFT_RIGHT_SPEED_BUST = GameConstants.PERFECT_ONE / 30;
export const FADING_COEF = 0.95;
export const MAX_GAMER_SPEED = GameConstants.PERFECT_ONE / 4;

// jumping and falling
// export const MAX_JUMP_HEIGHT = GameConstants.PERFECT_ONE ;
export const JUMP_VELOCITY = GameConstants.PERFECT_ONE / 80;
export const JUMP_BUST_LIMIT = 14;
export const JUMP_VELOCITY_MODIFICATOR = GameConstants.PERFECT_ONE / 70;
export const FALLING_COEF = 1.95;

// ball sizes

export const GAMER_RAD = (GameConstants.PERFECT_ONE / 2) * GAMER_RAD_MODIFIER;

export const GAMER_INNER_COEF = [3.5714285714285716, -8.33333333, 1.666];
export const GAMER_BLICK_COEF = [1.6666, -3.125, 0.2];

// coin sizes

export const COIN_RAD_X = GameConstants.PERFECT_ONE / 3.5;
export const COIN_RAD_Y = GameConstants.PERFECT_ONE / 2;
