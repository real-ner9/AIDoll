import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import { EMPTY, Subject, switchMap } from 'rxjs';
import {catchError, takeUntil} from 'rxjs/operators';
import ApiService from '../services/ApiService';
import {NavigationProp} from '@react-navigation/native';

interface LandingPageProps {
  navigation: NavigationProp<any>;
}

const LandingPage: React.FC<LandingPageProps> = ({navigation}) => {
  const [roomNumber, setRoomNumber] = useState('');
  const [destroy$] = useState(new Subject());
  useEffect(() => {
    return () => {
      destroy$.next(true);
      destroy$.complete();
    };
  }, [destroy$]);

  const connectToRoom = () => {
    ApiService.connectToRoom(roomNumber)
      .pipe(
        takeUntil(destroy$),
        catchError(error => {
          console.error('Error connecting to room:', error);
          return EMPTY; // Возвращаем пустой Observable
        }),
      )
      .subscribe(
        () => {
          navigation.navigate('RoomPage', {roomNumber});
        },
        error => {
          console.error('Error connecting to room:', error);
        },
      );
  };

  const handleCreateRoom = () => {
    ApiService.createRoom()
      .pipe(
        switchMap(roomData => {
          return ApiService.connectToRoom(roomData.roomNumber).pipe(
            catchError(error => {
              console.error('Error connecting to room:', error);
              return EMPTY;
            }),
          );
        }),
        takeUntil(destroy$),
      )
      .subscribe(
        roomData => {
          navigation.navigate('RoomPage', {roomNumber: roomData.roomNumber});
        },
        error => {
          console.error('Error creating and connecting to room:', error);
        },
      );
  };

  useEffect(() => {
    return () => {
      destroy$.next(true);
      destroy$.complete();
    };
  }, [destroy$]);

  return (
    <View>
      <Text>Enter Room Number:</Text>
      <TextInput
        value={roomNumber}
        onChangeText={setRoomNumber}
        placeholder="Room Number"
      />
      <Button title="Connect" onPress={connectToRoom} />
      <Button title="Create and Connect" onPress={handleCreateRoom} />
    </View>
  );
};

export default LandingPage;
