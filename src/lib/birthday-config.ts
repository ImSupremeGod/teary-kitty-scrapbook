/**
 * ✏️ PERSONALIZATION — edit everything in this one file.
 * Values in [BRACKETS] are placeholders that must be replaced before sharing.
 */
export const CONFIG = {
  recipientName: "[HER_NAME_OR_NICKNAME]",
  birthday: "[BIRTHDAY_DATE]",
  creatorName: "[YOUR_NAME_OR_NICKNAME]",
  /** Optional, e.g. "919876543210". Leave empty to show a Copy button instead. */
  whatsappNumber: "",
  insideJokes: ["[INSIDE_JOKE_1]", "[INSIDE_JOKE_2]", "[INSIDE_JOKE_3]"],
  thingsILike: ["[PERSONAL_DETAIL_1]", "[PERSONAL_DETAIL_2]", "[PERSONAL_DETAIL_3]"],
  date: {
    location: "[DATE_LOCATION]",
    activity: "[DATE_ACTIVITY_OR_LET_HER_CHOOSE]",
    budget: "[DATE_BUDGET]",
  },
  /** Evidence cards for the investigation. Add a `photo` URL to replace the placeholder. */
  evidence: [
    {
      title: "EXHIBIT A: CERTIFIED CUTIE",
      caption:
        "Evidence strongly suggests that this individual is excessively adorable. The investigation remains ongoing.",
      reveal: "[SHARED_MEMORY_1]",
      photo: "" as string,
    },
    {
      title: "EXHIBIT B: SUSPICIOUS SMILE",
      caption: "Witnesses report sudden mood improvements whenever this smile appears. Highly dangerous.",
      reveal: "[SHARED_MEMORY_2]",
      photo: "" as string,
    },
    {
      title: "EXHIBIT C: CRIMES OF CUTENESS",
      caption: "Repeat offender. Shows zero remorse. Somehow still innocent.",
      reveal: "[SHARED_MEMORY_3]",
      photo: "" as string,
    },
  ],
  messages: [
    { id: "playful_affection", title: "The Funny Truth 💕", body: "[EDITABLE_PERSONAL_MESSAGE_1]" },
    { id: "heartfelt", title: "Something Real 🥺", body: "[EDITABLE_PERSONAL_MESSAGE_2]" },
    { id: "flirty", title: "A Little Trouble 😏", body: "[EDITABLE_PERSONAL_MESSAGE_3]" },
  ],
  finale: {
    joke: "SYSTEM ALERT 🤡: Birthday girl is now 1 year older. Cuteness, however, refuses to age. Bug report filed. Developer says: won't fix.",
    secret: "[SHORT_WARM_SECRET_MESSAGE]",
    risky: "You pressed it. Brave. Here's your surprise: one free hug coupon, valid whenever you want it, no expiry date. 😏🎀",
    developerSecret: "[DEVELOPER_SECRET_MESSAGE]",
  },
};

export type Gift = {
  id: string;
  name: string;
  description: string;
  lotteryEligible: boolean;
  customField?: boolean;
  message?: string;
};

/** Single gift catalogue. The lottery pool is derived from `lotteryEligible`. */
export const GIFTS: Gift[] = [
  {
    id: "date",
    name: "A Date ❤️",
    description: "A cute date together, planned around what you would enjoy.",
    lotteryEligible: true,
    message:
      "DATE UNLOCKED! 💗 Your mission: choose a date you would love. My mission: make it ridiculously cute.",
  },
  { id: "dance_video", name: "My Dance Video 💃", description: "A personalized dance video made for you.", lotteryEligible: false },
  { id: "makeup_set", name: "A Makeup Set of Your Choice 💄", description: "A makeup set you get to choose.", lotteryEligible: false },
  { id: "book_set", name: "A New Book Set 📚", description: "A set of books picked for your reading taste.", lotteryEligible: false },
  {
    id: "massage",
    name: "At Least 40 Minutes of Genuine Massage 💆",
    description: "At least 40 minutes of relaxing massage, totally at your comfort.",
    lotteryEligible: true,
    message: "RELAXATION QUEEN UNLOCKED 🧸💆 Minimum 40 minutes of actual relaxation. No pressure, just comfort.",
  },
  { id: "phone", name: "A New Phone 📱", description: "A new phone; model and details to be discussed separately.", lotteryEligible: false },
  {
    id: "custom_gift",
    name: "Your Own Wish 🎀",
    description: "Write any gift you want in the blank field.",
    lotteryEligible: true,
    customField: true,
    message: "YOUR WISH HAS BEEN UNLOCKED 🎀 The birthday gift department is both excited and slightly nervous.",
  },
  {
    id: "mystery_0120_a",
    name: "Mystery Gift 0120 🎭",
    description: "First mystery gift; details to be decided.",
    lotteryEligible: true,
    message: "MYSTERY UNLOCKED! 🎭 The suspense is part of the gift, you little detective.",
  },
  {
    id: "mystery_0120_b",
    name: "Mystery Gift 0120 🎲",
    description: "Second, separate mystery gift; details to be decided.",
    lotteryEligible: true,
    message: "DOUBLE MYSTERY ENERGY 🎲 Apparently, one surprise was not enough.",
  },
];
