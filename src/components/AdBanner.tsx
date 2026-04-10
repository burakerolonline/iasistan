import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  AdEventType,
  TestIds,
} from 'react-native-google-mobile-ads';

export const ADMOB_APP_ID = 'ca-app-pub-1477681170501482~8751442388';

const BANNER_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-1477681170501482/BANNER_AD_ID_BURAYA';

export const ADMOB_INTERSTITIAL_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-1477681170501482/4625126004';

const interstitial = InterstitialAd.createForAdRequest(ADMOB_INTERSTITIAL_ID, {
  requestNonPersonalizedAdsOnly: true,
});

export const loadInterstitialAd = () => {
  interstitial.load();
};

export const showInterstitialAd = () => {
  if (interstitial.loaded) {
    interstitial.show();
  }
};

export const BannerAdComponent: React.FC = () => {
  return (
    <View style={styles.banner}>
      <BannerAd
        unitId={BANNER_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
};

export const AdBanner = BannerAdComponent;

export const InterstitialAdComponent: React.FC<{ visible?: boolean; onClose?: () => void }> = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubLoad = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubClose = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      interstitial.load();
    });
    interstitial.load();
    return () => {
      unsubLoad();
      unsubClose();
    };
  }, []);

  return null;
};

export { InterstitialAdComponent as InterstitialAd };

const styles = StyleSheet.create({
  banner: {
    alignItems: 'center',
    width: '100%',
  },
});
