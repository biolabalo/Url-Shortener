import { useEffect, useState } from 'react';

const useHostnameWithProtocol = (): string => {
  const [hostname, setHostname] = useState<string>('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const protocol = window.location.protocol;
      const hostname = window.location.hostname;
      setHostname(`${protocol}//${hostname}`);
    }
  }, []);

  return hostname;
};

export default useHostnameWithProtocol;
