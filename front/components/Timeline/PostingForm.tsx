import React, { useCallback, useEffect, useState } from 'react';
import { CompassOutlined, PaperClipOutlined, TagOutlined } from '@ant-design/icons';

import useInput from 'utils/useInput';
import { PostingWrapper } from 'styles/Timeline/postingForm';
import { useGeoLocation } from 'utils/useGeoLocation';

const geolocationOptions = {
  enableHighAccuracy: true,
  timeout: 1000 * 10,
  maximumAge: 1000 * 3600 * 24
};

const PostingForm = () => {
  const [text, onChangeText] = useInput('');
  const [formattedAddress, setFormattedAddress] = useState('');
  const [showLocation, setShowLocation] = useState(false);
  const { location, error } = useGeoLocation(geolocationOptions);

  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log(text);
    },
    [text]
  );

  const onClickLocation = useCallback(() => {
    setShowLocation(prev => !prev);
  }, [formattedAddress]);

  useEffect(() => {
    if (location) {
      const apiKey = 'AIzaSyA6k3epIk-SNJ-KIpA94sAlWFe3RcR6HB0';
      const { latitude, longitude } = location;

      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK' && data.results.length > 0) {
            const firstResult = data.results[0];
            console.log(firstResult);

            const address = firstResult.formatted_address;
            setFormattedAddress(address);
          } else {
            console.error('Geocoding API returned no results.');
          }
        })
        .catch(error => {
          console.error('Error fetching geocoding data:', error);
        });
    }
  }, [location]);

  return (
    <PostingWrapper onSubmit={onSubmitForm}>
      <textarea rows={10} placeholder="당신의 작품에 대한 이야기를 들려주세요." value={text} onChange={onChangeText} />

      <div>
        <div>
          <PaperClipOutlined />
          <TagOutlined />
          <CompassOutlined onClick={onClickLocation} />
          {showLocation && <div>{formattedAddress}</div>}
        </div>

        <div>
          <button type="submit">Post</button>
        </div>
      </div>
    </PostingWrapper>
  );
};

export default PostingForm;
