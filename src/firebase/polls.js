import { firestore } from "./config";

// create and update polls in firestore
export const createPoll = (poll) => {
  const docRef = firestore.doc(`/polls/${poll.id}`);
  return docRef.set(poll);
};


export const updatePoll = async (poll) => {
  const docRef = firestore.doc(`/polls/${poll.id}`);
  try {
    await docRef.update(poll);
    console.log("Poll updated successfully");
  } catch (error) {
    console.error("Error updating poll:", error);
  }
};

