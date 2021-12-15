export const getEmptytab = () => [

    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]


const hasValue = (tab, value) => {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab.length; j++) {
            if (tab[i][j] === value) {
                return true;
            }
        }
    }
    return false;
};

//Pour verifier si le tab rempli n'a pas de 0 cell
export const isFull = (tab) => {
    return !hasValue(tab, 0);
};

const getRandomPos = () => {
    const rowPos = Math.floor(Math.random() * 4);
    const colPos = Math.floor(Math.random() * 4);
    return [rowPos, colPos];

}

export const generateRandom = (tab) => {
    if (isFull(tab)) {
        return tab;
    }
    let [row, col] = getRandomPos();
    while (tab[row][col] !== 0) {
        [row, col] = getRandomPos();
    }

    tab[row][col] = 2;
    return tab;
};



const compress = (tab) => {
    const newTab = getEmptytab();

    for (let i = 0; i < tab.length; i++) {
        let colIndex = 0;
        for (let j = 0; j < tab[i].length; j++) {
            if (tab[i][j] !== 0) {
                newTab[i][colIndex] = tab[i][j];
                colIndex++;
            }
        }
    }
    return newTab;
};

//Merger les cells avec same value 
const merge = (tab) => {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length - 1; j++) {

            if (tab[i][j] !== 0 && tab[i][j] === tab[i][j + 1]) {
                tab[i][j] = tab[i][j] * 2;
                tab[i][j + 1] = 0;
            }
        }
    }
    return tab;
};

export const moveLeft = (tab) => {
    const newtab1 = compress(tab);
    const newtab2 = merge(newtab1);
    return compress(newtab2);
};

const reverse = (tab) => {
    const reversetab = getEmptytab();

    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            reversetab[i][j] = tab[i][tab[i].length - 1 - j];
        }
    }
    return reversetab;
};

export const moveRight = (tab) => {
    const reversetab = reverse(tab);
    const newtab = moveLeft(reversetab);
    return reverse(newtab);
};

// -90deg  rotatetab[i][j] = tab[j][tab[i].length-1-i];
const rotationGauche = (tab) => {
    const rotatetab = getEmptytab();
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            rotatetab[i][j] = tab[j][tab[i].length - 1 - i];
        }
    }
    return rotatetab;
};
// 90 deg rotatetab[i][j] = tab[tab[i].length - 1 -j][i];
const rotationDroite = (tab) => {
    const rotatetab = getEmptytab();
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            rotatetab[i][j] = tab[tab[i].length - 1 - j][i];
        }
    }
    return rotatetab;
};


export const moveUp = (tab) => {
    const rotatetab = rotationGauche(tab);
    const newtab = moveLeft(rotatetab);
    return rotationDroite(newtab);
};

export const moveDown = (tab) => {
    const rotatetab = rotationDroite(tab);
    const newtab = moveLeft(rotatetab);
    return rotationGauche(newtab);

};

export const checkWin = (tab) => {
    return hasValue(tab, 2048); //Returns TRUE si valeur 2048
};

const estDifferent = (tab, updatedtab) => {
    for (let i = 0; i < tab.length; i++) {
        for (let j = 0; j < tab[i].length; j++) {
            if (tab[i][j] !== updatedtab[i][j]) {
                return true;
            }
        }
    }
    return false;
};

export const isOver = (tab) => {
    if (estDifferent(tab, moveLeft(tab))) {
        return false;
    }
    if (estDifferent(tab, moveRight(tab))) {
        return false;
    }
    if (estDifferent(tab, moveDown(tab))) {
        return false;
    }
    if (estDifferent(tab, moveUp(tab))) {
        return false;
    }

    return true;
};