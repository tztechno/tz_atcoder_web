<template>
  <div>
    <h1>abc053a</h1>
    <p>
      すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
    </p>
    <form @submit.prevent="submitForm">
      <label for="N">Select your rate:</label>
      <input type="range" v-model="N" name="N" id="N" min="0" max="5000" required>
      <span>{{ N }}</span> <!-- Span to display selected value -->
      <br>
      <button type="submit">Submit</button>
    </form>

    <p>{{ output }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      N: 1200,
      output: ''
    };
  },
  methods: {
    submitForm() {
      let ANS;
      if (this.N < 1200) {
        ANS = "ABC";
      } else {
        ANS = "ARC";
      }
      this.output = `RATE: ${this.N}\nCONTEST: ${ANS}`;
    }
  }
};
</script>

<style>
/* ここに必要に応じてCSSを追加できます */
</style>
