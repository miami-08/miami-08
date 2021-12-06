import TObjectLiteral from 'types/TObjectLiteral';

import { GameConstants } from '../contants';

export class BallMovementChecker {
    map: string[];

    constructor(map: string[], reachedKeys: TObjectLiteral) {
        this.map = map;

        Object.entries(reachedKeys).forEach(([key, value]) => {
            if (value) {
                this.toggleCurrentBlockType(key.toUpperCase());
            }
        });
    }

    public emptyBlocks = ['0', '-', '+'];

    public filledBlocks = ['1', 'a', 'b', 'c', 'A', 'B', 'C'];

    checkNextLvlReached(ballX: number, ballY: number): string | false {
        const ballCenterX = ballX + GameConstants.PLAYER_DIAMETER / 2;
        const ballCenterY = ballY + GameConstants.PLAYER_DIAMETER / 2;

        const blockX = Math.floor(ballCenterX / GameConstants.PERFECT_ONE);
        const blockY = Math.floor(ballCenterY / GameConstants.PERFECT_ONE);

        const blockValue = this.map[blockY].charAt(blockX);

        if (blockValue === '-' || blockValue === '+') {
            return blockValue;
        }

        return false;
    }

    getBlockUnderBallValue(ballX: number, ballY: number): string {
        const ballCenterX = ballX + GameConstants.PLAYER_DIAMETER / 2;
        const ballCenterY = ballY + GameConstants.PLAYER_DIAMETER;

        const blockX = Math.floor(ballCenterX / GameConstants.PERFECT_ONE);
        const blockY = Math.floor(ballCenterY / GameConstants.PERFECT_ONE);

        return this.map[blockY].charAt(blockX);
    }

    getBlockWasPressed(
        ballX: number,
        ballY: number,
        velY: number,
    ): string | false {
        const blockValue = this.getBlockUnderBallValue(
            ballX,
            ballY + GameConstants.PLAYER_DIAMETER / 4,
        );

        if (
            blockValue.toLowerCase() !== blockValue.toUpperCase() &&
            blockValue.toLowerCase() === blockValue &&
            Number.isNaN(parseInt(blockValue, 10)) &&
            velY !== 0
        ) {
            this.toggleCurrentBlockType(blockValue.toLocaleUpperCase());

            return blockValue;
        }

        return false;
    }

    ballCanFall(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const ballBottomY = y + GameConstants.PLAYER_DIAMETER;
        const yLvl1 = Math.floor((ballBottomY + 3) / GameConstants.PERFECT_ONE);

        const leftBlockX = Math.floor(x / GameConstants.PERFECT_ONE);
        const rightBlockX = Math.floor(
            (x + GameConstants.PLAYER_DIAMETER) / GameConstants.PERFECT_ONE,
        );

        const result =
            this.emptyBlocks.includes(this.map[yLvl1].charAt(leftBlockX)) &&
            this.emptyBlocks.includes(this.map[yLvl1].charAt(rightBlockX));

        return result;
    }

    isBallCanJump(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const yLvl1 = Math.floor(y / GameConstants.PERFECT_ONE) - 1;

        const leftBlockX = Math.floor(x / GameConstants.PERFECT_ONE);
        const rightBlockX = Math.floor(
            (x + GameConstants.PLAYER_DIAMETER) / GameConstants.PERFECT_ONE,
        );

        const result =
            this.emptyBlocks.includes(this.map[yLvl1].charAt(leftBlockX)) &&
            this.emptyBlocks.includes(this.map[yLvl1].charAt(rightBlockX));

        return result;
    }

    isBallStuckInTopWall(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const underBallBlockY = Math.floor(y / GameConstants.PERFECT_ONE) - 1;

        const underBallBlockX = Math.floor(x / GameConstants.PERFECT_ONE);

        const result = !this.emptyBlocks.includes(
            this.map[underBallBlockY].charAt(underBallBlockX),
        );

        return result;
    }

    isBallCanGoLeft(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const ballMiddleY = Math.round(
            (y + GameConstants.PLAYER_DIAMETER / 3) / GameConstants.PERFECT_ONE,
        );

        const leftBallX = Math.ceil((x - 3) / GameConstants.PERFECT_ONE) - 1;

        const result = this.emptyBlocks.includes(
            this.map[ballMiddleY].charAt(leftBallX),
        );

        return result;
    }

    isBallStuckInLeftWall(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const ballCurrentBlockY = Math.floor(y / GameConstants.PERFECT_ONE);

        const ballCurrentBlockX = Math.floor(x / GameConstants.PERFECT_ONE);

        const result = !this.emptyBlocks.includes(
            this.map[ballCurrentBlockY].charAt(ballCurrentBlockX),
        );

        return result;
    }

    isBallCanGoRight(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const ballMiddleY = Math.round(
            (y + GameConstants.PLAYER_DIAMETER / 3) / GameConstants.PERFECT_ONE,
        );

        const rightBallX =
            Math.ceil(
                (x + GameConstants.PLAYER_DIAMETER + 3) /
                    GameConstants.PERFECT_ONE,
            ) - 1;

        const result = this.emptyBlocks.includes(
            this.map[ballMiddleY].charAt(rightBallX),
        );

        return result;
    }

    isBallStuckInRightWall(ballX: number, ballY: number): boolean {
        const { x, y } = this.normalize2D(ballX, ballY);

        const ballCurrentBlockY = Math.floor(y / GameConstants.PERFECT_ONE);

        const ballCurrentBlockX = Math.floor(
            (x + GameConstants.PLAYER_DIAMETER) / GameConstants.PERFECT_ONE,
        );

        const result = !this.emptyBlocks.includes(
            this.map[ballCurrentBlockY].charAt(ballCurrentBlockX),
        );

        return result;
    }

    private toggleCurrentBlockType(blockSymbol: string): void {
        if (this.emptyBlocks.includes(blockSymbol)) {
            this.emptyBlocks = this.emptyBlocks.filter(
                (i) => i !== blockSymbol,
            );
            this.filledBlocks.push(blockSymbol);
        } else {
            this.filledBlocks = this.filledBlocks.filter(
                (i) => i !== blockSymbol,
            );
            this.emptyBlocks.push(blockSymbol);
        }
    }

    // eslint-disable-next-line class-methods-use-this
    private normalizeCoordinate(z: number): number {
        return Math.round(z * 100000000) / 100000000;
    }

    private normalize2D(x: number, y: number): { x: number; y: number } {
        return {
            x: this.normalizeCoordinate(x),
            y: this.normalizeCoordinate(y),
        };
    }
}
