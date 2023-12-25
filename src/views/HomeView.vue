<template>
  <main class="main">
    <button>button 1</button>
    <button>button 2</button>
    <select name="tests" id="test1-select">
      <option value="">--Please choose an option--</option>
      <option value="test1">test1</option>
    </select>
    <select name="tests" id="test2-select">
      <option value="">--Please choose an option--</option>
      <option value="test1">test1</option>
    </select>
  </main>
</template>

<script setup></script>

<style scoped>
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
