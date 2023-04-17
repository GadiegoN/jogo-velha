import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [countX, setCountX] = useState(0);
  const [countO, setCountO] = useState(0);
  const [countE, setCountE] = useState(0)
  const [moves, setMoves] = useState(0);
  const [hasWinner, setHasWinner] = useState(false);
  const [value, setValue] = useState('X')
  const [gameState, setGameState] = useState([
    [{ id: 0, value: '', disabled: false }, { id: 1, value: '', disabled: false }, { id: 2, value: '', disabled: false }],
    [{ id: 3, value: '', disabled: false }, { id: 4, value: '', disabled: false }, { id: 5, value: '', disabled: false }],
    [{ id: 6, value: '', disabled: false }, { id: 7, value: '', disabled: false }, { id: 8, value: '', disabled: false }]
  ]);
  const winningCombinations = [  
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]],
  ];

  const handleButtonPress = (row: number, col: number) => {
    {if (value === 'X') {
      const newGameState = [...gameState];
      newGameState[row][col].value = value;
      newGameState[row][col].disabled = true;
      setGameState(newGameState);
      setMoves(moves + 1);
      setValue('O')
      setHasWinner(false)
    }}

    {if (value === 'O') {
      const newGameState = [...gameState];
      newGameState[row][col].value = value;
      newGameState[row][col].disabled = true;
      setGameState(newGameState);
      setMoves(moves + 1);
      setValue('X')
      setHasWinner(false)
    }}

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      const [valueA, valueB, valueC] = [    gameState[a[0]][a[1]].value,
        gameState[b[0]][b[1]].value,
        gameState[c[0]][c[1]].value,
      ];
    
      if (valueA === 'X' && valueB === 'X' && valueC === 'X') {
        Alert.alert('O X venceu');
        setCountX(countX + 1);
        resetValues();
        setHasWinner(true)
        setMoves(0);
        return;
      } else if (valueA === 'O' && valueB === 'O' && valueC === 'O') {
        Alert.alert('A bola venceu');
        setCountO(countO + 1);
        resetValues();
        setHasWinner(true)
        setMoves(0);
        return;
      }
    }

    if (moves === 8 && hasWinner === false) {
      Alert.alert('A partida terminou em empate');
      resetValues();
      setHasWinner(false)
      setCountE(countE + 1)
      setMoves(0);
    }
  };

  const resetValues = () => {
    setHasWinner(false);
    setMoves(0);
    setGameState([
      [{ id: 0, value: '', disabled: false }, { id: 1, value: '', disabled: false }, { id: 2, value: '', disabled: false }],
      [{ id: 3, value: '', disabled: false }, { id: 4, value: '', disabled: false }, { id: 5, value: '', disabled: false }],
      [{ id: 6, value: '', disabled: false }, { id: 7, value: '', disabled: false }, { id: 8, value: '', disabled: false }]
    ])
    setValue('X')
  }
  
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 200}}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Jogo da Velha </Text>
        <View style={styles.content}>
          {gameState.map((row, rowIndex) => (
            <View key={rowIndex}>
              {row.map((button, colIndex) => (
                <TouchableOpacity
                  key={button.id}
                  style={styles.button}
                  onPress={() => handleButtonPress(rowIndex, colIndex)}
                  disabled={button.disabled}
                >
                  {button.value ? (button.value === 'X' ? <FontAwesome name="times" size={32} color="red" /> : <Ionicons name="ellipse-outline" size={32} color="green" /> ): null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>Quem joga: {value === 'X' ? <FontAwesome name="times" size={32} color="red" /> : <Ionicons name="ellipse-outline" size={32} color="green" />}</Text>
        <TouchableOpacity onPress={resetValues}
          style={{ backgroundColor: '#333', width: '90%', marginLeft: '5%', height: 60, alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#FFF' }}>Iniciar</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row'}}>
          <View style={styles.results}>
            <FontAwesome name="times" size={32} color="red" />
            <Text>Venceu {countX} vezes.</Text>
            {countX > countO ? <MaterialCommunityIcons name="crown-outline" size={24} color="yellow" /> : null}
          </View>
          <View style={styles.results}>
            <Ionicons name="ellipse-outline" size={32} color="green" /> 
            <Text>Venceu {countO} vezes.</Text>
            {countO > countX ? <MaterialCommunityIcons name="crown-outline" size={24} color="yellow" /> : null}
          </View>
        </View>
        <View style={styles.results}>
          <Ionicons name="md-repeat-outline" size={32} color="black" /> 
          <Text>Empatou {countE} vezes.</Text>
          {countO === countX ? <MaterialCommunityIcons name="crown-outline" size={24} color="yellow" /> : null}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  results: {
    height: 80,
    flex: 1,
    margin: 5,
    backgroundColor: '#CCC',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  button: {
    width: 60,
    height: 60,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: 30,
  }
});
