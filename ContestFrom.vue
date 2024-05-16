<template>
  <div>
    <h1>abc053a</h1>
    <p>
      すめけくんは現在のレートが1200未満ならばAtCoderBeginnerContest(ABC)に、そうでなければAtCoderRegularContest(ARC)に参加することにしました。すめけくんの現在のレートxが与えられます。すめけくんが参加するコンテストがABCならばABCと、そうでなければARCと出力してください。
    </p>
    <form @submit.prevent="handleSubmit">
      <label for="N">Select your rate:</label>
      <input type="range" v-model="rate" name="N" id="N" min="0" max="5000" required>
      <span>{{ rate }}</span>
      <br>
      <input type="submit" value="Submit">
    </form>
    <p v-if="result">{{ result }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rate: 1200,
      result: ''
    };
  },
  methods: {
    handleSubmit() {
      const N = this.rate;
      let ANS;
      if (N < 1200) {
        ANS = 'ABC';
      } else {
        ANS = 'ARC';
      }
      this.result = `RATE: ${N}\nCONTEST: ${ANS}`;
    }
  }
};
</script>

<style scoped>
/* 必要に応じてスタイルを追加します */
</style>
