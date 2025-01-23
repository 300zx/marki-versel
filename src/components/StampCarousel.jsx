import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StampCarousel = () => {
  const [stamps, setStamps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 1) Store filenames in a simple array (expand to 400+ as needed)
const imageFiles = [
  'm-ships_20230514_0001.jpg',
  'm-trains_20230514_0001.jpg',
  'm-trains_20230514_0002.jpg',
  'm-trains_20230514_0003.jpg',
  'm-trains_20230514_0004.jpg',
  'm-trains_20230514_0005.jpg',
  'm1-lenin-1978_20230514_0001.jpg',
  'm10-ships_20230514_0001.jpg',
  'm10-ships_20230514_0002.jpg',
  'm11-ships_20230514_0001.jpg',
  'm11-ships_20230514_0002.jpg',
  'm11-ships_20230514_0003.jpg',
  'm12-ships_20230514_0001.jpg',
  'm12-ships_20230514_0002.jpg',
  'm13-ships_20230514_0001.jpg',
  'm13-ships_20230514_0002.jpg',
  'm13-ships_20230514_0003.jpg',
  'm13-ships_20230514_0004.jpg',
  'm13-ships_20230514_0005.jpg',
  'm13-ships_20230514_0006.jpg',
  'm14-ships_20230514_0001.jpg',
  'm14-ships_20230514_0002.jpg',
  'm14-ships_20230514_0003.jpg',
  'm14-ships_20230514_0004.jpg',
  'm14-ships_20230514_0005.jpg',
  'm15-ships_20230514_0001.jpg',
  'm15-ships_20230514_0002.jpg',
  'm15-ships_20230514_0003.jpg',
  'm16-planes_20230514_0001.jpg',
  'm16-planes_20230514_0002.jpg',
  'm16-planes_20230514_0003.jpg',
  'm16-planes_20230514_0004.jpg',
  'm16-planes_20230514_0005.jpg',
  'm16-planes_20230514_0006.jpg',
  'm17-planes_20230514_0001.jpg',
  'm17-planes_20230514_0002.jpg',
  'm17-planes_20230514_0003.jpg',
  'm17-planes_20230514_0004.jpg',
  'm17-planes_20230514_0005.jpg',
  'm18-planes_20230514_0001.jpg',
  'm18-planes_20230514_0002.jpg',
  'm18-planes_20230514_0003.jpg',
  'm18-planes_20230514_0004.jpg',
  'm18-planes_20230514_0005.jpg',
  'm19-russia-history-museum_20230514_0001.jpg',
  'm2-ussr-1979_20230514_0001.jpg',
  'm21-trains_20230514_0001.jpg',
  'm21-trains_20230514_0002.jpg',
  'm21-trains_20230514_0003.jpg',
  'm21-trains_20230514_0004.jpg',
  'm21-trains_20230514_0005.jpg',
  'm21-trains_20230514_0006.jpg',
  'm22-art_20230514_0001.jpg',
  'm22-art_20230514_0002.jpg',
  'm23-animals_20230514_0001.jpg',
  'm23-animals_20230514_0002.jpg',
  'm23-animals_20230514_0003.jpg',
  'm23-animals_20230514_0004.jpg',
  'm23-animals_20230514_0005.jpg',
  'm23-animals_20230514_0006.jpg',
  'm24-animals_20230514_0001.jpg',
  'm24-animals_20230514_0002.jpg',
  'm24-animals_20230514_0003.jpg',
  'm24-animals_20230514_0004.jpg',
  'm25-flowers_20230514_0001.jpg',
  'm25-flowers_20230514_0002.jpg',
  'm25-flowers_20230514_0003.jpg',
  'm25-flowers_20230514_0004.jpg',
  'm25-flowers_20230514_0005.jpg',
  'm25-flowers_20230514_0006.jpg',
  'm26-flowers_20230514_0001.jpg',
  'm26-flowers_20230514_0002.jpg',
  'm26-flowers_20230514_0003.jpg',
  'm27-animals_20230514_0001.jpg',
  'm27-animals_20230514_0002.jpg',
  'm27-animals_20230514_0003.jpg',
  'm27-animals_20230514_0004.jpg',
  'm28-ships_20230514_0001.jpg',
  'm29-people_20230514_0001.jpg',
  'm29-people_20230514_0002.jpg',
  'm29-people_20230514_0003.jpg',
  'm29-people_20230514_0004.jpg',
  'm29-people_20230514_0005.jpg',
  'm29-people_20230514_0006.jpg',
  'm29-people_20230514_0007.jpg',
  'm29-people_20230514_0008.jpg',
  'm29-people_20230514_0009.jpg',
  'm3-cuba_20230514_0001.jpg',
  'm30-ussr-people_20230514_0001.jpg',
  'm30-ussr-people_20230514_0002.jpg',
  'm30-ussr-people_20230514_0003.jpg',
  'm31-ussr-buildings-cities_20230515_0001.jpg',
  'm31-ussr-buildings-cities_20230515_0002.jpg',
  'm31-ussr-buildings-cities_20230515_0003.jpg',
  'm31-ussr-buildings-cities_20230515_0004.jpg',
  'm32-people_20230515_0001.jpg',
  'm32-people_20230515_0002.jpg',
  'm32-people_20230515_0003.jpg',
  'm32-people_20230515_0004.jpg',
  'm32-people_20230515_0005.jpg',
  'm32-people_20230515_0006.jpg',
  'm32-people_20230515_0007.jpg',
  'm32-people_20230515_0008.jpg',
  'm32-people_20230515_0009.jpg',
  'm32-people_20230515_0010.jpg',
  'm32-people_20230515_0011.jpg',
  'm32-people_20230515_0012.jpg',
  'm33-people_20230515_0001.jpg',
  'm33-people_20230515_0002.jpg',
  'm33-people_20230515_0003.jpg',
  'm33-people_20230515_0004.jpg',
  'm33-people_20230515_0005.jpg',
  'm33-people_20230515_0006.jpg',
  'm33-people_20230515_0007.jpg',
  'm33-people_20230515_0008.jpg',
  'm33-people_20230515_0009.jpg',
  'm34-people_20230515_0001.jpg',
  'm34-people_20230515_0002.jpg',
  'm34-people_20230515_0003.jpg',
  'm34-people_20230515_0004.jpg',
  'm34-people_20230515_0005.jpg',
  'm34-people_20230515_0006.jpg',
  'm34-people_20230515_0007.jpg',
  'm34-people_20230515_0008.jpg',
  'm34-people_20230515_0009.jpg',
  'm35-people_20230515_0001.jpg',
  'm35-people_20230515_0002.jpg',
  'm35-people_20230515_0003.jpg',
  'm35-people_20230515_0004.jpg',
  'm35-people_20230515_0005.jpg',
  'm35-people_20230515_0006.jpg',
  'm35-people_20230515_0007.jpg',
  'm36-art_20230515_0001.jpg',
  'm36-art_20230515_0002.jpg',
  'm36-art_20230515_0003.jpg',
  'm36-art_20230515_0004.jpg',
  'm36-art_20230515_0005.jpg',
  'm37-people-animals_20230515_0001.jpg',
  'm37-people-animals_20230515_0003.jpg',
  'm37-people-animals_20230515_0004.jpg',
  'm38-people_20230515_0001.jpg',
  'm39-ussr-cosmos_20230515_0001.jpg',
  'm39-ussr-cosmos_20230515_0002.jpg',
  'm39-ussr-cosmos_20230515_0003.jpg',
  'm39-ussr-cosmos_20230515_0004.jpg',
  'm39-ussr-cosmos_20230515_0005.jpg',
  'm39-ussr-cosmos_20230515_0006.jpg',
  'm39-ussr-cosmos_20230515_0007.jpg',
  'm4-ships_20230514_0001.jpg',
  'm40-ussr-cosmos_20230515_0002.jpg',
  'm40-ussr-cosmos_20230515_0003.jpg',
  'm40-ussr-cosmos_20230515_0004.jpg',
  'm40-ussr-cosmos_20230515_0005.jpg',
  'm41-ussr-cosmos_20230515_0001.jpg',
  'm42-ussr-cosmos-people_20230516_0001.jpg',
  'm42-ussr-cosmos-people_20230516_0002.jpg',
  'm42-ussr-cosmos-people_20230516_0003.jpg',
  'm42-ussr-cosmos-people_20230516_0004.jpg',
  'm42-ussr-cosmos-people_20230516_0005.jpg',
  'm42-ussr-cosmos-people_20230516_0006.jpg',
  'm42-ussr-cosmos-people_20230516_0007.jpg',
  'm43-ussr-cosmos_20230516_0001.jpg',
  'm43-ussr-cosmos_20230516_0002.jpg',
  'm43-ussr-cosmos_20230516_0003.jpg',
  'm43-ussr-cosmos_20230516_0004.jpg',
  'm44-ussr-people_20230516_0001.jpg',
  'm44-ussr-people_20230516_0002.jpg',
  'm44-ussr-people_20230516_0003.jpg',
  'm44-ussr-people_20230516_0004.jpg',
  'm44-ussr-people_20230516_0005.jpg',
  'm44-ussr-people_20230516_0006.jpg',
  'm45-ussr-misc_20230516_0001.jpg',
  'm45-ussr-misc_20230516_0002.jpg',
  'm45-ussr-misc_20230516_0003.jpg',
  'm45-ussr-misc_20230516_0004.jpg',
  'm45-ussr-misc_20230516_0005.jpg',
  'm45-ussr-misc_20230516_0006.jpg',
  'm46-ussr-cities_20230516_0001.jpg',
  'm46-ussr-cities_20230516_0002.jpg',
  'm46-ussr-cities_20230516_0003.jpg',
  'm46-ussr-cities_20230516_0004.jpg',
  'm46-ussr-cities_20230516_0005.jpg',
  'm46-ussr-cities_20230516_0006.jpg',
  'm46-ussr-cities_20230516_0007.jpg',
  'm47-people-chess_20230516_0001.jpg',
  'm47-people-chess_20230516_0002.jpg',
  'm47-people-chess_20230516_0003.jpg',
  'm47-people-chess_20230516_0004.jpg',
  'm47-people-chess_20230516_0005.jpg',
  'm47-people-chess_20230516_0006.jpg',
  'm48-buildings_20230516_0001.jpg',
  'm48-buildings_20230516_0002.jpg',
  'm48-buildings_20230516_0003.jpg',
  'm48-buildings_20230516_0004.jpg',
  'm48-people-animals-misc_20230516_0001.jpg',
  'm48-people-animals-misc_20230516_0002.jpg',
  'm48-people-animals-misc_20230516_0003.jpg',
  'm48-people-animals-misc_20230516_0004.jpg',
  'm48-ussr-buildings-cities_20230516_0001.jpg',
  'm48-ussr-buildings-cities_20230516_0002.jpg',
  'm48-ussr-buildings-cities_20230516_0003.jpg',
  'm48-ussr-buildings-cities_20230516_0004.jpg',
  'm48-ussr-buildings-cities_20230516_0005.jpg',
  'm48-ussr-buildings-cities_20230516_0006.jpg',
  'm48-ussr-buildings-cities_20230516_0007.jpg',
  'm49-ussr_20230518_0001.jpg',
  'm49-ussr_20230518_0002.jpg',
  'm49-ussr_20230518_0003.jpg',
  'm49-ussr_20230518_0004.jpg',
  'm49-ussr_20230518_0005.jpg',
  'm49-ussr_20230518_0006.jpg',
  'm49-ussr_20230518_0007.jpg',
  'm49-ussr_20230518_0008.jpg',
  'm49-ussr_20230518_0009.jpg',
  'm5-ships_20230514_0001.jpg',
  'm50-buildings-cities-history_20230518_0001.jpg',
  'm50-buildings-cities-history_20230518_0003.jpg',
  'm50-buildings-cities-history_20230518_0004.jpg',
  'm50-buildings-cities-history_20230518_0005.jpg',
  'm50-buildings-cities-history_20230518_0006.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0001.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0003.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0004.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0005.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0006.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0007.jpg',
  'm51-buildings-landmarks-ussr-history-misc_20230518_0008.jpg',
  'm52-ussr_20230518_0002.jpg',
  'm52-ussr_20230518_0003.jpg',
  'm52-ussr_20230518_0004.jpg',
  'm52-ussr_20230518_0005.jpg',
  'm52-ussr_20230518_0006.jpg',
  'm52-ussr_20230518_0007.jpg',
  'm52-ussr_20230518_0008.jpg',
  'm53-ussr-people-landmarks_20230518_0001.jpg',
  'm53-ussr-people-landmarks_20230518_0002.jpg',
  'm53-ussr-people-landmarks_20230518_0003.jpg',
  'm53-ussr-people-landmarks_20230518_0004.jpg',
  'm53-ussr-people-landmarks_20230518_0005.jpg',
  'm53-ussr-people-landmarks_20230518_0006.jpg',
  'm53-ussr-people-landmarks_20230518_0007.jpg',
  'm53-ussr-people-landmarks_20230518_0008.jpg',
  'm54-ussr-people-landmarks_20230518_0001.jpg',
  'm54-ussr-people-landmarks_20230518_0002.jpg',
  'm54-ussr-people-landmarks_20230518_0003.jpg',
  'm54-ussr-people-landmarks_20230518_0004.jpg',
  'm54-ussr-people-landmarks_20230518_0005.jpg',
  'm54-ussr-people-landmarks_20230518_0006.jpg',
  'm55-ussr-people-landmarks-history_20230518_0001.jpg',
  'm55-ussr-people-landmarks-history_20230518_0002.jpg',
  'm55-ussr-people-landmarks-history_20230518_0003.jpg',
  'm55-ussr-people-landmarks-history_20230518_0004.jpg',
  'm55-ussr-people-landmarks-history_20230518_0005.jpg',
  'm55-ussr-people-landmarks-history_20230518_0006.jpg',
  'm55-ussr-people-landmarks-history_20230518_0007.jpg',
  'm56-ussr-people-landmarks_20230518_0001.jpg',
  'm56-ussr-people-landmarks_20230518_0002.jpg',
  'm56-ussr-people-landmarks_20230518_0003.jpg',
  'm56-ussr-people-landmarks_20230518_0004.jpg',
  'm56-ussr-people-landmarks_20230518_0005.jpg',
  'm56-ussr-people-landmarks_20230518_0006.jpg',
  'm57-ussr-people-landmarks_20230518_0001.jpg',
  'm57-ussr-people-landmarks_20230518_0002.jpg',
  'm57-ussr-people-landmarks_20230518_0003.jpg',
  'm57-ussr-people-landmarks_20230518_0004.jpg',
  'm57-ussr-people-landmarks_20230518_0005.jpg',
  'm57-ussr-people-landmarks_20230518_0006.jpg',
  'm57-ussr-people-landmarks_20230518_0007.jpg',
  'm58-people-history_20230518_0001.jpg',
  'm58-people-history_20230518_0002.jpg',
  'm58-people-history_20230518_0003.jpg',
  'm58-people-history_20230518_0004.jpg',
  'm58-people-history_20230518_0005.jpg',
  'm59-people-ussr_20230518_0001.jpg',
  'm59-people-ussr_20230518_0002.jpg',
  'm59-people-ussr_20230518_0003.jpg',
  'm59-people-ussr_20230518_0004.jpg',
  'm59-people-ussr_20230518_0005.jpg',
  'm59-people-ussr_20230518_0007.jpg',
  'm59-people-ussr_20230518_0008.jpg',
  'm6-ships_20230514_0001.jpg',
  'm60-ussr_20230518_0001.jpg',
  'm60-ussr_20230518_0002.jpg',
  'm60-ussr_20230518_0003.jpg',
  'm60-ussr_20230518_0004.jpg',
  'm60-ussr_20230518_0005.jpg',
  'm60-ussr_20230518_0006.jpg',
  'm61-ussr-misc_20230518_0001.jpg',
  'm61-ussr-misc_20230518_0002.jpg',
  'm61-ussr-misc_20230518_0003.jpg',
  'm61-ussr-misc_20230518_0004.jpg',
  'm61-ussr-misc_20230518_0005.jpg',
  'm62-art_20230518_0001.jpg',
  'm62-art_20230518_0002.jpg',
  'm62-art_20230518_0003.jpg',
  'm62-art_20230518_0004.jpg',
  'm62-art_20230518_0005.jpg',
  'm62-art_20230518_0006.jpg',
  'm63-ussr-people-misc_20230518_0001.jpg',
  'm63-ussr-people-misc_20230518_0002.jpg',
  'm63-ussr-people-misc_20230518_0003.jpg',
  'm63-ussr-people-misc_20230518_0004.jpg',
  'm63-ussr-people-misc_20230518_0005.jpg',
  'm63-ussr-people-misc_20230518_0006.jpg',
  'm63-ussr-people-misc_20230518_0007.jpg',
  'm63-ussr-people-misc_20230518_0008.jpg',
  'm63-ussr-people-misc_20230518_0009.jpg',
  'm64-misc_20230518_0001.jpg',
  'm64-misc_20230518_0002.jpg',
  'm64-misc_20230518_0003.jpg',
  'm65-buildings-landmarks_20230518_0001.jpg',
  'm65-buildings-landmarks_20230518_0002.jpg',
  'm65-buildings-landmarks_20230518_0003.jpg',
  'm65-buildings-landmarks_20230518_0004.jpg',
  'm65-buildings-landmarks_20230518_0005.jpg',
  'm65-buildings-landmarks_20230518_0006.jpg',
  'm65-buildings-landmarks_20230518_0007.jpg',
  'm65-buildings-landmarks_20230518_0008.jpg',
  'm65-buildings-landmarks_20230518_0009.jpg',
  'm66-art_20230518_0001.jpg',
  'm66-art_20230518_0002.jpg',
  'm66-art_20230518_0003.jpg',
  'm66-art_20230518_0004.jpg',
  'm66-art_20230518_0005.jpg',
  'm66-art_20230518_0006.jpg',
  'm66-art_20230518_0007.jpg',
  'm67-art_20230518_0001.jpg',
  'm67-art_20230518_0002.jpg',
  'm67-art_20230518_0003.jpg',
  'm67-art_20230518_0004.jpg',
  'm67-art_20230518_0005.jpg',
  'm67-art_20230518_0006.jpg',
  'm67-art_20230518_0007.jpg',
  'm67-art_20230518_0008.jpg',
  'm68-art_20230518_0001.jpg',
  'm68-art_20230518_0002.jpg',
  'm68-art_20230518_0003.jpg',
  'm68-art_20230518_0004.jpg',
  'm68-art_20230518_0005.jpg',
  'm68-art_20230518_0006.jpg',
  'm68-art_20230518_0007.jpg',
  'm69-art_20230518_0001.jpg',
  'm69-art_20230518_0002.jpg',
  'm69-art_20230518_0003.jpg',
  'm69-art_20230518_0004.jpg',
  'm69-art_20230518_0005.jpg',
  'm69-art_20230518_0006.jpg',
  'm69-art_20230518_0007.jpg',
  'm69-art_20230518_0008.jpg',
  'm7-ships_20230514_0001.jpg',
  'm70-ussr_20230518_0001.jpg',
  'm70-ussr_20230518_0002.jpg',
  'm70-ussr_20230518_0003.jpg',
  'm71-art_20230518_0001.jpg',
  'm71-art_20230518_0002.jpg',
  'm71-art_20230518_0003.jpg',
  'm71-art_20230518_0004.jpg',
  'm71-art_20230518_0005.jpg',
  'm71-art_20230518_0006.jpg',
  'm71-art_20230518_0007.jpg',
  'm72-art_20230518_0001.jpg',
  'm72-art_20230518_0002.jpg',
  'm72-art_20230518_0003.jpg',
  'm72-art_20230518_0004.jpg',
  'm72-art_20230518_0005.jpg',
  'm72-art_20230518_0006.jpg',
  'm72-art_20230518_0007.jpg',
  'm73-ussr_20230518_0001.jpg',
  'm73-ussr_20230518_0002.jpg',
  'm73-ussr_20230518_0003.jpg',
  'm73-ussr_20230518_0004.jpg',
  'm73-ussr_20230518_0005.jpg',
  'm73-ussr_20230518_0006.jpg',
  'm74-ussr_20230518_0001.jpg',
  'm74-ussr_20230518_0002.jpg',
  'm74-ussr_20230518_0003.jpg',
  'm74-ussr_20230518_0004.jpg',
  'm74-ussr_20230518_0005.jpg',
  'm74-ussr_20230518_0006.jpg',
  'm74-ussr_20230518_0007.jpg',
  'm74-ussr_20230518_0008.jpg',
  'm74-ussr_20230518_0009.jpg',
  'm75-ussr_20230518_0001.jpg',
  'm75-ussr_20230518_0002.jpg',
  'm75-ussr_20230518_0003.jpg',
  'm75-ussr_20230518_0004.jpg',
  'm76-art_20230518_0001.jpg',
  'm76-art_20230518_0002.jpg',
  'm76-art_20230518_0003.jpg',
  'm76-art_20230518_0004.jpg',
  'm76-art_20230518_0005.jpg',
  'm76-art_20230518_0006.jpg',
  'm76-art_20230518_0007.jpg',
  'm76-art_20230518_0008.jpg',
  'm77-art_20230518_0001.jpg',
  'm77-art_20230518_0002.jpg',
  'm77-art_20230518_0003.jpg',
  'm77-art_20230518_0004.jpg',
  'm77-art_20230518_0005.jpg',
  'm77-art_20230518_0006.jpg',
  'm77-art_20230518_0007.jpg',
  'm78-art_20230518_0001.jpg',
  'm78-art_20230518_0002.jpg',
  'm78-art_20230518_0003.jpg',
  'm78-art_20230518_0004.jpg',
  'm78-art_20230518_0005.jpg',
  'm78-art_20230518_0006.jpg',
  'm78-art_20230518_0007.jpg',
  'm79-srilanka_20230518_0001.jpg',
  'm79-srilanka_20230518_0002.jpg',
  'm8-ships_20230514_0001.jpg',
  'm80-ussr-countries-misc_20230518_0001.jpg',
  'm80-ussr-countries-misc_20230518_0002.jpg',
  'm80-ussr-countries-misc_20230518_0003.jpg',
  'm80-ussr-countries-misc_20230518_0004.jpg',
  'm80-ussr-countries-misc_20230518_0005.jpg',
  'm80-ussr-countries-misc_20230518_0006.jpg',
  'm80-ussr-countries-misc_20230518_0007.jpg',
  'm80-ussr-countries-misc_20230518_0008.jpg',
  'm80-ussr-countries-misc_20230518_0009.jpg',
  'm80-ussr-countries-misc_20230518_0010.jpg',
  'm81-ussr-countries-misc_20230518_0001.jpg',
  'm81-ussr-countries-misc_20230518_0002.jpg',
  'm81-ussr-countries-misc_20230518_0003.jpg',
  'm81-ussr-countries-misc_20230518_0004.jpg',
  'm82-ussr-misc_20230518_0001.jpg',
  'm82-ussr-misc_20230518_0002.jpg',
  'm82-ussr-misc_20230518_0003.jpg',
  'm82-ussr-misc_20230518_0004.jpg',
  'm82-ussr-misc_20230518_0005.jpg',
  'm82-ussr-misc_20230518_0006.jpg',
  'm9-ships_20230514_0001.jpg'
];

  useEffect(() => {
    // 2) Convert filenames into objects (without forcing immediate downloads)
    const stampImages = imageFiles.map((file, index) => ({
      id: index + 1,
      title: file.replace('.jpg', '').replace(/-/g, ' '),
      src: `/images/${file}`,    // Will load only when <img> is rendered
    }));

    // 3) Update React state — no manual preloading with Promise.all
    setStamps(stampImages);
  }, []);

  const handleSlideChange = useCallback((newIndex) => {
    //setIsTransitioning(true);
    setCurrentIndex(newIndex);
    //setTimeout(() => setIsTransitioning(false), 300);
  }, []);

  const nextSlide = useCallback(() => {
    //if (stamps.length > 0 && !isTransitioning) {
    //  handleSlideChange((currentIndex + 1) % stamps.length);
    //}
    if (stamps.length > 0) {
        handleSlideChange((currentIndex + 1) % stamps.length);
      }    
  }, [stamps.length, currentIndex, handleSlideChange]);

  const prevSlide = useCallback(() => {
    if (stamps.length > 0 && !isTransitioning) {
      handleSlideChange((currentIndex - 1 + stamps.length) % stamps.length);
    }
  }, [stamps.length, currentIndex, isTransitioning, handleSlideChange]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (stamps.length > 0 && !isTransitioning) {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [stamps.length, nextSlide, prevSlide, isTransitioning]);

  if (stamps.length === 0) return null;

  return (
    <div className="min-h-screen relative">
      {/* Museum Background */}
      <div 
        className="absolute inset-0 bg-[url('/pexels-photo-3004909.jpeg')] bg-cover bg-center"
        style={{
          filter: 'brightness(0.9)'
        }}
      />
      
      {/* Content Overlay */}
      <div className="relative min-h-screen flex items-center justify-center p-4 bg-black/30">
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Main Image Container */}
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-6">
            <div className="relative aspect-[4/3] flex items-center justify-center overflow-hidden rounded-2xl bg-black/5">
              <img
                src={stamps[currentIndex].src}
                alt={stamps[currentIndex].title}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation Buttons */}
              <button
                onClick={prevSlide}
                className="absolute left-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-x-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Previous image"
                disabled={isTransitioning}
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 p-3 rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:translate-x-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Next image"
                disabled={isTransitioning}
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mb-4">
            {stamps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white w-6' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Counter */}
          <div className="text-center">
            <p className="text-white/90 text-sm font-medium">
              {currentIndex + 1} of {stamps.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampCarousel;
