<template>
  <v-card style="border-radius: 0" height="100%" class="overflow-hidden">
    <v-app-bar color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn @click="handleSendToServer" depressed color="primary">Save</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="handleRoute('/')">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-title @click="handleRoute('/about')"
              >About</v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    handleRoute(to) {
      this.$router.push(to);
    },

    async handleSendToServer() {
      const data = JSON.parse(localStorage.getItem("game"));
      // @TODO Request to save game here
    },
  },
};
</script>

<style lang=""></style>
