'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// score definition
var score = {
  title: 'Nescient Mater Virgo Virum - Jean Mouton (1459-1522)',
  duration: 5 * 60,
  parts: {
    // links

    'Superius 2': {
      type: 'performer',
      file: 'videos/S1.mp4'
    },
    'Superius': {
      type: 'performer',
      file: 'videos/A1.mp4'
    },
    'Contra 2': {
      type: 'performer',
      file: 'videos/S2.mp4'
    },

    'Contra': {
      type: 'performer',
      file: 'videos/A2.mp4'
    },
    'Tenor 2': {
      type: 'performer',
      file: 'videos/T1.mp4'
    },
    'Tenor': {
      type: 'performer',
      file: 'videos/T2.mp4'
    },
    'Bassus 2': {
      type: 'performer',
      file: 'videos/B1.mp4'
    },
    'Bassus': {
      type: 'performer',
      file: 'videos/B2.mp4'
    },

    'fullscore': {
      type: 'env',
      file: 'videos/test2.mp4'
    }
    // env
  },
  sections: {

    alpha: {
      time: 0,
      label: "Page 1"
    },
    qalpha: {
      time: 24,
      label: "Page 2"
    },
    beta: {
      time: 52,
      label: "Page 3"
    },
    bwdeta: {
      time: 76,
      label: "Page 4"
    },
    gamma: {
      time: 104,
      label: "Page 5"
    },
    delta: {
      time: 132,
      label: "Page 6"
    },
    epsi: {
      time: 161,
      label: "Page 7"
    },
    kepsi: {
      time: 192,
      label: "Page 8"
    },
    epsilon: {
      time: 222,
      label: "Page 9"
    },
    dzeta: {
      time: 251,
      label: "Page 10"
    },
    eta: {
      time: 273,
      label: "Page 11"
    }
  }
};

exports.default = score;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjb3JlLmpzIl0sIm5hbWVzIjpbInNjb3JlIiwidGl0bGUiLCJkdXJhdGlvbiIsInBhcnRzIiwidHlwZSIsImZpbGUiLCJzZWN0aW9ucyIsImFscGhhIiwidGltZSIsImxhYmVsIiwicWFscGhhIiwiYmV0YSIsImJ3ZGV0YSIsImdhbW1hIiwiZGVsdGEiLCJlcHNpIiwia2Vwc2kiLCJlcHNpbG9uIiwiZHpldGEiLCJldGEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQSxJQUFNQSxRQUFRO0FBQ1pDLFNBQU8sc0RBREs7QUFFWkMsWUFBVSxJQUFJLEVBRkY7QUFHWkMsU0FBTztBQUNMOztBQUVBLGtCQUFjO0FBQ1pDLFlBQU0sV0FETTtBQUVaQyxZQUFNO0FBRk0sS0FIVDtBQU9ELGdCQUFZO0FBQ2RELFlBQU0sV0FEUTtBQUVkQyxZQUFNO0FBRlEsS0FQWDtBQVdMLGdCQUFZO0FBQ1ZELFlBQU0sV0FESTtBQUVWQyxZQUFNO0FBRkksS0FYUDs7QUFnQkwsY0FBVTtBQUNSRCxZQUFNLFdBREU7QUFFUkMsWUFBTTtBQUZFLEtBaEJMO0FBb0JMLGVBQVc7QUFDVEQsWUFBTSxXQURHO0FBRVRDLFlBQU07QUFGRyxLQXBCTjtBQXdCTCxhQUFTO0FBQ1BELFlBQU0sV0FEQztBQUVQQyxZQUFNO0FBRkMsS0F4Qko7QUE0QkwsZ0JBQVk7QUFDVkQsWUFBTSxXQURJO0FBRVZDLFlBQU07QUFGSSxLQTVCUDtBQWdDTCxjQUFVO0FBQ1JELFlBQU0sV0FERTtBQUVSQyxZQUFNO0FBRkUsS0FoQ0w7O0FBcUNMLGlCQUFhO0FBQ1hELFlBQU0sS0FESztBQUVYQyxZQUFNO0FBRks7QUFJYjtBQXpDSyxHQUhLO0FBOENaQyxZQUFVOztBQUVSQyxXQUFPO0FBQ0xDLFlBQU0sQ0FERDtBQUVMQyxhQUFPO0FBRkYsS0FGQztBQU1SQyxZQUFRO0FBQ05GLFlBQU0sRUFEQTtBQUVOQyxhQUFPO0FBRkQsS0FOQTtBQVVSRSxVQUFNO0FBQ0pILFlBQU0sRUFERjtBQUVKQyxhQUFPO0FBRkgsS0FWRTtBQWNURyxZQUFRO0FBQ0xKLFlBQU0sRUFERDtBQUVMQyxhQUFPO0FBRkYsS0FkQztBQWtCUkksV0FBTztBQUNMTCxZQUFNLEdBREQ7QUFFTEMsYUFBTztBQUZGLEtBbEJDO0FBc0JSSyxXQUFPO0FBQ0xOLFlBQU0sR0FERDtBQUVMQyxhQUFPO0FBRkYsS0F0QkM7QUEwQk5NLFVBQU07QUFDTlAsWUFBTSxHQURBO0FBRU5DLGFBQU87QUFGRCxLQTFCQTtBQThCTk8sV0FBTztBQUNQUixZQUFNLEdBREM7QUFFUEMsYUFBTztBQUZBLEtBOUJEO0FBa0NSUSxhQUFTO0FBQ1BULFlBQU0sR0FEQztBQUVQQyxhQUFPO0FBRkEsS0FsQ0Q7QUFzQ1JTLFdBQU87QUFDTFYsWUFBTSxHQUREO0FBRUxDLGFBQU87QUFGRixLQXRDQztBQTBDUlUsU0FBSztBQUNIWCxZQUFNLEdBREg7QUFFSEMsYUFBTztBQUZKO0FBMUNHO0FBOUNFLENBQWQ7O2tCQStGZVQsSyIsImZpbGUiOiJzY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNjb3JlIGRlZmluaXRpb25cbmNvbnN0IHNjb3JlID0ge1xuICB0aXRsZTogJ05lc2NpZW50IE1hdGVyIFZpcmdvIFZpcnVtIC0gSmVhbiBNb3V0b24gKDE0NTktMTUyMiknLFxuICBkdXJhdGlvbjogNSAqIDYwLCBcbiAgcGFydHM6IHtcbiAgICAvLyBsaW5rc1xuXG4gICAgJ1N1cGVyaXVzIDInOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvUzEubXA0JyxcbiAgICB9LFxuICAgICAgICAnU3VwZXJpdXMnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvQTEubXA0JyxcbiAgICB9LFxuICAgICdDb250cmEgMic6IHtcbiAgICAgIHR5cGU6ICdwZXJmb3JtZXInLFxuICAgICAgZmlsZTogJ3ZpZGVvcy9TMi5tcDQnLFxuICAgIH0sXG5cbiAgICAnQ29udHJhJzoge1xuICAgICAgdHlwZTogJ3BlcmZvcm1lcicsXG4gICAgICBmaWxlOiAndmlkZW9zL0EyLm1wNCcsXG4gICAgfSxcbiAgICAnVGVub3IgMic6IHtcbiAgICAgIHR5cGU6ICdwZXJmb3JtZXInLFxuICAgICAgZmlsZTogJ3ZpZGVvcy9UMS5tcDQnLFxuICAgIH0sXG4gICAgJ1Rlbm9yJzoge1xuICAgICAgdHlwZTogJ3BlcmZvcm1lcicsXG4gICAgICBmaWxlOiAndmlkZW9zL1QyLm1wNCcsXG4gICAgfSxcbiAgICAnQmFzc3VzIDInOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvQjEubXA0JyxcbiAgICB9LFxuICAgICdCYXNzdXMnOiB7XG4gICAgICB0eXBlOiAncGVyZm9ybWVyJyxcbiAgICAgIGZpbGU6ICd2aWRlb3MvQjIubXA0JyxcbiAgICB9LFxuXG4gICAgJ2Z1bGxzY29yZSc6IHtcbiAgICAgIHR5cGU6ICdlbnYnLFxuICAgICAgZmlsZTogJ3ZpZGVvcy90ZXN0Mi5tcDQnLFxuICAgIH0sXG4gICAgLy8gZW52XG4gIH0sXG4gIHNlY3Rpb25zOiB7XG5cbiAgICBhbHBoYToge1xuICAgICAgdGltZTogMCxcbiAgICAgIGxhYmVsOiBcIlBhZ2UgMVwiLFxuICAgIH0sXG4gICAgcWFscGhhOiB7XG4gICAgICB0aW1lOiAyNCxcbiAgICAgIGxhYmVsOiBcIlBhZ2UgMlwiLFxuICAgIH0sXG4gICAgYmV0YToge1xuICAgICAgdGltZTogNTIsXG4gICAgICBsYWJlbDogXCJQYWdlIDNcIixcbiAgICB9LFxuICAgYndkZXRhOiB7XG4gICAgICB0aW1lOiA3NixcbiAgICAgIGxhYmVsOiBcIlBhZ2UgNFwiLFxuICAgIH0sXG4gICAgZ2FtbWE6IHtcbiAgICAgIHRpbWU6IDEwNCxcbiAgICAgIGxhYmVsOiBcIlBhZ2UgNVwiLFxuICAgIH0sXG4gICAgZGVsdGE6IHtcbiAgICAgIHRpbWU6IDEzMixcbiAgICAgIGxhYmVsOiBcIlBhZ2UgNlwiLFxuICAgIH0sXG4gICAgICBlcHNpOiB7XG4gICAgICB0aW1lOiAxNjEsXG4gICAgICBsYWJlbDogXCJQYWdlIDdcIixcbiAgICB9LFxuICAgICAga2Vwc2k6IHtcbiAgICAgIHRpbWU6IDE5MixcbiAgICAgIGxhYmVsOiBcIlBhZ2UgOFwiLFxuICAgIH0sXG4gICAgZXBzaWxvbjoge1xuICAgICAgdGltZTogMjIyLFxuICAgICAgbGFiZWw6IFwiUGFnZSA5XCIsXG4gICAgfSxcbiAgICBkemV0YToge1xuICAgICAgdGltZTogMjUxLFxuICAgICAgbGFiZWw6IFwiUGFnZSAxMFwiLFxuICAgIH0sXG4gICAgZXRhOiB7XG4gICAgICB0aW1lOiAyNzMsXG4gICAgICBsYWJlbDogXCJQYWdlIDExXCIsXG4gICAgfSxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHNjb3JlO1xuIl19