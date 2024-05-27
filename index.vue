<template>
  <div class="container">
    <h1 class="title">BINGO GAME</h1>
    <button @click="shuffleNumbers" class="button">SHUFFLE</button>
    <div v-if="showBoard" class="board">
      <div v-for="row in board" :key="row.id" class="row">
        <div
          v-for="cell in row"
          :key="cell.id"
          class="cell"
          :class="{ red: cell.isRed }"
        >
          {{ cell.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      board: [],
      shuffledNumbers: [],
      showBoard: false,
      intervalId: null,
      currentIndex: 0,
    };
  },
  created() {
    this.initializeBoard();
  },
  methods: {
    initializeBoard() {
      this.board = [];
      let id = 1;
      for (let row = 0; row < 5; row++) {
        const rowData = [];
        for (let col = 0; col < 5; col++) {
          rowData.push({
            id,
            value: id,
            isRed: false,
          });
          id++;
        }
        this.board.push(rowData);
      }
    },
    shuffleNumbers() {
      this.resetGame();
      this.showBoard = true;
      this.shuffledNumbers = this.getShuffledNumbers();
      this.startColorChangeInterval();
    },
    getShuffledNumbers() {
      const numbers = Array.from({ length: 25 }, (_, i) => i + 1);
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      return numbers;
    },
    startColorChangeInterval() {
      clearInterval(this.intervalId);
      this.currentIndex = 0;
      this.intervalId = setInterval(this.changeColor, 1000);
    },
    changeColor() {
      if (this.currentIndex < this.shuffledNumbers.length) {
        const cellId = this.shuffledNumbers[this.currentIndex];
        const cell = this.board.flat().find((c) => c.value === cellId);
        if (cell) {
          cell.isRed = true;
          if (this.checkBingo()) {
            clearInterval(this.intervalId);
            return;
          }
        }
        this.currentIndex++;
      } else {
        clearInterval(this.intervalId);
      }
    },
    checkBingo() {
      const flatBoard = this.board.flat();

      // 行チェック
      for (let i = 0; i < 5; i++) {
        const row = flatBoard.slice(i * 5, i * 5 + 5);
        if (row.every((cell) => cell.isRed)) {
          return true;
        }
      }

      // 列チェック
      for (let i = 0; i < 5; i++) {
        const column = flatBoard.filter((cell, index) => index % 5 === i);
        if (column.every((cell) => cell.isRed)) {
          return true;
        }
      }

      // 対角線チェック
      const diagonal1 = [];
      const diagonal2 = [];

      for (let i = 0; i < 25; i += 6) {
        diagonal1.push(flatBoard[i]);
      }

      for (let i = 4; i < 21; i += 4) {
        diagonal2.push(flatBoard[i]);
      }

      if (diagonal1.every((cell) => cell.isRed) || diagonal2.every((cell) => cell.isRed)) {
        return true;
      }

      return false;
    },
    resetGame() {
      clearInterval(this.intervalId);
      this.currentIndex = 0;
      this.shuffledNumbers = [];
      this.board.flat().forEach((cell) => {
        cell.isRed = false;
      });
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.board {
  margin-top: 2rem;
}
.row {
  display: flex;
}
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: bold;
}
.red {
  background-color: red;
  color: white;
}
.button {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>