export interface Album {
  name: string;
  artist: string;
  cover: string;
  views: string;
  created_at: string;
}

export const listenNowAlbums: Album[] = [
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80",
    views: "5.5K views",
    created_at: "1 day ago",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=300&dpr=2&q=80",
    views: "4.2K views",
    created_at: "1 day ago",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1528143358888-6d3c7f67bd5d?w=300&dpr=2&q=80",
    views: "3.7K views",
    created_at: "2 days ago",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
    views: "2.9K views",
    created_at: "5 days ago",
  },
];

export const madeForYouAlbums: Album[] = [
  {
    name: "Thinking Components",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=3274",
    views: "2.3K views",
    created_at: "2 days ago",
  },
  {
    name: "Functional Fury",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1513745405825-efaf9a49315f?w=3000&dpr=2&q=80",
    views: "1.2K views",
    created_at: "1 week ago",
  },
  {
    name: "React Rendezvous",
    artist: "Ethan Byte",
    cover:
      "https://images.unsplash.com/photo-1614113489855-66422ad300a4?w=3000&dpr=2&q=80",
    views: "3.1K views",
    created_at: "3 weeks ago",
  },
  {
    name: "Stateful Symphony",
    artist: "Beth Binary",
    cover:
      "https://images.unsplash.com/photo-1446185250204-f94591f7d702?w=3000&dpr=2&q=80",
    views: "4.5K views",
    created_at: "1 month ago",
  },
  {
    name: "Async Awakenings",
    artist: "Nina Netcode",
    cover:
      "https://images.unsplash.com/photo-1468817814611-b7edf94b5d60?w=3000&dpr=2&q=80",
    views: "2.7K views",
    created_at: "2 months ago",
  },
  {
    name: "The Art of Reusability",
    artist: "Lena Logic",
    cover:
      "https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=3000&dpr=2&q=80",
    views: "3.9K views",
    created_at: "3 months ago",
  },
];
