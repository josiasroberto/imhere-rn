import { StatusBar } from "react-native";
import { Home } from "./src/screens/Home";

export default function App(){
  return(
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent"
        translucent // Para que o StatusBar seja transparente e não apareça em cima do componente Home
      />
      <Home />
    </>
  )  
}

