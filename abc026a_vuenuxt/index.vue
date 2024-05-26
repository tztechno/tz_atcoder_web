<template>
  <div>
    <h1>abc026a</h1>
    <p>合計値Zを選んでください。0からZの範囲でXを選んでください。X*Yを出力します。</p>
    <form @submit.prevent="handleFormSubmit">
      <div class="slider-container">
        <label for="z">Select Z value:</label>
        <input type="range" id="z" min="0" max="1000" v-model.number="z" />
        <span>{{ z }}</span>
      </div>
      <div class="slider-container">
        <label for="x">Select X value:</label>
        <input type="range" id="x" :max="z" v-model.number="x" />
        <span>{{ x }}</span>
      </div>
      <input type="submit" value="Submit" />
    </form>
    <p id="output">{{ output }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      z: 1000,
      x: 500,
      output: '',
    };
  },
  methods: {
    handleFormSubmit() {
      const y = this.z - this.x;
      const ANS = this.x * y;
      this.output = `TOTAL: ${this.z}\nX,Y: ${this.x},${y}\nX*Y: ${ANS}`;
    },
  },
};
</script>
