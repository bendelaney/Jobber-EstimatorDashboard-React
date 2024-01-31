// here's some data:
const data = [
  {
    "id": "1",
    "name": "Monday",
    "type": "Day",
    "children": [
      {
        "id": "uMon",
        "name": "Unassigned Members",
        "type": "Unassigned",
        "children": []
      },
      {
        "id": "11",
        "name": "Job1",
        "type": "Job",
        "children": [
          { "id": "111", "type": "Member", "name": "Member1" },
          { "id": "112", "type": "Member", "name": "Member2" },
          { "id": "113", "type": "Member", "name": "Member3" }
        ]
      },
      {
        "id": "12",
        "name": "Job2",
        "type": "Job",
        "children": [
          { "id": "121", "type": "Member", "name": "Member1" },
          { "id": "122", "type": "Member", "name": "Member2" }
        ]
      }
    ]
  },
  {
    "id": "2",
    "name": "Tuesday",
    "type": "Day",
    "children": [
      {
        "id": "uTues",
        "name": "Unassigned Members",
        "type": "Unassigned",
        "children": []
      },
      {
        "id": "21",
        "name": "Job1",
        "type": "Job",
        "children": [
          { "id": "211", "type": "Member", "name": "Member1" },
          { "id": "212", "type": "Member", "name": "Member2" },
          { "id": "213", "type": "Member", "name": "Member3" },
          { "id": "214", "type": "Member", "name": "Member4" }
        ]
      },
      {
        "id": "22",
        "name": "Job2",
        "type": "Job",
        "children": [
          { "id": "221", "type": "Member", "name": "Member1" },
          { "id": "222", "type": "Member", "name": "Member2" },
          { "id": "223", "type": "Member", "name": "Member3" }
        ]
      },
      {
        "id": "23",
        "name": "Job3",
        "type": "Job",
        "children": [
          { "id": "231", "type": "Member", "name": "Member1" },
          { "id": "232", "type": "Member", "name": "Member2" }
        ]
      }
    ]
  },
  {
    "id": "3",
    "name": "Wednesday",
    "type": "Day",
    "children": [
      {
        "id": "uWed",
        "name": "Unassigned Members",
        "type": "Unassigned",
        "children": []
      },
      {
        "id": "31",
        "name": "Job1",
        "type": "Job",
        "children": [
          { "id": "311", "type": "Member", "name": "Member1" },
          { "id": "312", "type": "Member", "name": "Member2" },
          { "id": "313", "type": "Member", "name": "Member3" }
        ]
      },
      {
        "id": "32",
        "name": "Job2",
        "type": "Job",
        "children": [
          { "id": "321", "type": "Member", "name": "Member1" },
          { "id": "322", "type": "Member", "name": "Member2" },
          { "id": "323", "type": "Member", "name": "Member3" },
          { "id": "324", "type": "Member", "name": "Member4" },
          { "id": "325", "type": "Member", "name": "Member5" }
        ]
      }
    ]
  },
  {
    "id": "4",
    "name": "Thursday",
    "type": "Day",
    "children": [
      {
        "id": "uThurs",
        "name": "Unassigned Members",
        "type": "Unassigned",
        "children": []
      },
      {
        "id": "41",
        "name": "Job1",
        "type": "Job",
        "children": [
          { "id": "411", "type": "Member", "name": "Member1" },
          { "id": "412", "type": "Member", "name": "Member2" },
          { "id": "413", "type": "Member", "name": "Member3" },
          { "id": "414", "type": "Member", "name": "Member4" }
        ]
      },
      {
        "id": "42",
        "name": "Job2",
        "type": "Job",
        "children": [
          { "id": "421", "type": "Member", "name": "Member1" },
          { "id": "422", "type": "Member", "name": "Member2" },
          { "id": "423", "type": "Member", "name": "Member3" }
        ]
      }
    ]
  },
  {
    "id": "5",
    "name": "Friday",
    "type": "Day",
    "children": [
      {
        "id": "uFri",
        "name": "Unassigned Members",
        "type": "Unassigned",
        "children": []
      },
      {
        "id": "51",
        "name": "Job1",
        "type": "Job",
        "children": [
          { "id": "511", "type": "Member", "name": "Member1" },
          { "id": "512", "type": "Member", "name": "Member2" },
          { "id": "513", "type": "Member", "name": "Member3" },
          { "id": "514", "type": "Member", "name": "Member4" },
          { "id": "515", "type": "Member", "name": "Member5" }
        ]
      },
      {
        "id": "52",
        "name": "Job2",
        "type": "Job",
        "children": [
          { "id": "521", "type": "Member", "name": "Member1" },
          { "id": "522", "type": "Member", "name": "Member2" },
          { "id": "523", "type": "Member", "name": "Member3" }
        ]
      }
    ]
  }
];


