export interface Channel {
  name: string;
  username: string;
  subscribers: string;
  isSubscribed: boolean;
  avatar: string;
  description: string;
}

export const exploreChannel: Channel[] = [
  {
    name: "React Rendezvous",
    username: "@ethanbyte",
    subscribers: "1.2K subscribers",
    isSubscribed: false,
    avatar:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
    description:
      "A channel for React developers to learn and share their knowledge.",
  },
  {
    name: "Async Awakenings",
    username: "@asyncawakenings",
    subscribers: "2.3K subscribers",
    isSubscribed: false,
    avatar:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
    description: "A channel for asynchronous programming enthusiasts.",
  },
  {
    name: "The Art of Reusability",
    username: "@iamlenalogic",
    subscribers: "3.7K subscribers",
    isSubscribed: false,
    avatar:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
    description:
      "A channel for software developers to learn about reusability.",
  },
  {
    name: "Stateful Symphony",
    username: "@bethbinary",
    subscribers: "2.9K subscribers",
    isSubscribed: false,
    avatar:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
    description: "A channel for state management in web development.",
  },
];

export const subscribedChannel: Channel[] = [
  {
    name: "Thinking Components",
    username: "@lenalogic",
    subscribers: "2.3K subscribers",
    isSubscribed: true,
    avatar:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274",
    description:
      "A channel for React developers to learn and share their knowledge.",
  },
  {
    name: "Functional Fury",
    username: "@bethbinary",
    subscribers: "1.2K subscribers",
    isSubscribed: true,
    avatar:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=3000&dpr=2&q=80",
    description: "A channel for asynchronous programming enthusiasts.",
  },
  {
    name: "React Rendezvous",
    username: "@ethanbyte",
    subscribers: "1.2K subscribers",
    isSubscribed: true,
    avatar:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=3000&dpr=2&q=80",
    description:
      "A channel for React developers to learn and share their knowledge.",
  },
  {
    name: "Stateful Symphony",
    username: "@bethbinary",
    subscribers: "2.9K subscribers",
    isSubscribed: true,
    avatar:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=3000&dpr=2&q=80",
    description: "A channel for state management in web development.",
  },
  {
    name: "Async Awakenings",
    username: "@asyncawakenings",
    subscribers: "2.3K subscribers",
    isSubscribed: true,
    avatar:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=3000&dpr=2&q=80",
    description: "A channel for asynchronous programming enthusiasts.",
  },
  {
    name: "The Art of Reusability",
    username: "@selenalogic",
    subscribers: "3.7K subscribers",
    isSubscribed: true,
    avatar:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=3000&dpr=2&q=80",
    description:
      "A channel for software developers to learn about reusability.",
  },
];
