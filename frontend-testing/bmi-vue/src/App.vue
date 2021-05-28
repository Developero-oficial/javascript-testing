<template>
  <div id="app">
    <form @submit="handleSubmit">
      <h1>BMI Calculator</h1>

      <div>
        <label for="height">Height (M)</label>
        <input id="height" />
      </div>

      <div>
        <label for="weight">Weight (KG)</label>
        <input id="weight" />
      </div>

      <button type="submit">Send</button>

      <h2 v-if="bmi">Result: {{ bmi.toLocaleString() }}</h2>
      <h2 v-if="bmiEstimation">Estimation: {{ bmiEstimation }}</h2>
    </form>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      bmi: null,
      bmiEstimation: null,
    };
  },
  methods: {
    calculateBmi({ weight, height }) {
      return weight / (height * height);
    },
    calculateBmiEstimation({ bmi }) {
      if (bmi <= 18.5) {
        return "Thiness";
      }

      if (bmi > 18.5 && bmi < 24.9) {
        return "Normal";
      }

      if (bmi > 25 && bmi < 29.9) {
        return "Overweight";
      }

      return "Obese";
    },
    handleSubmit(e) {
      e.preventDefault();

      const { height, weight } = e.target.elements;

      const bmi = this.calculateBmi({
        weight: weight.value,
        height: height.value,
      });
      const bmiEstimation = this.calculateBmiEstimation({ bmi });

      this.bmi = Number(bmi);
      this.bmiEstimation = bmiEstimation;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
