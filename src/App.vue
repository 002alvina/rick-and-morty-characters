<script>
import { ref, onMounted, watch } from 'vue'; // Добавляем нужные функции из Vue
import axios from "axios";
import CharacterCard from "./components/CharacterCard.vue";

export default {
  name: "App",
  components: {
    CharacterCard
  },
  setup() {
    const characters = ref([]);
    const page = ref(1);
    const filters = ref({
      name: "",
      status: ""
    });

    const fetchCharacters = () => {
      const params = {
        page: page.value,
        name: filters.value.name,
        status: filters.value.status
      };
      axios
        .get("https://rickandmortyapi.com/api/character", { params })
        .then(response => {
          characters.value = response.data.results;
        })
        .catch(error => {
          console.error(error);
        });
    };

    const applyFilters = () => {
      page.value = 1;
      fetchCharacters();
    };

    const nextPage = () => {
      page.value++;
      fetchCharacters();
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        fetchCharacters();
      }
    };

    onMounted(fetchCharacters);
    watch([page, filters], fetchCharacters);

    return {
      characters,
      page,
      filters,
      nextPage,
      prevPage,
      applyFilters
    };
  }
};
</script>

<template>
  <div id="app">
    <h1>Rick and Morty Characters</h1>
    <div>
      <input v-model="filters.name" placeholder="Name" />
      <select v-model="filters.status">
        <option value="">Any Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button @click="applyFilters">Apply</button>
    </div>
    <div>
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <div>
      <button @click="prevPage" :disabled="page === 1">Previous</button>
      <span>Page {{ page }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}
</style>
