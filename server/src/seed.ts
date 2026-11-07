import bcrypt from "bcryptjs";
import prisma from "./prisma.js";

export async function seedDatabase() {
  console.log("Seeding verified data for THE MIRRORR Unisex Hair & Beauty Studio...");

  // 1. Seed Verified Salon Settings
  await prisma.salonSetting.upsert({
    where: { id: "default-settings" },
    update: {
      salonName: "THE MIRRORR Unisex Hair & Beauty Studio",
      tagline: "Unisex Hair & Beauty Studio in Bengaluru",
      address:
        "B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Doddanagamangala Village, Naganathapura, Bengaluru, Karnataka 560100",
      phone: "+91 80883 23885",
      email: "themirrorr2024@gmail.com",
      lat: 12.818598022474724,
      lng: 77.74761579415772,
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=12.818598022474724,77.74761579415772",
    },
    create: {
      id: "default-settings",
      salonName: "THE MIRRORR Unisex Hair & Beauty Studio",
      tagline: "Unisex Hair & Beauty Studio in Bengaluru",
      address:
        "B. No. 64, 1st Floor, Vinayaka Nagara, Hosa Road, near Sobha Silicon Oasis, Doddanagamangala Village, Naganathapura, Bengaluru, Karnataka 560100",
      phone: "+91 80883 23885",
      email: "themirrorr2024@gmail.com",
      lat: 12.818598022474724,
      lng: 77.74761579415772,
      googleMapsUrl:
        "https://www.google.com/maps/search/?api=1&query=12.818598022474724,77.74761579415772",
    },
  });

  // 2. Seed 4 Verified Services
  const verifiedServices = [
    {
      slug: "women-hair-cut",
      name: "Women Hair Cut",
      category: "hair-cut",
      description:
        "Personalized hair cutting designed to elevate your style and accentuate your natural beauty, from trendy bob cuts to classic layers.",
      detailedContent: `At The Mirror Salon, our Women's Hair Cut service is designed to elevate your style and accentuate your natural beauty. Our experienced stylists are adept at creating personalized cuts tailored to your unique preferences and features.

Whether you're looking for a bold new look or a subtle refresh, we're here to bring your vision to life. From trendy bob cuts to classic layers, we offer a diverse range of styles to suit every taste. With attention to detail and precision, we ensure that each cut complements your face shape and enhances your overall look.

Step into The Mirror Salon and let us transform your hair into a masterpiece of style and sophistication.`,
      price: null, // Strictly empty to adhere to reference audit
      imagePath: "assets/images/service_haircut.jpg",
      active: true,
      displayOrder: 1,
      features: JSON.stringify([
        "Personalized face-shape consultation",
        "Trendy bob cuts, classic layers & contemporary trims",
        "Blowout finishing & home styling maintenance advice",
        "Hygienic tools & dedicated styling stations",
      ]),
      tags: JSON.stringify([
        "women hair cut salon in hosa road",
        "women hair cut salon in bangalore",
        "women hair cut salon in karnataka",
        "women hair cut salon in pragathi nagar",
        "women hair cut salon in parappana agrahara",
      ]),
    },
    {
      slug: "women-hair-color",
      name: "Women Hair Color",
      category: "hair-color",
      description:
        "Transformative and subtle coloring with custom blending, gentle damage-free formulas, and tailored aftercare.",
      detailedContent: `Highlights of our Hair Color Services:

1. Custom Consultation: Before any color service, we offer a personalized consultation to understand your preferences, lifestyle, and hair goals. This ensures that we tailor the color to suit you perfectly.

2. Professional Expertise: Our team of skilled colorists stays updated with the latest trends and techniques in hair coloring. You can trust us to deliver high-quality results every time.

3. Wide Range of Options: From vibrant hues to soft, natural tones, we offer a comprehensive range of color options to suit every taste and complexion.

4. Custom Blending: We specialize in custom blending techniques to create a unique color that complements your skin tone and enhances your features.

5. Damage-Free Formulas: We prioritize the health of your hair, using gentle, ammonia-free formulas that minimize damage and maintain the integrity of your strands.

6. Color Correction: If you're unhappy with a previous color treatment or need a correction, our color experts can help you achieve the desired result safely and effectively.

7. Long-Lasting Results: We use top-quality color products that ensure your color stays vibrant and beautiful for as long as possible, with minimal fading.

8. Aftercare Advice: To help you maintain your color between salon visits, we provide personalized aftercare advice and recommend professional-grade products to keep your hair healthy and vibrant.

At The Mirror Salon, we're passionate about helping you look and feel your best. Trust us to bring out the true beauty of your hair with our exceptional color services. Schedule your appointment today and let us transform your look!`,
      price: null,
      imagePath: "assets/images/service_haircolor.jpg",
      active: true,
      displayOrder: 2,
      features: JSON.stringify([
        "1. Custom Consultation tailored to lifestyle and skin tone",
        "2. Professional Expertise with latest blending techniques",
        "3. Wide Range from natural nuances to vibrant balayage",
        "4. Damage-Free Formulas prioritizing hair health",
        "5. Corrective Color & Pro Aftercare Guidance",
      ]),
      tags: JSON.stringify([
        "women hair color salon in hosa road",
        "women hair color salon in pragathi nagar",
        "women hair color salon in banagalore",
        "women hair color salon in karnataka",
        "women hair color salon in ellectronic city",
      ]),
    },
    {
      slug: "massage",
      name: "Massage Therapy",
      category: "massage",
      description:
        "Premier massage experience blending ancient techniques with modern expertise, featuring Swedish, deep tissue, hot stone, and aromatherapy styles.",
      detailedContent: `"Indulge in a world of relaxation with our premier massage service, tailored to elevate your mind, body, and spirit. Our skilled therapists blend ancient techniques with modern expertise to provide you with a rejuvenating experience like no other.

Embark on a journey of tranquility as our therapists work their magic, easing tension and soothing tired muscles with expert precision. Choose from a variety of massage styles, including Swedish, deep tissue, hot stone, aromatherapy, and more, each designed to address your specific needs and preferences.

Step into our serene oasis, where every detail is crafted to enhance your comfort and well-being. Let the gentle music, calming aromas, and plush surroundings transport you to a state of blissful relaxation. Whether you seek relief from stress, muscle soreness, or simply crave a moment of pampering, our massage service promises to leave you feeling refreshed, renewed, and revitalized.

Experience the ultimate in relaxation and wellness with our exceptional massage service. Book your appointment today and treat yourself to the luxury you deserve."`,
      price: null,
      imagePath: "assets/images/service_massage.jpg",
      active: true,
      displayOrder: 3,
      features: JSON.stringify([
        "Swedish Massage for gentle circulation and tension relief",
        "Deep Tissue Massage for persistent muscle knots and fatigue",
        "Hot Stone Therapy for deep penetrating warmth",
        "Aromatherapy infused with botanical essential oils",
        "Private therapy suite with soothing background music",
      ]),
      tags: JSON.stringify([
        "massage service in hosa road",
        "head massage center in hosa road",
        "best massage center in bangalore",
      ]),
    },
    {
      slug: "body-polishing",
      name: "Body Polishing",
      category: "body-polishing",
      description:
        "Four-step luxurious skin treatment combining gentle exfoliation, deep antioxidant hydration, soothing massage, and silky finishing touches.",
      detailedContent: `Indulge in Luxury: Body Polishing Service

Unveil a radiant, luminous glow with our exclusive Body Polishing service, designed to pamper your skin and revitalize your senses. Our skilled therapists combine the finest ingredients with expert techniques to deliver a transformative experience that leaves your skin irresistibly smooth and radiant.

Experience the Ritual:

1. Exfoliation: Begin your journey to silky-smooth skin with a gentle exfoliation process that sloughs away dead skin cells, revealing the fresh, luminous skin beneath. Our exfoliating formulas are meticulously crafted to buff and refine, leaving your skin velvety soft and glowing.

2. Hydration: Replenish your skin's moisture balance with our nourishing hydration treatments. Luxurious oils and creams infused with potent antioxidants and vitamins are expertly massaged into your skin, restoring vitality and suppleness while promoting cellular renewal.

3. Massage: Drift into a state of bliss as our skilled therapists indulge your senses with a soothing massage. Tailored to your preferences, our massages melt away tension and stress, promoting relaxation and enhancing the overall well-being of your body and mind.

4. Finishing Touches: Complete your body polishing experience with a lavish application of hydrating body butter or oil, leaving your skin enveloped in a delicate veil of silkiness. Revel in the sensation of silky-smooth skin and bask in the glow of your rejuvenated complexion.

Benefits:
- Radiant Skin: Say goodbye to dullness and hello to luminosity as our Body Polishing service unveils your skin's natural radiance.
- Deep Hydration: Restore moisture levels and replenish dry, thirsty skin with our intensive hydration treatments.
- Stress Relief: Indulge in a moment of relaxation and tranquility with our soothing massage techniques, designed to melt away tension and promote overall well-being.
- Silky Smooth Texture: Experience the luxurious sensation of velvety soft skin, courtesy of our expert exfoliation and moisturizing rituals.

Treat yourself to the ultimate indulgence with our Body Polishing service and discover the transformative power of radiant, luminous skin. Book your appointment today and embark on a journey to rejuvenation and renewal.`,
      price: null,
      imagePath: "assets/images/service_bodypolishing.jpg",
      active: true,
      displayOrder: 4,
      features: JSON.stringify([
        "Stage 1: Gentle skin-buffing exfoliation",
        "Stage 2: Antioxidant & vitamin deep hydration infusion",
        "Stage 3: Tension-relieving therapeutic body massage",
        "Stage 4: Finishing touches with lavish body butter",
        "Restores natural radiance, softness, and elasticity",
      ]),
      tags: JSON.stringify([
        "body polishing service in hosa road",
        "body polishing service in bangalore",
        "body polishing service in pragathi nagar",
      ]),
    },
  ];

  for (const s of verifiedServices) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }

  // 3. Seed Verified Gallery Items (Authentic Studio Visuals)
  const verifiedGallery = [
    {
      imagePath: "assets/images/hero_studio_colour_bar.jpg",
      altText: "THE MIRRORR main styling floor with geometric wooden ceiling, backlit arch mirrors, and custom Colour Bar",
      category: "hair",
      caption: "Main Studio Floor & Custom Colour Bar",
      displayOrder: 1,
    },
    {
      imagePath: "assets/images/hero_pedicure_lounge.jpg",
      altText: "THE MIRRORR Pedicure & Foot Spa Lounge with luxury quilted armchairs, illuminated arches, and 'Relax You Deserve It' script wall",
      category: "wellness",
      caption: "Pedicure & Foot Spa Lounge",
      displayOrder: 2,
    },
    {
      imagePath: "assets/images/hero_hair_wash_spa.jpg",
      altText: "THE MIRRORR Hair Wash & Conditioning Suite with ergonomic reclining chairs, ceramic basins, and illuminated product shelving",
      category: "hair",
      caption: "Hair Spa Suite & Wash Recliners",
      displayOrder: 3,
    },
    {
      imagePath: "assets/images/hero_styling_colour_bar.jpg",
      altText: "THE MIRRORR Unisex Styling Stations with RICA and Schwarzkopf Professional colour bar",
      category: "hair",
      caption: "Styling Stations & Product Bar",
      displayOrder: 4,
    },
    {
      imagePath: "assets/images/hero_mirrorr_reception_clean.jpg",
      altText: "THE MIRRORR Unisex Salon signature reception lounge, feature branding wall, L'Oreal professional care counter, and nail studio",
      category: "ambience",
      caption: "Signature Reception Lounge & Nails Studio",
      displayOrder: 5,
    },
    {
      imagePath: "assets/images/gallery_1.jpg",
      altText: "Spacious styling floor with illuminated mirrors and comfortable recliners",
      category: "ambience",
      caption: "Spacious Unisex Styling Floor",
      displayOrder: 2,
    },
    {
      imagePath: "assets/images/gallery_2.jpg",
      altText: "Dedicated hair wash and conditioning station with ergonomic wash recliners",
      category: "hair",
      caption: "Hair Wash & Spa Reclining Stations",
      displayOrder: 3,
    },
    {
      imagePath: "assets/images/gallery_3.jpg",
      altText: "Warm ambient studio lighting and immaculate salon interior",
      category: "ambience",
      caption: "Warm & Tranquil Studio Atmosphere",
      displayOrder: 4,
    },
    {
      imagePath: "assets/images/gallery_4.jpg",
      altText: "Precision haircut and custom coloring styling mirrors",
      category: "hair",
      caption: "Consultation & Precision Cut Mirrors",
      displayOrder: 5,
    },
    {
      imagePath: "assets/images/gallery_5.jpg",
      altText: "Private therapy suite for Swedish, deep tissue, and hot stone massage",
      category: "wellness",
      caption: "Private Massage & Therapy Suite",
      displayOrder: 6,
    },
    {
      imagePath: "assets/images/gallery_6.jpg",
      altText: "Welcoming reception and client waiting lounge on Hosa Road",
      category: "ambience",
      caption: "Hospitable Reception & Waiting Area",
      displayOrder: 7,
    },
    {
      imagePath: "assets/images/gallery_7.jpg",
      altText: "Clean, sanitized professional salon tools and grooming supplies",
      category: "wellness",
      caption: "Strictly Sanitized Grooming Equipment",
      displayOrder: 8,
    },
    {
      imagePath: "assets/images/gallery_8.jpg",
      altText: "Wide panoramic view of THE MIRRORR salon studio on Hosa Road, Bengaluru",
      category: "ambience",
      caption: "Full Studio Interior on Hosa Road",
      displayOrder: 9,
    },
  ];

  // Clear and re-populate gallery
  await prisma.galleryItem.deleteMany({});
  for (const g of verifiedGallery) {
    await prisma.galleryItem.create({ data: g });
  }

  // 4. Create default seed admin user if none exists
  const existingAdmin = await prisma.adminUser.findFirst();
  if (!existingAdmin) {
    const defaultPassword = process.env.INITIAL_ADMIN_PASSWORD || "Mirrorr@Admin2026!";
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    await prisma.adminUser.create({
      data: {
        email: "themirrorr2024@gmail.com",
        name: "Studio Manager",
        passwordHash,
        role: "admin",
      },
    });
    console.log("Created initial default admin account:");
    console.log("  Email: themirrorr2024@gmail.com");
    console.log("  Password: [Set via INITIAL_ADMIN_PASSWORD or default demo password]");
  }

  console.log("Database seeded successfully with all verified salon data!");
}

if (process.argv[1]?.endsWith("seed.ts") || process.argv[1]?.endsWith("seed.js")) {
  seedDatabase()
    .catch((err) => {
      console.error("Seeding error:", err);
      process.exit(1);
    })
    .finally(() => {
      prisma.$disconnect();
    });
}
