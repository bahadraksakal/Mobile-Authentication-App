import React from 'react'
import Background from '../components/Background'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'


export default function StartScreen({ navigation }) {
  return (
    <Background>
      <Header>Giriş Ekranı</Header>
      <Paragraph>
        Uygulamaya Hoşgeldin
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('LoginScreen')}
      >
        GİRİŞ
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}
      >
        ÜYE OL
      </Button>
    </Background>
  )
}
