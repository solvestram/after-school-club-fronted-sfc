<template>
  <div id="app">
    <!-- Top bar -->
    <nav class="navbar mb-4 navbar-dark bg-dark sticky-top">
      <div class="container">
        <span class="navbar-brand mb-0 h1" v-text="sitename"></span>
        <div v-if="!showCart">
          <button
            v-on:click="resetDatabase()"
            class="btn btn-outline-light btn-sm shadow-none"
          >
            <i class="fas fa-sync"></i> Reset Database
          </button>
          <button
            :disabled="isCartDisabled"
            v-on:click="switchToCart()"
            class="btn btn-outline-light btn-sm shadow-none"
          >
            <i class="fas fa-shopping-cart"></i> Shopping cart ({{
              cartItemsCount
            }})
          </button>
        </div>
        <div v-else>
          <button
            v-on:click="switchToMain()"
            class="btn btn-outline-light btn-sm shadow-none"
          >
            <i class="fas fa-angle-left"></i> Go back
          </button>
        </div>
      </div>
    </nav>

    <!-- Main page with the list of lessons -->
    <div v-if="!showCart" id="mainPage">
      <!-- Lessons component -->
      <lessons-list :lessons="lessons"></lessons-list>
    </div>

    <!-- Shopping cart page -->
    <div v-else id="cartPage">
      <!-- Checkout component -->
      <checkout-form :cartItems="cartItems"></checkout-form>
    </div>
  </div>
</template>

<script>
import LessonsList from "./components/LessonsList.vue";
import CheckoutForm from "./components/CheckoutForm.vue";

export default {
  name: "App",
  components: { LessonsList, CheckoutForm },
  data() {
    return {
      sitename: "After School Club",
      apiUrl: "https://cst3145-after-school-club.herokuapp.com",
      
      lessons: [],

      // shopping cart properties
      cartItems: [],
      showCart: false,
    };
  },
  methods: {
    // loads all lessons
    loadAllLessons() {
      fetch(this.apiUrl + "/collections/lessons")
        .then((response) => response.json())
        .then((data) => {
          this.lessons = data;
        });
    },

    // switches to the cart page
    switchToCart() {
      this.showCart = true;
    },

    // switches to the main page
    switchToMain() {
      this.showCart = false;

      if (this.orderConfirmed) {
        this.cartItems = [];
        this.orderConfirmed = false;
      }
    },

    addToCart(lesson) {
      this.cartItems.push(lesson);

      if (lesson.space > 0) {
        lesson.space -= 1;
      }
    },

    removeFromCart(lesson) {
      let index = this.cartItems.indexOf(lesson);

      if (index > -1) {
        this.cartItems.splice(index, 1);
      }

      lesson.space += 1;

      // Disable shopping cart if it is empty
      if (this.cartItems.length <= 0) {
        this.showCart = false;
      }
    },

    // Resets database to default
    resetDatabase() {
      fetch(this.apiUrl + "/collections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reset: true }),
      }).then(() => {
        console.log("The database was reset");

        // Reload lessons data
        this.loadAllLessons();

        // Reset cart
        this.cartItems = [];
      });
    },
  },

  computed: {
    isCartDisabled() {
      return this.cartItems.length <= 0;
    },

    cartItemsCount() {
      return this.cartItems.length;
    },

    // checks whether the checkout button should be enabled
    checkoutEnabled() {
      // check if any of the fields is empty
      if (this.checkoutName === "" || this.checkoutPhone === "") {
        return false;
      }

      // check if checkoutName is only letters
      if (/[^a-z]/i.test(this.checkoutName)) {
        return false;
      }

      // check if checkoutPhone is only number
      if (!/^\d+$/.test(this.checkoutPhone)) {
        return false;
      }

      return true;
    },
  },

  created() {
    // Called when Vue instance is created
    this.loadAllLessons();
  },
};
</script>

<style>
</style>
