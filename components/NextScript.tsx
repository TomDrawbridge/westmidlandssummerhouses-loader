import Script from 'next/script';

interface NextScriptProps {
  src: string;
  strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';
  onLoad?: () => void;
  onReady?: () => void;
  onError?: () => void;
}

const NextScript: React.FC<NextScriptProps> = ({ src, strategy, onLoad, onReady, onError }) => {
  return (
    <Script
      src={src}
      strategy={strategy}
      onLoad={onLoad}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default NextScript;
