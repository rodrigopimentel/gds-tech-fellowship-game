const createGame = (gameID, startBtn, startGameLi, controlSection, controlList, playerStatView, cpuStatView) => {
    return {
        _game: gameID,
        _playerScore: 0,
        _playerWinHistory: [],
        _playerMove: undefined,
        _cpuScore: 0,
        _cpuWinHistory: [],
        _cpuMove: undefined,
        _gameState: 'not started',
        _currentRound: 0,
        _startGameBtn: startBtn,
        _startGameLi: startGameLi,
        _controlSection: controlSection,
        _controlList: controlList,
        _playerStatView: playerStatView,
        _cpuStatView: cpuStatView,

        getEmoji(move) {
            if (move === 0) {
                return '🪨';
            } else if (move === 1) {
                return '✂️';
            } else {
                return '📄';
            }
        },

        updatePlayView() {
            console.log('drawing ' + this._cpuMove);
            document.querySelector('cpu-play-icon').innerHTML = this.getEmoji(this._cpuMove);
            document.querySelector('player-play-icon').innerHTML = this.getEmoji(this._playerMove);
        },

        drawControls() {
            this._startGameLi.parentNode.removeChild(this._startGameLi);
            let controlHeader = document.createElement('h2');
            controlHeader.id = 'control-text';
            controlHeader.innerHTML = 'your move';
            this._controlSection.appendChild(controlHeader);
            let rockButton = document.createElement('div');
            rockButton.id = 'rock-button';
            rockButton.innerHTML = '🪨';
            this._controlList.appendChild(rockButton);
            let paperButton = document.createElement('div');
            paperButton.id = 'paper-button';
            paperButton.innerHTML = '📄';
            this._controlList.appendChild(paperButton);
            let scissorsButton = document.createElement('div');
            scissorsButton.id = 'scissors-button';
            scissorsButton.innerHTML = '✂️';
            this._controlList.appendChild(scissorsButton);

            rockButton.addEventListener('click', run = () => {
                this._playerMove = 0;
                console.log(this._playerMove);
                if (this._currentRound < 3) {
                    this.playRound();
                }
            });

            paperButton.addEventListener('click', run = () => {
                this._playerMove = 2;
                console.log(this._playerMove);
                if (this._currentRound < 3) {
                    this.playRound();
                }
            });

            scissorsButton.addEventListener('click', run = () => {
                this._playerMove = 1;
                console.log(this._playerMove);
                if (this._currentRound < 3) {
                    this.playRound();
                }
            });
        },

        drawScore() {
            console.log('player score ' + this._playerScore);
            console.log('cpu score ' + this._cpuScore);
            for (let idx = 0; idx < this._playerWinHistory.length; idx++) {
                if (this._playerWinHistory[idx] === 'win') {
                    this._playerStatView[idx].style.backgroundColor = 'green';
                } else if (this._playerWinHistory[idx] === 'lose') {
                    this._playerStatView[idx].style.backgroundColor = 'red';
                } else {
                    this._playerStatView[idx].style.backgroundColor = 'white';
                }
            }

            for (let idx = 0; idx < this._cpuWinHistory.length; idx++) {
                if (this._cpuWinHistory[idx] === 'win') {
                    this._cpuStatView[idx].style.backgroundColor = 'green';
                } else if (this._cpuWinHistory[idx] === 'lose') {
                    this._cpuStatView[idx].style.backgroundColor = 'red';
                } else {
                    this._cpuStatView[idx].style.backgroundColor = 'white';
                }
            }
        },

        drawRoundMessage() {
            this._gameState = 'finished';
            console.log('game finished');
            this._controlList.removeChild(document.getElementById('rock-button'));
            this._controlList.removeChild(document.getElementById('paper-button'));
            this._controlList.removeChild(document.getElementById('scissors-button'));

            if (this._playerScore > this._cpuScore) {
                document.getElementById('control-text').innerHTML = 'you win! 🥳';
                document.getElementById('control-text').style.fontSize = '5rem';
                document.getElementById('control-text').style.color = 'green';
            } else if (this._playerScore < this._cpuScore) {
                document.getElementById('control-text').innerHTML = 'you lose... 😭';
                document.getElementById('control-text').style.fontSize = '5rem';
                document.getElementById('control-text').style.color = 'red';
            } else {
                document.getElementById('control-text').innerHTML = 'draw!';
                document.getElementById('control-text').style.fontSize = '5rem';
                document.getElementById('control-text').style.color = 'gray';
            }

            let restartButton = document.createElement('button');
            restartButton.id = 'restart-button';
            restartButton.innerHTML = 'play again';
            document.getElementById('control-list').appendChild(restartButton);

            restartButton.addEventListener('click', run = () => {
                location.reload();
            });
        },

        pickCpuMove() {
            let move = Math.floor(Math.random() * 3);
            console.log('cpu move is: ' + move);
            return move;
        },

        getRoundWinner() {
            let distance = this._playerMove - this._cpuMove;
            if ((distance % 3 == 2) || (distance % 3 === -1)) {
                return 'player';
            } else if ( (distance % 3 === 1) || (distance % 3 === -2)) {
                return 'cpu';
            } else {
                return 'draw';
            }
        },

        incrementPlayerScore() {
            this._playerScore++;
            console.log(this._playerScore);
        },

        incrementCpuScore() {
            this._cpuScore++;
            console.log(this._cpuScore);
        },

        get playerScore() {
            return this._playerScore;
        },

        get cpuScore() {
            return this._cpuScore;
        },

        playRound() {
            console.log('your move: ' + this._playerMove);
            this._cpuMove = this.pickCpuMove();
            console.log('cpu move: ' + this._cpuMove);
            this.updatePlayView();
            if (this.getRoundWinner() === 'player') {
                this.incrementPlayerScore();
                this._currentRound++;
                this._playerWinHistory.push('win');
                this._cpuWinHistory.push('lose');
                this.drawScore();
                console.log('you won');

                if (this._currentRound === 3) {
                    this.drawRoundMessage();
                }

            } else if (this.getRoundWinner() === 'cpu') {
                this.incrementCpuScore();
                this._currentRound++;
                this._playerWinHistory.push('lose');
                this._cpuWinHistory.push('win');
                this.drawScore();
                console.log('cpu won');

                if (this._currentRound === 3) {
                    this.drawRoundMessage();
                }
    
            } else {
                this._currentRound++;
                this._playerWinHistory.push('draw');
                this._cpuWinHistory.push('draw');
                this.drawScore();
                console.log('draw!');

                if (this._currentRound === 3) {
                    this.drawRoundMessage();
                }
            }

        },

        playGame() {
            console.log('playing game');
            this._gameState = 'started';
            this.drawControls();
        },

        initEvents() {
            this._startGameBtn.addEventListener('click', run = () => {
                this.playGame();
            });
        },

        startGame() {
            this.initEvents();
        },
    }
};


let myStartBtn = document.getElementById('play-btn');
let myStartLi = document.getElementById('play-li');
let myControlSection = document.getElementById('control-header');
let myControlList = document.getElementById('control-list');
let myPlayerStatView = document.querySelector('player-stats').children;
let myCpuStatView = document.querySelector('cpu-stats').children;
let myGame = createGame(0, myStartBtn, myStartLi, myControlSection, myControlList, myPlayerStatView, myCpuStatView);
myGame.startGame();