import fs from "fs";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

function textToVector(text: string): number[] {
  const normalizedText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").replace(/\s{2,}/g, " ");
  const words = normalizedText.split(" ");
  const uniqueWords = Array.from(new Set(words));
  const wordCount = new Map<string, number>();
  words.forEach(word => {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  });
  return uniqueWords.map(word => {
    const tf = wordCount.get(word)! / words.length;
    return tf;
  });
}

async function generateRAGData() {
  const text = fs.readFileSync("data/default-document.txt", "utf-8");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: CHUNK_SIZE,
    chunkOverlap: CHUNK_OVERLAP,
  });
  const docs = await splitter.createDocuments([text]);

  const ragData = docs.map((doc, index) => ({
    id: `doc_${Date.now()}_${index}`,
    content: doc.pageContent,
    vector: textToVector(doc.pageContent),
    metadata: { fileName: "default-document" },
  }));

  fs.writeFileSync("public/rag-data.json", JSON.stringify(ragData, null, 2));
  console.log(`✅ Se guardaron ${ragData.length} chunks en public/rag-data.json`);
}

generateRAGData();
