export type SeedCategory = {
  name: string;
  slug: string;
  images: string;
};

export type SeedProduct = {
  name: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  categorySlug: string;
};

export const seedCategories: SeedCategory[] = [
  {
    "name": "Bikes",
    "slug": "bikes",
    "images": "https://i.imgur.com/BG8J0Fj.jpg"
  },
  {
    "name": "Clothes",
    "slug": "clothes",
    "images": "https://res.cloudinary.com/dtjojbrys/image/upload/v1777056187/uploads/z2wqvr53af9hoa4ce7hy.webp"
  },
  {
    "name": "Electronics",
    "slug": "electronics",
    "images": "https://i.imgur.com/ZANVnHE.jpeg"
  },
  {
    "name": "Furniture",
    "slug": "furniture",
    "images": "https://i.imgur.com/Qphac99.jpeg"
  },
  {
    "name": "Shoes",
    "slug": "shoes",
    "images": "https://i.imgur.com/qNOjJje.jpeg"
  }
];

export const seedProducts: SeedProduct[] = [
  {
    "name": "Chic Summer Denim Espadrille Sandals",
    "description": "Step into summer with style in our denim espadrille sandals. Featuring a braided jute sole for a classic touch and adjustable denim straps for a snug fit, these sandals offer both comfort and a fashionable edge. The easy slip-on design ensures convenience for beach days or casual outings.",
    "price": 33,
    "thumbnail": "https://i.imgur.com/9qrmE1b.jpeg",
    "images": [
      "https://i.imgur.com/9qrmE1b.jpeg",
      "https://i.imgur.com/wqKxBVH.jpeg",
      "https://i.imgur.com/sWSV6DK.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Classic Black Baseball Cap",
    "description": "Elevate your casual wear with this timeless black baseball cap. Made with high-quality, breathable fabric, it features an adjustable strap for the perfect fit. Whether you’re out for a jog or just running errands, this cap adds a touch of style to any outfit.",
    "price": 58,
    "thumbnail": "https://i.imgur.com/KeqG6r4.jpeg",
    "images": [
      "https://i.imgur.com/KeqG6r4.jpeg",
      "https://i.imgur.com/xGQOw3p.jpeg",
      "https://i.imgur.com/oO5OUjb.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Black Hooded Sweatshirt",
    "description": "Elevate your casual wardrobe with our Classic Black Hooded Sweatshirt. Made from high-quality, soft fabric that ensures comfort and durability, this hoodie features a spacious kangaroo pocket and an adjustable drawstring hood. Its versatile design makes it perfect for a relaxed day at home or a casual outing.",
    "price": 79,
    "thumbnail": "https://i.imgur.com/cSytoSD.jpeg",
    "images": [
      "https://i.imgur.com/cSytoSD.jpeg",
      "https://i.imgur.com/WwKucXb.jpeg",
      "https://i.imgur.com/cE2Dxh9.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Black T-Shirt",
    "description": "Elevate your everyday style with our Classic Black T-Shirt. This staple piece is crafted from soft, breathable cotton for all-day comfort. Its versatile design features a classic crew neck and short sleeves, making it perfect for layering or wearing on its own. Durable and easy to care for, it's sure to become a favorite in your wardrobe.",
    "price": 35,
    "thumbnail": "https://i.imgur.com/9DqEOV5.jpeg",
    "images": [
      "https://i.imgur.com/9DqEOV5.jpeg",
      "https://i.imgur.com/ae0AEYn.jpeg",
      "https://i.imgur.com/mZ4rUjj.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Blue Baseball Cap",
    "description": "Top off your casual look with our Classic Blue Baseball Cap, made from high-quality materials for lasting comfort. Featuring a timeless six-panel design with a pre-curved visor, this adjustable cap offers both style and practicality for everyday wear.",
    "price": 86,
    "thumbnail": "https://i.imgur.com/wXuQ7bm.jpeg",
    "images": [
      "https://i.imgur.com/wXuQ7bm.jpeg",
      "https://i.imgur.com/BZrIEmb.jpeg",
      "https://i.imgur.com/KcT6BE0.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Blue Suede Casual Shoes",
    "description": "Step into comfort with our Classic Blue Suede Casual Shoes, perfect for everyday wear. These shoes feature a stylish blue suede upper, durable rubber soles for superior traction, and classic lace-up fronts for a snug fit. The sleek design pairs well with both jeans and chinos, making them a versatile addition to any wardrobe.",
    "price": 39,
    "thumbnail": "https://i.imgur.com/sC0ztOB.jpeg",
    "images": [
      "https://i.imgur.com/sC0ztOB.jpeg",
      "https://i.imgur.com/Jf9DL9R.jpeg",
      "https://i.imgur.com/R1IN95T.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Classic Comfort Drawstring Joggers",
    "description": "Experience the perfect blend of comfort and style with our Classic Comfort Drawstring Joggers. Designed for a relaxed fit, these joggers feature a soft, stretchable fabric, convenient side pockets, and an adjustable drawstring waist with elegant gold-tipped detailing. Ideal for lounging or running errands, these pants will quickly become your go-to for effortless, casual wear.",
    "price": 79,
    "thumbnail": "https://i.imgur.com/mp3rUty.jpeg",
    "images": [
      "https://i.imgur.com/mp3rUty.jpeg",
      "https://i.imgur.com/JQRGIc2.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Comfort Fit Joggers",
    "description": "Discover the perfect blend of style and comfort with our Classic Comfort Fit Joggers. These versatile black joggers feature a soft elastic waistband with an adjustable drawstring, two side pockets, and ribbed ankle cuffs for a secure fit. Made from a lightweight and durable fabric, they are ideal for both active days and relaxed lounging.",
    "price": 25,
    "thumbnail": "https://i.imgur.com/ZKGofuB.jpeg",
    "images": [
      "https://i.imgur.com/ZKGofuB.jpeg",
      "https://i.imgur.com/GJi73H0.jpeg",
      "https://i.imgur.com/633Fqrz.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Grey Hooded Sweatshirt",
    "description": "Elevate your casual wear with our Classic Grey Hooded Sweatshirt. Made from a soft cotton blend, this hoodie features a front kangaroo pocket, an adjustable drawstring hood, and ribbed cuffs for a snug fit. Perfect for those chilly evenings or lazy weekends, it pairs effortlessly with your favorite jeans or joggers.",
    "price": 90,
    "thumbnail": "https://i.imgur.com/R2PN9Wq.jpeg",
    "images": [
      "https://i.imgur.com/R2PN9Wq.jpeg",
      "https://i.imgur.com/IvxMPFr.jpeg",
      "https://i.imgur.com/7eW9nXP.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Heather Gray Hoodie",
    "description": "Stay cozy and stylish with our Classic Heather Gray Hoodie. Crafted from soft, durable fabric, it features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
    "price": 69,
    "thumbnail": "https://i.imgur.com/cHddUCu.jpeg",
    "images": [
      "https://i.imgur.com/cHddUCu.jpeg",
      "https://i.imgur.com/CFOjAgK.jpeg",
      "https://i.imgur.com/wbIMMme.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic High-Waisted Athletic Shorts",
    "description": "Stay comfortable and stylish with our Classic High-Waisted Athletic Shorts. Designed for optimal movement and versatility, these shorts are a must-have for your workout wardrobe. Featuring a figure-flattering high waist, breathable fabric, and a secure fit that ensures they stay in place during any activity, these shorts are perfect for the gym, running, or even just casual wear.",
    "price": 43,
    "thumbnail": "https://i.imgur.com/eGOUveI.jpeg",
    "images": [
      "https://i.imgur.com/eGOUveI.jpeg",
      "https://i.imgur.com/UcsGO7E.jpeg",
      "https://i.imgur.com/NLn4e7S.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Navy Blue Baseball Cap",
    "description": "Step out in style with this sleek navy blue baseball cap. Crafted from durable material, it features a smooth, structured design and an adjustable strap for the perfect fit. Protect your eyes from the sun and complement your casual looks with this versatile and timeless accessory.",
    "price": 61,
    "thumbnail": "https://i.imgur.com/R3iobJA.jpeg",
    "images": [
      "https://i.imgur.com/R3iobJA.jpeg",
      "https://i.imgur.com/Wv2KTsf.jpeg",
      "https://i.imgur.com/76HAxcA.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Olive Chino Shorts",
    "description": "Elevate your casual wardrobe with these classic olive chino shorts. Designed for comfort and versatility, they feature a smooth waistband, practical pockets, and a tailored fit that makes them perfect for both relaxed weekends and smart-casual occasions. The durable fabric ensures they hold up throughout your daily activities while maintaining a stylish look.",
    "price": 84,
    "thumbnail": "https://i.imgur.com/UsFIvYs.jpeg",
    "images": [
      "https://i.imgur.com/UsFIvYs.jpeg",
      "https://i.imgur.com/YIq57b6.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Red Baseball Cap",
    "description": "Elevate your casual wardrobe with this timeless red baseball cap. Crafted from durable fabric, it features a comfortable fit with an adjustable strap at the back, ensuring one size fits all. Perfect for sunny days or adding a sporty touch to your outfit.",
    "price": 35,
    "thumbnail": "https://i.imgur.com/cBuLvBi.jpeg",
    "images": [
      "https://i.imgur.com/cBuLvBi.jpeg",
      "https://i.imgur.com/N1GkCIR.jpeg",
      "https://i.imgur.com/kKc9A5p.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Red Jogger Sweatpants",
    "description": "Experience ultimate comfort with our red jogger sweatpants, perfect for both workout sessions and lounging around the house. Made with soft, durable fabric, these joggers feature a snug waistband, adjustable drawstring, and practical side pockets for functionality. Their tapered design and elastic cuffs offer a modern fit that keeps you looking stylish on the go.",
    "price": 98,
    "thumbnail": "https://i.imgur.com/9LFjwpI.jpeg",
    "images": [
      "https://i.imgur.com/9LFjwpI.jpeg",
      "https://i.imgur.com/vzrTgUR.jpeg",
      "https://i.imgur.com/p5NdI6n.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic Red Pullover Hoodie",
    "description": "Elevate your casual wardrobe with our Classic Red Pullover Hoodie. Crafted with a soft cotton blend for ultimate comfort, this vibrant red hoodie features a kangaroo pocket, adjustable drawstring hood, and ribbed cuffs for a snug fit. The timeless design ensures easy pairing with jeans or joggers for a relaxed yet stylish look, making it a versatile addition to your everyday attire.",
    "price": 10,
    "thumbnail": "https://i.imgur.com/1twoaDy.jpeg",
    "images": [
      "https://i.imgur.com/1twoaDy.jpeg",
      "https://i.imgur.com/FDwQgLy.jpeg",
      "https://i.imgur.com/kg1ZhhH.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic White Crew Neck T-Shirt",
    "description": "Elevate your basics with this versatile white crew neck tee. Made from a soft, breathable cotton blend, it offers both comfort and durability. Its sleek, timeless design ensures it pairs well with virtually any outfit. Ideal for layering or wearing on its own, this t-shirt is a must-have staple for every wardrobe.",
    "price": 39,
    "thumbnail": "https://i.imgur.com/axsyGpD.jpeg",
    "images": [
      "https://i.imgur.com/axsyGpD.jpeg",
      "https://i.imgur.com/T8oq9X2.jpeg",
      "https://i.imgur.com/J6MinJn.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Classic White Tee - Timeless Style and Comfort",
    "description": "Elevate your everyday wardrobe with our Classic White Tee. Crafted from premium soft cotton material, this versatile t-shirt combines comfort with durability, perfect for daily wear. Featuring a relaxed, unisex fit that flatters every body type, it's a staple piece for any casual ensemble. Easy to care for and machine washable, this white tee retains its shape and softness wash after wash. Pair it with your favorite jeans or layer it under a jacket for a smart look.",
    "price": 73,
    "thumbnail": "https://i.imgur.com/Y54Bt8J.jpeg",
    "images": [
      "https://i.imgur.com/Y54Bt8J.jpeg",
      "https://i.imgur.com/SZPDSgy.jpeg",
      "https://i.imgur.com/sJv4Xx0.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Efficient 2-Slice Toaster",
    "description": "Enhance your morning routine with our sleek 2-slice toaster, featuring adjustable browning controls and a removable crumb tray for easy cleaning. This compact and stylish appliance is perfect for any kitchen, ensuring your toast is always golden brown and delicious.",
    "price": 48,
    "thumbnail": "https://i.imgur.com/keVCVIa.jpeg",
    "images": [
      "https://i.imgur.com/keVCVIa.jpeg",
      "https://i.imgur.com/afHY7v2.jpeg",
      "https://i.imgur.com/yAOihUe.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Elegant Golden-Base Stone Top Dining Table",
    "description": "Elevate your dining space with this luxurious table, featuring a sturdy golden metal base with an intricate rod design that provides both stability and chic elegance. The smooth stone top in a sleek round shape offers a robust surface for your dining pleasure. Perfect for both everyday meals and special occasions, this table easily complements any modern or glam decor.",
    "price": 66,
    "thumbnail": "https://i.imgur.com/NWIJKUj.jpeg",
    "images": [
      "https://i.imgur.com/NWIJKUj.jpeg",
      "https://i.imgur.com/Jn1YSLk.jpeg",
      "https://i.imgur.com/VNZRvx5.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Elegant Patent Leather Peep-Toe Pumps with Gold-Tone Heel",
    "description": "Step into sophistication with these chic peep-toe pumps, showcasing a lustrous patent leather finish and an eye-catching gold-tone block heel. The ornate buckle detail adds a touch of glamour, perfect for elevating your evening attire or complementing a polished daytime look.",
    "price": 53,
    "thumbnail": "https://i.imgur.com/AzAY4Ed.jpeg",
    "images": [
      "https://i.imgur.com/AzAY4Ed.jpeg",
      "https://i.imgur.com/umfnS9P.jpeg",
      "https://i.imgur.com/uFyuvLg.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Elegant Purple Leather Loafers",
    "description": "Step into sophistication with our Elegant Purple Leather Loafers, perfect for making a bold statement. Crafted from high-quality leather with a vibrant purple finish, these shoes feature a classic loafer silhouette that's been updated with a contemporary twist. The comfortable slip-on design and durable soles ensure both style and functionality for the modern man.",
    "price": 17,
    "thumbnail": "https://i.imgur.com/Au8J9sX.jpeg",
    "images": [
      "https://i.imgur.com/Au8J9sX.jpeg",
      "https://i.imgur.com/gdr8BW2.jpeg",
      "https://i.imgur.com/KDCZxnJ.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Elegant Solid Wood Dining Table",
    "description": "Enhance your dining space with this sleek, contemporary dining table, crafted from high-quality solid wood with a warm finish. Its sturdy construction and minimalist design make it a perfect addition for any home looking for a touch of elegance. Accommodates up to six guests comfortably and includes a striking fruit bowl centerpiece. The overhead lighting is not included.",
    "price": 67,
    "thumbnail": "https://i.imgur.com/4lTaHfF.jpeg",
    "images": [
      "https://i.imgur.com/4lTaHfF.jpeg",
      "https://i.imgur.com/JktHE1C.jpeg",
      "https://i.imgur.com/cQeXQMi.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Futuristic Chic High-Heel Boots",
    "description": "Elevate your style with our cutting-edge high-heel boots that blend bold design with avant-garde aesthetics. These boots feature a unique color-block heel, a sleek silhouette, and a versatile light grey finish that pairs easily with any cutting-edge outfit. Crafted for the fashion-forward individual, these boots are sure to make a statement.",
    "price": 36,
    "thumbnail": "https://i.imgur.com/HqYqLnW.jpeg",
    "images": [
      "https://i.imgur.com/HqYqLnW.jpeg",
      "https://i.imgur.com/RlDGnZw.jpeg",
      "https://i.imgur.com/qa0O6fg.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Futuristic Holographic Soccer Cleats",
    "description": "Step onto the field and stand out from the crowd with these eye-catching holographic soccer cleats. Designed for the modern player, these cleats feature a sleek silhouette, lightweight construction for maximum agility, and durable studs for optimal traction. The shimmering holographic finish reflects a rainbow of colors as you move, ensuring that you'll be noticed for both your skills and style. Perfect for the fashion-forward athlete who wants to make a statement.",
    "price": 39,
    "thumbnail": "https://i.imgur.com/qNOjJje.jpeg",
    "images": [
      "https://i.imgur.com/qNOjJje.jpeg",
      "https://i.imgur.com/NjfCFnu.jpeg",
      "https://i.imgur.com/eYtvXS1.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Futuristic Silver and Gold High-Top Sneaker",
    "description": "Step into the future with this eye-catching high-top sneaker, designed for those who dare to stand out. The sneaker features a sleek silver body with striking gold accents, offering a modern twist on classic footwear. Its high-top design provides support and style, making it the perfect addition to any avant-garde fashion collection. Grab a pair today and elevate your shoe game!",
    "price": 68,
    "thumbnail": "https://i.imgur.com/npLfCGq.jpeg",
    "images": [
      "https://i.imgur.com/npLfCGq.jpeg",
      "https://i.imgur.com/vYim3gj.jpeg",
      "https://i.imgur.com/HxuHwBO.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Majestic Mountain Graphic T-Shirt",
    "description": "Elevate your wardrobe with this stylish black t-shirt featuring a striking monochrome mountain range graphic. Perfect for those who love the outdoors or want to add a touch of nature-inspired design to their look, this tee is crafted from soft, breathable fabric ensuring all-day comfort. Ideal for casual outings or as a unique gift, this t-shirt is a versatile addition to any collection.",
    "price": 44,
    "thumbnail": "https://i.imgur.com/QkIa5tT.jpeg",
    "images": [
      "https://i.imgur.com/QkIa5tT.jpeg",
      "https://i.imgur.com/jb5Yu0h.jpeg",
      "https://i.imgur.com/UlxxXyG.jpeg"
    ],
    "categorySlug": "clothes"
  },
  {
    "name": "Mid-Century Modern Wooden Dining Table",
    "description": "Elevate your dining room with this sleek Mid-Century Modern dining table, featuring an elegant walnut finish and tapered legs for a timeless aesthetic. Its sturdy wood construction and minimalist design make it a versatile piece that fits with a variety of decor styles. Perfect for intimate dinners or as a stylish spot for your morning coffee.",
    "price": 24,
    "thumbnail": "https://i.imgur.com/DMQHGA0.jpeg",
    "images": [
      "https://i.imgur.com/DMQHGA0.jpeg",
      "https://i.imgur.com/qrs9QBg.jpeg",
      "https://i.imgur.com/XVp8T1I.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Modern Elegance Teal Armchair",
    "description": "Elevate your living space with this beautifully crafted armchair, featuring a sleek wooden frame that complements its vibrant teal upholstery. Ideal for adding a pop of color and contemporary style to any room, this chair provides both superb comfort and sophisticated design. Perfect for reading, relaxing, or creating a cozy conversation nook.",
    "price": 25,
    "thumbnail": "https://i.imgur.com/6wkyyIN.jpeg",
    "images": [
      "https://i.imgur.com/6wkyyIN.jpeg",
      "https://i.imgur.com/Ald3Rec.jpeg",
      "https://i.imgur.com/dIqo03c.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Modern Ergonomic Office Chair",
    "description": "Elevate your office space with this sleek and comfortable Modern Ergonomic Office Chair. Designed to provide optimal support throughout the workday, it features an adjustable height mechanism, smooth-rolling casters for easy mobility, and a cushioned seat for extended comfort. The clean lines and minimalist white design make it a versatile addition to any contemporary workspace.",
    "price": 71,
    "thumbnail": "https://i.imgur.com/3dU0m72.jpeg",
    "images": [
      "https://i.imgur.com/3dU0m72.jpeg",
      "https://i.imgur.com/zPU3EVa.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Modern Minimalist Workstation Setup",
    "description": "Elevate your home office with our Modern Minimalist Workstation Setup, featuring a sleek wooden desk topped with an elegant computer, stylish adjustable wooden desk lamp, and complimentary accessories for a clean, productive workspace. This setup is perfect for professionals seeking a contemporary look that combines functionality with design.",
    "price": 49,
    "thumbnail": "https://i.imgur.com/3oXNBst.jpeg",
    "images": [
      "https://i.imgur.com/3oXNBst.jpeg",
      "https://i.imgur.com/ErYYZnT.jpeg",
      "https://i.imgur.com/boBPwYW.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Rainbow Glitter High Heels",
    "description": "Step into the spotlight with these eye-catching rainbow glitter high heels. Designed to dazzle, each shoe boasts a kaleidoscope of shimmering colors that catch and reflect light with every step. Perfect for special occasions or a night out, these stunners are sure to turn heads and elevate any ensemble.",
    "price": 39,
    "thumbnail": "https://i.imgur.com/62gGzeF.jpeg",
    "images": [
      "https://i.imgur.com/62gGzeF.jpeg",
      "https://i.imgur.com/5MoPuFM.jpeg",
      "https://i.imgur.com/sUVj7pK.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Sleek Comfort-Fit Over-Ear Headphones",
    "description": "Experience superior sound quality with our Sleek Comfort-Fit Over-Ear Headphones, designed for prolonged use with cushioned ear cups and an adjustable, padded headband. Ideal for immersive listening, whether you're at home, in the office, or on the move. Their durable construction and timeless design provide both aesthetically pleasing looks and long-lasting performance.",
    "price": 28,
    "thumbnail": "https://i.imgur.com/SolkFEB.jpeg",
    "images": [
      "https://i.imgur.com/SolkFEB.jpeg",
      "https://i.imgur.com/KIGW49u.jpeg",
      "https://i.imgur.com/mWwek7p.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek Mirror Finish Phone Case",
    "description": "Enhance your smartphone's look with this ultra-sleek mirror finish phone case. Designed to offer style with protection, the case features a reflective surface that adds a touch of elegance while keeping your device safe from scratches and impacts. Perfect for those who love a minimalist and modern aesthetic.",
    "price": 27,
    "thumbnail": "https://i.imgur.com/yb9UQKL.jpeg",
    "images": [
      "https://i.imgur.com/yb9UQKL.jpeg",
      "https://i.imgur.com/m2owtQG.jpeg",
      "https://i.imgur.com/bNiORct.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek Modern Laptop for Professionals",
    "description": "Experience cutting-edge technology and elegant design with our latest laptop model. Perfect for professionals on-the-go, this high-performance laptop boasts a powerful processor, ample storage, and a long-lasting battery life, all encased in a lightweight, slim frame for ultimate portability. Shop now to elevate your work and play.",
    "price": 97,
    "thumbnail": "https://i.imgur.com/ItHcq7o.jpeg",
    "images": [
      "https://i.imgur.com/ItHcq7o.jpeg",
      "https://i.imgur.com/55GM3XZ.jpeg",
      "https://i.imgur.com/tcNJxoW.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek Modern Laptop with Ambient Lighting",
    "description": "Experience next-level computing with our ultra-slim laptop, featuring a stunning display illuminated by ambient lighting. This high-performance machine is perfect for both work and play, delivering powerful processing in a sleek, portable design. The vibrant colors add a touch of personality to your tech collection, making it as stylish as it is functional.",
    "price": 43,
    "thumbnail": "https://i.imgur.com/OKn1KFI.jpeg",
    "images": [
      "https://i.imgur.com/OKn1KFI.jpeg",
      "https://i.imgur.com/G4f21Ai.jpeg",
      "https://i.imgur.com/Z9oKRVJ.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek Modern Leather Sofa",
    "description": "Enhance the elegance of your living space with our Sleek Modern Leather Sofa. Designed with a minimalist aesthetic, it features clean lines and a luxurious leather finish. The robust metal legs provide stability and support, while the plush cushions ensure comfort. Perfect for contemporary homes or office waiting areas, this sofa is a statement piece that combines style with practicality.",
    "price": 53,
    "thumbnail": "https://i.imgur.com/Qphac99.jpeg",
    "images": [
      "https://i.imgur.com/Qphac99.jpeg",
      "https://i.imgur.com/dJjpEgG.jpeg",
      "https://i.imgur.com/MxJyADq.jpeg"
    ],
    "categorySlug": "furniture"
  },
  {
    "name": "Sleek Smartwatch with Vibrant Display",
    "description": "Experience modern timekeeping with our high-tech smartwatch, featuring a vivid touch screen display, customizable watch faces, and a comfortable blue silicone strap. This smartwatch keeps you connected with notifications and fitness tracking while showcasing exceptional style and versatility.",
    "price": 16,
    "thumbnail": "https://i.imgur.com/LGk9Jn2.jpeg",
    "images": [
      "https://i.imgur.com/LGk9Jn2.jpeg",
      "https://i.imgur.com/1ttYWaI.jpeg",
      "https://i.imgur.com/sPRWnJH.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek White & Orange Wireless Gaming Controller",
    "description": "Elevate your gaming experience with this state-of-the-art wireless controller, featuring a crisp white base with vibrant orange accents. Designed for precision play, the ergonomic shape and responsive buttons provide maximum comfort and control for endless hours of gameplay. Compatible with multiple gaming platforms, this controller is a must-have for any serious gamer looking to enhance their setup.",
    "price": 69,
    "thumbnail": "https://i.imgur.com/ZANVnHE.jpeg",
    "images": [
      "https://i.imgur.com/ZANVnHE.jpeg",
      "https://i.imgur.com/Ro5z6Tn.jpeg",
      "https://i.imgur.com/woA93Li.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek Wireless Computer Mouse",
    "description": "Experience smooth and precise navigation with this modern wireless mouse, featuring a glossy finish and a comfortable ergonomic design. Its responsive tracking and easy-to-use interface make it the perfect accessory for any desktop or laptop setup. The stylish blue hue adds a splash of color to your workspace, while its compact size ensures it fits neatly in your bag for on-the-go productivity.",
    "price": 10,
    "thumbnail": "https://i.imgur.com/w3Y8NwQ.jpeg",
    "images": [
      "https://i.imgur.com/w3Y8NwQ.jpeg",
      "https://i.imgur.com/WJFOGIC.jpeg",
      "https://i.imgur.com/dV4Nklf.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Sleek Wireless Headphone & Inked Earbud Set",
    "description": "Experience the fusion of style and sound with this sophisticated audio set featuring a pair of sleek, white wireless headphones offering crystal-clear sound quality and over-ear comfort. The set also includes a set of durable earbuds, perfect for an on-the-go lifestyle. Elevate your music enjoyment with this versatile duo, designed to cater to all your listening needs.",
    "price": 44,
    "thumbnail": "https://i.imgur.com/yVeIeDa.jpeg",
    "images": [
      "https://i.imgur.com/yVeIeDa.jpeg",
      "https://i.imgur.com/jByJ4ih.jpeg",
      "https://i.imgur.com/KXj6Tpb.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Stylish Red & Silver Over-Ear Headphones",
    "description": "Immerse yourself in superior sound quality with these sleek red and silver over-ear headphones. Designed for comfort and style, the headphones feature cushioned ear cups, an adjustable padded headband, and a detachable red cable for easy storage and portability. Perfect for music lovers and audiophiles who value both appearance and audio fidelity.",
    "price": 39,
    "thumbnail": "https://i.imgur.com/YaSqa06.jpeg",
    "images": [
      "https://i.imgur.com/YaSqa06.jpeg",
      "https://i.imgur.com/isQAliJ.jpeg",
      "https://i.imgur.com/5B8UQfh.jpeg"
    ],
    "categorySlug": "electronics"
  },
  {
    "name": "Vibrant Pink Classic Sneakers",
    "description": "Step into style with our Vibrant Pink Classic Sneakers! These eye-catching shoes feature a bold pink hue with iconic white detailing, offering a sleek, timeless design. Constructed with durable materials and a comfortable fit, they are perfect for those seeking a pop of color in their everyday footwear. Grab a pair today and add some vibrancy to your step!",
    "price": 84,
    "thumbnail": "https://i.imgur.com/mcW42Gi.jpeg",
    "images": [
      "https://i.imgur.com/mcW42Gi.jpeg",
      "https://i.imgur.com/mhn7qsF.jpeg",
      "https://i.imgur.com/F8vhnFJ.jpeg"
    ],
    "categorySlug": "shoes"
  },
  {
    "name": "Vibrant Runners: Bold Orange & Blue Sneakers",
    "description": "Step into style with these eye-catching sneakers featuring a striking combination of orange and blue hues. Designed for both comfort and fashion, these shoes come with flexible soles and cushioned insoles, perfect for active individuals who don't compromise on style. The reflective silver accents add a touch of modernity, making them a standout accessory for your workout or casual wear.",
    "price": 27,
    "thumbnail": "https://i.imgur.com/hKcMNJs.jpeg",
    "images": [
      "https://i.imgur.com/hKcMNJs.jpeg",
      "https://i.imgur.com/NYToymX.jpeg",
      "https://i.imgur.com/HiiapCt.jpeg"
    ],
    "categorySlug": "shoes"
  }
];
