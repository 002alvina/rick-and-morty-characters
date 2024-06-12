<template>
  <div class="character-card">
    <h2>{{ character.name }}</h2>
    <p>Status: {{ character.status }}</p>
    <img :src="character.image" :alt="character.name" />
  </div>
</template>

<script>
export default {
  name: "CharacterCard",
  props: {
    character: Object
  }
};
</script>

<style>
.character-card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  text-align: center;
}
</style>
