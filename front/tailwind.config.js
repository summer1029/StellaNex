/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '560':'35rem',
        '68' : "272px",
        '8/30': '26.7%', // 8/30 = 0.26666667 (약 26.67%)
        '22/30': '73.333333%', // 22/30 = 0.73333333 (약 73.33%)
        
      },
      height : {
        '0.1' : "10%",
        '0.2' : "20%",
        '0.3' : "30%",
        '0.7' : "70%"
      },
      minWidth: {
        '22' : '88px'
      }
    },
    fontFamily : {
        "jua" : ["Jua-Regular"],
        "appleB" : ["AppleSDGothicNeoB"],
        "appleM" : ["AppleSDGothicNeoM"],
        "appleL" : ["AppleSDGothicNeoL"],
      },
  },
  plugins: [],
}

