import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Text, View, useThemeColor } from "../../components/Themed";

const createEmptyMatrix = (rows: number, cols: number): number[][] => {
  return Array.from({ length: rows }, () => Array(cols).fill(0));
};

const sumMatrices = (matrix1: number[][], matrix2: number[][]): number[][] => {
  return matrix1.map((row, rowIndex) =>
    row.map((val, colIndex) => val + matrix2[rowIndex][colIndex])
  );
};

const subtractMatrices = (
  matrix1: number[][],
  matrix2: number[][]
): number[][] => {
  return matrix1.map((row, rowIndex) =>
    row.map((val, colIndex) => val - matrix2[rowIndex][colIndex])
  );
};

const multiplyMatrices = (
  matrix1: number[][],
  matrix2: number[][]
): number[][] => {
  return matrix1.map((_, i) =>
    matrix2[0].map((_, j) =>
      matrix1[i].reduce((sum, val, k) => sum + val * matrix2[k][j], 0)
    )
  );
};

const MatrixComparison: React.FC = () => {
  const [matrix1, setMatrix1] = useState<number[][]>(createEmptyMatrix(3, 3));
  const [matrix2, setMatrix2] = useState<number[][]>(createEmptyMatrix(3, 3));
  const [resultAdd, setResultAdd] = useState<number[][]>(
    createEmptyMatrix(3, 3)
  );
  const [resultSubtract, setResultSubtract] = useState<number[][]>(
    createEmptyMatrix(3, 3)
  );
  const [resultMultiply, setResultMultiply] = useState<number[][]>(
    createEmptyMatrix(3, 3)
  );

  const handleValueChange = (
    value: string,
    rowIndex: number,
    colIndex: number,
    matrixIndex: number
  ) => {
    const updatedMatrix = matrixIndex === 1 ? setMatrix1 : setMatrix2;
    const matrix = matrixIndex === 1 ? matrix1 : matrix2;

    const updatedValues = matrix.map((row, rIndex) => {
      const v = parseInt(value, 10);
      return row.map((val, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? (isNaN(v) ? 0 : v) : val
      );
    });

    updatedMatrix(updatedValues);
  };

  const renderMatrixInputs = (matrixIndex: number) => {
    const matrix = matrixIndex === 1 ? matrix1 : matrix2;
    const inputs = [];

    for (let i = 0; i < matrix.length; i++) {
      const rowInputs = [];

      for (let j = 0; j < matrix[i].length; j++) {
        const col = useThemeColor(
          { dark: "#FAF3F0", light: "#03001C" },
          "background"
        );
        rowInputs.push(
          <TextInput
            key={`${i}-${j}`}
            style={[
              styles.input,
              {
                color: col,
                borderColor: col,
              },
            ]}
            keyboardType="numeric"
            value={matrix[i][j].toString()}
            onChangeText={(text) => handleValueChange(text, i, j, matrixIndex)}
          />
        );
      }

      inputs.push(
        <View key={i} style={styles.row}>
          {rowInputs}
        </View>
      );
    }

    return inputs;
  };

  const performMatrixOperation = (
    operation: "add" | "subtract" | "multiply"
  ) => {
    if (operation === "add") {
      setResultAdd(sumMatrices(matrix1, matrix2));
    } else if (operation === "subtract") {
      setResultSubtract(subtractMatrices(matrix1, matrix2));
    } else if (operation === "multiply") {
      setResultMultiply(multiplyMatrices(matrix1, matrix2));
    }
  };

  const col = useThemeColor(
    { dark: "#FAF3F0", light: "#03001C" },
    "background"
  );

  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Masukan Matrix Pertama:</Text>
        {matrix1 && matrix1.length > 0 ? (
          <View style={[styles.matrixContainer]}>{renderMatrixInputs(1)}</View>
        ) : null}

        <Text style={styles.text}>Masukan Matrix Kedua:</Text>
        {matrix2 && matrix2.length > 0 ? (
          <View style={[styles.matrixContainer]}>{renderMatrixInputs(2)}</View>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={() => performMatrixOperation("add")}>
          <Text style={styles.buttonText}>Tambah Matrix</Text>
        </TouchableOpacity>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabelText}>Hasil Penjumlahan:</Text>
          <View style={[styles.matrixContainer]}>
            {resultAdd.map((row, rowIndex) => (
              <View key={rowIndex} style={[styles.row, { borderColor: col }]}>
                {row.map((value, colIndex) => (
                  <Text
                    key={colIndex}
                    style={[styles.resultText, { borderColor: col }]}>
                    {value}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => performMatrixOperation("subtract")}>
          <Text style={styles.buttonText}>Kurangi Matrix</Text>
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabelText}>Hasil Pengurangan:</Text>
          <View style={[styles.matrixContainer]}>
            {resultSubtract.map((row, rowIndex) => (
              <View key={rowIndex} style={[styles.row]}>
                {row.map((value, colIndex) => (
                  <Text
                    key={colIndex}
                    style={[styles.resultText, { borderColor: col }]}>
                    {value}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => performMatrixOperation("multiply")}>
          <Text style={styles.buttonText}>Kali Matrix</Text>
        </TouchableOpacity>
        <View style={styles.resultContainer}>
          <Text style={styles.resultLabelText}>Hasil Perkalian:</Text>
          <View style={[styles.matrixContainer]}>
            {resultMultiply.map((row, rowIndex) => (
              <View key={rowIndex} style={[styles.row]}>
                {row.map((value, colIndex) => (
                  <Text
                    key={colIndex}
                    style={[styles.resultText, { borderColor: col }]}>
                    {value}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  matrixContainer: {
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
    textAlign: "center",
    paddingVertical: 5,
    borderRadius: 9,
    marginRight: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginBottom: 20,
  },
  resultLabelText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 5,
    paddingBottom: 10,
  },
  resultText: {
    borderWidth: 1,
    alignItems: "center",
    fontSize: 16,
    paddingHorizontal: 15,
    textAlign: "center",
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 9,
    marginRight: 12,
  },
});

export default MatrixComparison;
