export const initialUser = {
  name: "User",
  phone: "+62 812-9842-1088",
  email: "user.kopi@email.com",
  memberId: "BK-8829410",
  tier: "Gold Roaster",
  tierColor: "#d97724",
  beans: 2450,
  nextTierTarget: 3000,
  nextTierName: "Platinum Regular",
  joinedDate: "Februari 2024",
  vouchersCount: 3,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
};

export const categories = [
  { id: "all", label: "Semua Menu" },
  { id: "signature", label: "Signature Kopi" },
  { id: "non-coffee", label: "Non-Coffee" },
  { id: "pastry", label: "Pastry & Toast" }
];

export const products = [
  {
    id: "p1",
    name: "Bagi Akal Sehat",
    category: "signature",
    price: 22000,
    beansReward: 25,
    rating: 4.9,
    reviewsCount: 1420,
    tag: "Terlaris #1",
    description: "Espresso roastery blend khas Bagi Kopi dipadukan dengan gula aren organik murni dan fresh milk creamy yang pas di lidah.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1WkwZBDyT9WneU0nUVU1dnY0Oww7V1SfKb6nvN6l8Zp-WHzNg0q-ea1yvr_4mjvIbf3SPUgQCyWpBHBD1XN0Zvvkbwk16c2-0jOI7IcmH-yAa8jbm85A1PfKPBPFmxQLsynM8-2E1l4zZKzpq2HztsIapASmIxqt2v0iHXcOsZo56fVxTFvJAsnh7WT8BoBfZYF22zt2VViNr33FcBG3pdGDfr6SccxOEi17IgulBpcAdLXAlg77wxIHQ"
  },
  {
    id: "p2",
    name: "Bagi Blitzen",
    category: "signature",
    price: 25000,
    beansReward: 30,
    rating: 4.8,
    reviewsCount: 890,
    tag: "Favorite Barista",
    description: "Signature iced latte dengan perpaduan sirup butterscotch premium dan layer salted caramel foam lembut di atasnya.",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p3",
    name: "Iced Matcha Latte",
    category: "non-coffee",
    price: 26000,
    beansReward: 30,
    rating: 4.8,
    reviewsCount: 654,
    tag: "Specialty",
    description: "Grade premium matcha dengan perpaduan oat milk segar menghasilkan sensasi umami lembut yang menyegarkan dahaga.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1UsK6L5UxNgsBblOXyrOC3jc0_20oi7f6NY8N7CRi3ZY3x-D5UO6olxSjq52lLTsU2woAZ_IY_gA0bXosGAgHE9iUgKC2GNJ60Xsy8YSzyWKabxmaOgx9wiyInkylNBBMZKUyidkOLui5PvNWyT8B8FwfurL88dqVo4pjXudfMLabXbaYOkHnrGJUWTof09Czu44UE3SOFrYccS2r2tC6YuYHFC7hVe3wYWivMDmADka3P3oNFJQR3Krg"
  },
  {
    id: "p4",
    name: "Artisanal Butter Croissant",
    category: "pastry",
    price: 22000,
    beansReward: 25,
    rating: 4.9,
    reviewsCount: 920,
    tag: "Fresh Baked",
    description: "Croissant panggang keemasan dengan lapisan buttery renyah di luar dan lembut berserat di dalam khas artisan pastry.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1X7Qvu5lNaCGy7dswN4K7DZALvdPV3xt-cqweV44jZRT1Ipl6gQcGOM66GjGD7zYE8B4bsGpunXAhTxM8lNRwgwuOULiICq5j35aCXsboQWRFlQvUZaWhmH10gGzH8AkE1Ao0CTLyonWCqoXTtwco53JmSpBjxlh5_tcrPS8Wn5rzXDNBamyoRZjwuFr-bPwk5B7gYh_YOX78oiZEILn0sNhR6xPti1aUnprlQWy-JGph4nbwBQa_fUoCQ"
  },
  {
    id: "p5",
    name: "Fudgy Chocolate Brownie",
    category: "pastry",
    price: 18000,
    beansReward: 20,
    rating: 4.9,
    reviewsCount: 742,
    tag: "Sweet Delight",
    description: "Brownie cokelat leleh pekat dengan tekstur fudgy, siraman ganache cokelat, dan sentuhan kristal garam laut gurih.",
    image: "https://lh3.googleusercontent.com/aida/AEtjO1XKc6JoUm62KaZz1PeZsj3wdrwhKAFavY3QpoUhwKufwzeOsHiTD1gOV3SN4GhdlRLTA2sE3MgJCSwQvhq8tCOxmVmUglLrTa5GnAKBR_k6zwOvZVwr4bYm9IgGvm7b_xR4Rx1TwKz1uz3DSK8CoRVfVeLG9ZtGm3nc21-H6svAFbZE_LzWlj2bbt3B08TTPjdwVJJHeUYVkD-PK5qw-WXH2cqFscCZ3QTFZ_Nnq0avXWFXMQGTqjAMDr4"
  },
  {
    id: "p6",
    name: "Bagi Karamel Macchiato",
    category: "signature",
    price: 28000,
    beansReward: 35,
    rating: 4.7,
    reviewsCount: 480,
    tag: "New",
    description: "Double shot espresso dengan steamed milk vanilla dan lapisan saus karamel panggang manis gurih.",
    image: "https://images.unsplash.com/photo-1572442388796-11668ba67e53?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "p7",
    name: "Berry Hibiscus Refresher",
    category: "non-coffee",
    price: 23000,
    beansReward: 25,
    rating: 4.8,
    reviewsCount: 310,
    tag: "Fruity",
    description: "Seduhan bunga hibiscus asam segar dengan sirup raspberry alami dan irisan buah asli yang menyegarkan hari.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  }
];

export const rewardsData = [
  {
    id: "rew-1",
    title: "Potongan Rp 15.000 All Coffee",
    beansRequired: 800,
    minPurchase: "Min. belanja Rp 35.000",
    validDays: 14,
    badge: "Populer",
    color: "#1e60ff"
  },
  {
    id: "rew-2",
    title: "Gratis 1 Butter Croissant",
    beansRequired: 1200,
    minPurchase: "Klaim di outlet mana saja",
    validDays: 30,
    badge: "Pastry Treat",
    color: "#d97724"
  },
  {
    id: "rew-3",
    title: "Buy 1 Get 1 Bagi Akal Sehat",
    beansRequired: 1500,
    minPurchase: "Setiap hari Senin - Kamis",
    validDays: 7,
    badge: "Double Joy",
    color: "#3a281e"
  },
  {
    id: "rew-4",
    title: "Voucher Cashback 50% max 25K",
    beansRequired: 2000,
    minPurchase: "Khusus dine-in & takeaway",
    validDays: 20,
    badge: "Gold Exclusive",
    color: "#f59e0b"
  }
];

export const initialTransactions = [
  {
    id: "TRX-BK-99120",
    date: "11 Okt 2026, 14:30 WIB",
    outlet: "Bagi Kopi — Tebet Timur",
    type: "Dine In",
    status: "Selesai",
    items: [
      { name: "Bagi Akal Sehat (Iced)", qty: 1, price: 22000 },
      { name: "Artisanal Butter Croissant", qty: 1, price: 22000 }
    ],
    totalPrice: 44000,
    beansEarned: 50,
    reviewed: false,
    rating: 0
  },
  {
    id: "TRX-BK-88412",
    date: "09 Okt 2026, 10:15 WIB",
    outlet: "Bagi Kopi — Senopati",
    type: "Pick Up",
    status: "Selesai",
    items: [
      { name: "Iced Matcha Latte (Less Sugar)", qty: 1, price: 26000 }
    ],
    totalPrice: 26000,
    beansEarned: 30,
    reviewed: true,
    rating: 5,
    reviewNote: "Matchanya pekat dan tidak terlalu manis. Mantap!"
  },
  {
    id: "TRX-BK-77210",
    date: "04 Okt 2026, 16:45 WIB",
    outlet: "Bagi Kopi — Dipatiukur",
    type: "Take Away",
    status: "Selesai",
    items: [
      { name: "Bagi Blitzen", qty: 2, price: 50000 }
    ],
    totalPrice: 50000,
    beansEarned: 60,
    reviewed: true,
    rating: 5,
    reviewNote: "Foam caramelnya nagih banget."
  }
];
