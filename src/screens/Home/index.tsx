import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import { Participant } from "../../components/Participant";
import { useState } from "react";



export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState('')
    
  function handleParticipantAdd() {
    
    if(participants.includes(participantName)){
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome!")
    }
    
    setParticipants(prevState => [...prevState, participantName.trimStart().trimEnd()])
    setParticipantName('')
    
  }

  function handleParticipantRemove(name: string){
    Alert.alert("Remover",`Remover o participante ${name}?`,[
      {
        text: "Cancelar",
        style: "cancel"
      },
      {
        text: "Sim",
        onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
      }
    ])
    
  }
  const isNewParticipantEmpty = participantName.trim() === ""

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>
        Nome do evento
      </Text>

      <Text style={styles.eventDate}>
        Sábado, 7 de Setembro de 2024.
      </Text>

    
      <View style={styles.form}>
        <TextInput 
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          onChangeText={setParticipantName}
          value={participantName}
          />
          
        <TouchableOpacity 
          style={!isNewParticipantEmpty ? styles.button : styles.buttonDisabled} 
          onPress={handleParticipantAdd}
          disabled={isNewParticipantEmpty}
        >
          <Text style={styles.buttonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        
        data={participants}
        keyExtractor={(item, index) => item+index}
        renderItem={({item, index}) =>(
          <Participant 
            key={index} 
            name={item} 
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
      
    </View>
  )
}