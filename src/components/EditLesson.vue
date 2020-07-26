<template>
  <v-dialog v-model="dialog" max-width="50%">
    <v-card>
      <v-card-title>{{dialogMessage}}</v-card-title>
      <!--
      <v-card-text>
      
        <v-text-field label="class" dense outlined v-model="classText"></v-text-field>
        <v-text-field label="staff" dense outlined v-model="staffText"></v-text-field>
        <v-text-field label="room" dense outlined v-model="roomText"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="info" text @click="store()">store</v-btn>
      </v-card-actions>
      -->
    </v-card>
  </v-dialog>
</template>

<script>
import * as store from "../scripts/store";

export default {
  name: "EditLesson",
  data() {
    return {
      dialogMessage: "xyz",
      classText: null,
      staffText: null,
      roomText: null
    };
  },
  props: {
    row: Number,
    col: Number,
    dialog: Boolean
  },
  mounted() {},
  methods: {
    store() {
      console.log(store.data);
      /*
      store.data.weeks[this.week].rows[this.rowIndex].data[
        this.colIndex
      ].class = this.classText;
      this.data.weeks[this.week].rows[this.rowIndex].data[
        this.colIndex
      ].staff = this.staffText;
      this.data.weeks[this.week].rows[this.rowIndex].data[
        this.colIndex
      ].room = this.roomText;
      */
      this.$emit("updateLesson");
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>