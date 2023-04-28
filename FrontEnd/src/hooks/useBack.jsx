import {useEffect, useState} from "react";

const useBack = () => {
  const [locationKeys, setLocationKeys] = useState([]);
  useEffect(() => {
    return history.listen((location) => {
      if (history.action === "PUSH") {
        setLocationKeys([location.key]);
      }

      if (history.action === "POP") {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys);

          // 앞으로 가기
        } else {
          setLocationKeys((keys) => [location.key, ...keys]);

          // 뒤로 가기
          history.push('/');
        }
      }
    });
  }, [locationKeys, history]);

}

export default useBack
