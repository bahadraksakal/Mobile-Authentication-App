import React, { useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import { emailValidator } from '../helpers/emailValidator'
import axios from 'axios';
import {BASE_URL} from '../../backend.config.js';

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: '', error: '' })

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value)
    if (emailError) {
      setEmail({ ...email, error: emailError })
      return
    }else{
      var emailVal=email.value;
      var resetStr=BASE_URL+"/auth/resetPass";
      console.log(resetStr);
      axios
      .post(resetStr, {
        "userMail":emailVal
      })
      .then(res => {
        let resetMessage = res.data;
        console.log(resetMessage.mesaj);
        Alert.alert(
          `${resetMessage.baslik}`,
          `${resetMessage.mesaj}`,
        );
        // Kullanıcıyı oturum açma ekranınıza yönlendirir
        if(res.data.baslik!="Başarısız!"){navigation.navigate('LoginScreen');}
        
      })
      .catch(e => {
        console.log(`email error ${e}`);
        res.status(500).send(e);
        Alert.alert('Error!', e);
      });
    } 
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      
      <Header>Şifremi Unutum</Header>
      <TextInput
        label="E-posta adresi"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Yeni şifreni içeren bir e-posta alacaksın."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Gönder
      </Button>
    </Background>
  )
}
