import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export const useLocation = () => {
  const [location, setLocation] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?input_coord=WGS84&x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`
          },
          withCredentials: false
        }
      );

      const { region_1depth_name: si, region_2depth_name: gu } = response.data.documents[0].address;
      return `${si} ${gu}`;
    } catch (error) {
      console.error(error);
      toast.warning('주소를 찾을 수 없습니다.');
      return null;
    }
  };

  const getLocation = useCallback(() => {
    setLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async position => {
          const address = await getAddress(position.coords.latitude, position.coords.longitude);
          setLocation(address);
          setLoading(false);
        },
        error => {
          console.error(error);
          toast.warning('위치 정보를 가져오는 데 실패했습니다.');
          setLoading(false);
        }
      );
    } else {
      toast.warning('이 브라우저에서는 위치 서비스를 지원하지 않습니다.');
      setLoading(false);
    }
  }, []);

  return { location, getLocation, setLocation, loading };
};
