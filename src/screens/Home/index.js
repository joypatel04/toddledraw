/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  PermissionsAndroid,
  Platform,
  Linking,
  View,
  Text,
} from 'react-native';
import idx from 'idx';
import CameraRoll from '@react-native-community/cameraroll';
import ImageColors from 'react-native-image-colors';
import {SafeAreaView} from 'react-native-safe-area-context';

import ImageTile from '../../components/ImageTile';
import IntroSlider from '../../components/IntroSlider';
import styles from '../../themes/styles';
import localStyles from './styles';

const defaultParams = {
  first: 20,
  groupTypes: 'All',
  assetType: 'Photos',
};

const Home = ({navigation}) => {
  const [imageList, setImageList] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [permission, setPermission] = useState(null);
  const [params, setParams] = useState(defaultParams);
  const [hasMore, updateHasMore] = useState(true);

  useEffect(() => {
    checkPermission();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshImages();
    });

    return unsubscribe;
  }, [navigation]);

  const getColors = async (uri) => {
    let URI = uri;
    if (Platform.OS === 'ios' && uri.startsWith('ph://')) {
      const regex = /:\/\/(.{36})\//i;
      const result = uri.match(regex);
      URI = `assets-library://asset/asset.jpg?id=${result[1]}&ext=jpg`;
    }
    try {
      const colors = await ImageColors.getColors(URI, {
        fallback: '#fff',
      });
      return Platform.OS === 'ios' ? colors.background : colors.lightMuted;
    } catch (e) {
      console.log(e);
      return '#fff';
    }
  };

  const getPhotos = async () => {
    try {
      const response = await CameraRoll.getPhotos(params);
      const page_info = idx(response, (_) => _.page_info) || {};
      const edges = idx(response, (_) => _.edges) || [];
      const {has_next_page = false, end_cursor = null} =
        idx(page_info, (_) => _) || {};
      updateHasMore(has_next_page);
      const updatedParams = {
        ...defaultParams,
        after: end_cursor,
      };
      if (end_cursor) {
        setParams(updatedParams);
      }

      const images = edges.map((obj) => obj.node.image) || [];
      const updatedImageList = imageList.concat(images);
      setImageList(updatedImageList);
    } catch (e) {
      if (e.code === 'E_PHOTO_LIBRARY_AUTH_DENIED') {
        setHasPermission(false);
        setPermission('denied');
      }
    }
  };

  const checkPermission = async () => {
    if (!hasPermission) {
      if (Platform.OS === 'ios') {
        getPhotos();
      } else {
        const permissionToCheck =
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

        const permissionGiven = await PermissionsAndroid.check(
          permissionToCheck,
        );

        if (permissionGiven) {
          setHasPermission(true);
          setPermission('granted');
          getPhotos();
          return;
        }

        if (!permissionGiven) {
          const status = await PermissionsAndroid.request(permissionToCheck);

          if (status === 'granted') {
            setHasPermission(true);
            setPermission(status);
            getPhotos();
          } else {
            setHasPermission(false);
            setPermission(status);
          }
        }
      }
    }
  };

  const refreshImages = () => {
    setImageList([]);
    setParams(defaultParams);
    updateHasMore(true);
    getPhotos();
  };

  const shouldOpenSetting =
    permission === 'never_ask_again' || permission === 'denied';

  const onSelectImage = async (item) => {
    const primaryColor = await getColors(item.uri);
    navigation.navigate('Edit', {
      bgImage: item,
      primaryColor,
    });
  };

  const showPermissionButton = permission === 'denied' || shouldOpenSetting;

  const mediaFolderText = Platform.OS === 'ios' ? 'Photos' : 'Gallary';

  return (
    <SafeAreaView style={styles.container}>
      <View style={[localStyles.innerTopContainer]}>
        <IntroSlider />
      </View>
      {showPermissionButton && (
        <View style={localStyles.innerBottomPermissionContainer}>
          <Text style={localStyles.contentSubText}>
            {`"Doodle Space" requires access to your ${mediaFolderText} to create your first Doodle`}
          </Text>
          <Pressable
            onPress={() => Linking.openSettings()}
            style={localStyles.button}>
            <Text style={localStyles.buttonText}>Go to Setting</Text>
          </Pressable>
        </View>
      )}

      {imageList && imageList.length > 0 && (
        <View style={localStyles.innerBottomContainer}>
          <FlatList
            style={localStyles.list}
            keyExtractor={(item, index) => index}
            data={imageList}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
              if (hasMore) {
                getPhotos();
              }
            }}
            renderItem={({item, index}) => {
              const marginRight =
                (index + 1) % 3 !== 0
                  ? {
                      marginRight: 10,
                    }
                  : {};
              return (
                <ImageTile
                  style={marginRight}
                  imageStyle={marginRight}
                  uri={item.uri}
                  onPress={() => onSelectImage(item)}
                />
              );
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Home;
