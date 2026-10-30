/**
 * ✏️ PERSONALIZATION — edit everything in this one file.
 * Values in [BRACKETS] are placeholders that must be replaced before sharing.
 */
import asgardPhoto from "@/assets/universe-asgard.webp.asset.json";

export const CONFIG = {
  recipientName: "Anusha",
  birthday: "[BIRTHDAY_DATE]",
  creatorName: "Shanu",
  /** Optional, e.g. "919876543210". Leave empty to show a Copy button instead. */
  whatsappNumber: "",
  insideJokes: ["[INSIDE_JOKE_1]", "[INSIDE_JOKE_2]", "[INSIDE_JOKE_3]"],
  thingsILike: ["[PERSONAL_DETAIL_1]", "[PERSONAL_DETAIL_2]", "[PERSONAL_DETAIL_3]"],
  date: {
    location: "[DATE_LOCATION]",
    activity: "[DATE_ACTIVITY_OR_LET_HER_CHOOSE]",
    budget: "[DATE_BUDGET]",
  },
  /**
   * Evidence cards for the investigation ("Us, In Other Universes").
   * Each universe: optional `photo` URL, optional `chat` lines (Me/You), and a `reveal`.
   * "inspect" opens the image together with the message.
   */
  evidence: [
    {
      title: "UNIVERSE: ASGARD ⚡🔨",
      photo: asgardPhoto.url,
      chat: [
        { me: "Babe, I'm the one who commands lightning! How are you lifting Mjolnir?! 😭" },
        { you: "Maybe the hammer has better taste. Now say sorry! 😂" },
      ],
      reveal: "I might be worthy of Mjolnir, but you're the only one who can make this God of Thunder surrender. And honestly? I'd find you in every universe, just to lose another argument with you. ❤️⚡",
    },
    {
      title: "UNIVERSE B: THE RAINY BUS STOP ☔",
      caption: "One umbrella, two strangers, zero personal space. Scientists confirm the rain was not the reason neither of us left.",
      reveal: "Even as strangers, you'd still be my favorite person.",
    },
    {
      title: "UNIVERSE C: THE CAT CAFÉ 🐱",
      caption: "We fight over the last cat sticker. You win, obviously. Some things are constant across all timelines.",
      reveal: "Every timeline has the same ending: you, me, and a little chaos.",
    },
    {
      title: "UNIVERSE D: THE BOOKSTORE 📖",
      caption:
        "In this universe, we both reach for the same book at the exact same moment. Classic meet-cute. The book is terrible. We don't care.",
      reveal: "In every universe, I still pick you first.",
    },
  ],
  messages: [
    {
      id: "playful_affection",
      title: "The Funny Truth 💕",
      body: "I have a feeling you argue even when you know you're wrong, just because admitting defeat would hurt your ego. 😂 And somehow, I can already imagine you reading this, disagreeing with me, and proving my point. Please don't disappoint me. 😭",
    },
    {
      id: "heartfelt",
      title: "Something Real 🥺",
      body: "I hope you never feel you have to be happy all the time to be loved, or pretend to have everything figured out. You can have bad days, change your mind, overthink the smallest things, and still be someone worth staying for. You're allowed to take your time, change your mind, make mistakes, and start over. You don't have to be perfect to be precious to someone.",
    },
    {
      id: "flirty",
      title: "A Little Trouble 😏",
      body: "Be honest, how many times have you read a message, smiled at your screen, and then replied like the most innocent person on Earth? 😂 I feel like you could cause chaos and still somehow convince everyone you're the victim. 😭❤️",
    },
  ],
  finale: {
    joke: "You can't keep looking that good and expect me to have respectable thoughts.",
    secretTitle: "Pssst, Anusha 💕",
    secret: `Sometimes I genuinely wonder how one person can be this beautiful and still have no idea what she's doing to my heart. You give me butterflies, make me lose my mind, fill me with a warmth I can't explain, and give me thoughts that are definitely not always innocent. Sometimes I just want to pull you closer, kiss you until I forget the world exists, and then hold you quietly like that's the only place I belong. ❤️‍🔥

But you know what? Beyond all the beauty that catches my eyes, there's a girl I genuinely wish life would be a little gentler with. I hope you never feel like you have to hide your tiredness behind a smile or pretend you're okay when there's a lot going on inside you. I wish you had someone who'd listen even when you don't know how to explain what you're feeling, sit with you through your quiet moments, and remind you that you don't have to figure everything out all at once. You don't always have to be strong, you know? You deserve to have someone who cares about the little things that affect you, even the ones you think nobody notices.

And God, I wish you could borrow my eyes for just a moment and see yourself the way I see you. Maybe then you'd understand why your smile can make my entire day better, why even the smallest things about you stay in my mind, and why I find you beautiful in ways that have nothing to do with your face. You've somehow become this strange mix of peace and chaos for me, someone I want to kiss senselessly one moment and protect from every little hurt the next. ❤️

More than anything, I hope life gives you the happiness you secretly wish for, the peace your mind sometimes needs, and the affection you shouldn't have to ask for. I wish I could be there to make you laugh when things get heavy, hold you when words aren't enough, and remind you of your worth on the days you forget it. I can't promise to make life perfect for you, but I hope you never have to question whether you deserve kindness, care, and a little extra love. And if you ever forget how special you are, just come a little closer. I'd happily spend hours reminding you. ❤️‍🩹`,
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
  /** Hidden behind a scratch card; catalogue shows mysteryLabel instead of name. */
  mysteryLabel?: string;
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
    id: "custom_gift",
    name: "Your Own Wish 🎀",
    description: "Write any gift you want in the blank field.",
    lotteryEligible: false,
    customField: true,
    message: "YOUR WISH HAS BEEN UNLOCKED 🎀 The birthday gift department is both excited and slightly nervous.",
  },
  {
    id: "mystery_0120_a",
    name: "Me 🫶",
    mysteryLabel: "Mystery Gift #1 🎁",
    description: "Scratch to find out. 👀",
    lotteryEligible: true,
    message: "JACKPOT! 🫶 You won... me. No returns, no refunds, lifetime warranty.",
  },
  {
    id: "mystery_0120_b",
    name: "You Owe Me A Kissy 💋",
    mysteryLabel: "Mystery Gift #2 🎁",
    description: "Scratch to find out. 👀",
    lotteryEligible: true,
    message: "UH OH 💋 You owe me a kissy. Payment due immediately. No excuses, birthday girl.",
  },
];
