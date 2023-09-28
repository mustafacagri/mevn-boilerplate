<template>
  <div class="box">
    <label>{{ title }}</label>
    <p>{{ subTitle }}</p>
    <span>{{ number }}</span>
    <div class="percentage" :class="percentage < 0 ? 'negative' : 'positive'">{{ percentage }}%</div>
    <font-awesome-icon :icon="icon" />
  </div>
</template>

<script setup="props, {}">
defineProps({
  title: String,
  subTitle: String,
  number: Number,
  percentage: Number,
  icon: String,
  iconBg: String
})
</script>

<style scoped lang="scss">
.box {
  font-family: 'Concert One', cursive;
  position: relative;
  border: 1px solid #eee;
  background-color: white;
  padding: 15px 25px;
  border-radius: 10px;
  opacity: 0.8;
  transition: 0.4s;

  &:hover {
    opacity: 1;
    transition: 0.4s;
    border-radius: 0px;
    border: 1px solid #dedede;
  }

  label {
    font-family: 'Concert One', cursive;
    font-weight: 600;
    font-size: 1.3rem;
  }

  p {
    font-family: 'Concert One', cursive;
    font-weight: 200;
    font-size: 0.8rem;
    opacity: 0.5;
    margin: 0;
  }

  span {
    font-family: 'Concert One', cursive;
    display: block;
    margin-top: 5px;
    opacity: 0.8;
    font-size: 1rem;
    font-weight: 600;
  }

  .percentage {
    display: inline-block;
    border-radius: 10px;
    padding: 5px 10px;
    color: white;
    margin-top: 10px;
    opacity: 0.8;
  }

  .negative {
    background-color: red;
  }

  .positive {
    background-color: green;
  }

  svg {
    position: absolute;
    bottom: 10px;
    right: 10px;
    height: 96px;
    opacity: 0.5;
    color: #ccc;
  }
}
</style>
