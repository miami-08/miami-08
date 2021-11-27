import TObjectLiteral from 'types/TObjectLiteral';

import { BallMovementChecker } from './services/BallMovementChecker';
import {
    MAX_PLAYER_SPEED,
    PLAYER_RAD,
    FALLING_COEF,
    FADING_COEF,
    LEFT_RIGHT_SPEED_BUST,
    JUMP_BUST_LIMIT,
    JUMP_VELOCITY,
    JUMP_VELOCITY_MODIFICATOR,
    GameConstants,
    GAMEPAD_MOVEMENT_THRESHOLD,
} from './contants';
import { LVLs } from './lvls';
import { ObjectsDrawer } from './services/ObjectsDrawer';
import {
    IPoint,
    ISides,
    IGameProps,
    TLvlOuterCallback,
    LvlCreaser,
} from './types';

export class Game {
    private ctx: CanvasRenderingContext2D;

    private ballPosition: IPoint;

    private ballMovementChecker: BallMovementChecker;

    private objectsDrawer: ObjectsDrawer;

    private velY: number = 0;

    private velX: number = 0;

    private keys = new Map<string, boolean>();

    private canvasSides: ISides;

    private reachedKeys: TObjectLiteral;

    private lvlNum: number;

    //
    // Чтобы шарик прыгал плавно, при прыжке задаётся количество кадров и
    // с каждым кадром он перемещается на некоторое расстояние по Y
    //
    private jumpBust = 0;

    lvlOuterCallback: TLvlOuterCallback;

    unsubscribeKeysCallback: () => void = () => {};

    setScore: (points: number) => void;

    animationCallbackId: number = 0;

    constructor({
        initBlock = { x: 1, y: 1 },
        canvasRef,
        lvlOuterCallback,
        setScore,
        lvlNum,
        reachedKeys,
        gameHeight,
        gameWidth,
    }: IGameProps) {
        const context = canvasRef.getContext('2d');

        this.setScore = setScore;

        this.lvlOuterCallback = lvlOuterCallback;

        this.reachedKeys = { ...reachedKeys };

        this.lvlNum = lvlNum;

        if (!context) {
            throw new Error("Отсутствует контекст Canvas'а");
        }

        this.ctx = context;
        this.ballPosition = {
            x: initBlock.x * GameConstants.PERFECT_ONE,
            y: initBlock.y * GameConstants.PERFECT_ONE,
        };

        this.canvasSides = {
            top: 0,
            bottom: gameHeight,
            left: 0,
            right: gameWidth,
        };

        const keydownCallback = (e: KeyboardEvent) => this.keys.set(e.key, true);

        const keyupCallback = (e: KeyboardEvent) => this.keys.set(e.key, false);

        document.body.addEventListener('keydown', keydownCallback);
        document.body.addEventListener('keyup', keyupCallback);

        this.unsubscribeKeysCallback = () => {
            document.body.removeEventListener('keydown', keydownCallback);
            document.body.removeEventListener('keyup', keyupCallback);
        };

        this.objectsDrawer = new ObjectsDrawer(this.ctx, LVLs[lvlNum].map);

        this.ballMovementChecker = new BallMovementChecker(
            LVLs[lvlNum].map,
            reachedKeys,
        );
    }

    start() {
        this.animate();
    }

    moveToNextLvl(gateSymbol: string) {
        cancelAnimationFrame(this.animationCallbackId);

        const moveValue = gateSymbol === LvlCreaser.Forward ? 1 : -1;

        const initPoint = gateSymbol === LvlCreaser.Forward
            ? LVLs[this.lvlNum + moveValue].entryPointA
            : LVLs[this.lvlNum + moveValue].entryPointB;

        this.lvlOuterCallback(
            this.lvlNum + moveValue,
            this.reachedKeys,
            initPoint,
        );
    }

    animate() {
        this.animationCallbackId = requestAnimationFrame(
            this.animate.bind(this),
        );

        let gamepadMovementX = null;
        let gamepadJump = null;

        const gamepad = navigator.getGamepads()[0];

        if (gamepad) {
            gamepadMovementX = Math.abs(gamepad?.axes[0]) > GAMEPAD_MOVEMENT_THRESHOLD
                ? gamepad?.axes[0]
                : null;
            gamepadJump = gamepad?.buttons[0].pressed;
        }

        const {
            top, right, bottom, left,
        } = this.canvasSides;

        const { x: ballX, y: ballY } = this.ballPosition;

        const ballCanFall = this.ballMovementChecker.ballCanFall(ballX, ballY);

        const isBallCanGoLeft = this.ballMovementChecker.isBallCanGoLeft(
            ballX,
            ballY,
        );

        const isBallCanGoRight = this.ballMovementChecker.isBallCanGoRight(
            ballX,
            ballY,
        );

        const isNextLvlReached = this.ballMovementChecker.checkNextLvlReached(
            ballX,
            ballY,
        );

        if (isNextLvlReached) {
            this.moveToNextLvl(isNextLvlReached);
        }

        if (
            this.velY < MAX_PLAYER_SPEED
            && this.jumpBust === 0
            && ballCanFall
        ) {
            this.velY += 2;
        }

        if (
            this.keys.get('ArrowRight')
            || this.keys.get('d')
            || (gamepadMovementX && gamepadMovementX > GAMEPAD_MOVEMENT_THRESHOLD)
        ) {
            if (this.velX < MAX_PLAYER_SPEED) {
                this.velX += +LEFT_RIGHT_SPEED_BUST;
            }
        }

        if (this.keys.get('ArrowUp') || this.keys.get('w') || gamepadJump) {
            if (
                this.ballMovementChecker.isBallCanJump(ballX, ballY)
                && this.velY >= 0
                && this.velY > -MAX_PLAYER_SPEED
                && this.jumpBust === 0
                && !ballCanFall
            ) {
                this.velY = -JUMP_VELOCITY;

                // "заряжаем" количество кадров для перемещения вверх
                this.jumpBust = JUMP_BUST_LIMIT;
            }
        }

        if (
            this.keys.get('ArrowLeft')
            || this.keys.get('a')
            || (gamepadMovementX && gamepadMovementX < -GAMEPAD_MOVEMENT_THRESHOLD)
        ) {
            if (this.velX > -MAX_PLAYER_SPEED) {
                this.velX -= LEFT_RIGHT_SPEED_BUST;
            }
        }

        this.handelMovementOfY(ballX, ballY);

        this.velX *= FADING_COEF;

        this.ballPosition.x += this.velX;

        if (!isBallCanGoRight) {
            if (this.ballMovementChecker.isBallStuckInRightWall(ballX, ballY)) {
                this.velX = -this.velX;
                this.ballPosition.x += 2 * this.velX;
            } else {
                this.ballPosition.x = Math.ceil(
                    (this.ballPosition.x / GameConstants.PERFECT_ONE)
                        * GameConstants.PERFECT_ONE,
                );
            }
        } else if (!isBallCanGoLeft) {
            if (this.ballMovementChecker.isBallStuckInLeftWall(ballX, ballY)) {
                this.velX = -this.velX;
                this.ballPosition.x += 2 * this.velX;
            } else {
                this.ballPosition.x = Math.ceil(
                    (this.ballPosition.x / GameConstants.PERFECT_ONE)
                        * GameConstants.PERFECT_ONE,
                );
            }
        }

        if (!ballCanFall && this.velY < 0.0000001) {
            this.ballPosition.y = Math.floor(this.ballPosition.y / GameConstants.PERFECT_ONE)
                    * GameConstants.PERFECT_ONE
                + GameConstants.PERFECT_ONE
                - 2 * PLAYER_RAD;
        }

        this.ctx.clearRect(left, top, right - left, bottom - top);
        this.objectsDrawer.drawBackground(this.canvasSides);

        this.objectsDrawer.drawMap(this.reachedKeys);
        this.objectsDrawer.drawBall(this.ballPosition);
    }

    private handelMovementOfY(ballX: number, ballY: number): void {
        // Если "запал" движения вверх не кончился:
        if (this.jumpBust > 0) {
            this.jumpBust -= 1;

            // Двигаемся вверх причем, с каждым кадром медленнее,
            // т.к. jumpBust с каждым кдром меньше
            this.ballPosition.y
                -= Math.abs(this.velY)
                * (this.jumpBust + JUMP_VELOCITY_MODIFICATOR);

            // Если пересекли блок сверху (застряли в нем)
            if (this.ballMovementChecker.isBallStuckInTopWall(ballX, ballY)) {
                // Возвращаемся, чтобы не пересекать блок сверху
                this.ballPosition.y
                    += Math.abs(this.velY)
                    * (this.jumpBust + JUMP_VELOCITY_MODIFICATOR);

                // "заряд" прыжка обнуляем
                this.jumpBust = 0;

                // задаем скорость падение вниз
                this.velY = 1.5;
            }
        } else {
            const pressedBlock = this.ballMovementChecker.getBlockWasPressed(
                ballX,
                ballY,
                this.velY,
            );
            if (pressedBlock) {
                if (typeof this.reachedKeys[pressedBlock] === 'undefined') {
                    this.reachedKeys[pressedBlock] = true;
                } else {
                    this.reachedKeys[pressedBlock] = !this.reachedKeys[pressedBlock];
                }
            }

            this.velY = Math.abs(this.velY) * FALLING_COEF;
            this.ballPosition.y += this.velY;

            if (this.velY > 0.0001) {
                this.velY = 0;
            }
        }
    }
}
