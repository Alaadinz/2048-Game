import React, { Component, useEffect, useState } from "react";

import {
    getEmptytab,
    generateRandom,
    moveLeft,
    moveRight,
    moveUp,
    moveDown,
    isOver,
    checkWin
} from "./TabJeux";


var score = 0;

const Cell = ({ number }) => {
    return (
        <div className={`cell cell-${number}`}>{number > 0 ? number : ""}</div>
    );

};

const Jeux = () => {
    const [tab, updatetab] = useState(generateRandom(getEmptytab()));

    const checkEndGame = () => {
        if (checkWin(tab)) {
            console.log("le jeu est terminé avec succes");
        } else if (isOver(tab)) {
            score = 0;
            console.log("le jeu est terminé sans succes");
        }
    };


    //Mouvements
    const left = () => {
        const newtab = moveLeft(tab);
        updatetab(generateRandom(newtab));
        score = score + 1;
        checkEndGame();
    };

    const right = () => {
        const newtab = moveRight(tab);
        updatetab(generateRandom(newtab));
        score = score + 1;
        checkEndGame();
    };

    const down = () => {
        const newtab = moveDown(tab);
        updatetab(generateRandom(newtab));
        score = score + 1;
        checkEndGame();
    };

    const up = () => {
        const newtab = moveUp(tab);
        updatetab(generateRandom(newtab));
        score = score + 1;
        checkEndGame();
    };



    const onKey = (e) => {

        switch (e.key) {

            case "ArrowUp":
                up();
                break;

            case "ArrowDown":
                down();
                break;

            case "ArrowLeft":
                left();
                break;

            case "ArrowRight":
                right();
                break;

            default:
        }
    };

    useEffect(
        () => {
            window.addEventListener("keydown", onKey);

            return () => {
                window.removeEventListener("keydown", onKey);
            };
        }
    );


    return (
        <>
            <div><h3>Votre score est de:{score}</h3></div>
            <div className="tab">
                {tab.map((row, i) => {
                    return (
                        <div key={`row-${i}`} className="row">
                            {row.map((cell, j) => (
                                <Cell key={`cell-${i}-${j}`} number={cell} />
                            ))}
                        </div>
                    );

                })}
            </div>
        </>
    );
};


export default Jeux;








