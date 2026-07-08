export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: "tall" | "wide" | "square";
}

export const galleryItems: GalleryItem[] = [
  { id: "1", title: "Pillars of Creation", category: "Nebulas", image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=2000", aspect: "tall" },
  { id: "2", title: "Earth from Space", category: "Earth", image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&q=80&w=2000", aspect: "wide" },
  { id: "3", title: "Mars Surface", category: "Mars", image: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=2000", aspect: "square" },
  { id: "4", title: "Saturn Rings", category: "Planets", image: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?auto=format&fit=crop&q=80&w=2000", aspect: "wide" },
  { id: "5", title: "Moon Landing", category: "Moon", image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?auto=format&fit=crop&q=80&w=2000", aspect: "tall" },
  { id: "6", title: "Andromeda Galaxy", category: "Galaxies", image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?auto=format&fit=crop&q=80&w=2000", aspect: "square" },
  { id: "7", title: "ISS Over Earth", category: "Satellites", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000", aspect: "wide" },
  { id: "8", title: "Astronaut EVA", category: "Astronauts", image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2000", aspect: "tall" },
  { id: "9", title: "Jupiter Storm", category: "Planets", image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2000", aspect: "square" },
  { id: "10", title: "Carina Nebula", category: "Nebulas", image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=2000", aspect: "wide" },
  { id: "11", title: "Lunar Surface", category: "Moon", image: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg", aspect: "tall" },
  { id: "12", title: "Hubble Deep Field", category: "Galaxies", image: "https://upload.wikimedia.org/wikipedia/commons/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg", aspect: "square" },
];

export const galleryCategories = ["All", "Nebulas", "Planets", "Galaxies", "Moon", "Mars", "Earth", "Satellites", "Astronauts"];
