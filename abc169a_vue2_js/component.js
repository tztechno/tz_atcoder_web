var app = new Vue({
    el: '#app',
    data: {
        message: 'abc169_a',
        inputNumbers: '',
        ans: 0,
        showResult: false // 計算結果を表示するためのフラグ
    },
    methods: {
        calculate: function () {
            var numbers = this.inputNumbers.split(' ').map(Number);
            this.ans = numbers.reduce((acc, curr) => acc * curr, 1);
            //this.ans = numbers[0]*numbers[1];
            this.showResult = true; // 計算結果を表示する
        }
    }
});
