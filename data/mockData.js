const dummyUsers = [
  {
    id: "1",
    name: "Jessica",
    age: 20,
    bio: "Adventurer and foodie. Let's explore together!",
    occupation: "Graphic Designer",
    education: "Parsons School of Design",
    interests: ["Art", "Travel", "Dancing"],
    lookingFor: "Someone adventurous and fun to explore new places with.",
    isVerified: true,
    isOnline: false,
    location: { distance: "2.4 km away", place: "Brooklyn, NY" },
    dob: "Jan 15, 2005",
    height: "170 cm",
    gender: "Female",
    zodiac: "Capricorn",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "video",
        uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "2",
    name: "Daniel",
    age: 30,
    bio: "Tech geek and coffee lover. Looking for a partner in crime.",
    occupation: "Software Developer",
    education: "MIT",
    interests: ["Tech", "Gaming", "Running"],
    lookingFor: "A genuine connection with someone who shares my curiosity.",
    isVerified: false,
    isOnline: true,
    location: { distance: "5.1 km away", place: "Cambridge, MA" },
    dob: "Oct 12, 1995",
    height: "182 cm",
    gender: "Male",
    zodiac: "Libra",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1603415526960-f7e0328f4b1c?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "3",
    name: "Amara",
    age: 27,
    bio: "Musician and writer. Passionate about life and creativity.",
    occupation: "Musician",
    education: "Berklee College of Music",
    interests: ["Music", "Writing", "Yoga"],
    lookingFor: "Someone supportive and equally passionate about art.",
    isVerified: true,
    isOnline: true,
    location: { distance: "1.2 km away", place: "Boston, MA" },
    dob: "Mar 22, 1998",
    height: "165 cm",
    gender: "Female",
    zodiac: "Aries",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "4",
    name: "Liam",
    age: 31,
    bio: "Entrepreneur. Dream big, work hard, stay humble.",
    occupation: "Startup Founder",
    education: "Harvard Business School",
    interests: ["Startups", "Travel", "Reading"],
    lookingFor: "Someone independent with big dreams.",
    isVerified: false,
    isOnline: false,
    location: { distance: "3.7 km away", place: "New York, NY" },
    dob: "Aug 7, 1994",
    height: "178 cm",
    gender: "Male",
    zodiac: "Leo",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "video",
        uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
  },
  {
    id: "5",
    name: "Sarah",
    age: 43,
    bio: "Lover of classical music and poetry. Old soul, young heart.",
    occupation: "Music Teacher",
    education: "Juilliard",
    interests: ["Music", "Poetry", "Travel"],
    lookingFor: "A kind-hearted soul to share meaningful conversations with.",
    isVerified: true,
    isOnline: false,
    location: { distance: "7.5 km away", place: "San Francisco, CA" },
    dob: "May 10, 1982",
    height: "160 cm",
    gender: "Female",
    zodiac: "Taurus",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "6",
    name: "Josline",
    age: 19,
    bio: "Spontaneous and full of life. Let's create memories!",
    occupation: "Student",
    education: "NYU",
    interests: ["Photography", "Fashion", "Dance"],
    lookingFor: "Someone fun and creative who loves adventures.",
    isVerified: true,
    isOnline: true,
    location: { distance: "0.8 km away", place: "Manhattan, NY" },
    dob: "Dec 2, 2006",
    height: "168 cm",
    gender: "Female",
    zodiac: "Sagittarius",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
  {
    id: "7",
    name: "Janice",
    age: 27,
    bio: "Curious about the world. Always learning, always growing.",
    occupation: "Research Scientist",
    education: "Oxford University",
    interests: ["Science", "Books", "Hiking"],
    lookingFor: "An intellectual partner who loves deep conversations.",
    isVerified: true,
    isOnline: false,
    location: { distance: "2.1 km away", place: "London, UK" },
    dob: "Feb 18, 1998",
    height: "172 cm",
    gender: "Female",
    zodiac: "Aquarius",
    media: [
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      },
      {
        type: "image",
        uri: "https://images.unsplash.com/photo-1517256064527-09c73fc73e52?auto=format&fit=crop&w=800&q=80",
      },
    ],
  },
];

const InterestsOptions = [
  {
    id: "1",
    label: "Photography",
    value: "Photography",
    active: true,
    icon: "camera-outline",
  },
  {
    id: "2",
    label: "Movies",
    value: "Movies",
    active: false,
    icon: "checkmark-sharp",
  },
  {
    id: "3",
    label: "Art",
    value: "Art",
    active: true,
    icon: "checkmark-sharp",
  },
  {
    id: "4",
    label: "Yoga",
    value: "Yoga",
    active: false,
    icon: "checkmark-sharp",
  },
];

const ProfileTabs = [
  { id: 1, label: "Profile", value: "Profile", icon: "person" },
  { id: 2, label: "Plans", value: "Plans", icon: "wallet" },
  {
    id: 3,
    label: "Safety and Wellbeing",
    value: "Safety and Wellbeing",
    icon: "shield",
  },
];

const LikeFilterOptions = [
  {
    id: "0",
    label: "All",
    value: "All",
  },
  {
    id: "1",
    label: "Top 10 Picks",
    value: "Top 10 Picks",
  },
  {
    id: "2",
    label: "Near By",
    value: "Near By",
  },
  {
    id: "3",
    label: "Verified",
    value: "Verified",
  },
];

const GenderOptions = [
  { id: "1", label: "Female", value: "Female", icon: "checkmark-sharp" },
  { id: "2", label: "Male", value: "Male", icon: "checkmark-sharp" },
];

const dummyGifts = [
  { id: "1", name: "Rose", icon: "🌹", price: 10 },
  { id: "2", name: "Chocolate", icon: "🍫", price: 20 },
  { id: "3", name: "Wine", icon: "🍷", price: 30 },
  { id: "4", name: "Teddy Bear", icon: "🧸", price: 25 },
  { id: "5", name: "Cake", icon: "🍰", price: 15 },
  { id: "6", name: "Diamond", icon: "💎", price: 50 },
  { id: "7", name: "Crown", icon: "👑", price: 100 },
  { id: "8", name: "Luxury Car", icon: "🚗", price: 200 },
  { id: "9", name: "Vacation", icon: "✈️", price: 300 },
  { id: "10", name: "Ring", icon: "💍", price: 500 },
];

export {
  dummyGifts,
  dummyUsers,
  LikeFilterOptions,
  GenderOptions,
  InterestsOptions,
  ProfileTabs
};
