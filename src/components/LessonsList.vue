<template>
  <div>
    <!-- Listing lessons -->
    <div id="lesson-cards" class="container mb-4">
      <div class="row row-cols-4 g-4">
        <div class="col" v-for="lesson in lessons" :key="lesson.id">
          <div class="card text-dark bg-light">
            <figure>
              <img
                class="card-img-top"
                height="200"
                v-bind:src="`${apiUrl}/${lesson.image}`"
              />
            </figure>

            <div class="card-body">
              <h5 class="card-title" v-text="lesson.subject"></h5>
              <p class="card-text mb-0">
                <i class="fas fa-map-marker-alt"></i> Location:
                {{ lesson.location }}
              </p>
              <p class="card-text mb-0">
                <i class="fas fa-dollar-sign"></i> Price: {{ lesson.price }}
              </p>
              <p class="card-text mb-0">
                <i class="fas fa-users"></i> Number of spaces left:
                {{ lesson.space }}
              </p>
            </div>

            <button
              :disabled="!(lesson.space > 0)"
              class="btn btn-dark shadow-none"
              v-on:click="addToCart(lesson)"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonsList",
  props: ["lessons", "apiUrl"],
  data() {
    return {
      // sorting properties
      sortOptions: ["subject", "location", "price", "space"],
      orderOptions: ["ascending", "descending"],
      sortBy: "subject",
      sortOrder: "ascending",

      // search
      searchInput: "",
    };
  },
  methods: {
    addToCart(lesson) {
      this.$emit("addToCart", lesson);
    },
  },
};
</script>

<style>
</style>