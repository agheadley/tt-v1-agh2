<template>
  <v-container fluid>
    <!-- week year select-->
    <v-row align="baseline">
      <v-col cols="2">{{settings.name}}</v-col>
      <v-col cols="3">
        <v-select
          v-model="week"
          :items="settings.weeks"
          label="Week"
          item-text="name"
          item-value="id"
          outlined
          dense
        />
      </v-col>
      <v-col cols="3">
        <v-select
          v-model="year"
          :items="settings.years"
          label="Year"
          item-text="name"
          item-value="id"
          outlined
          dense
        />
      </v-col>
      <v-col cols="4">
        <v-btn
          title="master/block toggle"
          icons
          color="info"
          text
          @click="blockView ? blockView=false : blockView=true"
        >
          <template v-if="!blockView">
            <v-icon>mdi-shape</v-icon>
          </template>
          <template v-else>
            <v-icon>mdi-view-week-outline</v-icon>
          </template>
        </v-btn>

        <v-btn title="import" icons color="info" text @click="load">
          <v-icon>mdi-import</v-icon>
        </v-btn>
        <v-btn title="export" icons color="info" text @click="save">
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- / week year select-->
    <!-- timetable entry-->
    <v-simple-table>
      <thead>
        <tr>
          <th>Year</th>
          <th v-for="header in data.weeks[week].headers" v-bind:key="header.id">{{header.name}}</th>
          <th>
            <v-btn text icon color="red">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row,rowIndex) in data.weeks[week].rows" v-bind:key="rowIndex">
          <th>{{row.year.name}}</th>
          <td
            v-for="(col,colIndex) in row.data"
            v-bind:key="colIndex"
            @click="edit(rowIndex,colIndex)"
          >
            {{col.class}}
            <br>
            <b>{{col.staff}}</b>
            <br>
            <i>{{col.room}}</i>
          </td>
          <th>
            <v-btn text icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </th>
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
    <!-- edit dialog -->
    <v-dialog v-model="dialog" max-width="50%">
      <v-card>
        <v-card-title>{{dialogMessage}}</v-card-title>
        <v-card-text>
          <v-text-field label="class" dense outlined v-model="classText"></v-text-field>
          <v-text-field label="staff" dense outlined v-model="staffText"></v-text-field>
          <v-text-field label="room" dense outlined v-model="roomText"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="info" text @click="store()">store</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- / edit dialog -->
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
      year: 0,

      blockView: false,

      dialog: false,
      dialogMessage: "",
      rowIndex: null,
      colIndex: null,
      classText: null,
      staffText: null,
      roomText: null
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
    },
    store() {
      this.data.weeks[this.week].rows[this.rowIndex].data[
        this.colIndex
      ].class = this.classText;
      this.data.weeks[this.week].rows[this.rowIndex].data[
        this.colIndex
      ].staff = this.staffText;
      this.data.weeks[this.week].rows[this.rowIndex].data[
        this.colIndex
      ].room = this.roomText;

      this.dialog = false;
    },
    edit(rowIndex, colIndex) {
      this.dialogMessage = "[ " + this.data.weeks[this.week].name + " ";
      this.dialogMessage +=
        this.data.weeks[this.week].rows[rowIndex].year.name + " ] ";
      this.dialogMessage += this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].name;
      this.rowIndex = rowIndex;
      this.colIndex = colIndex;

      this.classText = this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].class;
      this.staffText = this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].staff;
      this.roomText = this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].room;

      this.dialog = true;
    },
    load() {},
    save() {}
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
td {
  max-width: 5em;
  overflow: hidden;
}
</style>
