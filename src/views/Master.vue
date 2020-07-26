<template>
  <v-container fluid>
    <v-row align="baseline">
      <v-col cols="2">{{settings.name}}</v-col>
      <!-- week year block select-->
      <v-col cols="3">
        <WeekSelect v-bind:weeks="settings.weeks" v-on:updateWeek="week=$event"></WeekSelect>
      </v-col>

      <v-col cols="3">
        <YearSelect v-bind:years="settings.years" v-on:updateYear="year=$event"></YearSelect>
      </v-col>
      <v-col cols="1">
        <AllYearSelect v-on:updateAllYears="isAllYears=$event;"></AllYearSelect>
      </v-col>
      <!-- / week year block select-->
      <v-col cols="3">
        <BlockSelect v-on:updateBlock="isBlock=$event"></BlockSelect>
      </v-col>
    </v-row>

    <!-- timetable entry-->
    <template v-if="!isBlock">
      <v-simple-table>
        <thead>
          <tr>
            <th>Block</th>
            <th
              v-for="(header,headerIndex) in data.weeks[week].headers"
              :style="getColor(headerIndex)"
              v-bind:key="header.id"
            >{{header.block}}</th>
            <th></th>
          </tr>

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
    </template>

    <template v-if="isBlock">
      <v-simple-table>
        <thead>
          <tr>
            <th>Block</th>
            <th v-for="header in data.weeks[week].blocks" v-bind:key="header.id">{{header.block}}</th>
            <th></th>
          </tr>
          <tr>
            <th>Year</th>
            <th v-for="header in data.weeks[week].blocks" v-bind:key="header.id">{{header.name}}</th>
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
              v-for="header in data.weeks[week].blocks"
              v-bind:key="header.id"
              @click="edit(rowIndex,header.headersIndex)"
            >
              {{row.data[header.headersIndex].class}}
              <br>
              <b>{{row.data[header.headersIndex].staff}}</b>
              <br>
              <i>{{row.data[header.headersIndex].room}}</i>
            </td>
            <th>
              <v-btn text icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </th>
          </tr>
        </tbody>
      </v-simple-table>
    </template>

    <!-- /timetable entry-->
    <!-- add row-->
    <br>
    <v-btn @click="addRow" title="add row" fab dark small color="info">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
    <!-- / add row-->
    <!-- edit dialog -->
    <EditLesson
      v-bind:dialog="isDialog"
      v-bind:row="row"
      v-bind:col="col"
      v-on:updateLesson="updateLesson"
    ></EditLesson>
    <!--
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
    -->
    <!-- / edit dialog -->
  </v-container>
</template>

<script>
import * as store from "../scripts/store";
import WeekSelect from "../components/WeekSelect";
import YearSelect from "../components/YearSelect";
import BlockSelect from "../components/BlockSelect";
import AllYearSelect from "../components/AllYearSelect";
import EditLesson from "../components/EditLesson";

export default {
  name: "Master",
  components: {
    WeekSelect,
    YearSelect,
    BlockSelect,
    AllYearSelect,
    EditLesson
  },
  data() {
    return {
      settings: null,
      data: null,
      week: 0,
      year: 0,

      isBlock: false,
      isAllYears: false,

      isDialog: false,
      row: null,
      col: null
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
      //console.log(this.data.weeks[0]);
    },
    updateLesson() {
      console.log("updateLesson()");
      this.isDialog=false;
    },

    edit(rowIndex, colIndex) {
      /*
      this.dialogMessage = "[ " + this.data.weeks[this.week].name + " ";
      this.dialogMessage +=
        this.data.weeks[this.week].rows[rowIndex].year.name + " ] ";
      this.dialogMessage += this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].name;
      */
      this.row = rowIndex;
      this.col = colIndex;
      /*
      this.classText = this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].class;
      this.staffText = this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].staff;
      this.roomText = this.data.weeks[this.week].rows[rowIndex].data[
        colIndex
      ].room;
      */
      console.log(this.row, this.col);

      this.isDialog = true;
    },

    getColor(headerIndex) {
      let block = this.data.weeks[this.week].headers[headerIndex].block;
      let style = "";
      if (block !== "") {
        let colorArr = this.settings.blocks.filter(el => el.name === block);
        //console.log(colorArr);
        style = "background-color:" + colorArr[0].color;
      }
      return style;
    }
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
