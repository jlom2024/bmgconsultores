// Hotel search & booking — demo mode with real hotel data
import { createServerFn } from "@tanstack/react-start";

const HOTEL_DATA = [
  // Cusco
  { id: 1, name: "Tambo del Arriero Hotel", city: "Cusco", city_code: "CUZ", stars: 3, price_pen: 180, price_usd: 47, rating: 4.2, image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600", services: ["wifi", "desayuno", "calefaccion", "agua-caliente"], rooms: 25, description: "Hotel colonial a 3 cuadras de la Plaza de Armas. Habitaciones con calefaccion y agua caliente las 24h." },
  { id: 2, name: "Hotel Royal Inka I", city: "Cusco", city_code: "CUZ", stars: 4, price_pen: 320, price_usd: 83, rating: 4.5, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600", services: ["wifi", "desayuno", "restaurante", "lavanderia", "tour-desk", "calefaccion"], rooms: 40, description: "Hotel 4 estrellas con vistas panoramicas, restaurante y servicio de tours. Ideal para explorar Cusco y el Valle Sagrado." },
  { id: 3, name: "Belmond Hotel Monasterio", city: "Cusco", city_code: "CUZ", stars: 5, price_pen: 1200, price_usd: 310, rating: 4.8, image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600", services: ["wifi", "desayuno", "restaurante", "spa", "bar", "tour-desk", "estacionamiento", "lavanderia", "room-service"], rooms: 126, description: "Hotel 5 estrellas ubicado en un antiguo monasterio del siglo XVI. Una experiencia unica en el centro historico de Cusco." },
  { id: 4, name: "Hostal El Inca", city: "Cusco", city_code: "CUZ", stars: 2, price_pen: 85, price_usd: 22, rating: 3.8, image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600", services: ["wifi", "agua-caliente", "calefaccion"], rooms: 15, description: "Hostal economico con ubicacion centrica. Habitaciones basicas pero limpias, ideal para mochileros." },
  { id: 5, name: "Casa Andina Premium Cusco", city: "Cusco", city_code: "CUZ", stars: 4, price_pen: 450, price_usd: 117, rating: 4.6, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=600", services: ["wifi", "desayuno", "restaurante", "bar", "tour-desk", "calefaccion", "lavanderia"], rooms: 55, description: "Hotel boutique con arquitectura colonial y todas las comodidades modernas. A 2 cuadras de la Plaza de Armas." },

  // Lima
  { id: 6, name: "Hotel B", city: "Lima", city_code: "LIM", stars: 5, price_pen: 850, price_usd: 220, rating: 4.7, image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600", services: ["wifi", "desayuno", "restaurante", "bar", "spa", "room-service", "estacionamiento"], rooms: 35, description: "Boutique hotel en Barranco, el barrio bohemio de Lima. Arte contemporaneo, gastronomia y vistas al mar." },
  { id: 7, name: "Costa del Sol Wyndham", city: "Lima", city_code: "LIM", stars: 4, price_pen: 380, price_usd: 98, rating: 4.3, image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600", services: ["wifi", "desayuno", "restaurante", "piscina", "gimnasio", "bar", "estacionamiento", "room-service"], rooms: 120, description: "Hotel cerca del aeropuerto internacional Jorge Chavez. Ideal para conexiones y viajes de negocios." },
  { id: 8, name: "Hotel Miraflores Park", city: "Lima", city_code: "LIM", stars: 4, price_pen: 420, price_usd: 109, rating: 4.5, image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?w=600", services: ["wifi", "desayuno", "restaurante", "piscina", "gimnasio", "bar", "lavanderia", "tour-desk"], rooms: 80, description: "Ubicado en el corazon de Miraflores. Cerca del Malecon, Larcomar y los mejores restaurantes de Lima." },
  { id: 9, name: "Hostal El Patio", city: "Lima", city_code: "LIM", stars: 2, price_pen: 75, price_usd: 19, rating: 3.6, image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600", services: ["wifi", "desayuno"], rooms: 12, description: "Hostal familiar en Miraflores con patio interior. Ambiente tranquilo y precios accesibles." },

  // Arequipa
  { id: 10, name: "Hotel Libertador Arequipa", city: "Arequipa", city_code: "AQP", stars: 4, price_pen: 350, price_usd: 91, rating: 4.4, image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600", services: ["wifi", "desayuno", "restaurante", "piscina", "bar", "estacionamiento", "tour-desk"], rooms: 60, description: "Hotel colonial frente a la Plaza de Armas. Arquitectura de sillar, piscina al aire libre y gastronomia arequipena." },
  { id: 11, name: "Casa Andina Select Arequipa", city: "Arequipa", city_code: "AQP", stars: 3, price_pen: 200, price_usd: 52, rating: 4.1, image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600", services: ["wifi", "desayuno", "restaurante", "tour-desk", "lavanderia"], rooms: 45, description: "Hotel moderno en el centro historico. Cerca del Monasterio de Santa Catalina y los principales atractivos." },

  // Ica / Huacachina
  { id: 12, name: "Hotel Las Dunas", city: "Ica", city_code: "ICA", stars: 4, price_pen: 280, price_usd: 73, rating: 4.3, image: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=600", services: ["wifi", "desayuno", "restaurante", "piscina", "bar", "estacionamiento", "deportes"], rooms: 70, description: "Hotel resort con piscina, canchas de deporte y areas verdes. Ideal para familias y grupos." },
  { id: 13, name: "Bananas Adventure Hostel", city: "Ica", city_code: "ICA", stars: 3, price_pen: 120, price_usd: 31, rating: 4.0, image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600", services: ["wifi", "desayuno", "piscina", "bar", "tour-desk", "deportes"], rooms: 20, description: "Hostal frente a la laguna de Huacachina. Ambiente joven, paseos en arenero y sandboarding incluidos." },
  { id: 14, name: "Hotel Huacachina Palace", city: "Ica", city_code: "ICA", stars: 3, price_pen: 160, price_usd: 42, rating: 3.9, image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600", services: ["wifi", "desayuno", "piscina", "bar", "restaurante"], rooms: 30, description: "Hotel con vista directa al oasis de Huacachina y las dunas. Piscina en la azotea y restaurante." },

  // Tarma
  { id: 15, name: "Hotel Las Hamacas", city: "Tarma", city_code: "TAR", stars: 3, price_pen: 130, price_usd: 34, rating: 4.0, image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?w=600", services: ["wifi", "desayuno", "restaurante", "estacionamiento", "jardin"], rooms: 22, description: "Hotel con amplios jardines y hamacas rodeado de naturaleza. Clima primaveral todo el ano." },
  { id: 16, name: "Hotel El Prado", city: "Tarma", city_code: "TAR", stars: 2, price_pen: 80, price_usd: 21, rating: 3.7, image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600", services: ["wifi", "desayuno", "estacionamiento"], rooms: 15, description: "Hotel sencillo en el centro de Tarma. Cerca del mercado central y la plaza principal." },
];

const CITIES = [
  { code: "CUZ", city: "Cusco", name: "Cusco" },
  { code: "LIM", city: "Lima", name: "Lima" },
  { code: "AQP", city: "Arequipa", name: "Arequipa" },
  { code: "ICA", city: "Ica", name: "Ica / Huacachina" },
  { code: "TAR", city: "Tarma", name: "Tarma" },
];

export const searchHotels = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const { city, guests } = data;
    if (!city) return { ok: false, error: "Selecciona una ciudad", hotels: [] };

    const cityCode = city.toUpperCase().slice(0, 3);
    let hotels = HOTEL_DATA.filter(h => h.city_code === cityCode);

    // Filter by guest capacity (rooms available)
    if (guests) {
      hotels = hotels.filter(h => h.rooms >= parseInt(guests));
    }

    hotels.sort((a, b) => a.price_pen - b.price_pen);
    return { ok: true, hotels, cached: false };
  });

export const getHotelCities = createServerFn({ method: "GET" })
  .handler(async () => {
    return { ok: true, cities: CITIES };
  });

export const getHotelById = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const hotel = HOTEL_DATA.find(h => h.id === data.id) || null;
    return { ok: true, hotel };
  });

export const createHotelBooking = createServerFn({ method: "POST" })
  .validator((x: any) => x)
  .handler(async ({ data }: any) => {
    const { hotel_id, guests, check_in, check_out } = data;
    const hotel = HOTEL_DATA.find(h => h.id === hotel_id);
    if (!hotel) return { ok: false, error: "Hotel no encontrado" };

    const nights = check_in && check_out ? Math.max(1, Math.round((new Date(check_out).getTime() - new Date(check_in).getTime()) / 86400000)) : 1;
    const total = hotel.price_pen * nights * (guests || 1);
    const pnr = 'BG' + Math.random().toString(36).substring(2, 7).toUpperCase();

    return { ok: true, booking_id: Math.floor(Math.random() * 10000), pnr, total, nights };
  });