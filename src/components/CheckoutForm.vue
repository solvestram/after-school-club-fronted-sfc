<template>
  <div>
    <!-- Checkout -->
    <div class="container mb-4">
      <p class="h3">Checkout</p>
      <div id="checkout">
        <div class="form-row">
          <label for="checkoutName" class="col col-form-label">Name: </label>
          <div class="col w-25">
            <input
              type="text"
              class="form-control"
              id="checkoutName"
              v-model="checkoutName"
            />
          </div>
        </div>
        <div class="form-row">
          <label for="checkoutPhone" class="col-auto col-form-label"
            >Phone number:
          </label>
          <div class="col w-25">
            <input
              type="tel"
              class="form-control"
              id="checkoutPhone"
              v-model="checkoutPhone"
            />
          </div>
        </div>
        <div class="form-row pt-3">
          <div class="col">
            <button
              :disabled="!checkoutEnabled"
              class="btn btn-primary shadow-none"
              v-on:click="checkout()"
            >
              Check out
            </button>
          </div>
        </div>
        <div v-if="orderConfirmed" class="form-row pt-3">
          <div class="col w-25 order-confirmation alert alert-success">
            The order has been submitted
          </div>
        </div>
      </div>
    </div>

    <!-- List of lessons in the cart -->
    <div class="container mb-4">
      <p class="h3">Shopping cart</p>
      <div class="row row-cols-4 g-4">
        <div class="col" v-for="lesson in cartItems" :key="lesson.id">
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
            </div>

            <button
              class="btn btn-danger shadow-none"
              :disabled="orderConfirmed"
              v-on:click="removeFromCart(lesson)"
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckoutForm",
  props: ["cartItems", "apiUrl"],
  data() {
    return {
      checkoutName: "",
      checkoutPhone: "",

      // true when checkout button is used
      orderConfirmed: false,
    };
  },
  methods: {
    // check out order
    checkout() {
      // sending order to API (separate request for each lesson in the cart)
      // a lot of things here could be done better
      this.cartItems.forEach((lesson) => {
        let order = {
          name: this.checkoutName,
          phone_number: this.checkoutPhone,
          lesson_id: lesson._id,
          space: 1,
        };

        // POST new order
        fetch(this.apiUrl + "/collections/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log("Success: ", response);
          });

        // Update space
        let updatedSpace = {
          space: lesson.space,
        };
        fetch(this.apiUrl + "/collections/lessons/" + lesson._id, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedSpace),
        })
          .then((response) => response.json())
          .then((response) => {
            console.log("Success: ", response);
          });
      });

      // Reset checkout input fields
      this.checkoutName = "";
      this.checkoutPhone = "";

      // Show confirmation message
      this.orderConfirmed = true;
    },

    removeFromCart(lesson) {
      this.$emit("removeFromCart", lesson);
    },
  },
  computed: {
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
};
</script>

<style>
</style>