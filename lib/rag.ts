import fs from "fs";
import path from "path";
import { getOpenAIEmbedding } from "./openai-embed";

export class RAGProcessor {
  private documents: Array<{
    text: string;
    vector: number[];
  }> = [];

  constructor() {
    const filePath = path.join(process.cwd(), "data", "rag-data.json");
    console.log("File Path de rag-data.json: ", filePath);
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      this.documents = JSON.parse(data);
      console.log("documents longitud: ", documents.length);
    } catch (error) {
      console.error("❌ Error al cargar rag-data.json:", error);
    }
  }

  // Convierte texto en un vector usando TF-IDF simple
  private textToVector(text: string): number[] {
    const normalizedText = text.toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .replace(/\s{2,}/g, " ")

    const words = normalizedText.split(" ")
    const uniqueWords = Array.from(new Set(words))

    const wordCount = new Map<string, number>()
    words.forEach(word => {
      wordCount.set(word, (wordCount.get(word) || 0) + 1)
    })

    return uniqueWords.map(word => {
      const tf = wordCount.get(word)! / words.length
      return tf
    })
  }

  // Calcula la similitud coseno entre dos vectores
  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) {
      const maxLength = Math.max(a.length, b.length)
      while (a.length < maxLength) a.push(0)
      while (b.length < maxLength) b.push(0)
    }

    const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0)
    const normA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0))
    const normB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0))
    return dotProduct / (normA * normB) || 0
  }

  // Busca el contexto más relevante para una pregunta
  async findRelevantContext(question: string, maxResults: number = 3): Promise<string> {

    if (this.documents.length === 0) {
      throw new Error("No hay documentos procesados")
    }

    try {
      const questionVector = await getOpenAIEmbedding(question)

      const questionVector = await getOpenAIEmbedding(question)
      console.log("questionVector:", questionVector)
      if (!questionVector) {
         console.error("questionVector es undefined o null después de getOpenAIEmbedding")
         // Puedes lanzar un error aquí para un manejo más específico
         throw new Error("No se pudo obtener el embedding de la pregunta.");
      }
      // Asegúrate de que es un array o iterable con elementos
      if (!Array.isArray(questionVector) || questionVector.length === 0) {
         console.error("questionVector no es un array válido o está vacío:", questionVector);
         throw new Error("El embedding de la pregunta no es un formato válido.");
      }

      const similarities = this.documents.map(doc => ({
        ...doc,
        similarity: this.cosineSimilarity(questionVector, doc.vector),
      }))

      similarities.sort((a, b) => b.similarity - a.similarity)

      const relevantDocs = similarities.slice(0, maxResults)

      //console.log('Similitudes:', relevantDocs.map(d => d.similarity))

      return relevantDocs.map(doc => doc.text).join("\n\n")
    } catch (error) {
      console.error("Error al buscar contexto:", error)
      throw error
    }
  }

  // Elimina todos los documentos
  clearDocuments(): void {
    this.documents = []
    console.log('Documentos eliminados')
  }
}
