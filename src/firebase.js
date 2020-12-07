import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBlo3NZR7YouCBvF8aow9U1uEv0mhWFlyU",
    authDomain: "brainbo-42077.firebaseapp.com",
    databaseURL: "https://brainbo-42077.firebaseio.com",
    projectId: "brainbo-42077",
    storageBucket: "brainbo-42077.appspot.com",
    messagingSenderId: "933205609828",
    appId: "1:933205609828:web:25d757191af8b6484f7e71"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const db = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = db.collection(`users`).doc(`${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        [`userdata`]:{
        displayName: `${displayName}`,
        email: `${email}`,
        photoURL: `${photoURL}`,
        ...additionalData
      }
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await db.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};


//TEST data

export async function getData()
{
  return new Promise (async(resolve)=>{
    const ref = db.collection('data').doc('modules');
    const doc = await ref.get();
    if(!doc.exists) {
      console.log("No such document");
    }
    else {
      //console.log(doc.data());
      resolve(doc.data());
    }
  })

}


export const generateNewExcercise = async (module, topic, exercise, answer, option1, option2, option3, option4, question) => {

  const exerciseRef = db.collection('data').doc('modules');

    exerciseRef.update({
    [`${module}.${topic}.${exercise}`]:{
      answer:`${answer}`,
      option1:`${option1}`,
      option2:`${option2}`,
      option3:`${option3}`,
      option4:`${option4}`,
      question:`${question}`
    }
  });
};

  export const generateTestData = async () => {
    const ref = db.collection('data').doc('modules');

    ref.update({
      [`WT1.Klausurvorbereitung.1`]:{
        answer: 'option1',
        option1:'Die Bandbreite nimmt von den NSP zu den ISP ab',
        option2:'Die Bandbreite ist immer gleich',
        option3:'Die Server für die ISP sind schnell',
        option4:'Die Bandbreite nimmt von den ISP zu den NSP zu',
        question:'Welche Aussage zur Bandbreite der Internet-Netzwerke ist richtig?'
      },
      [`WT1.Klausurvorbereitung.2`]:{
        answer: 'option1',
        option1:'Schriftenreihe über die Internet-Standards',
        option2:'Schriftenreihe über die aktuellen Internet-Adressen',
        option3:'Internet Standards',
        option4:'Internet Kommentare zu Anfragen',
        question:'Was sind die Request for Comments?'
      },
      [`WT1.Klausurvorbereitung.3`]:{
        answer: 'option3',
        option1:'Die globalen Computer',
        option2:'Das Internet der Dinge',
        option3:'Die Allgegenwärtigkeit der Computer',
        option4:'Die Einzigartigkeit der Computer',
        question:'Ubiquitous Computing beschreibt?'
      }

    });
  };



export const generateTest = async () => {
  const module = "Java1";
  const topic = "Test";
  const i = 4;
  const exercise = "Aufgabe"+i;
  const exerciseRef = db.collection('data').doc('modules');

  exerciseRef.update({
    [`${module}.${topic}.${exercise}`]:{ answer:"option1", option1:"A", option2:"B", option3:"C", option4:"D", question:"asd?"}
  });


};
