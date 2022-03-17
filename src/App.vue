<template>
  <div id="app"></div>
</template>

<script>
import LessonsList from "./components/LessonsList.vue";
import CheckoutForm from "./components/CheckoutForm.vue";

export default {
  name: "App",
  components: { LessonsList, CheckoutForm },
  data() {
    return {
      lessons: [],

      // shopping cart properties
      cartItems: [],
      showCart: false,
    }
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
      }).then((response) => {
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
