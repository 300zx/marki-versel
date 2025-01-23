import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const StampCarousel = () => {
  const [stamps, setStamps] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 1) Store filenames in a simple array (expand to 400+ as needed)
  const imageFiles = [
    'm-ships_20230514_0001.png',
    'm-trains_20230514_0001.png',
    'm-trains_20230514_0002.png',
    'm-trains_20230514_0003.png',
    'm-trains_20230514_0004.png',
    'm-trains_20230514_0005.png',
    'm1-lenin-1978_20230514_0001.png',
    'm10-ships_20230514_0001.png',
    'm10-ships_20230514_0002.png',
    'm11-ships_20230514_0001.png',
    'm11-ships_20230514_0002.png',
    'm11-ships_20230514_0003.png',
    'm12-ships_20230514_0001.png',
    'm12-ships_20230514_0002.png',
    'm13-ships_20230514_0001.png',
    'm13-ships_20230514_0002.png',
    'm13-ships_20230514_0003.png',
    'm13-ships_20230514_0004.png',
    'm13-ships_20230514_0005.png',
    'm13-ships_20230514_0006.png',
    'm14-ships_20230514_0001.png',
    'm14-ships_20230514_0002.png',
    'm14-ships_20230514_0003.png',
    'm14-ships_20230514_0004.png',
    'm14-ships_20230514_0005.png',
    'm15-ships_20230514_0001.png',
    'm15-ships_20230514_0002.png',
    'm15-ships_20230514_0003.png',
    'm16-planes_20230514_0001.png',
    'm16-planes_20230514_0002.png',
    'm16-planes_20230514_0003.png',
    'm16-planes_20230514_0004.png',
    'm16-planes_20230514_0005.png',
    'm16-planes_20230514_0006.png',
    'm17-planes_20230514_0001.png',
    'm17-planes_20230514_0002.png',
    'm17-planes_20230514_0003.png',
    'm17-planes_20230514_0004.png',
    'm17-planes_20230514_0005.png',
    'm18-planes_20230514_0001.png',
    'm18-planes_20230514_0002.png',
    'm18-planes_20230514_0003.png',
    'm18-planes_20230514_0004.png',
    'm18-planes_20230514_0005.png',
    'm19-russia-history-museum_20230514_0001.png',
    'm2-ussr-1979_20230514_0001.png',
    'm21-trains_20230514_0001.png',
    'm21-trains_20230514_0002.png',
    'm21-trains_20230514_0003.png',
    'm21-trains_20230514_0004.png',
    'm21-trains_20230514_0005.png',
    'm21-trains_20230514_0006.png',
    'm22-art_20230514_0001.png',
    'm22-art_20230514_0002.png',
    'm23-animals_20230514_0001.png',
    'm23-animals_20230514_0002.png',
    'm23-animals_20230514_0003.png',
    'm23-animals_20230514_0004.png',
    'm23-animals_20230514_0005.png',
    'm23-animals_20230514_0006.png',
    'm24-animals_20230514_0001.png',
    'm24-animals_20230514_0002.png',
    'm24-animals_20230514_0003.png',
    'm24-animals_20230514_0004.png',
    'm25-flowers_20230514_0001.png',
    'm25-flowers_20230514_0002.png',
    'm25-flowers_20230514_0003.png',
    'm25-flowers_20230514_0004.png',
    'm25-flowers_20230514_0005.png',
    'm25-flowers_20230514_0006.png',
    'm26-flowers_20230514_0001.png',
    'm26-flowers_20230514_0002.png',
    'm26-flowers_20230514_0003.png',
    'm27-animals_20230514_0001.png',
    'm27-animals_20230514_0002.png',
    'm27-animals_20230514_0003.png',
    'm27-animals_20230514_0004.png',
    'm28-ships_20230514_0001.png',
    'm29-people_20230514_0001.png',
    'm29-people_20230514_0002.png',
    'm29-people_20230514_0003.png',
    'm29-people_20230514_0004.png',
    'm29-people_20230514_0005.png',
    'm29-people_20230514_0006.png',
    'm29-people_20230514_0007.png',
    'm29-people_20230514_0008.png',
    'm29-people_20230514_0009.png',
    'm3-cuba_20230514_0001.png',
    'm30-ussr-people_20230514_0001.png',
    'm30-ussr-people_20230514_0002.png',
    'm30-ussr-people_20230514_0003.png',
    'm31-ussr-buildings-cities_20230515_0001.png',
    'm31-ussr-buildings-cities_20230515_0002.png',
    'm31-ussr-buildings-cities_20230515_0003.png',
    'm31-ussr-buildings-cities_20230515_0004.png',
    'm32-people_20230515_0001.png',
    'm32-people_20230515_0002.png',
    'm32-people_20230515_0003.png',
    'm32-people_20230515_0004.png',
    'm32-people_20230515_0005.png',
    'm32-people_20230515_0006.png',
    'm32-people_20230515_0007.png',
    'm32-people_20230515_0008.png',
    'm32-people_20230515_0009.png',
    'm32-people_20230515_0010.png',
    'm32-people_20230515_0011.png',
    'm32-people_20230515_0012.png',
    'm33-people_20230515_0001.png',
    'm33-people_20230515_0002.png',
    'm33-people_20230515_0003.png',
    'm33-people_20230515_0004.png',
    'm33-people_20230515_0005.png',
    'm33-people_20230515_0006.png',
    'm33-people_20230515_0007.png',
    'm33-people_20230515_0008.png',
    'm33-people_20230515_0009.png',
    'm34-people_20230515_0001.png',
    'm34-people_20230515_0002.png',
    'm34-people_20230515_0003.png',
    'm34-people_20230515_0004.png',
    'm34-people_20230515_0005.png',
    'm34-people_20230515_0006.png',
    'm34-people_20230515_0007.png',
    'm34-people_20230515_0008.png',
    'm34-people_20230515_0009.png',
    'm35-people_20230515_0001.png',
    'm35-people_20230515_0002.png',
    'm35-people_20230515_0003.png',
    'm35-people_20230515_0004.png',
    'm35-people_20230515_0005.png',
    'm35-people_20230515_0006.png',
    'm35-people_20230515_0007.png',
    'm36-art_20230515_0001.png',
    'm36-art_20230515_0002.png',
    'm36-art_20230515_0003.png',
    'm36-art_20230515_0004.png',
    'm36-art_20230515_0005.png',
    'm37-people-animals_20230515_0001.png',
    'm37-people-animals_20230515_0003.png',
    'm37-people-animals_20230515_0004.png',
    'm38-people_20230515_0001.png',
    'm39-ussr-cosmos_20230515_0001.png',
    'm39-ussr-cosmos_20230515_0002.png',
    'm39-ussr-cosmos_20230515_0003.png',
    'm39-ussr-cosmos_20230515_0004.png',
    'm39-ussr-cosmos_20230515_0005.png',
    'm39-ussr-cosmos_20230515_0006.png',
    'm39-ussr-cosmos_20230515_0007.png',
    'm4-ships_20230514_0001.png',
    'm40-ussr-cosmos_20230515_0002.png',
    'm40-ussr-cosmos_20230515_0003.png',
    'm40-ussr-cosmos_20230515_0004.png',
    'm40-ussr-cosmos_20230515_0005.png',
    'm41-ussr-cosmos_20230515_0001.png',
    'm42-ussr-cosmos-people_20230516_0001.png',
    'm42-ussr-cosmos-people_20230516_0002.png',
    'm42-ussr-cosmos-people_20230516_0003.png',
    'm42-ussr-cosmos-people_20230516_0004.png',
    'm42-ussr-cosmos-people_20230516_0005.png',
    'm42-ussr-cosmos-people_20230516_0006.png',
    'm42-ussr-cosmos-people_20230516_0007.png',
    'm43-ussr-cosmos_20230516_0001.png',
    'm43-ussr-cosmos_20230516_0002.png',
    'm43-ussr-cosmos_20230516_0003.png',
    'm43-ussr-cosmos_20230516_0004.png',
    'm44-ussr-people_20230516_0001.png',
    'm44-ussr-people_20230516_0002.png',
    'm44-ussr-people_20230516_0003.png',
    'm44-ussr-people_20230516_0004.png',
    'm44-ussr-people_20230516_0005.png',
    'm44-ussr-people_20230516_0006.png',
    'm45-ussr-misc_20230516_0001.png',
    'm45-ussr-misc_20230516_0002.png',
    'm45-ussr-misc_20230516_0003.png',
    'm45-ussr-misc_20230516_0004.png',
    'm45-ussr-misc_20230516_0005.png',
    'm45-ussr-misc_20230516_0006.png',
    'm46-ussr-cities_20230516_0001.png',
    'm46-ussr-cities_20230516_0002.png',
    'm46-ussr-cities_20230516_0003.png',
    'm46-ussr-cities_20230516_0004.png',
    'm46-ussr-cities_20230516_0005.png',
    'm46-ussr-cities_20230516_0006.png',
    'm46-ussr-cities_20230516_0007.png',
    'm47-people-chess_20230516_0001.png',
    'm47-people-chess_20230516_0002.png',
    'm47-people-chess_20230516_0003.png',
    'm47-people-chess_20230516_0004.png',
    'm47-people-chess_20230516_0005.png',
    'm47-people-chess_20230516_0006.png',
    'm48-buildings_20230516_0001.png',
    'm48-buildings_20230516_0002.png',
    'm48-buildings_20230516_0003.png',
    'm48-buildings_20230516_0004.png',
    'm48-people-animals-misc_20230516_0001.png',
    'm48-people-animals-misc_20230516_0002.png',
    'm48-people-animals-misc_20230516_0003.png',
    'm48-people-animals-misc_20230516_0004.png',
    'm48-ussr-buildings-cities_20230516_0001.png',
    'm48-ussr-buildings-cities_20230516_0002.png',
    'm48-ussr-buildings-cities_20230516_0003.png',
    'm48-ussr-buildings-cities_20230516_0004.png',
    'm48-ussr-buildings-cities_20230516_0005.png',
    'm48-ussr-buildings-cities_20230516_0006.png',
    'm48-ussr-buildings-cities_20230516_0007.png',
    'm49-ussr_20230518_0001.png',
    'm49-ussr_20230518_0002.png',
    'm49-ussr_20230518_0003.png',
    'm49-ussr_20230518_0004.png',
    'm49-ussr_20230518_0005.png',
    'm49-ussr_20230518_0006.png',
    'm49-ussr_20230518_0007.png',
    'm49-ussr_20230518_0008.png',
    'm49-ussr_20230518_0009.png',
    'm5-ships_20230514_0001.png',
    'm50-buildings-cities-history_20230518_0001.png',
    'm50-buildings-cities-history_20230518_0003.png',
    'm50-buildings-cities-history_20230518_0004.png',
    'm50-buildings-cities-history_20230518_0005.png',
    'm50-buildings-cities-history_20230518_0006.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0001.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0003.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0004.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0005.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0006.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0007.png',
    'm51-buildings-landmarks-ussr-history-misc_20230518_0008.png',
    'm52-ussr_20230518_0002.png',
    'm52-ussr_20230518_0003.png',
    'm52-ussr_20230518_0004.png',
    'm52-ussr_20230518_0005.png',
    'm52-ussr_20230518_0006.png',
    'm52-ussr_20230518_0007.png',
    'm52-ussr_20230518_0008.png',
    'm53-ussr-people-landmarks_20230518_0001.png',
    'm53-ussr-people-landmarks_20230518_0002.png',
    'm53-ussr-people-landmarks_20230518_0003.png',
    'm53-ussr-people-landmarks_20230518_0004.png',
    'm53-ussr-people-landmarks_20230518_0005.png',
    'm53-ussr-people-landmarks_20230518_0006.png',
    'm53-ussr-people-landmarks_20230518_0007.png',
    'm53-ussr-people-landmarks_20230518_0008.png',
    'm54-ussr-people-landmarks_20230518_0001.png',
    'm54-ussr-people-landmarks_20230518_0002.png',
    'm54-ussr-people-landmarks_20230518_0003.png',
    'm54-ussr-people-landmarks_20230518_0004.png',
    'm54-ussr-people-landmarks_20230518_0005.png',
    'm54-ussr-people-landmarks_20230518_0006.png',
    'm55-ussr-people-landmarks-history_20230518_0001.png',
    'm55-ussr-people-landmarks-history_20230518_0002.png',
    'm55-ussr-people-landmarks-history_20230518_0003.png',
    'm55-ussr-people-landmarks-history_20230518_0004.png',
    'm55-ussr-people-landmarks-history_20230518_0005.png',
    'm55-ussr-people-landmarks-history_20230518_0006.png',
    'm55-ussr-people-landmarks-history_20230518_0007.png',
    'm56-ussr-people-landmarks_20230518_0001.png',
    'm56-ussr-people-landmarks_20230518_0002.png',
    'm56-ussr-people-landmarks_20230518_0003.png',
    'm56-ussr-people-landmarks_20230518_0004.png',
    'm56-ussr-people-landmarks_20230518_0005.png',
    'm56-ussr-people-landmarks_20230518_0006.png',
    'm57-ussr-people-landmarks_20230518_0001.png',
    'm57-ussr-people-landmarks_20230518_0002.png',
    'm57-ussr-people-landmarks_20230518_0003.png',
    'm57-ussr-people-landmarks_20230518_0004.png',
    'm57-ussr-people-landmarks_20230518_0005.png',
    'm57-ussr-people-landmarks_20230518_0006.png',
    'm57-ussr-people-landmarks_20230518_0007.png',
    'm58-people-history_20230518_0001.png',
    'm58-people-history_20230518_0002.png',
    'm58-people-history_20230518_0003.png',
    'm58-people-history_20230518_0004.png',
    'm58-people-history_20230518_0005.png',
    'm59-people-ussr_20230518_0001.png',
    'm59-people-ussr_20230518_0002.png',
    'm59-people-ussr_20230518_0003.png',
    'm59-people-ussr_20230518_0004.png',
    'm59-people-ussr_20230518_0005.png',
    'm59-people-ussr_20230518_0007.png',
    'm59-people-ussr_20230518_0008.png',
    'm6-ships_20230514_0001.png',
    'm60-ussr_20230518_0001.png',
    'm60-ussr_20230518_0002.png',
    'm60-ussr_20230518_0003.png',
    'm60-ussr_20230518_0004.png',
    'm60-ussr_20230518_0005.png',
    'm60-ussr_20230518_0006.png',
    'm61-ussr-misc_20230518_0001.png',
    'm61-ussr-misc_20230518_0002.png',
    'm61-ussr-misc_20230518_0003.png',
    'm61-ussr-misc_20230518_0004.png',
    'm61-ussr-misc_20230518_0005.png',
    'm62-art_20230518_0001.png',
    'm62-art_20230518_0002.png',
    'm62-art_20230518_0003.png',
    'm62-art_20230518_0004.png',
    'm62-art_20230518_0005.png',
    'm62-art_20230518_0006.png',
    'm63-ussr-people-misc_20230518_0001.png',
    'm63-ussr-people-misc_20230518_0002.png',
    'm63-ussr-people-misc_20230518_0003.png',
    'm63-ussr-people-misc_20230518_0004.png',
    'm63-ussr-people-misc_20230518_0005.png',
    'm63-ussr-people-misc_20230518_0006.png',
    'm63-ussr-people-misc_20230518_0007.png',
    'm63-ussr-people-misc_20230518_0008.png',
    'm63-ussr-people-misc_20230518_0009.png',
    'm64-misc_20230518_0001.png',
    'm64-misc_20230518_0002.png',
    'm64-misc_20230518_0003.png',
    'm65-buildings-landmarks_20230518_0001.png',
    'm65-buildings-landmarks_20230518_0002.png',
    'm65-buildings-landmarks_20230518_0003.png',
    'm65-buildings-landmarks_20230518_0004.png',
    'm65-buildings-landmarks_20230518_0005.png',
    'm65-buildings-landmarks_20230518_0006.png',
    'm65-buildings-landmarks_20230518_0007.png',
    'm65-buildings-landmarks_20230518_0008.png',
    'm65-buildings-landmarks_20230518_0009.png',
    'm66-art_20230518_0001.png',
    'm66-art_20230518_0002.png',
    'm66-art_20230518_0003.png',
    'm66-art_20230518_0004.png',
    'm66-art_20230518_0005.png',
    'm66-art_20230518_0006.png',
    'm66-art_20230518_0007.png',
    'm67-art_20230518_0001.png',
    'm67-art_20230518_0002.png',
    'm67-art_20230518_0003.png',
    'm67-art_20230518_0004.png',
    'm67-art_20230518_0005.png',
    'm67-art_20230518_0006.png',
    'm67-art_20230518_0007.png',
    'm67-art_20230518_0008.png',
    'm68-art_20230518_0001.png',
    'm68-art_20230518_0002.png',
    'm68-art_20230518_0003.png',
    'm68-art_20230518_0004.png',
    'm68-art_20230518_0005.png',
    'm68-art_20230518_0006.png',
    'm68-art_20230518_0007.png',
    'm69-art_20230518_0001.png',
    'm69-art_20230518_0002.png',
    'm69-art_20230518_0003.png',
    'm69-art_20230518_0004.png',
    'm69-art_20230518_0005.png',
    'm69-art_20230518_0006.png',
    'm69-art_20230518_0007.png',
    'm69-art_20230518_0008.png',
    'm7-ships_20230514_0001.png',
    'm70-ussr_20230518_0001.png',
    'm70-ussr_20230518_0002.png',
    'm70-ussr_20230518_0003.png',
    'm71-art_20230518_0001.png',
    'm71-art_20230518_0002.png',
    'm71-art_20230518_0003.png',
    'm71-art_20230518_0004.png',
    'm71-art_20230518_0005.png',
    'm71-art_20230518_0006.png',
    'm71-art_20230518_0007.png',
    'm72-art_20230518_0001.png',
    'm72-art_20230518_0002.png',
    'm72-art_20230518_0003.png',
    'm72-art_20230518_0004.png',
    'm72-art_20230518_0005.png',
    'm72-art_20230518_0006.png',
    'm72-art_20230518_0007.png',
    'm73-ussr_20230518_0001.png',
    'm73-ussr_20230518_0002.png',
    'm73-ussr_20230518_0003.png',
    'm73-ussr_20230518_0004.png',
    'm73-ussr_20230518_0005.png',
    'm73-ussr_20230518_0006.png',
    'm74-ussr_20230518_0001.png',
    'm74-ussr_20230518_0002.png',
    'm74-ussr_20230518_0003.png',
    'm74-ussr_20230518_0004.png',
    'm74-ussr_20230518_0005.png',
    'm74-ussr_20230518_0006.png',
    'm74-ussr_20230518_0007.png',
    'm74-ussr_20230518_0008.png',
    'm74-ussr_20230518_0009.png',
    'm75-ussr_20230518_0001.png',
    'm75-ussr_20230518_0002.png',
    'm75-ussr_20230518_0003.png',
    'm75-ussr_20230518_0004.png',
    'm76-art_20230518_0001.png',
    'm76-art_20230518_0002.png',
    'm76-art_20230518_0003.png',
    'm76-art_20230518_0004.png',
    'm76-art_20230518_0005.png',
    'm76-art_20230518_0006.png',
    'm76-art_20230518_0007.png',
    'm76-art_20230518_0008.png',
    'm77-art_20230518_0001.png',
    'm77-art_20230518_0002.png',
    'm77-art_20230518_0003.png',
    'm77-art_20230518_0004.png',
    'm77-art_20230518_0005.png',
    'm77-art_20230518_0006.png',
    'm77-art_20230518_0007.png',
    'm78-art_20230518_0001.png',
    'm78-art_20230518_0002.png',
    'm78-art_20230518_0003.png',
    'm78-art_20230518_0004.png',
    'm78-art_20230518_0005.png',
    'm78-art_20230518_0006.png',
    'm78-art_20230518_0007.png',
    'm79-srilanka_20230518_0001.png',
    'm79-srilanka_20230518_0002.png',
    'm8-ships_20230514_0001.png',
    'm80-ussr-countries-misc_20230518_0001.png',
    'm80-ussr-countries-misc_20230518_0002.png',
    'm80-ussr-countries-misc_20230518_0003.png',
    'm80-ussr-countries-misc_20230518_0004.png',
    'm80-ussr-countries-misc_20230518_0005.png',
    'm80-ussr-countries-misc_20230518_0006.png',
    'm80-ussr-countries-misc_20230518_0007.png',
    'm80-ussr-countries-misc_20230518_0008.png',
    'm80-ussr-countries-misc_20230518_0009.png',
    'm80-ussr-countries-misc_20230518_0010.png',
    'm81-ussr-countries-misc_20230518_0001.png',
    'm81-ussr-countries-misc_20230518_0002.png',
    'm81-ussr-countries-misc_20230518_0003.png',
    'm81-ussr-countries-misc_20230518_0004.png',
    'm82-ussr-misc_20230518_0001.png',
    'm82-ussr-misc_20230518_0002.png',
    'm82-ussr-misc_20230518_0003.png',
    'm82-ussr-misc_20230518_0004.png',
    'm82-ussr-misc_20230518_0005.png',
    'm82-ussr-misc_20230518_0006.png',
    'm9-ships_20230514_0001.png'
  ];

  useEffect(() => {
    // 2) Convert filenames into objects (without forcing immediate downloads)
    const stampImages = imageFiles.map((file, index) => ({
      id: index + 1,
      title: file.replace('.png', '').replace(/-/g, ' '),
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
