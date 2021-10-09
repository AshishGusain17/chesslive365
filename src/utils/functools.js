// convert allPositions object from (square: piece) ---> (piece: square)
const reversePositionObject = (pos) => {
    let revPos = { 'br': [], 'wr': [], 'bb': [], 'wb': [], 'bq': [], 'wq': [], 'bn': [], 'wn': [], 'bp': [], 'wp': [], 'bk': [], 'wk': [] };
    for (const [key, value] of Object.entries(pos)) {
        if (value !== "") {
            revPos[value].push(parseInt(key));
        }
    }
    return revPos;
}

export {reversePositionObject}
