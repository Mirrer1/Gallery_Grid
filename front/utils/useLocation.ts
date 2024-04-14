import axios from 'axios';
import { useCallback, useState } from 'react';

interface LocationState {
  latitude: number;
  longitude: number;
  address: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationState | null>(null);

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`,
        {
          headers: {
            // 카카오 REST API키 사용
            // Authorization: `KakaoAK ${}`
          }
        }
      );

      const { region_1depth_name: si, region_2depth_name: gu } = response.data.documents[0].address;
      return `${si} ${gu}`;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`An error occurred: ${error.message}`);
      } else {
        console.error('An unexpected error occurred');
      }
      return '주소를 찾을 수 없습니다.';
    }
  };

  const getLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const address = await getAddress(position.coords.latitude, position.coords.longitude);
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: address
          });
        },
        error => {
          console.error(error);
          alert('위치 정보를 가져오는 데 실패했습니다.');
        }
      );
    } else {
      alert('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
    }
  }, []);

  return { location, getLocation, setLocation };
};
