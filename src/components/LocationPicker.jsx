// src/components/LocationPicker.jsx
import React, { useEffect, useRef } from "react";

/**
 * Usage:
 * <LocationPicker onSelect={(place) => setLocation(place.formatted_address || `${place.geometry.location.lat()},${place.geometry.location.lng()}`)} />
 *
 * Ensure Google Maps JS is loaded (script with places lib).
 */

export default function LocationPicker({ onSelect, placeholder = "Search address or place" }) {
  const inputRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !window.google) return;

    autoRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      fields: ["formatted_address", "geometry", "name", "place_id"],
      types: ["address", "establishment"]
    });

    autoRef.current.addListener("place_changed", () => {
      const place = autoRef.current.getPlace();
      if (!place.geometry) {
        return; // no geometry
      }
      const formatted = place.formatted_address || place.name;
      onSelect({
        formatted_address: formatted,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        placeId: place.place_id
      });
    });

    return () => {
      if (autoRef.current) window.google.maps.event.clearInstanceListeners(autoRef.current);
    };
  }, []);

  return (
    <input ref={inputRef} placeholder={placeholder} className="w-full border rounded px-3 py-2" />
  );
}
