<template>
  <v-container fluid>
    <!-- week year select-->
    <v-row align="baseline">
      <v-col>{{settings.name}}</v-col>
      <v-col>
        <v-select
          v-model="week"
          :items="settings.weeks"
          label="Week"
          item-text="name"
          item-value="id"
          outlined
        />
      </v-col>
      <v-col>
        <v-select
          v-model="year"
          :items="settings.years"
          label="Year"
          item-text="name"
          item-value="id"
          outlined
        />
      </v-col>
      <v-col></v-col>
    </v-row>
    <!-- / week year select-->
    <!-- timetable entry-->
    <v-simple-table>
      <thead>
        <tr>
          <th>Year</th>
          <th v-for="header in data.weeks[week].headers" v-bind:key="header.id">{{header.name}}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,rowIndex) in data.weeks[week].rows" v-bind:key="rowIndex">
          <th>{{row.year.name}}</th>
          <td v-for="(col,colIndex) in row.data" v-bind:key="colIndex">class
            <br>staff
            <br>

            room
          </td>
        </tr>
      </tbody>
    </v-simple-table>

    <!-- /timetable entry-->
    <!-- add row-->
    <br>
    <v-btn @click="addRow" title="add row" fab dark small color="info">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <!-- / add row-->
  </v-container>
</template>

<script>
import * as store from "../scripts/store";

export default {
  name: "Master",
  data() {
    return {
      settings: null,
      data: null,
      week: 0,
      year: 0
    };
  },
  created() {
    this.settings = store.getSettings();
    this.data = store.getData();
  },
  methods: {
    addRow() {
      store.addRow(this.week, this.year);
      this.data = store.getData();
      console.log(this.data.weeks[0]);
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
