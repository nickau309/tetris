const Origin = { x: 0, y: 0 };
const moveLeft1 = { x: -1, y: 0 };
const moveRight1 = { x: 1, y: 0 };
const moveLeft2 = { x: -2, y: 0 };
const moveRight2 = { x: 2, y: 0 };
const moveUp2 = { x: 0, y: -2 };
const moveDown2 = { x: 0, y: 2 };
const moveLeftUp = { x: -1, y: -1 };
const moveLeftDown = { x: -1, y: 1 };
const moveRightUp = { x: 1, y: -1 };
const moveRightDown = { x: 1, y: 1 };
const moveLeft1Up2 = { x: -1, y: -2 };
const moveLeft1Down2 = { x: -1, y: 2 };
const moveRight1Up2 = { x: 1, y: -2 };
const moveRight1Down2 = { x: 1, y: 2 };
const moveLeft2Up1 = { x: -2, y: -1 };
const moveLeft2Down1 = { x: -2, y: 1 };
const moveRight2Up1 = { x: 2, y: -1 };
const moveRight2Down1 = { x: 2, y: 1 };

const wallKickType1 = {
  clockwiseTo: [
    [Origin, moveLeft1, moveLeftDown, moveUp2, moveLeft1Up2],
    [Origin, moveLeft1, moveLeftUp, moveDown2, moveLeft1Down2],
    [Origin, moveRight1, moveRightDown, moveUp2, moveRight1Up2],
    [Origin, moveRight1, moveRightUp, moveDown2, moveRight1Down2],
  ],
  antiClockwiseTo: [
    [Origin, moveRight1, moveRightDown, moveUp2, moveRight1Up2],
    [Origin, moveLeft1, moveLeftUp, moveDown2, moveLeft1Down2],
    [Origin, moveLeft1, moveLeftDown, moveUp2, moveLeft1Up2],
    [Origin, moveRight1, moveRightUp, moveDown2, moveRight1Down2],
  ],
};

const wallKickType2 = {
  clockwiseTo: [
    [Origin, moveRight1, moveLeft2, moveRight1Down2, moveLeft2Up1],
    [Origin, moveLeft2, moveRight1, moveLeft2Down1, moveRight1Up2],
    [Origin, moveLeft1, moveRight2, moveLeft1Up2, moveRight2Down1],
    [Origin, moveRight2, moveLeft1, moveRight2Up1, moveLeft1Down2],
  ],
  antiClockwiseTo: [
    [Origin, moveRight2, moveLeft1, moveRight2Up1, moveLeft1Down2],
    [Origin, moveRight1, moveLeft2, moveRight1Down2, moveLeft2Up1],
    [Origin, moveLeft2, moveRight1, moveLeft2Down1, moveRight1Up2],
    [Origin, moveLeft1, moveRight2, moveLeft1Up2, moveRight2Down1],
  ],
};

export const wallKick = new Map([
  ["I", wallKickType2],
  ["J", wallKickType1],
  ["L", wallKickType1],
  ["S", wallKickType1],
  ["T", wallKickType1],
  ["Z", wallKickType1],
]);
