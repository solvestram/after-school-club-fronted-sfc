<template>
  <div>
    <!-- Search and Sorting options -->
    <div class="container mb-4">
      <div class="form-row mb-3">
        <input
          id="search"
          class="col-auto form-control w-25"
          type="search"
          placeholder="Search"
          v-model="searchInput"
        />
      </div>
      <div class="row">
        <div class="col-auto">
          <span><strong>Sort by: </strong></span>
          <div
            class="form-check form-check-inline"
            v-for="option in sortOptions" :key="option.id"
          >
            <input
              class="form-check-input"
              type="radio"
              name="sortBy"
              v-bind:id="option"
              v-bind:value="option"
              v-model="sortBy"
            />
            <label class="form-check-label" v-bind:for="option">{{
              option
            }}</label>
          </div>
        </div>
        <div class="col-auto">
          <span><strong>Sort order: </strong></span>
          <div
            class="form-check form-check-inline"
            v-for="option in orderOptions" :key="option.id"
          >
            <input
              class="form-check-input"
              type="radio"
              name="sortOrder"
              v-bind:id="option"
              v-bind:value="option"
              v-model="sortOrder"
            />
            <label class="form-check-label" v-bind:for="option">{{
              option
            }}</label>
          </div>
        </div>
      </div>
    </div>

    <!-- Listing lessons -->
    <div id="lesson-cards" class="container mb-4">
      <div class="row row-cols-4 g-4">
        <div class="col" v-for="lesson in sortedLessons" :key="lesson.id">
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
  props: ['lessons'],
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
  computed: {
    // for sorting items on the main page
    sortedLessons() {
      let sorted;

      // sorting
      if (this.sortBy === "subject") {
        sorted = this.lessons.sort((a, b) => {
          if (a.subject > b.subject) return 1;
          if (a.subject < b.subject) return -1;
          return 0;
        });
      } else if (this.sortBy === "location") {
        sorted = this.lessons.sort((a, b) => {
          if (a.location > b.location) return 1;
          if (a.location < b.location) return -1;
          return 0;
        });
      } else if (this.sortBy === "price") {
        sorted = this.lessons.sort((a, b) => {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
      } else if (this.sortBy === "space") {
        sorted = this.lessons.sort((a, b) => {
          if (a.space > b.space) return 1;
          if (a.space < b.space) return -1;
          return 0;
        });
      }

      // reversing for descending order
      if (this.sortOrder === "descending") {
        sorted = sorted.reverse();
      }

      if (this.searchInput === "") {
        return sorted;
      } else {
        // search
        let sortedWithSearch = sorted.filter((lesson) => {
          let includesSubject = lesson.subject
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
          let includesLocation = lesson.location
            .toLowerCase()
            .includes(this.searchInput.toLowerCase());
          return includesSubject || includesLocation;
        });

        return sortedWithSearch;
      }
    },
  },
};
</script>

<style>
</style>