const check3Fold = (allPos) => {
    let flagDraw = 0;
    for (let ind1 = 0; ind1 < allPos.length; ind1++) {
        let ele1 = allPos[ind1];
        let count = 0;
        for (let ind2 = 0; ind2 < allPos.length; ind2++) {
            let ele2 = allPos[ind2];
            if (JSON.stringify(ele1) === JSON.stringify(ele2)) {
                count = count + 1;
            }
        }
        if (count === 3) {
            flagDraw = 1;
        }
    }
    return flagDraw;
}

module.exports = {check3Fold};