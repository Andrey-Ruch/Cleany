import { useState } from "react";
import { useAllPostsContext } from "../pages/PostsPage";
import { Link } from "react-router-dom";
import findDuplicateLocations from "../utils/findDuplicateLocations";
import MapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX_TOKEN } from "../config-global";

const MapContainer = () => {
  const { data, route } = useAllPostsContext();

  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 34.830317847081766, // Israel
    latitude: 31.95747436391068, // Israel
    zoom: 7,
  });

  const locations = findDuplicateLocations(data.posts);

  return (
    <div className="map">
      <MapGL
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewState}
        onMove={(evt) => {
          setViewState(evt.viewState);
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />

        {locations.map((location, index) => {
          return (
            <div key={index}>
              <Marker
                longitude={location.longitude}
                latitude={location.latitude}
                color="#2771e0"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setCurrentLocationId(index);
                }}
              />

              {index === currentLocationId && (
                <Popup
                  longitude={location.longitude}
                  latitude={location.latitude}
                  onClose={() => setCurrentLocationId(null)}
                >
                  {location.objects.map((object) => {
                    return (
                      <div className="map-link" key={object._id}>
                        <Link to={`/dashboard/${route}/extended/${object._id}`}>
                          <strong>
                            {object?.title || object.employeeFullName}
                          </strong>
                          <p>{object.tags.join(", ")}</p>
                        </Link>
                      </div>
                    );
                  })}
                </Popup>
              )}
            </div>
          );
        })}
      </MapGL>
    </div>
  );
};

export default MapContainer;
