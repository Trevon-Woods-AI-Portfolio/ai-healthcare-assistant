import Results from "../models/resultsModel.js";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-5",
});

const initialPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a medical professional. Given a users symptoms, provide a detailed diagnosis and suggest possible medications."
  ],
  ["user", "{query}"],
]);

const chain1 = initialPrompt.pipe(model);

const medicinePrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a medical professional. Given the diagnosis, provide a list of medication names along with a brief description and a real open-source/free jpg image URL from the internet for each medication. Format the response as a JSON array with each entry containing 'name', 'description', and 'imageUrl' fields.",
  ],
  ["user", "{diagnosis}"],
]);

const chain2 = medicinePrompt.pipe(model);

const medicineInfoPrompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a medical professional. Given the provided medicines, generate a paragraph for each of these: what the medication is, what it does, how it's made also create steps to take the medication and a disclaimer for each medication. Format the response as a JSON array with each entry containing only 'whatitis', 'whatitdoes', 'howitsmade', 'steps', and 'disclaimer' fields." ,
  ],
  ["user", "{medicines}"],
]);

const chain3 = medicineInfoPrompt.pipe(model);

const saveResults = async (req, res) => {
  try {
    const { query, userId } = req.body;

    console.log(userId)

    console.log("Starting Generation...");

    const response1 = await chain1.invoke({
      query: query,
    });

    const diagnosis = response1.content;

    console.log("Starting 2nd Generation...");

    const response2 = await chain2.invoke({
      diagnosis: diagnosis,
    });

    const medicines = JSON.parse(response2.content);

    console.log("Starting 3rd Generation...");

    const response3 = await chain3.invoke({
      medicines: medicines,
    });

    const medicinesInfo = JSON.parse(response3.content);

    const newDiagnosis = new Results({
      userId,
      diagnosis: diagnosis,
      medicines: medicines,
      medicinesInfo: medicinesInfo,
    });

    await newDiagnosis.save();

    res
      .status(201)
      .json({ message: "Results saved successfully", diagnosis: newDiagnosis});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in saveResults:", error);
  }
};

const getResults = async (req, res) => {
  try {
    const { userId } = req.body;

    const results = await Results.find({ userId: userId }).sort({ date: -1 });

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getResults:", error);
  }
};

const deleteResult = async (req, res) => {
  try {
    const { id } = req.params;

    await Results.findByIdAndDelete(id);

    res.status(200).json({ message: "Result deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in deleteResult:", error);
  }
};

export { saveResults, getResults, deleteResult };
