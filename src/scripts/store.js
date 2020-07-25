let store = {};

store.settings = {};

store.data = {};

store.init = {
  name: "timetable1",
  years: [
    { id: 0, name: "13" },
    { id: 1, name: "12" },
    { id: 2, name: "10" },
    { id: 3, name: "9" },
    { id: 4, name: "X" }
  ],
  weeks: [{ id: 0, name: "A" }, { id: 1, name: "B" }],
  blocks: [
    { block: "A", color: "#eeeeee" },
    { block: "B", color: "#eeeeee" },
    { block: "C", color: "#eeeeee" }
  ],
  lessons: [
    { day: "M", period: "1", id: 1, week: "A", block: "A" },
    { day: "M", period: "2", id: 2, week: "A", block: "A" },
    { day: "M", period: "3", id: 3, week: "A", block: "A" },
    { day: "M", period: "4", id: 4, week: "A", block: "A" },
    { day: "Tu", period: "1", id: 5, week: "A", block: "B" },
    { day: "Tu", period: "2", id: 6, week: "A", block: "A" },
    { day: "Tu", period: "3", id: 7, week: "A", block: "B" },
    { day: "Tu", period: "4", id: 8, week: "A", block: "C" },
    { day: "W", period: "2", id: 9, week: "B", block: "B" },
    { day: "Th", period: "3", id: 10, week: "B", block: "C" }
  ],
  subjects: [
    { department: "ENG", subject: "E" },
    { department: "ENG", subject: "Eli" },
    { department: "MAT", subject: "M" },
    { department: "CHE", subject: "C" }
  ],
  rooms: [
    { department: "ENG", room: "E1" },
    { department: "ENG", room: "E2" },
    { department: "MAT", room: "M1" },
    { department: "CHE", room: "C1" }
  ]
};

let init = () => {
  store.settings = JSON.parse(JSON.stringify(store.init));
  store.data.weeks = [];
  for (let week of store.settings.weeks) {
    let weekObj = { name: week.name, id: week.id, headers: [], rows: [] };
    for (let lesson of store.settings.lessons) {
      if (lesson.week === week.name) {
        let obj = {};
        obj.name = lesson.day + lesson.period;
        obj.day = lesson.day;
        obj.period = lesson.period;
        obj.id = lesson.id;
        obj.block = lesson.block;
        weekObj.headers.push(obj);
      }
    }

    store.data.weeks.push(weekObj);
  }
  console.log("init()", store.data.weeks);
};

let getSettings = () => {
  return JSON.parse(JSON.stringify(store.settings));
};

let getData = () => {
  return JSON.parse(JSON.stringify(store.data));
};

let addRow = (weekIndex, yearIndex) => {
  let row = [];
  for (let lesson of store.data.weeks[weekIndex].headers) {
    row.push({
      name: lesson.name,
      id: lesson.id,
      class: "",
      staff: "",
      room: ""
    });
  }

  store.data.weeks[weekIndex].rows.push({
    year: store.settings.years[yearIndex],
    data: row
  });
  console.log("addRow()", store.data.weeks);
};

export { init, getSettings, getData, addRow };
