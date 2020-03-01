import Game from './scripts/game.js';
import View from './scripts/view.js';
import Controller from './scripts/controller.js';

const root = document.getElementById('root');

const game = new Game();
const view = new View(root, 500, 500, 12, 12);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;


