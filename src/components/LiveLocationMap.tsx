import { GripVertical } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { Rnd } from "react-rnd";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Create a custom blinking green dot icon
const createBlinkingIcon = () => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="position: relative;">
        <div class="blinking-dot"></div>
        <div class="blinking-dot-pulse"></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

// Component to recenter map when position changes and fix map size
const RecenterMap = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);
  return null;
};

// Component to invalidate map size when container resizes
const InvalidateSize = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 100);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

const LiveLocationMap = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [size, setSize] = useState({ width: 300, height: 250 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const mapRef = useRef<L.Map | null>(null);

  // Check screen size and hide on mobile/tablet
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 800);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    // Get initial position
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
        setError(null);
      },
      (err) => {
        setError(`Unable to retrieve location: ${err.message}`);
        setIsLoading(false);
      }
    );

    // Watch position for live updates
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setError(null);
      },
      (err) => {
        setError(`Unable to retrieve location: ${err.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Invalidate map size when dimensions change
  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [size]);

  // Hide on small screens (mobile and tablets)
  if (isSmallScreen) {
    return null;
  }

  if (isLoading) {
    return (
      <Rnd
        default={{
          x: window.innerWidth - 320,
          y: 16,
          width: 300,
          height: 250,
        }}
        minWidth={200}
        minHeight={150}
        maxWidth={800}
        maxHeight={600}
        bounds="window"
        dragHandleClassName="drag-handle"
        className="z-50"
      >
        <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="drag-handle cursor-move absolute top-0 left-0 right-0 h-8 flex items-center justify-center">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-center h-full">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Loading location...
            </div>
          </div>
        </div>
      </Rnd>
    );
  }

  if (error || !position) {
    return (
      <Rnd
        default={{
          x: window.innerWidth - 320,
          y: 16,
          width: 300,
          height: 250,
        }}
        minWidth={200}
        minHeight={150}
        maxWidth={800}
        maxHeight={600}
        bounds="window"
        dragHandleClassName="drag-handle"
        className="z-50"
      >
        <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4">
          <div className="drag-handle cursor-move absolute top-0 left-0 right-0 h-8 flex items-center justify-center">
            <GripVertical className="h-4 w-4 text-gray-400" />
          </div>
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-sm text-red-600 dark:text-red-400 text-center">
              {error || "Unable to get location"}
            </div>
            <div className="text-xs text-gray-500 mt-2 text-center">
              Please enable location services
            </div>
          </div>
        </div>
      </Rnd>
    );
  }

  return (
    <>
      <style>{`
        .blinking-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #22c55e;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
          animation: blink 1.5s ease-in-out infinite;
        }

        .blinking-dot-pulse {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: #22c55e;
          border-radius: 50%;
          opacity: 0.6;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        .custom-marker {
          background: none;
          border: none;
        }

        .leaflet-container {
          border-radius: 0.5rem;
        }

        .drag-handle {
          cursor: move !important;
        }

        .react-draggable-dragging .leaflet-container {
          pointer-events: none;
        }
      `}</style>

      <Rnd
        default={{
          x: window.innerWidth - 320,
          y: 16,
          width: 300,
          height: 250,
        }}
        minWidth={200}
        minHeight={150}
        maxWidth={800}
        maxHeight={600}
        bounds="window"
        dragHandleClassName="drag-handle"
        className="z-50"
        onResizeStop={(_e, _direction, ref, _delta, _position) => {
          const newSize = {
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          };
          setSize(newSize);
        }}
      >
        <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="relative h-full">
            {/* Drag Handle */}
            <div className="drag-handle absolute top-0 left-0 right-0 h-8 flex items-center justify-center z-[1000] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
              <GripVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                Drag to move • Resize from corners
              </span>
            </div>

            {/* Live Location Badge */}
            <div className="absolute top-10 left-2 z-[1000] bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-md border border-gray-300 dark:border-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Live Location
                </span>
              </div>
            </div>

            {/* Map */}
            <div className="h-full pt-8">
              <MapContainer
                center={position}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
                zoomControl={true}
                dragging={true}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                attributionControl={true}
                ref={(map) => {
                  if (map) {
                    mapRef.current = map;
                  }
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position} icon={createBlinkingIcon()} />
                <RecenterMap position={position} />
                <InvalidateSize key={`${size.width}-${size.height}`} />
              </MapContainer>
            </div>
          </div>
        </div>
      </Rnd>
    </>
  );
};

export default LiveLocationMap;
